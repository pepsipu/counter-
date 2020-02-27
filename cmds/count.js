let selectedBot = 0;

module.exports.fn = (msg, args, accounts, queue) => {
    if (msg.content.includes("stop")) {
        let index = queue.messageQueue.findIndex(event => event.name === "countLoop");
        if (index !== -1) queue.messageQueue.splice(index);
    } else {
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
            constraint:
                newMsg => newMsg.content.match(/^\d+$/) && msg.channel.id === newMsg.channel.id
        })
    }

};

module.exports.name = "count";
module.exports.firingConstraint = msg => msg.content.includes("count") || msg.content.includes("counting");