const {Client} = require('discord.js');
const tokens = Array.from(require("./accounts").tokens);

let selectedBot = 0;
//                     accounts[1].channels.get("681189296702881933").send(++currentCount)

const accounts = tokens.map(token => {
    let client = new Client();
    client.login(token);
    return client;
});

accounts[0].on("message", msg => {
    if (msg.content.match(/^\d+$/) && msg.channel.id === "681189296702881933") {
        accounts[selectedBot].channels.get("681189296702881933").send((parseInt(msg.content) + 1).toString());
        if (selectedBot + 1 === accounts.length) {
            selectedBot = 0;
        } else {
            ++selectedBot;
        }
    }
});