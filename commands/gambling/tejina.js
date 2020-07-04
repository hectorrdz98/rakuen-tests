const tacoCommands = require('./../../database/tacoCommands.js');
const userCommands = require('./../../database/userCommands.js');

module.exports = {
    name: 'tejina',
    description: '¿Apuestas? Tejina es la opción!',
    execute(msg, args) {
        let parts = msg.content.split(' ');
        if (parts.length > 2) {
            let tacos = 0;
            try {
                tacos = parseInt(parts[2]);
                tacos = tacos > 0 ? tacos : 0;
            } catch (error) {
                tacos = 0;
            }

            if (tacos != 0) {
                msg.channel.send(`<@${msg.author.id}> esto pronto funcionará`);
            } else {
                msg.channel.send(`<@${msg.author.id}> porfavor ingresa una cantidad de tacos válida`);
            }
        }
    },
};