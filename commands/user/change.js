const userCommands = require('./../../database/userCommands.js');

module.exports = {
    name: 'change',
    description: 'Cambiar cosas del usuario!',
    execute(msg, args) {
        let parts = msg.content.split(' ');
        if (parts.length > 3) {
            let thingToChange = parts[2];
            let valueToChange = parts.slice(3,parts.length).join(" ");
            switch (thingToChange) {
                case 'name':
                    userCommands.updateName(msg.author.id, valueToChange);
                    msg.channel.send(`Ahora te llamas \`${valueToChange}\` <@${msg.author.id}>`);
                    msg.delete();
                    break;
                case 'description':
                    userCommands.updateDescription(msg.author.id, valueToChange);
                    msg.channel.send(`Tu descripción fue actualizada <@${msg.author.id}>`);
                    msg.delete();
                    break;
                case 'image':
                    userCommands.updateImage(msg.author.id, valueToChange);
                    msg.channel.send(`¡Listo <@${msg.author.id}>! Tu nueva imagen de perfil está lista :smile:`);
                    msg.delete();
                    break;
            }
        }
    },
};