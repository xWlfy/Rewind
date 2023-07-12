const { ActivityType } = require("discord.js");

module.exports = (client) => {
  console.log("'Rewind' is online!");
  console.log(`Logged in as ${client.user.tag}!`);

  // Activity
  client.user.setActivity({
    name: "/help",
    type: ActivityType.Playing,
  });
};
