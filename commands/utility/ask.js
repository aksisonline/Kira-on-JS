const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask Kira how many pending deaths he has left on his notebook.'),
	async execute(interaction) {
		const members = interaction.guild.members.cache;
		const saikoMembers = members.filter(member => member.roles.cache.some(role => role.name === 'Saiko!') && !member.user.bot && !member.roles.cache.some(role => role.name === 'Light'));

		saikoMembers.forEach(member => {
			const joinedAt = member.joinedAt;
			const now = new Date();
			const timeSinceJoin = now - joinedAt;
			const minutesSinceJoin = Math.floor(timeSinceJoin / 1000 / 60);
			const hoursSinceJoin = Math.floor(timeSinceJoin / 1000 / 60 / 60);

			console.log(`${member.user.username}: Joined ${hoursSinceJoin} hours and ${minutesSinceJoin} minutes ago`);
		});

		await interaction.reply({ content: `There are ${saikoMembers.size} pending deaths in the notebook.`, ephemeral: true });
	},
};
