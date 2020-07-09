require('dotenv').config();

const tacoCommands = require('./../../database/tacoCommands.js');
const userCommands = require('./../../database/userCommands.js');
const utilityCommands = require('./../../database/utilityCommands.js');

const PREFIX = process.env.PREFIX + ' ';

const meguminUrl = {
    sad: 'https://cdn.discordapp.com/attachments/397031754063675402/730817938852151307/c616d9a871ed3cd9fb6a46efb7f92d95.png',
    win: 'https://cdn.discordapp.com/attachments/397031754063675402/730818195317063862/54c8968cfc2af1b994256e7317c99298.png',
}

/*
    rg megumin [tacos]
    rg megumin more
    rg megumin ok
*/

module.exports = {
    name: 'megumin',
    description: '¿Apuestas? ¿Combos? Megumin!',
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

            if (parts[2] == 'ok') {
                utilityCommands.getMegumin(msg.author.id, function (meguminData) {
                    if (meguminData) {
                        utilityCommands.deleteMegumin(msg.author.id, function (status) {
                            if (status) {
                                let winTacos = meguminData.start_bet * meguminData.combo;
                                tacoCommands.getCur(msg.author.id, function (tacoData) {
                                    if (tacoData) {
                                        tacoCommands.updateCur(msg.author.id, tacoData.tacos + winTacos, tacoData.t_tacos + winTacos);
                                        msg.channel.send(`¡¡Se han agregado ${winTacos} tacos :taco: <@${msg.author.id}>...!!`);
                                    } else {
                                        msg.channel.send(`Perdón... ocurrió un error <@${msg.author.id}>...`);
                                    }
                                });
                            } else {
                                msg.channel.send(`Perdón... ocurrió un error <@${msg.author.id}>...`);
                            }
                        });
                    } else {
                        msg.channel.send(`No tienes un combo en proceso, ingresa una cantidad de tacos válida <@${msg.author.id}>`);
                    }
                });
            } else if (parts[2] == 'more') {
                utilityCommands.getMegumin(msg.author.id, function (meguminData) {
                    if (meguminData) {
                        if (Math.random() < 0.5) {
                            let newCombo = meguminData.combo * 2;
                            let winTacos = meguminData.start_bet * newCombo;
                            utilityCommands.updateMegumin(msg.author.id, meguminData.start_bet, newCombo);
                            let megumin = {
                                color: 10038562,
                                title: '¡Ganaste el combo :trophy:!',
                                description: `<@${msg.author.id}>, te reto a continuar el combo con \`${PREFIX}megumin more\`\nO puedes abandonar y reclamar tus tacos :taco: con  \`${PREFIX}megumin ok\``,
                                fields: [
                                    {
                                        name: 'Tacos actual en combo:',
                                        value: `${winTacos} tacos :taco:`
                                    },
                                    {
                                        name: 'Combo actual:',
                                        value: `x${newCombo}`
                                    }
                                ],
                                image: {url: meguminUrl.win},
                                timestamp: new Date(),
                            }
                            msg.channel.send({embed: megumin});
                        } else {
                            utilityCommands.deleteMegumin(msg.author.id, function (status) {
                                if (status) {
                                    let lostTacos = meguminData.start_bet * meguminData.combo;
                                    let megumin = {
                                        color: 10038562,
                                        title: 'Este... Lo siento...',
                                        description: `<@${msg.author.id}>, perdiste el combo`,
                                        fields: [
                                            {
                                                name: 'Tacos perdidos:',
                                                value: `${lostTacos} tacos :taco:`
                                            }
                                        ],
                                        image: {url: meguminUrl.sad},
                                        timestamp: new Date(),
                                    }
        
                                    msg.channel.send({embed: megumin});
                                } else {
                                    msg.channel.send(`Perdón... ocurrió un error <@${msg.author.id}>...`);
                                }
                            });
                        }
                    } else {
                        msg.channel.send(`No tienes un combo en proceso, ingresa una cantidad de tacos válida <@${msg.author.id}>`);
                    }
                });
            } else {
                if (tacos != 0) {
                    utilityCommands.getMegumin(msg.author.id, function (meguminData) {
                        if (meguminData) {
                            msg.channel.send(`Ya tienes un combo en proceso, elige si seguir o no <@${msg.author.id}>`);
                        } else {
                            tacoCommands.getCur(msg.author.id, function (tacoData) {
                                if (tacoData) {
                                    if (tacoData.tacos >= tacos) {
                                        tacoCommands.updateCur(msg.author.id, (tacoData.tacos - tacos), tacoData.t_tacos);
                                        if (Math.random() < 0.5) {
                                            let winTacos = tacos * 2;
                                            utilityCommands.insertMegumin(msg.author.id, tacos, 2);
                                            let megumin = {
                                                color: 10038562,
                                                title: '¡Ganaste el combo :trophy:!',
                                                description: `<@${msg.author.id}>, te reto a continuar el combo con \`${PREFIX}megumin more\`\nO puedes abandonar y reclamar tus tacos :taco: con  \`${PREFIX}megumin ok\``,
                                                fields: [
                                                    {
                                                        name: 'Tacos actual en combo:',
                                                        value: `${winTacos} tacos :taco:`
                                                    },
                                                    {
                                                        name: 'Combo actual:',
                                                        value: `x2`
                                                    }
                                                ],
                                                image: {url: meguminUrl.win},
                                                timestamp: new Date(),
                                            }
                                            msg.channel.send({embed: megumin});
                                        } else {
                                            utilityCommands.deleteMegumin(msg.author.id, function (status) {
                                                if (status) {
                                                    let lostTacos = tacos;
                                                    let megumin = {
                                                        color: 10038562,
                                                        title: 'Este... Lo siento...',
                                                        description: `<@${msg.author.id}>, perdiste el combo`,
                                                        fields: [
                                                            {
                                                                name: 'Tacos perdidos:',
                                                                value: `${lostTacos} tacos :taco:`
                                                            }
                                                        ],
                                                        image: {url: meguminUrl.sad},
                                                        timestamp: new Date(),
                                                    }
                        
                                                    msg.channel.send({embed: megumin});
                                                } else {
                                                    msg.channel.send(`Perdón... ocurrió un error <@${msg.author.id}>...`);
                                                }
                                            });
                                        }
                                    } else {
                                        msg.channel.send(`No cuentas con tacos :taco: suficientes <@${msg.author.id}>...`);
                                    }
                                } else {
                                    userCommands.insertUser(msg.author.id, msg.author.username, 'Novato', 'Hola! Mucho gusto', msg.author.avatarURL);
                                    tacoCommands.insertCur(msg.author.id, 0, 0);
                                    msg.channel.send(`No cuentas con tacos :taco: suficientes <@${msg.author.id}>...`);
                                }
                            });
                        }
                    });
                } else {
                    msg.channel.send(`<@${msg.author.id}> porfavor ingresa una cantidad de tacos válida`);
                }
            }
        } else {
            msg.channel.send(`<@${msg.author.id}> porfavor ingresa una cantidad de tacos válida`);
        }
    },
};