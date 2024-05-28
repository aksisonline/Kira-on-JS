const { Events } = require('discord.js');
const dotenv = require('dotenv').config();
const guildId = process.env.GUILD_ID;
const channelId = process.env.CHANNEL_ID;

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		const guild = client.guilds.cache.get(guildId);
		const channel = guild.channels.cache.get(channelId);
		channel.send("You are now under Kira's reign.");
	},
};