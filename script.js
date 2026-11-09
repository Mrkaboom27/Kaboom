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
// I have injected your User ID below:
const DISCORD_USER_ID = "1201125553864970300"; 

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

  // Update the glowing avatar status dot
  statusIndicator.className = "status-indicator " + statusDotClass(data.discord_status);

  // Look for an active game (type 0)
  const gameActivity = activities.find((a) => a.type === 0);

  if (!gameActivity) {
    // Not playing a game
    presenceContainer.innerHTML = `
      <div class="presence-idle">
        <span class="discord-status-dot ${statusDotClass(data.discord_status)}"></span>
        <strong>${discordUser.username}</strong> is online, not gaming.
      </div>
    `;
    return;
  }

  // Extract game art
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
  presenceContainer.innerHTML = `
    <div class="presence-idle" style="color: #f04747;">
      <i class="fa-solid fa-triangle-exclamation"></i> Failed to connect to Discord.
    </div>
  `;
}

async function fetchPresence() {
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

// Run immediately, then update every 30 seconds
fetchPresence();
setInterval(fetchPresence, 30000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) fetchPresence();
});
