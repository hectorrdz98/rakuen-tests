const tacoCommands = require('./../../database/tacoCommands.js');

module.exports = {
    name: 'top',
    description: 'Ver top de tacos!',
    execute(msg, args) {
        tacoCommands.getTopCur(function (data) {
            if (!data) {
                msg.channel.send(`¡Lo siento, no hay top aún!`);
            } else {
                let top = {
                    color: 16580705,
                    title: "¡Top de tacos :taco:!",
                    description: "Aquí están los más ricos de los ricos :taco: :taco:~",
                    fields: [],
                    timestamp: new Date(),
                }
                let count = 1;
                data.forEach(field => {
                    let icon = '';
                    let tacosRounded = Math.round(field.tacos * 10) / 10;
                    switch (count) {
                        case 1:
                            icon = ':crown: ';
                            break;
                        case 2:
                            icon = ':second_place: ';
                            break;
                        case 3:
                            icon = ':third_place: ';
                            break;
                        default:
                            break;
                    }
                    top.fields.push({
                        name: icon + count + '.- ' + field.username,
                        value: tacosRounded.toString()
                    });
                    count++;
                });
                msg.channel.send({embed: top});
            }
        });
    },
};