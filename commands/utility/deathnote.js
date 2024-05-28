const { SlashCommandBuilder } = require('discord.js');
const { kickTimeInHours } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deathnote')
        .setDescription('Ask Kira how much time a user has left.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Select a user')
                .setRequired(false)),
    async execute(interaction) {

        const members = interaction.guild.members.cache;
        const peopleLeftToDie = members.filter(member => !member.roles.cache.some(role => role.name === 'Light') && !member.user.bot).map(member => member.user.tag);

        
        if (!interaction.options.getUser('user')) {
            await interaction.reply({ content: `List of people left to die: ${peopleLeftToDie}`});
            return;
        }
        
        const guildMember = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
        const userJoinTime = guildMember.joinedAt;
        const currentTime = new Date();
        const timeDifference = Math.abs(currentTime - userJoinTime);
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
        let time;
        
        if (hoursDifference < kickTimeInHours) {
            const remainingHours = kickTimeInHours - hoursDifference -1;
            const remainingMinutes = 60 - minutesDifference;
            const remainingSeconds = 60 - secondsDifference;
            time = `${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds`;
        } else {
            time = 'Time is up!';
        }
        
        console.log(guildMember.user.tag, time, userJoinTime);
        
        if (guildMember.roles.cache.some(role => role.name === 'Light')) {
            await interaction.reply({ content: `${guildMember.user.tag} is under Kira's Protection.`});
        } else {
            await interaction.reply({ content: `${guildMember.user.tag} is going to die in ${time}.`});
        }
    }
};