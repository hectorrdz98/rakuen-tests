const tacoCommands = require('./../../database/tacoCommands.js');
const userCommands = require('./../../database/userCommands.js');

const tejinaUrl = {
    sad: 'https://cdn.discordapp.com/attachments/397031754063675402/728919909345525831/tejinasad.png',
    neutral: 'https://cdn.discordapp.com/attachments/397031754063675402/728919292640493608/98817c9a18a0637efbfe5154f51d792d5f450ad4_00.png',
    win: 'https://cdn.discordapp.com/attachments/397031754063675402/728920470602383360/win.png',
    bigwin: 'https://cdn.discordapp.com/attachments/397031754063675402/728920287436865606/bigwin.png'
}
let multi = [
    0, 0.1, 0.2, 0.5, 0.6, 0.7, 0.9, 1, 1.2, 1.3, 1.5, 2, 2.5
];

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
                tacoCommands.getCur(msg.author.id, function (data) {
                    if (data) {
                        if (data.tacos >= tacos) {
                            let randomMultiList = multi.sort(() => .5 - Math.random()).slice(0,6).sort();
                            let randomMulti = randomMultiList[Math.floor(Math.random() * randomMultiList.length)];

                            let winTacos = tacos * randomMulti;
                            let totalTacos = (data.tacos - tacos) + winTacos;

                            let imageToUse = tejinaUrl.bigwin;
                            if (randomMulti <= 0.5)
                                imageToUse = tejinaUrl.sad;
                            else if (randomMulti <= 1.2)
                                imageToUse = tejinaUrl.neutral;
                            else if (randomMulti <= 1.9)
                                imageToUse = tejinaUrl.win;

                            tacoCommands.updateCur(msg.author.id, totalTacos, data.t_tacos);

                            let tejina = {
                                color: 12370112,
                                title: '¡Yo Tejina te bendeciré con :taco:! Quizá...',
                                description: `<@${msg.author.id}>, estos fueron los multiplicadores que te pudieron salir:`,
                                fields: [
                                    {
                                        name: 'Multiplicadores:',
                                        value: `:tophat: ${randomMultiList[0]}   :tophat: ${randomMultiList[1]}   :tophat: ${randomMultiList[2]}\n:tophat: ${randomMultiList[3]}   :tophat: ${randomMultiList[4]}   :tophat: ${randomMultiList[5]}`
                                    },
                                    {
                                        name: `Tu resultado fue: \`${randomMulti}\``,
                                        value: `Apostaste ${tacos} :taco: y ganaste ${winTacos} :taco:`
                                    },
                                ],
                                image: {url: imageToUse},
                                timestamp: new Date(),
                            }

                            msg.channel.send({embed: tejina});
                        } else {
                            msg.channel.send(`No cuentas con tacos :taco: suficientes <@${msg.author.id}>...`);
                        }
                    } else {
                        userCommands.insertUser(msg.author.id, msg.author.username, 'Novato', 'Hola! Mucho gusto', msg.author.avatarURL);
                        tacoCommands.insertCur(msg.author.id, 0, 0);
                        msg.channel.send(`No cuentas con tacos :taco: suficientes <@${msg.author.id}>...`);
                    }
                    
                });
            } else {
                msg.channel.send(`<@${msg.author.id}> porfavor ingresa una cantidad de tacos válida`);
            }
        }
    },
};