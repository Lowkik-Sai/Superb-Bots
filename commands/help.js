const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderation')
        .addField('`kick`', 'Kicks a member from your server via mention or ID')
        .addField('`ban`', 'Bans a member from your server via mention or ID')
        .addField('`clear`', 'Purges messages')
        .setFooter("This Command will expire within 2min!")
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField('`meme`', 'Generates a random meme')
        .addField('`ascii`', 'Converts text into ascii')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Utlity')
        .addField('`calculate`', )
        .addField('`ping`', 'Get the bot\'s API ping')
        .addField('`weather`', 'Checks weather forecast for provided location')
        .setTimestamp()

        const music = new Discord.MessageEmbed()
        .setTitle('Music')
        .setDescription(`
1) \`play(p)\`  
2) \`search(sc)\`
3) \`skip(sk)\`
4) \`stop(st)\`
5)  \`pause(pa)\`
6) \`resume(r)\`
7) \`nowplaying(np)\`
8) \`queue(q)\`
9) \`volume(v)\`
10) \`invite(inv)\`
11) \`serverinfo(si)\`
12) \`botinfo(bi)\``)
        .setTimestamp()

        const pages = [
                moderation,
                fun,
                utility,
                music
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
