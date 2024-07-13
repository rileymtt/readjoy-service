import appConfig from "config/app.config";
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  TextChannel,
} from "discord.js";
import winstonLogger from "loggers/winston.logger";

const footer = {
  text: process.env.DISCORD_BOT_NAME || "Unknown",
  iconURL: process.env.DISCORD_BOT_AVATAR || "",
};

const channelId = process.env.DISCORD_CHANNEL_ID
  ? process.env.DISCORD_CHANNEL_ID
  : "1131466248555868222";

const key = process.env.DISCORD_KEY;

export const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildWebhooks,
  ],
  partials: [Partials.Channel],
});

client.on("ready", async () => {
  if (appConfig.EnvironmentConfig.env !== "Local") {
    DiscordBot.sendInfo(
      "Server is running",
      null,
      appConfig.EnvironmentConfig.service,
      appConfig.EnvironmentConfig.env
    );
  }
  winstonLogger.info({
    label: "Discord",
    message: `Logged in as ${client?.user?.tag}!`,
  });
});

export class DiscordBotClass {
  login = () => {
    client
      .login(key)
      .catch((error) =>
        winstonLogger.error({ label: "Discord", message: error })
      );
  };
  sendError = async (
    message: string,
    service: string,
    env?: string,
    ip?: string,
    host?: string
  ) => {
    try {
      const channel = (await client.channels.fetch(channelId)) as TextChannel;

      const exampleEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(message)
        .addFields(
          { name: "\u200B", value: "\u200B" },
          {
            name: "Service",
            value: service ? service : "Unset",
            inline: true,
          },
          {
            name: "Env",
            value: env ? env : "Unset",
            inline: true,
          },
          {
            name: "IP",
            value: ip ? ip : "Unknown",
            inline: true,
          },
          {
            name: "User Agent",
            value: host ? host : "Unknown",
          },
          { name: "\u200B", value: "\u200B" }
        )
        .setTimestamp()
        .setFooter(footer);

      channel.send({
        embeds: [exampleEmbed],
      });
    } catch (error) {
      winstonLogger.error({ label: "Discord", message: error });
    }
  };
  sendInfo = async (
    title: string,
    content: string | null,
    service: string,
    env?: string
  ) => {
    try {
      const channel = (await client.channels.fetch(channelId)) as TextChannel;
      const exampleEmbed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(title)
        .setDescription(content)
        .addFields(
          { name: "\u200B", value: "\u200B" },
          {
            name: "Service",
            value: service ? service : "Unset",
            inline: true,
          },
          {
            name: "Env",
            value: env ? env : "Unset",
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter(footer);

      channel.send({
        embeds: [exampleEmbed],
      });
    } catch (error) {
      console.log(error);
      winstonLogger.error({ label: "Discord", message: error });
    }
  };
  sendMessage = async (message: string) => {
    try {
      const channel = (await client.channels.fetch(channelId)) as TextChannel;
      channel?.send({
        content: `[${appConfig.EnvironmentConfig.service}][${appConfig.EnvironmentConfig.env}] ${message}`,
      });
    } catch (error) {
      winstonLogger.error({ label: "Discord", message: error });
    }
  };
  sendText = async (message: string) => {
    try {
      const channel = (await client.channels.fetch(channelId)) as TextChannel;
      channel?.send({ content: `${message}` });
    } catch (error) {
      winstonLogger.error({ label: "Discord", message: error });
    }
  };
  serviceHealthMonitor = async (params: {
    message: string;
    channelId: string;
    title: string;
    fields: any[];
  }) => {
    try {
      const channel = (await client.channels.fetch(
        params.channelId
      )) as TextChannel;
      const exampleEmbed = new EmbedBuilder()
        .setColor("#05f9f9")
        .setTitle(params.title)
        .setThumbnail(
          "https://i.pinimg.com/564x/62/b7/ce/62b7ce2b4a8c9992f730efce5fda3d61.jpg"
        )
        .setAuthor({
          name: "DOG_001",
          iconURL:
            "https://i.pinimg.com/564x/62/b7/ce/62b7ce2b4a8c9992f730efce5fda3d61.jpg",
        })
        .addFields(params.fields)
        .setDescription(params.message)
        .setTimestamp();

      channel.send({
        embeds: [exampleEmbed],
      });
    } catch (error) {
      console.log(error);
      winstonLogger.error({ label: "Discord", message: error });
    }
  };
}
