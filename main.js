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
            if (event.condition(msg)) {
                event.fn(msg);
                console.log(`fired message event ${event.name}.`)
            }
        });
        if (msg.content.startsWith(config.summon)) {
            const args = msg.content.split(" ");
            const userCommand = args[0].slice(config.summon.length);
            const selectCommand = commands.find(command => command.name === userCommand);
            if (selectCommand) {
                console.log(`${msg.author.username}#${msg.author.discriminator} invoked ${selectCommand.name}`);
                selectCommand.fn(msg, accounts, queues);
            }
        }
    } catch (e) {
        console.error(e);
    }

});