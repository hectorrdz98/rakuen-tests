const tacoCommands = require('./../../database/tacoCommands.js');

module.exports = {
    name: 'cur',
    description: 'Ver cantidad de tacos!',
    execute(msg, args) {
        tacoCommands.getCur(msg.author.id, function (cur) {
            let tacosRounded = Math.round(cur.tacos * 10) / 10;
            if (!cur) {
                msg.channel.send(`¡<@${msg.author.id}> no tienes Tacos :taco:!`);
            } else if (cur.tacos == 1) {
                msg.channel.send(`¡<@${msg.author.id}> tienes \`1\` Taco :taco: únicamente!`);
            } else {
                msg.channel.send(`<@${msg.author.id}> tienes \`${tacosRounded}\` Tacos :taco:!`);
            }
        });
    },
};