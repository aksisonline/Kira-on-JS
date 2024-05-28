const { Events } = require('discord.js');
const cron = require('cron');
const moment = require('moment-timezone');
const { kickTimeInHours, deathmessages } = require('../config.json');
const guildId = process.env.GUILD_ID;

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Kira's Deathnote is Active!`);
        const { CronJob } = cron;
        const kickTimeInMilliseconds = kickTimeInHours * 60 * 60 * 1000;

        new CronJob('*/10 * * * * *', async function() {
            const guild = client.guilds.cache.get(guildId);
            const now = moment();

            if (!guild) {
                console.error('Guild not found.');
                return;
            }

            try {
                await guild.members.fetch();
            } catch (error) {
                console.error(`Failed to fetch guild members: ${error}`);
                return;
            }

            
            guild.members.fetch().then(async members => {
                const peopleLeftToDie = members.filter(member => !member.roles.cache.some(role => role.name === 'Light') && !member.user.bot).map(member => member.user.tag);

                peopleLeftToDie.forEach(async member => {
                    const guildMember = guild.members.cache.find(m => m.user.tag === member);
                    const joinTime = moment(guildMember.joinedAt);
                    const isBot = guildMember.user.bot;
                    const hasLightRole = guildMember.roles.cache.some(role => role.name === 'Light');

                    if (!isBot && !hasLightRole && now - joinTime > kickTimeInMilliseconds) {
                        try {
                            const randomMessage = deathmessages[Math.floor(Math.random() * deathmessages.length)];
                            await guildMember.send(randomMessage);
                            await guildMember.kick("Kira's judgement has been passed.");
                            console.log(`Kicked member ${guildMember.id}`);
                        } catch (error) {
                            console.error(`Failed to kick member ${guildMember.id}: ${error}  ${deathmessages}`);
                        }
                    }
                });
            });
        }, null, true);

    },
};