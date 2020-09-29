const Discord = require('discord.js');

const client = new Discord.Client();

const { default_prefix } = require('./config.json');

const { readdirSync } = require('fs');

const { join } = require('path');

const config = require('./config.json');
client.config = config;

const db = require('quick.db');

const express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 3000;
    bodyParser = require('body-parser'),
    todoRoutes = require('./routes/todo'),
    path = require("path");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

app.get('/', function (req, res){
    res.send('Root route')
});

app.use('/api/todos', todoRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, function(){
    console.log("Express server is running on port " + port)
});



const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.commands= new Discord.Collection();
//You can change the prefix if you like. It doesn't have to be ! or ;
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
    client.user.setActivity(`Among Us`)
});


let stats = {
    serverID: '<ID>',
    total: "<ID>",
    member: "<ID>",
    bots: "<ID>"
}



client.on('guildMemberAdd', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

    
})

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = default_prefix;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(process.env.token);
