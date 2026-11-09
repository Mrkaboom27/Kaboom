// ============================================================
// 1. THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

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
// REQUIRED: Paste your Discord User ID below.
const DISCORD_USER_ID = "YOUR_DISCORD_ID"; // <-- PASTE YOUR ID HERE

const presenceContainer = document.getElementById("presence-content");
const statusIndicator = document.getElementById("discord-status-indicator");

function statusDotClass(status) {
  if (status === "online") return "online";
  if (status === "idle") return "idle";
  if (status === "dnd") return "dnd";
  return "";
}

function renderPresence(data) {
  const discordUser = data.discord_user;
  const activities = data.activities || [];

  // Update the avatar status dot
  statusIndicator.className = "status-indicator " + statusDotClass(data.discord_status);

  const gameActivity = activities.find((a) => a.type === 0);

  if (!gameActivity) {
    presenceContainer.innerHTML = `
      <p class="placeholder-text">
        Not playing anything right now.
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
      </div>
    </div>
  `;
}

function renderError() {
  presenceContainer.innerHTML = `<p class="placeholder-text">Could not load Discord presence.</p>`;
}

async function fetchPresence() {
  if (DISCORD_USER_ID === 1201125553864970300) {
    presenceContainer.innerHTML = `<p class="placeholder-text">Add your Discord ID to script.js</p>`;
    return;
  }

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    if (!res.ok) throw new Error("Lanyard request failed");
    const json = await res.json();

    if (json.success && json.data) {
      renderPresence(json.data);
    } else {
      renderError();
    }
  } catch (err) {
    renderError();
  }
}

fetchPresence();
setInterval(fetchPresence, 30000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) fetchPresence();
});
