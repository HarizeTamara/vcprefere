// Import necessary modules and configure dotenv for environment variables
require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Load the token from the environment variables
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

// When the bot is ready, this event runs once
client.once('ready', async () => {
    console.log('Bot is online and ready! 🥷👾');
});

// List of random questions for the command
const questions = [
    'sua pergunta aqui',
];

// Register the slash command /vcprefere
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'vcprefere') {
        // Select a random question from the list
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

        // Create the embed for the question
        const embed = new EmbedBuilder()
            .setColor(0x00AE86) // Example color
            .setTitle('Você prefere? 🤔')
            .setDescription(randomQuestion)
            .setFooter({ text: 'Vote reagindo abaixo!' });

        // Send the embed and add reactions
        const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        });

        // Add reaction emojis for voting
        await message.react('1️⃣');  // Option 1
        await message.react('2️⃣');  // Option 2
    }
});

client.on('ready', async () => {
    console.log('Bot is ready! 🥷');

    // Register the command globally for all servers
    const commands = [
        new SlashCommandBuilder()
            .setName('vcprefere')
            .setDescription('Escolha entre duas opções aleatórias.')
    ];

    await client.application.commands.set(commands);

    console.log('Slash command /vcprefere registered globally 📡.');
});

// Log the bot in
client.login(token);
