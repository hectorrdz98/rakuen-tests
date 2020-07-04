const userCommands = require('./../../database/userCommands.js');

module.exports = {
    name: 'profile',
    description: 'Ver perfil!',
    execute(msg, args) {
        userCommands.getAllUserInfo(msg.author.id, function (data) {
            if (!data) {
                userCommands.insertUser(msg.author.id, msg.author.username, 'Novato', 'Hola! Mucho gusto', msg.author.avatarURL);
            }
            let profile = {
                color: 15844367,
                title: data.name + ' `' + data.title + '` ',
                description: data.description,
                thumbnail: {url: data.image},
                fields: [
                    {
                        name: 'Tacos actuales: ',
                        value: data.tacos + ' :taco:'
                    },
                    {
                        name: 'Tacos totales: ',
                        value: data.t_tacos + ' :taco:'
                    },
                ],
                timestamp: new Date(),
            }
            msg.channel.send({embed: profile});
        });
    },
};