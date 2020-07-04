const tacoCommands = require('./../../database/tacoCommands.js');

module.exports = {
    name: 'top',
    description: 'Ver top de tacos!',
    execute(msg, args) {
        tacoCommands.getTopCur(function (cur) {
            if (!cur) {
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
                cur.forEach(field => {
                    let icon = ''
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
                        value: field.tacos
                    });
                    count++;
                });
                msg.channel.send({embed: top});
            }
        });
    },
};