import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

/**
Polyfill for slash command.
**/
export interface NaisuCommand {
  data: SlashCommandBuilder,
  execute(interaction: CommandInteraction): any
}