module.exports = {
    name: 'di',
    description: 'Di algo!',
    execute(msg, args) {
        let preMsg = msg.content.split('di');
        if (preMsg.length > 1){
            let msgToSay = preMsg[1];
            msg.channel.send(msgToSay);
        }
    },
};
  