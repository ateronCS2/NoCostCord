// Exemple
const { Events } = require('discord.js');

module.exports = {
  name: 'example',

  register(client) {
    client.on(Events.MessageCreate, async (message) => {
      if (message.author.bot) return;

      if (message.content === '&ping') {
        await message.reply('Pong!');
      }
    });
  },
};
