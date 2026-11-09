# @Kaboom Dashboard

A cozy personal dashboard with live Discord Rich Presence, PC specs, and social links.

## Setup (5 minutes)

### 1. Get your Discord User ID
1. Open Discord → Settings → **Advanced** → enable **Developer Mode**.
2. Right-click your own profile → **Copy User ID**.
3. Paste it into `script.js` where it says `YOUR_DISCORD_ID`.

### 2. Join the Lanyard Discord server
Lanyard is the free service that exposes your Discord presence as a public API.
**You must join this server for it to work:**
https://discord.gg/UrXF2cfJ7F

That's it — no API keys, no bot tokens, no server code.

### 3. Update your socials
In `index.html`, replace the Discord link:
`https://discord.com/users/YOUR_DISCORD_ID_HERE` → your actual Discord User ID.
(Yes, same ID you copied above.)

The GitHub link is already set to `https://github.com/Mrkaboom27`.

### 4. Preview locally
Just open `index.html` in your browser — it's plain HTML/CSS/JS.
Or use a tiny local server:
```bash
npx serve .