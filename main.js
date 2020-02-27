const {Client} = require('discord.js');
const fs = require("fs");
const axios = require("axios");

const tokens = Array.from(require("./accounts").tokens);
const config = require("./config");

let queues = {
    messageQueue: [],
    loopQueue: []
};

const accounts = tokens.map(token => {
    let client = new Client();
    client.login(token).then(r => {
        console.log(`${client.user.username} is ready`);
    });
    return client;
});

const commands = fs.readdirSync("./cmds").map(command => require(`./cmds/${command}`));

accounts[0].on("message", msg => {
    try {
        queues.messageQueue.forEach(event => {
            if (event.constraint(msg)) {
                event.fn(msg);
            }
        });
        if (msg.content.startsWith(config.summon) && msg.author.id === config.master) {
            const args = msg.content.slice(config.summon.length).split(" ");
            const selectCommand = commands.find(command => command.firingConstraint(msg, args));
            if (selectCommand) {
                console.log(`${msg.author.username}#${msg.author.discriminator} invoked ${selectCommand.name}`);
                selectCommand.fn(msg, args, accounts, queues);
            }
        }
    } catch (e) {
        console.error(e);
    }

});