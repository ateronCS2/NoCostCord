# NoCostCord

A Discord bot framework built on **Node.js** allowing you to host your own bot for 0$... without billing information!

Tired of spending hours searching for a free VPS, setting up a database, and keeping your bot alive? NoCostCord bundles everything together — hosting, persistent storage, and 24/7 uptime — all using free services. A Discord bot framework built on **discord.js**, with a clean module-based architecture. Just clone, configure, and deploy.

>! This framework is specifically coded for the services allowing you to deploy your bot for free therefore using it with different hosting services wont work !

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![discord.js](https://img.shields.io/badge/discord.js-14.0+-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Cost](https://img.shields.io/badge/Cost-Free-brightgreen)
![Type](https://img.shields.io/badge/Type-Framework-orange)
![Stars](https://img.shields.io/github/stars/ateronCS2/NoCostCord?style=social)

<p align="center">
  <img src="https://github.com/user-attachments/assets/a612011b-7b2a-46fe-9859-b2f669fc5632" width="600">
</p>

---

## 📦 Stack

| Service | Purpose | Cost |
|---|---|---|
| [Render](https://render.com) | Hosting | Free |
| [UptimeRobot](https://uptimerobot.com) | Keep-alive pinging | Free |
| [Supabase](https://supabase.com) | Persistent database | Free |
| [discord.js](https://discord.js.org) | Bot framework | Free |

---

## 📁 File Structure

```
NoCostCord/
├── index.js              # Bot entry point
├── keepAlive.js          # HTTP keep-alive server
├── package.json          # Node.js dependencies
├── render.yaml           # Render deployment configuration
├── cogs/
│   └── example.js        # Example module
├── lib/
│   ├── db.js             # Database initialization
│   ├── loader.js         # Command loader
│   └── messageHandler.js # Message handling
└── cfg/
    └── .env              # Environment variables
```

---

## ⚙️ Prerequisites

- Node.js 18+
- A [Discord bot token](https://discord.com/developers/applications)
- A [Render](https://render.com) account
- A [Supabase](https://supabase.com) account *(optional, only if you need persistent storage)*
- A [UptimeRobot](https://uptimerobot.com) account

---

## 🚀 Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/NoCostCord.git
cd NoCostCord
```

### 2. Create your own repository

**Option A — Fork (recommended):**
Click the **Fork** button on the GitHub repository page to create your own copy instantly.

**Option B — Clone and push to a new repo:**
1. Create a new repository on GitHub
2. Clone NoCostCord locally:
```bash
git clone https://github.com/ateronCS2/NoCostCord.git
cd NoCostCord
```
3. Point it to your new repo:
```bash
git remote set-url origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 3. Install dependencies
```bash
npm install
```

### 4. Configure environment variables to run locally
Create and add to `cfg/.env`:
```
DISCORD_TOKEN=your_bot_token_here
SUPABASE_URL=your_supabase_url_here      # optional
SUPABASE_KEY=your_supabase_key_here      # optional
```

### 5. Run locally, for testing
```bash
node index.js
```

---

## 🧩 Adding Cogs (Modules)

Create a new file in the `cogs/` folder:

```js
import { Events } from 'discord.js';

export const name = 'myCog';

export function register(client) {
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    if (message.content === `${client.getPrefix(message.guildId)}hello`) {
      await message.reply('Hello!');
    }
  });
}
```

Then load it in `index.js` — it will be picked up automatically by the `loadCommands` loader if placed in the `cogs/` folder.

---

## ☁️ Deploying on Render

1. Push your code to GitHub
2. Go to [Render](https://render.com) and create a **Web Service**
3. Connect your GitHub repository — build and start commands are automatically configured via `render.yaml`. If Render still asks for them manually, use:
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. Add your environment variables under **Environment**
5. Click **Deploy**

---

## ⏰ Keeping Your Bot Alive

Render's free tier spins down after inactivity. To prevent this:

1. Go to [UptimeRobot](https://uptimerobot.com) and create a free account
2. Add a new **HTTP(s)** monitor
3. Set the URL to your Render service URL
4. Set the interval to **5 minutes**

**After that your bot will run 24/7 no upkeep needed, you can enable/disable auto deploy on render and it will automatically deploy your repos latest commit**

---

## 🗄️ Using Supabase

Import the database utility in any module:

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Fetch data
const { data } = await supabase.from('your_table').select('*');

// Insert data
await supabase.from('your_table').insert({ key: 'value' });
```

---

## 🔧 Troubleshooting

**Bot isn't responding to commands**
- Make sure `GatewayIntentBits.MessageContent` is included in your client intents in `index.js`
- Verify your bot has the correct permissions in your Discord server
- Check that your command prefix matches what is set in your database or default config

**Environment variables returning `undefined`**
- Make sure your `.env` file is in the `cfg/` folder when running locally
- Check that the file was saved with UTF-8 encoding and no BOM — use VS Code or create it via terminal rather than Notepad
- On Render, make sure variables are set in the **Environment** tab of your service

**Bot goes offline after a few minutes**
- Make sure UptimeRobot is set up and pinging your Render URL every 5 minutes
- Verify your Render service is a **Web Service** and not a background worker

**Render deployment failing**
- Check that `package.json` is at the **root** of your repository
- Make sure `"type": "module"` is set in `package.json` if you use ESM `import/export` syntax
- Verify `render.yaml` is in the root of your repository

**Supabase returning `null` or connection errors**
- Verify `SUPABASE_URL` doesn't include `/rest/v1/` at the end — it should be just `https://your-project.supabase.co`
- Make sure `SUPABASE_KEY` is the `anon public` key, not the `service_role` key

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details. Credit is required when using or distributing this framework.

---

## 🙏 Credits

Created by [ateronCS2](https://github.com/ateronCS2)

(yes this README was partly made by AI, the code wasnt!)
