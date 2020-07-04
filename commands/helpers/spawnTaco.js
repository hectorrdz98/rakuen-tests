const tacoCommands = require('./../../database/tacoCommands.js');

module.exports = {
    name: 'spawnTaco',
    description: 'Enable spawn tacos!',
    execute(msg, args) {
        tacoCommands.getSpawnableChannelsGuilds(msg.guild.id, msg.channel.id, function (status) {
            if (status) {
                tacoCommands.deleteSpawnableChannelsGuilds(msg.guild.id, msg.channel.id, function (newStatus) {
                    if (newStatus)
                        msg.channel.send(`Se ha deshabilitado el spawneo de tacos :taco: en este canal`);
                });
            } else {
                tacoCommands.insertSpawnableChannelsGuilds(msg.guild.id, msg.channel.id);
                msg.channel.send(`¡Se ha habilitado el spawneo de tacos :taco: en este canal!`);
            }
            msg.delete();
        });
    },
};