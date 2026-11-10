// ============================================================
// 1. CUSTOM CURSOR LOGIC
// ============================================================
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (window.matchMedia("(pointer: fine)").matches) {
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Re-bind hover effect for elements, including new playground buttons
  function bindCursorHovers() {
    const interactives = document.querySelectorAll(".interactive, a, button, .action-btn");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorOutline.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover"));
    });
  }
  bindCursorHovers();
}

// ============================================================
// 2. MULTI-THEME ENGINE
// ============================================================
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const themes = ["dark", "translucent", "light", "cyberpunk", "ocean", "sunset"];
let currentThemeIndex = 0;

const savedTheme = localStorage.getItem("theme");
if (savedTheme && themes.includes(savedTheme)) {
  html.setAttribute("data-theme", savedTheme);
  currentThemeIndex = themes.indexOf(savedTheme);
} else {
  html.setAttribute("data-theme", "dark");
}

themeToggle.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  
  themeToggle.style.transform = "scale(1.2) rotate(180deg)";
  setTimeout(() => themeToggle.style.transform = "scale(1) rotate(0deg)", 300);
});

// ============================================================
// 3. TYPEWRITER EFFECT
// ============================================================
const typewriterText = "I Make Everything With AI :))";
const typewriterElement = document.getElementById("typewriter");
let i = 0;

function typeWriter() {
  if (i < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, 70);
  }
}
setTimeout(typeWriter, 500);

// ============================================================
// 4. TABS LOGIC
// ============================================================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    const targetId = btn.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
  });
});

// ============================================================
// 5. SPOTLIGHT TRACKING & CLOCK
// ============================================================
const card = document.getElementById("spotlight-card");
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
});

function updateClock() {
  const now = new Date();
  document.getElementById("live-clock").textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// ============================================================
// 6. PLAYGROUND: FEED THE AI CLICKER
// ============================================================
let feedCount = parseInt(localStorage.getItem("feedCount")) || 0;
const feedBtn = document.getElementById("feed-btn");
const feedText = document.getElementById("feed-text");
const feedMessages = ["Yum!", "More!", "I'm full...", "Need water...", "Delicious!", "Keep going!", "Nom nom."];

// Initial text
if (feedCount > 0) feedText.textContent = `Total meals: ${feedCount}`;

feedBtn.addEventListener("click", () => {
  feedCount++;
  localStorage.setItem("feedCount", feedCount);
  feedText.textContent = feedMessages[Math.floor(Math.random() * feedMessages.length)] + ` (Total: ${feedCount})`;
  
  // Pop animation
  feedBtn.style.transform = "scale(1.2)";
  setTimeout(() => feedBtn.style.transform = "scale(1)", 150);
});

// ============================================================
// 7. PLAYGROUND: FORTUNE COOKIE
// ============================================================
const fortuneBtn = document.getElementById("fortune-btn");
const fortuneText = document.getElementById("fortune-text");
const fortunes = [
  "You will write a bug-free line of code today.",
  "Your GPU will not overheat. Probably.",
  "A wild 404 appears. It is super effective.",
  "You will find a typo in production.",
  "AI is coming for your job. Just kidding... maybe.",
  "Retro Hub will hit 1000 players soon.",
  "Your next commit will be massive.",
  "Someone will copy your code and call it their own.",
  "Your PC will boot on the first try."
];

fortuneBtn.addEventListener("click", () => {
  fortuneText.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
});

// ============================================================
// 8. PLAYGROUND: BOUNCING DVD LOGO
// ============================================================
const bouncer = document.getElementById("bouncer");
let x = 10, y = 20;
let dx = 1.5, dy = 1.5;
const container = bouncer.parentElement;

function animateBounce() {
  // Only animate if the playground tab is visible
  if (!document.getElementById("playground").classList.contains("active")) {
    requestAnimationFrame(animateBounce);
    return;
  }

  const maxX = container.clientWidth - bouncer.clientWidth;
  const maxY = container.clientHeight - bouncer.clientHeight;

  x += dx;
  y += dy;

  // Bounce off walls
  if (x >= maxX || x <= 0) {
    dx = -dx;
    bouncer.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`; // Change color on bounce
  }
  if (y >= maxY || y <= 0) {
    dy = -dy;
    bouncer.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
  }

  bouncer.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(animateBounce);
}
animateBounce();

// ============================================================
// 9. MUSIC PLAYER
// ============================================================
const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-pause-btn");
const playIcon = playBtn.querySelector("i");
const progressBar = document.getElementById("progress-bar");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    playIcon.classList.replace("fa-pause", "fa-play");
  }
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
});

audio.addEventListener("ended", () => {
  playIcon.classList.replace("fa-pause", "fa-play");
  progressBar.style.width = "0%";
});

// ============================================================
// 10. DISCORD PRESENCE
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
  statusIndicator.className = "status-dot " + statusDotClass(data.discord_status);

  if (data.listening_to_spotify && data.spotify) {
    const track = data.spotify.track_name;
    const artist = data.spotify.artist;
    const albumArt = data.spotify.album_art_url;
    const start = data.spotify.timestamps.start;
    const end = data.spotify.timestamps.end;
    const duration = end - start;
    
    const now = Date.now();
    let progressPercent = ((now - start) / duration) * 100;
    if (progressPercent > 100) progressPercent = 100;
    if (progressPercent < 0) progressPercent = 0;

    presenceContainer.className = "presence-box spotify-status";
    presenceContainer.innerHTML = `
      <div class="game-status">
        <img class="game-img" src="${albumArt}" alt="Album Art">
        <div class="game-text">
          <h4>Listening to Spotify</h4>
          <p>${track} • ${artist}</p>
          <div class="spotify-progress-container">
            <div class="spotify-progress" id="spotify-bar" style="width: ${progressPercent}%;"></div>
          </div>
        </div>
      </div>
    `;

    const spotifyBar = document.getElementById("spotify-bar");
    if (spotifyBar) {
      const interval = setInterval(() => {
        const current = Date.now();
        let percent = ((current - start) / duration) * 100;
        if (percent > 100) { percent = 100; clearInterval(interval); }
        spotifyBar.style.width = percent + "%";
      }, 1000);
    }
    return;
  }

  const gameActivity = activities.find((a) => a.type === 0);
  const customStatus = activities.find((a) => a.type === 4);

  if (!gameActivity) {
    presenceContainer.className = "presence-box";
    let statusText = "";
    if (customStatus && customStatus.state) {
      statusText = `<div class="game-text"><h4>${discordUser.username}</h4><p style="color: var(--accent-1); font-style: italic;">"${customStatus.state}"</p></div>`;
    } else {
      statusText = `<div class="game-text"><h4>${discordUser.username}</h4><p>Not playing a game</p></div>`;
    }
    presenceContainer.innerHTML = `<div class="game-status">${statusText}</div>`;
    return;
  }

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
  presenceContainer.innerHTML = `<div class="game-text" style="text-align:center; color: #f23f43; font-size: 0.85rem;">Lanyard connection failed.</div>`;
}

async function fetchPresence() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    if (!res.ok) throw new Error("Lanyard request failed");
    const json = await res.json();
    if (json.success && json.data) renderPresence(json.data);
    else renderError();
  } catch (err) {
    renderError();
  }
}

fetchPresence();
setInterval(fetchPresence, 15000);
