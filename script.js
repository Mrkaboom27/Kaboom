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
// 2. TYPEWRITER EFFECT
// ============================================================
const typewriterText = "I Make Everything With AI :))";
const typewriterElement = document.getElementById("typewriter");
let i = 0;

function typeWriter() {
  if (i < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, 70); // Speed of typing
  }
}
// Start typing after a short delay
setTimeout(typeWriter, 500);

// ============================================================
// 3. TABS LOGIC
// ============================================================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    // Show corresponding content
    const targetId = btn.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
  });
});

// ============================================================
// 4. SPOTLIGHT MOUSE TRACKING
// ============================================================
const card = document.getElementById("spotlight-card");
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
});

// ============================================================
// 5. LIVE CLOCK
// ============================================================
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  document.getElementById("live-clock").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// ============================================================
// 6. DISCORD PRESENCE (Lanyard API - Handles Games & Spotify)
// ============================================================
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

  // Update status dot
  statusIndicator.className = "status-dot " + statusDotClass(data.discord_status);

  // Check for Spotify FIRST
  if (data.listening_to_spotify && data.spotify) {
    const track = data.spotify.track_name;
    const artist = data.spotify.artist;
    const albumArt = data.spotify.album_art_url;

    presenceContainer.className = "presence-box spotify-status";
    presenceContainer.innerHTML = `
      <div class="game-status">
        <img class="game-img" src="${albumArt}" alt="Album Art">
        <div class="game-text">
          <h4>Listening to Spotify</h4>
          <p>${track} • ${artist}</p>
        </div>
      </div>
    `;
    return;
  }

  // Then check for Games
  const gameActivity = activities.find((a) => a.type === 0);
  const customStatus = activities.find((a) => a.type === 4);

  if (!gameActivity) {
    presenceContainer.className = "presence-box";
    let statusText = "";
    if (customStatus && customStatus.state) {
      statusText = `<div class="game-text"><h4>${discordUser.username}</h4><p class="custom-status">"${customStatus.state}"</p></div>`;
    } else {
      statusText = `<div class="game-text"><h4>${discordUser.username}</h4><p>Not playing a game</p></div>`;
    }
    presenceContainer.innerHTML = `<div class="game-status">${statusText}</div>`;
    return;
  }

  // If playing a game
  let artUrl = "";
  if (gameActivity.assets?.large_image) {
    const img = gameActivity.assets.large_image;
    if (img.startsWith("mp:external/")) {
      artUrl = `https://media.discordapp.net/external/${img.replace("mp:external/", "")}`;
    } else {
      artUrl = `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${img}.png`;
    }
  }

  const gameName = gameActivity.name || "Unknown Game";
  const details = gameActivity.details || "";

  presenceContainer.className = "presence-box";
  presenceContainer.innerHTML = `
    <div class="game-status">
      ${artUrl ? `<img class="game-img" src="${artUrl}" alt="${gameName}" onerror="this.style.display='none'">` : ""}
      <div class="game-text">
        <h4>${gameName}</h4>
        ${details ? `<p>${details}</p>` : ""}
      </div>
    </div>
  `;
}

function renderError() {
  presenceContainer.innerHTML = `<div class="game-text" style="text-align:center; color: #f23f43; font-size: 0.85rem;">Connection failed. Check Lanyard.</div>`;
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

fetchPresence();
setInterval(fetchPresence, 15000); // Refresh every 15s for faster Spotify updates
