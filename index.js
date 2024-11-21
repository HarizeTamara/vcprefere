// Import modules and configure dotenv for environment variables
require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalBuilder, InteractionType, REST, Routes } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Load variables from .env
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const userId = process.env.ALLOWED_USER_ID; 
const suggestionChannelId = process.env.SUGGESTION_CHANNEL_ID;
const submitChannelId = process.env.SUBMIT_CHANNEL_ID; // Seu ID para Adm do Bot

// Debugging environment variables
console.log('Client ID:', clientId);
console.log('Suggestion Channel ID:', suggestionChannelId);
console.log('Submit Channel ID:', submitChannelId);
console.log('Discord Token:', token);
console.log('User ID:', userId);   

// Login the bot
client.login(token).catch((error) => {
    console.error('Failed to login:', error);
});

// Event: When the bot is ready
client.once('ready', async () => {
    console.log(`Bot is online as ${client.user.tag}! 🥷`);

    // Register slash commands globally
    const commands = [
        new SlashCommandBuilder()
            .setName('vcprefere')
            .setDescription('Escolha entre duas opções aleatórias.'),
        new SlashCommandBuilder()
            .setName('sugerir')
            .setDescription('Abra o modal para sugerir algo.'),
    ];

    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log('Registering slash commands globally...');
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('Slash commands registered successfully!');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
});

// Lista de perguntas do comando /vcprefere 
const questions = [
    'Você prefere isso ou aquilo?',
];

// Event: Handle interactions (slash commands and modals)
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const { commandName } = interaction;

        // Handle /vcprefere command
        if (commandName === 'vcprefere') {
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

            const embed = new EmbedBuilder()
                .setColor(0x00ae86)
                .setTitle('Você prefere? 🤔')
                .setDescription(randomQuestion)
                .setFooter({ text: 'Vote reagindo abaixo!' });

            const message = await interaction.reply({ embeds: [embed], fetchReply: true });
            await message.react('1️⃣'); // Option 1
            await message.react('2️⃣'); // Option 2
        }

        // Handle /sugerir command
        if (commandName === 'sugerir') {
            const modal = new ModalBuilder()
                .setCustomId('sugestaoModal')
                .setTitle('Envie sua Sugestão');

            const suggestionInput = new TextInputBuilder()
                .setCustomId('suggestionInput')
                .setLabel('Qual é a sua sugestão?')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Digite aqui sua sugestão...')
                .setRequired(true);

            const actionRow = new ActionRowBuilder().addComponents(suggestionInput);
            modal.addComponents(actionRow);

            await interaction.showModal(modal);
        }
    }

    // Handle modal submissions
    if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'sugestaoModal') {
        const suggestion = interaction.fields.getTextInputValue('suggestionInput');
        const submitChannel = client.channels.cache.get(submitChannelId);

        if (!submitChannel) {
            return interaction.reply({ content: 'Não consegui encontrar o canal para enviar a sugestão.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor(0x00ae86)
            .setTitle('Nova Sugestão 💡')
            .setDescription(suggestion)
            .setFooter({ text: `Enviado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await submitChannel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Sua sugestão foi enviada com sucesso! 🎉', ephemeral: true });
    }
});
