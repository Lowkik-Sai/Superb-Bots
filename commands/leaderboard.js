const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "leaderboard",
    description: "Check the sever's leaderboard",

    async run (client, message, args) {
        let money = db.startsWith(`money_${message.guild.id}`, { sort: '.data' })
        if(money === null) money = 0
        console.log(money)

        let content = "";

        for (let i = 0; i < money.length; i++){
            let user = client.users.cache.get(money[i].ID.split('_')[2]).username

            content += `${i+1}. ${user} - ${money[i].data} \n`;

            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name}'s Leaderboard`)
            .setDescription(`${content}`)
            .setColor("RANDOM")
            .setTimestamp()

            message.channel.send(embed);
        }
    }
}
