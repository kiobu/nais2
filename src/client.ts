import * as path from 'path';
import * as fs from 'fs';
import { Client, GatewayIntentBits, Collection, ClientOptions } from "discord.js";
import { NaisuCommand } from "./models";

import * as config from '../config.json'

/**
Extension of discord.js `Client` class to allow for extra context in interactions.
**/
export class NaisuClient extends Client {
  commands: Collection<string, NaisuCommand>

  constructor(options: ClientOptions, commands: Collection<string, NaisuCommand>) {
    super(options)
    this.commands = commands;
  }
}

/**
Application class for Naisu bot.
**/
export class Naisu {
  readonly config: Record<string, any>;
  readonly client: NaisuClient;

  constructor() {
    this.client = new NaisuClient({ 
      intents: [GatewayIntentBits.Guilds]
    }, new Collection())
    this.config = config as Record<string, any>;
    this.load_cmds();
  }

  async load_cmds(): Promise<void> {
    const cmdsPath = path.join(__dirname, 'cmds');
    const cmdFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith('.ts'))

    for (const file of cmdFiles) {
      const cmdPath = path.join(cmdsPath, file);
      try {
        const cmd: NaisuCommand = (await import(cmdPath)).default as NaisuCommand;
        this.client.commands.set(cmd.data.name, cmd)
        console.log(`Loaded ${cmd.data.name}.`)
      } catch (e) {
        console.log(`Fail: ${e}`)
      }
    }
    console.log("Done")
  }
}

export const naisu = new Naisu();