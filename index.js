require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const tacoCommands = require('./database/tacoCommands.js');

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX + ' ';
const tacoUrl = 'https://media.discordapp.net/attachments/397031754063675402/601989148089253889/coin_discord.png'
let tacoProb = 3;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    // Generate taco
    if (!msg.author.bot && !msg.content.startsWith(PREFIX) && Math.floor(Math.random() * 100) + 1 <= tacoProb) {
        tacoCommands.getTacoSpawn(msg.guild.id, msg.channel.id, function (data) {
            if (!data) {
                msg.channel.send({embed: {
                    color: 3447003,
                    title: "¡Apareció un Taco! :taco:",
                    description: "Usa `" + PREFIX + "taco` para ganárselo a los demás",
                    image: {url: tacoUrl}
                  }
                }).then(message => {
                    tacoCommands.insertTacoSpawn(msg.guild.id, msg.channel.id, message.id);
                });
                console.log(`Apareció un taco en el servidor ${msg.guild.name} en el canal ${msg.channel.name}`);
            }
        });
    }

    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(PREFIX.length).split(' ');
    const command = args.shift();
    console.info(`Called command: ${command}`);
    
    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('tuve un error al procesar ese comando :slight_frown:');
    }
});
