
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once(Events.ClientReady, async () => {
  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const channel = await guild.channels.fetch(process.env.VOICE_CHANNEL_ID);

    if (!channel || !channel.isVoiceBased()) {
      throw new Error('Canal de voz inválido.');
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: true
    });

    console.log('Bot conectado à call!');
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.DISCORD_TOKEN);
