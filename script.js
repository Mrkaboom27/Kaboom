// ============================================================
// 1. BACKGROUND PARTICLE NETWORK
// ============================================================
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

let mouse = { x: null, y: null, radius: 150 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    
    // Mouse interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      this.x -= dx / 20;
      this.y -= dy / 20;
    }
  }
  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 15000;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// ============================================================
// 2. 3D TILT EFFECT
// ============================================================
const cardWrapper = document.getElementById("card-wrapper");
const card = document.getElementById("spotlight-card");

cardWrapper.addEventListener("mousemove", (e) => {
  const rect = cardWrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10 degrees
  const rotateY = ((x - centerX) / centerX) * 10;

  cardWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Spotlight tracking for the inner card background
  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
});

cardWrapper.addEventListener("mouseleave", () => {
  cardWrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
  cardWrapper.style.transition = "transform 0.5s ease";
  setTimeout(() => { cardWrapper.style.transition = "transform 0.1s ease-out"; }, 500);
});

// ============================================================
// 3. CUSTOM CURSOR LOGIC
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

  const interactives = document.querySelectorAll(".interactive, a, button, .action-btn");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => cursorOutline.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover"));
  });
}

// ============================================================
// 4. MULTI-THEME ENGINE
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
// 5. TYPEWRITER, CLOCK, TABS, VIEWS
// ============================================================
const typewriterText = "I Make Everything With AI :))";
const typewriterElement = document.getElementById("typewriter");
let i = 0;
function typeWriter() {
  if (i < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
setTimeout(typeWriter, 500);

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.getAttribute("data-target")).classList.add("active");
  });
});

function updateClock() {
  const now = new Date();
  document.getElementById("live-clock").textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

let viewCount = parseInt(localStorage.getItem("viewCount")) || 0;
viewCount++;
localStorage.setItem("viewCount", viewCount);
document.getElementById("view-counter").textContent = viewCount;

// ============================================================
// 6. PLAYGROUND
// ============================================================
let feedCount = parseInt(localStorage.getItem("feedCount")) || 0;
const feedBtn = document.getElementById("feed-btn");
const feedText = document.getElementById("feed-text");
const feedMessages = ["Yum!", "More!", "I'm full...", "Need water...", "Delicious!", "Keep going!", "Nom nom."];
if (feedCount > 0) feedText.textContent = `Total meals: ${feedCount}`;
feedBtn.addEventListener("click", () => {
  feedCount++;
  localStorage.setItem("feedCount", feedCount);
  feedText.textContent = feedMessages[Math.floor(Math.random() * feedMessages.length)] + ` (Total: ${feedCount})`;
  feedBtn.style.transform = "scale(1.2)";
  setTimeout(() => feedBtn.style.transform = "scale(1)", 150);
});

const fortuneBtn = document.getElementById("fortune-btn");
const fortuneText = document.getElementById("fortune-text");
const fortunes = [
  "You will write a bug-free line of code today.", "Your GPU will not overheat. Probably.", "A wild 404 appears. It is super effective.",
  "You will find a typo in production.", "AI is coming for your job. Just kidding... maybe.", "Retro Hub will hit 1000 players soon.",
  "Your next commit will be massive.", "Someone will copy your code and call it their own.", "Your PC will boot on the first try."
];
fortuneBtn.addEventListener("click", () => {
  fortuneText.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
});

// ============================================================
// 7. GUESTBOOK (COMMENTS)
// ============================================================
const commentList = document.getElementById("comment-list");
const submitBtn = document.getElementById("submit-comment");
const nameInput = document.getElementById("comment-name");
const textInput = document.getElementById("comment-text");

let comments = JSON.parse(localStorage.getItem("comments")) || [];

function renderComments() {
  commentList.innerHTML = "";
  [...comments].reverse().forEach(comment => {
    const date = new Date(comment.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `
      <div class="comment-header">
        <span class="comment-name"></span>
        <span class="comment-date">${date}</span>
      </div>
      <div class="comment-body"></div>
    `;
    // Use textContent for security (XSS prevention)
    div.querySelector(".comment-name").textContent = comment.name;
    div.querySelector(".comment-body").textContent = comment.text;
    commentList.appendChild(div);
  });
  
  if (comments.length === 0) {
    commentList.innerHTML = `<p style="text-align:center; color: var(--text-muted); font-size: 0.85rem; margin-top: 1rem;">No comments yet. Be the first!</p>`;
  }
}

submitBtn.addEventListener("click", () => {
  const name = nameInput.value.trim() || "Anonymous";
  const text = textInput.value.trim();
  if (!text) return;
  comments.push({ name, text, time: Date.now() });
  localStorage.setItem("comments", JSON.stringify(comments));
  nameInput.value = "";
  textInput.value = "";
  renderComments();
});
renderComments();

// ============================================================
// 8. MUSIC PLAYER & VISUALIZER
// ============================================================
const audio = document.getElementById("audio-player");
const playBtn = document.getElementById("play-pause-btn");
const playIcon = playBtn.querySelector("i");
const progressBar = document.getElementById("progress-bar");
const musicPlayer = document.querySelector(".music-player");

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.classList.replace("fa-play", "fa-pause");
    musicPlayer.classList.add("playing");
  } else {
    audio.pause();
    playIcon.classList.replace("fa-pause", "fa-play");
    musicPlayer.classList.remove("playing");
  }
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
});

audio.addEventListener("ended", () => {
  playIcon.classList.replace("fa-pause", "fa-play");
  progressBar.style.width = "0%";
  musicPlayer.classList.remove("playing");
});

// ============================================================
// 9. DISCORD PRESENCE
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
