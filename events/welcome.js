const { Events } = require('discord.js');
const cron = require('cron');
const moment = require('moment-timezone');
const {welcome} = require('../config.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute(member) {
        console.log(`Kira welcomes ${member.user.name} to the server!`);
        const randomMessage = welcome[Math.floor(Math.random() * welcome.length)];

        member.send(randomMessage).catch(console.error);
    },
};

