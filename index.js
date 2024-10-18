// Import necessary modules and configure dotenv for environment variables
require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Load the token from the environment variables
const token = process.env.DISCORD_TOKEN;

// When the bot is ready, this event runs once
client.once('ready', async () => {
    console.log('Bot is online and ready! 🥷👾');
});

// List of random questions for the command
const questions = [
    'Você prefere nunca mais sentir o gosto de chocolate ou nunca mais ouvir música?',
    'Você prefere ter que cantar tudo que você fala ou ter que dançar sempre que anda?',
    'Você prefere ser capaz de voar, mas apenas a 1 metro de altura, ou respirar embaixo d\'água por 5 minutos?',
    'Você prefere só comer pizza pelo resto da vida ou nunca mais comer pizza?',
    'Você prefere não poder sentir o gosto ou o cheiro?',
	'Você prefere ganhar na Mega da Virada, mas perder todos os seus amigos ou Não ganhar e continuar com todos os seus amigos?',
	'Você prefere não ouvir nenhuma música por um ano inteiro ou ter que escolher 10 apenas músicas para ouvir sem parar por um ano inteiro?',
	'Você prefere ganhar um oscar ou ganhar um medalha de ouro nas olimpíadas?',
	'Você prefere descobrir que seu pai não é o pai biológico ou Descobrir que sua mãe quase te abortou?',
	'Você prefere só poder falar em mandarim ou só escutar as pessoas falando em mandarim?',
	'Você prefere ser calvo aos 20 anos ou Ser virgem aos 40 anos?',
	'Você prefere ser colocado em uma prisão de segurança máxima, com criminosos hediondos por um ano ou Ser colocado numa prisão com pessoas que cometeram crimes menores por dez anos?',
	'Você prefere não ouvir nenhuma música por um ano inteiro ou ter que escolher apenas 10 músicas para ouvir sem para um ano inteiro?',
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