import { Events, REST, Routes } from "discord.js";
import { naisu } from "./src/client";
import { NaisuClient } from "./src/client"

naisu.client.login(naisu.config['token'])

naisu.client.once(Events.ClientReady, async (callback) => {
  const rest = new REST().setToken(naisu.config['token'])
  try {
    console.log("Refreshing slash commands.");

    var commands = naisu.client.commands.map(cmd => cmd.data.toJSON())

    const data = await rest.put(
      Routes.applicationCommands(naisu.config['clientId']),
      { body: commands }
    );
  } catch (e) {
    console.error(e)
  }

  console.log("Naisu is ready.");
})

naisu.client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) { return; }

  const handler = (interaction.client as NaisuClient).commands?.get(interaction.commandName);
  if (!handler) { console.error("No handler found for this command."); }

  try {
    await handler?.execute(interaction);
  } catch (error) {
    console.error(error);
  }
})