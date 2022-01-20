const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Options } = require('discord.js');
var clientId = "902465788013867018", guildId = "902494407826227240",token = "OTAyNDY1Nzg4MDEzODY3MDE4.YXe0wg.o7oKkXNEVN75Suq7J93Lp1yAJuc";  
const commands = [
    new SlashCommandBuilder().setName('yon')
    .setDescription('Generates a yes or no poll.')
    .addStringOption(option => option.setName('question').setDescription('What do you want to ask or say?'))
    .addIntegerOption(option => option.setName('time').setDescription('How long the poll will last (seconds)')),
    new SlashCommandBuilder().setName('vote')
    .setDescription('Generates a voting poll')
    .addStringOption(option =>  option.setName('title').setDescription('The Question or Title of what the vote is on.'))
    .addStringOption(option => option.setName('options').setDescription('Create up 9 options (NOTE: seperate options by commas), ex: movie1, movie2'))
    .addIntegerOption(option => option.setName('time').setDescription('How long the poll will last (seconds)')) 
]
    .map(x => x.toJSON());
const rest = new REST({ version: '9' }).setToken(token);
 rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);