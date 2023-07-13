const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    // Your code logic here
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      return interaction.reply({
        content: "You don't have sufficient permissions! [MANAGE_MESSAGES]",
        ephemeral: true,
      });
    }

    const amount = interaction.options.getInteger("amount");

    if (isNaN(amount)) {
      return interaction.reply({
        content: "**Please supply a valid amount to delete messages!**",
        ephemeral: true,
      });
    }

    if (amount > 100) {
      return interaction.reply({
        content: "**Please supply a number less than 100!**",
        ephemeral: true,
      });
    }

    if (amount < 1) {
      return interaction.reply({
        content: "**Please supply a number more than 1!**",
        ephemeral: true,
      });
    }

    interaction.channel
      .bulkDelete(amount)
      .then((messages) =>
        interaction.reply({
          content: `**Successfully deleted \`${messages.size}/${amount}\` messages**`,
          ephemeral: true,
        })
      )
      .catch(() => null);
  },

  name: "purge",
  description: "purge set amount of messages",
  options: [
    {
      name: "amount",
      description: "How many messages you want to purge?",
      type: ApplicationCommandOptionType.Integer,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
