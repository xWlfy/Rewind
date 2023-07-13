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

    const guild = interaction.guild;
    const channels = guild.channels.cache.filter(
      (channel) => channel.type !== "GUILD_CATEGORY"
    );

    let isServerLocked = false;

    channels.forEach((channel) => {
      if (
        channel.permissionOverwrites.cache.has(guild.id) &&
        channel.permissionOverwrites.cache
          .get(guild.id)
          .deny.has(PermissionFlagsBits.SendMessages)
      ) {
        // Channel is already locked, unlock it
        try {
          channel.permissionOverwrites.delete(guild.id);
        } catch (e) {
          console.log(e);
        }

        isServerLocked = true;
      } else {
        // Channel is not locked, lock it
        try {
          channel.permissionOverwrites.create(guild.id, {
            SendMessages: false,
            AddReactions: false,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });

    if (isServerLocked) {
      interaction.reply({
        content: "Done | Server Unlocked.",
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: "Done | Server Locked Down.",
        ephemeral: true,
      });
    }
  },

  name: "lockdown",
  description:
    "lockdown or unlock the server by locking or unlocking every channel",
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
