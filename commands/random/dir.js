module.exports = {
    name: 'dir',
    description: 'Di algo y borro el mensaje!',
    execute(msg, args) {
        let preMsg = msg.content.split('dir');
        if (preMsg.length > 1){
            let msgToSay = preMsg[1];
            msg.channel.send(msgToSay);
            msg.delete()
                .then(msg => console.log(`Deleted message "${msgToSay}" from ${msg.author.username}`))
                .catch(console.error);
        }
    },
};