// ============================================================
// 1. THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Load saved theme, or fall back to system preference
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
} else {
  html.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ============================================================
// 2. DISCORD PRESENCE (Lanyard API)
// ============================================================
//
// REQUIRED SETUP:
//   1. Join the Lanyard Discord server: https://discord.gg/UrXF2cfJ7F
//   2. Paste your Discord User ID below (replace YOUR_DISCORD_ID).
//
// To find your Discord User ID:
//   Discord Settings → Advanced → enable Developer Mode
//   → right-click your profile → "Copy User ID"
//
const DISCORD_USER_ID = 1201125553864970300; // <-- PASTE YOUR ID HERE

const presenceContainer = document.getElementById("presence-content");

function statusDotClass(status) {
  if (status === "online") return "online";
  if (status === "idle") return "idle";
  if (status === "dnd") return "dnd";
  return ""; // offline / invisible
}

function renderPresence(data) {
  const discordUser = data.discord_user;
  const activities = data.activities || [];

  // Find the first activity with type === 0 (Playing a game)
  const gameActivity = activities.find((a) => a.type === 0);

  if (!gameActivity) {
    presenceContainer.innerHTML = `
      <p class="placeholder-text">
        <span class="discord-status-dot ${statusDotClass(data.discord_status)}"></span>
        <strong>${discordUser.username}</strong> is online but not playing a game right now.
      </p>
    `;
    return;
  }

  let artUrl = "";
  if (gameActivity.assets?.large_image) {
    const img = gameActivity.assets.large_image;
    if (img.startsWith("mp:external/")) {
      artUrl = `https://media.discordapp.net/external/${img.replace("mp:external/", "")}`;
    } else if (img.startsWith("spotify:")) {
      artUrl = `https://i.scdn.co/image/${img.replace("spotify:", "")}`;
    } else {
      artUrl = `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${img}.png`;
    }
  }

  const gameName = gameActivity.name || "Unknown Game";
  const details = gameActivity.details || "";
  const state = gameActivity.state || "";

  presenceContainer.innerHTML = `
    <div class="now-playing-active">
      ${
        artUrl
          ? `<img class="game-art" src="${artUrl}" alt="${gameName}" onerror="this.style.display='none'" />`
          : ""
      }
      <div class="game-info">
        <h3>${gameName}</h3>
        ${details ? `<p class="game-details">${details}</p>` : ""}
        ${state ? `<p class="game-state">${state}</p>` : ""}
      </div>
    </div>
  `;
}

function renderError() {
  presenceContainer.innerHTML = `
    <p class="placeholder-text">
      Could not load Discord presence. Make sure you're in the
      <a href="https://discord.gg/UrXF2cfJ7F" target="_blank" rel="noopener" style="color: var(--accent);">
        Lanyard Discord server
      </a>
      and your User ID is correct.
    </p>
  `;
}

async function fetchPresence() {
  if (DISCORD_USER_ID === "YOUR_DISCORD_ID") {
    presenceContainer.innerHTML =
      '<p class="placeholder-text">⚙️ Add your Discord User ID in <code>script.js</code> to enable live presence.</p>';
    return;
  }

  try {
    const res = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
    );
    if (!res.ok) throw new Error("Lanyard request failed");
    const json = await res.json();

    if (json.success && json.data) {
      renderPresence(json.data);
    } else {
      renderError();
    }
  } catch (err) {
    console.error("Lanyard fetch error:", err);
    renderError();
  }
}

fetchPresence();
setInterval(fetchPresence, 30000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) fetchPresence();
});
