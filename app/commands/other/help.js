const { EmbedBuilder } = require("discord.js");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = {
  name: "help",
  description: "Shows all commands with descriptions.",
  callback: async (client, interaction) => {
    const localCommands = getLocalCommands();

    const commandList = localCommands
      .map((cmd) => `**/${cmd.name}**: ${cmd.description}`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle("Command List")
      .setDescription(commandList)
      .setColor("#262432");

    interaction.reply({ embeds: [embed] });
  },
};
