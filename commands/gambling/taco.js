const tacoCommands = require('./../../database/tacoCommands.js');
const userCommands = require('./../../database/userCommands.js');

module.exports = {
    name: 'taco',
    description: 'Atrapar un taco!',
    execute(msg, args) {
        tacoCommands.getTacoSpawn(msg.guild.id, msg.channel.id, function (data) {
            if (data) {
                tacoCommands.deleteTacoSpawn(msg.guild.id, msg.channel.id, function (status) {
                    if (status) {
                        let amount = Math.floor(Math.random() * 3) + 1;
                        tacoCommands.getCur(msg.author.id, function (newData) {
                            if (!newData) {
                                userCommands.insertUser(msg.author.id, msg.author.username, 'Novato', 'Hola! Mucho gusto', msg.author.avatarURL);
                                tacoCommands.insertCur(msg.author.id, amount, amount);
                            } else {
                                tacoCommands.updateCur(msg.author.id, newData.tacos + amount, newData.t_tacos + amount);
                            }
                            let text = amount == 1 ? 'taco' : 'tacos';
                            msg.channel.send(`¡Conseguiste ${amount} ${text} :taco: <@${msg.author.id}>!`);
                            console.log(`${msg.author.username} consiguió ${amount} ${text}`);
                            msg.channel.fetchMessage(data.message_id).then(message => {
                                message.delete();
                            })
                        });
                        msg.delete();
                    } else {
                        msg.channel.send(`Lo lamento <@${msg.author.id}>, ocurrió un error al reclamar los tacos :taco:`);
                    }
                });
            }
        });
    },
};