const tacoCommands = require('./../../database/tacoCommands.js');
const userCommands = require('./../../database/userCommands.js');
let dailyTacos = 30;

module.exports = {
    name: 'daily',
    description: 'Tacos diarios!',
    execute(msg, args) {
        tacoCommands.getDaily(msg.author.id, function (daily) {
            if (daily) {
                let lastDate = new Date(parseInt(daily.timestamp));
                if (Date.now() - lastDate.valueOf() >= 86400000) {
                    tacoCommands.getCur(msg.author.id, function (cur) {
                        tacoCommands.updateCur(msg.author.id, cur.tacos + 30, cur.t_tacos + 30);
                        tacoCommands.updateDaily(msg.author.id, new Date());
                        console.log(`Daily for user ${msg.author.username}`);
                        msg.channel.send(`¡Has recibido 30 Tacos :taco: <@${msg.author.id}>!`);
                    });
                } else {
                    lastDate.setHours(lastDate.getHours() + 24);
                    let diff = parseInt((lastDate.valueOf() - Date.now()) / 1000);
                    let hours = parseInt(diff / 3600);
                    let minutes = parseInt((diff % 3600) / 60);
                    let seconds = (diff % 3600) % 60;
                    msg.channel.send(`Debes esperar ${hours}h ${minutes}m ${seconds}s para reclamar tus Tacos :taco: diarios <@${msg.author.id}>!`);
                }
            } else {
                tacoCommands.getCur(msg.author.id, function (cur) {
                    if (!cur) {
                        userCommands.insertUser(msg.author.id, msg.author.username, 'Novato', 'Hola! Mucho gusto', msg.author.avatarURL);
                        tacoCommands.insertCur(msg.author.id, 30, 30);
                    }
                    tacoCommands.insertDaily(msg.author.id, new Date());
                    console.log(`Daily for user ${msg.author.username}`);
                    msg.channel.send(`¡Has recibido 30 Tacos :taco: <@${msg.author.id}>!`);
                });
            }
        });
    },
};