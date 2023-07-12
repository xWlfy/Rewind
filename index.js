const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const eventhandler = require("./app/handlers/eventhandler");
require("dotenv/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

eventhandler(client);

client.login(process.env.TOKEN);
