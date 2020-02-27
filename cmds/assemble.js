module.exports.fn = (msg, args, accounts, queue) => {
    accounts.forEach(account => {
        account.channels.get(msg.channel.id).send(`${account.user.username} of the soft drink crusaders, reporting for duty!`)
    })
};

module.exports.name = "assemble";
module.exports.firingConstraint = msg => msg.content.includes("assemble");