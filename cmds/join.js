const axios = require("axios");

module.exports.fn = (msg, args, accounts, queue) => {
    let code = args[args.indexOf("join") + 1];
    accounts.forEach(account => {
        axios.post(`https://discordapp.com/api/v6/invites/${code}`, {}, {
            headers: {
                authorization: account.token
            }
        }).then()
    });
};

module.exports.name = "join";
module.exports.firingConstraint = (msg, args) => args.includes("join");
