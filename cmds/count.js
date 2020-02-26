let selectedBot = 0;

module.exports.fn = (msg, accounts, queue) => {
    queue.messageQueue.push({
        name: "countLoop",
        fn: newMsg => {
            accounts[selectedBot].channels.get(msg.channel.id).send((parseInt(newMsg.content) + 1).toString());
            if (selectedBot + 1 === accounts.length) {
                selectedBot = 0;
            } else {
                ++selectedBot;
            }
        },
        condition:
            newMsg => newMsg.content.match(/^\d+$/) && msg.channel.id === newMsg.channel.id
    })
};

module.exports.name = "count";