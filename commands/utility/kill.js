const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('Kira is here!'),
	async execute(interaction) {
		await interaction.reply('Watashi wa Kira desu.', { ephemeral: true });
	},
};