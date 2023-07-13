const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  Permissions,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    // Your code logic here
    const lockPermErr = new EmbedBuilder()
      .setTitle("Permission too low to use.")
      .setDescription("You don't have permissions to use this.");

    if (
      !interaction.channel
        .permissionsFor(interaction.member)
        .has(PermissionFlagsBits.Administrator)
    ) {
      return interaction.reply({
        embeds: [lockPermErr],
        ephemeral: true,
      });
    }

    const channel = interaction.channel;

    if (
      channel.permissionOverwrites.cache.has(interaction.guild.id) &&
      channel.permissionOverwrites.cache
        .get(interaction.guild.id)
        .deny.has(PermissionFlagsBits.SendMessages)
    ) {
      // Channel is already locked, so unlock it
      try {
        channel.permissionOverwrites.delete(interaction.guild.id);
      } catch (e) {
        console.log(e);
      }

      interaction.reply({
        content: "Done | Channel Unlocked.",
        ephemeral: true,
      });
    } else {
      // Channel is not locked, so lock it
      try {
        channel.permissionOverwrites.create(interaction.guild.id, {
          SendMessages: false,
          AddReactions: false,
        });
      } catch (e) {
        console.log(e);
      }

      interaction.reply({
        content: "Done | Channel Locked.",
        ephemeral: true,
      });
    }
  },

  name: "lock",
  description: "lock or unlock channel",
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
