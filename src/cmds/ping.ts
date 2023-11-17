import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
import { NaisuCommand } from '../models'

/**
Pings the bot.
**/
export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Pings bot."),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("Pong.")
  }
} as NaisuCommand