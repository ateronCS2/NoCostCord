const { Client, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { keepAlive } = require('./keepAlive');

// Chargement du .env
dotenv.config({ path: path.join(__dirname, 'cfg/.env') });

// Intents (équivalent à discord.Intents.default() + members + message_content)
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Collection pour stocker les commandes (équivalent aux cogs)
client.commands = new Collection();

// Chargement des cogs (commandes)
async function loadCogs() {
  const cogsPath = path.join(__dirname, 'cogs');
  const cogFiles = fs.readdirSync(cogsPath).filter(f => f.endsWith('.js'));

  for (const file of cogFiles) {
    const cog = require(path.join(cogsPath, file));
    // Chaque cog exporte { name, execute } ou un objet de commandes
    if (cog.name) {
      client.commands.set(cog.name, cog);
    }
  }
}

// Événement on_ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag} (ID: ${client.user.id})`);
  console.log('Bot Launched!');
});

// Lancement
async function main() {
  await loadCogs();
  keepAlive();
  await client.login(process.env.DISCORD_TOKEN);
}

main();
