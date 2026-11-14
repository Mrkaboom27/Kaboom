/* ===== THEME ENGINE ===== */
:root {
  --bg: #030305;
  --card-bg: rgba(10, 10, 15, 0.7);
  --card-border: rgba(255, 255, 255, 0.08);
  --text-main: #ffffff;
  --text-muted: #888899;
  --accent-1: #00f2fe;
  --accent-2: #fe0979;
  --accent-gradient: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  --accent-glow: rgba(0, 242, 254, 0.4);
  --radius: 24px;
}

[data-theme="translucent"] {
  --bg: #000000;
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(255, 255, 255, 0.15);
  --text-main: #ffffff;
  --text-muted: #aaaaaa;
  --accent-1: #ffffff;
  --accent-2: #888888;
  --accent-gradient: linear-gradient(135deg, #ffffff, #888888);
  --accent-glow: rgba(255, 255, 255, 0.2);
}

[data-theme="light"] {
  --bg: #f0f2f5;
  --card-bg: rgba(255, 255, 255, 0.8);
  --card-border: rgba(0, 0, 0, 0.08);
  --text-main: #111111;
  --text-muted: #555566;
  --accent-1: #0072ff;
  --accent-2: #ff0099;
  --accent-glow: rgba(0, 114, 255, 0.2);
}

[data-theme="cyberpunk"] {
  --bg: #09090b;
  --card-bg: rgba(20, 20, 20, 0.8);
  --card-border: rgba(255, 255, 0, 0.2);
  --text-main: #fce205;
  --text-muted: #a1a1aa;
  --accent-1: #fce205;
  --accent-2: #ff003c;
  --accent-glow: rgba(252, 226, 5, 0.3);
}

[data-theme="ocean"] {
  --bg: #001220;
  --card-bg: rgba(0, 30, 60, 0.6);
  --card-border: rgba(0, 255, 255, 0.1);
  --text-main: #e0fbfc;
  --text-muted: #8ecae6;
  --accent-1: #00b4d8;
  --accent-2: #03045e;
  --accent-glow: rgba(0, 180, 216, 0.4);
}

[data-theme="sunset"] {
  --bg: #1a0b10;
  --card-bg: rgba(40, 15, 20, 0.6);
  --card-border: rgba(255, 100, 0, 0.15);
  --text-main: #ffe5d9;
  --text-muted: #d8a48f;
  --accent-1: #ff7b00;
  --accent-2: #c1121f;
  --accent-glow: rgba(255, 123, 0, 0.4);
}

/* ===== BASE ===== */
* { margin: 0; padding: 0; box-sizing: border-box; }
@media (pointer: fine) { body, a, button, .interactive { cursor: none !important; } }

body {
  font-family: 'Outfit', sans-serif;
  background-color: var(--bg);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 3rem 1rem;
  transition: background-color 0.4s ease, color 0.4s ease;
  perspective: 1000px; /* Required for 3D tilt */
}

/* ===== SCREEN GRAPHICS ===== */
.scanlines {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
  background-size: 100% 4px;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.6;
}

#particle-canvas {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: -1; pointer-events: none;
}

/* Custom Cursor */
.cursor-dot, .cursor-outline {
  position: fixed; top: 0; left: 0; transform: translate(-50%, -50%); border-radius: 50%; z-index: 9999; pointer-events: none;
}
.cursor-dot { width: 8px; height: 8px; background-color: var(--text-main); transition: background-color 0.2s; }
.cursor-outline { width: 40px; height: 40px; border: 1px solid var(--text-muted); transition: width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s; }
.cursor-outline.hover { width: 60px; height: 60px; background-color: rgba(255,255,255,0.1); border-color: var(--accent-1); }

/* ===== 3D TILT WRAPPER ===== */
.card-wrapper {
  position: relative;
  width: 100%;
  max-width: 420px;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  margin: auto;
}

/* ===== THE MAIN CARD ===== */
.card {
  position: relative;
  width: 100%;
  background: var(--card-bg);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--radius);
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  z-index: 1;
  overflow: hidden; /* Keeps rotating border inside */
  transition: background 0.4s ease;
}

/* ===== ROTATING NEON BORDER ===== */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px; /* Border thickness */
  background: conic-gradient(from var(--angle), transparent 70%, var(--accent-1), var(--accent-2), var(--accent-1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: spin-border 4s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes spin-border {
  to { --angle: 360deg; }
}

.card::after {
  content: "";
  position: absolute;
  inset: 2px;
  background: var(--card-bg);
  border-radius: calc(var(--radius) - 2px);
  z-index: -1;
}

/* ===== GLITCH TEXT EFFECT ===== */
.name {
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  z-index: 3;
}

.glitch {
  position: relative;
  color: var(--text-main);
}
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
}
.glitch:hover::before {
  left: 2px; text-shadow: -2px 0 var(--accent-2); clip-path: inset(44% 0 56% 0); opacity: 1; animation: glitch-anim 0.3s infinite linear alternate-reverse;
}
.glitch:hover::after {
  left: -2px; text-shadow: 2px 0 var(--accent-1); clip-path: inset(12% 0 88% 0); opacity: 1; animation: glitch-anim 0.3s infinite linear alternate-reverse;
}
@keyframes glitch-anim {
  0% { clip-path: inset(20% 0 80% 0); }
  20% { clip-path: inset(60% 0 10% 0); }
  40% { clip-path: inset(40% 0 50% 0); }
  60% { clip-path: inset(80% 0 5% 0); }
  80% { clip-path: inset(10% 0 70% 0); }
  100% { clip-path: inset(30% 0 40% 0); }
}

/* ===== AVATAR ===== */
.profile-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem; z-index: 3; position: relative; }
.avatar-container { position: relative; width: 90px; height: 90px; margin-bottom: 1rem; }
.avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; position: relative; z-index: 2; border: 3px solid var(--bg); transition: border-color 0.4s; }
.avatar-ring { position: absolute; inset: -5px; border-radius: 50%; background: var(--accent-gradient); z-index: 1; animation: spin 4s linear infinite; filter: blur(4px); }
@keyframes spin { 100% { transform: rotate(360deg); } }
.status-dot { position: absolute; bottom: 2px; right: 2px; width: 16px; height: 16px; border-radius: 50%; background-color: #f04747; border: 3px solid var(--bg); z-index: 3; transition: 0.3s; }
.status-dot.online { background-color: #23a55a; } .status-dot.idle { background-color: #f0b232; } .status-dot.dnd { background-color: #f23f43; }

.verified { color: var(--accent-1); font-size: 1rem; filter: drop-shadow(0 0 8px var(--accent-glow)); }
.tagline { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.2rem; font-family: 'Space Mono', monospace; display: flex; align-items: center; justify-content: center; height: 20px; }
.cursor-blink { animation: blink 1s step-end infinite; color: var(--accent-1); margin-left: 2px; font-weight: bold; }
@keyframes blink { 50% { opacity: 0; } }

/* ===== TABS ===== */
.tabs-nav { display: flex; background: rgba(0,0,0,0.3); border-radius: 14px; padding: 5px; margin-bottom: 1.5rem; border: 1px solid var(--card-border); position: relative; z-index: 3; }
.tab-btn { flex: 1; background: transparent; border: none; color: var(--text-muted); font-family: 'Outfit', sans-serif; font-size: 0.8rem; padding: 0.6rem 0; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.3rem; }
.tab-btn:hover { color: var(--text-main); }
.tab-btn.active { background: var(--card-border); color: var(--text-main); box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
.tab-content { display: none; opacity: 0; transform: translateY(10px); transition: opacity 0.3s ease, transform 0.3s ease; position: relative; z-index: 3; }
.tab-content.active { display: block; opacity: 1; transform: translateY(0); }

/* ===== PRESENCE, LINKS, SPECS ===== */
.presence-box { background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); border-radius: 14px; padding: 1rem; margin-bottom: 1rem; }
.loading-presence { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.9rem; color: var(--text-muted); }
.spinner { width: 14px; height: 14px; border: 2px solid var(--card-border); border-top-color: var(--accent-1); border-radius: 50%; animation: spin 1s linear infinite; }
.game-status { display: flex; align-items: center; gap: 1rem; }
.game-img { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; }
.game-text h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.1rem; }
.game-text p { font-size: 0.8rem; color: var(--text-muted); font-family: 'Space Mono', monospace; }

.links-container { display: flex; flex-direction: column; gap: 0.6rem; }
.social-row { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); border-radius: 12px; text-decoration: none; color: var(--text-main); transition: 0.3s; }
.social-left { display: flex; align-items: center; gap: 1rem; font-weight: 500; font-size: 0.95rem; }
.social-left i { font-size: 1.2rem; color: var(--text-muted); transition: 0.3s; }
.social-row .arrow { font-size: 0.9rem; color: var(--text-muted); transition: 0.3s; }
.social-row:hover { background: rgba(255, 255, 255, 0.08); border-color: var(--accent-1); transform: translateX(5px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.social-row:hover .arrow { transform: translateX(5px); color: var(--text-main); }

.specs-list { display: flex; flex-direction: column; gap: 0.8rem; }
.spec-row { display: flex; align-items: center; gap: 1rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); padding: 1rem; border-radius: 12px; transition: 0.3s; }
.spec-row:hover { background: rgba(255,255,255,0.08); border-color: var(--accent-2); }
.spec-icon { width: 36px; height: 36px; background: rgba(255,255,255,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--accent-1); }
.spec-info { display: flex; flex-direction: column; }
.spec-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.spec-val { font-weight: 500; font-size: 0.95rem; }

.project-card { display: flex; align-items: center; gap: 1rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); border-radius: 14px; padding: 1.2rem; text-decoration: none; color: var(--text-main); transition: 0.3s; position: relative; }
.project-card:hover { background: rgba(255, 255, 255, 0.08); border-color: var(--accent-2); transform: scale(1.02); }
.project-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--accent-gradient); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #000; flex-shrink: 0; }
[data-theme="dark"] .project-icon, [data-theme="ocean"] .project-icon { color: #fff; }
.project-info h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.2rem; }
.project-info p { font-size: 0.8rem; color: var(--text-muted); line-height: 1.3; }
.project-arrow { position: absolute; top: 1rem; right: 1rem; font-size: 0.8rem; color: var(--text-muted); }

/* ===== PLAYGROUND ===== */
.play-card { background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); border-radius: 14px; padding: 1.2rem; margin-bottom: 1rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.8rem; position: relative; }
.play-card h3 { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.play-card p { font-size: 0.95rem; font-weight: 500; min-height: 22px; }
.action-btn { background: var(--accent-gradient); border: none; color: #000; padding: 0.6rem 1.2rem; border-radius: 8px; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: transform 0.1s, filter 0.2s; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 15px var(--accent-glow); }
[data-theme="dark"] .action-btn, [data-theme="ocean"] .action-btn { color: #fff; }
.action-btn:hover { transform: scale(1.05); filter: brightness(1.2); }
.action-btn:active { transform: scale(0.95); }

/* ===== GUESTBOOK ===== */
.comment-form { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem; }
.comment-form input, .comment-form textarea { width: 100%; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); padding: 0.8rem; border-radius: 10px; color: var(--text-main); font-family: 'Outfit', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.3s; resize: none; }
.comment-form input:focus, .comment-form textarea:focus { border-color: var(--accent-1); }
.comment-list { display: flex; flex-direction: column; gap: 0.8rem; max-height: 200px; overflow-y: auto; padding-right: 5px; }
.comment-list::-webkit-scrollbar { width: 6px; }
.comment-list::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 3px; }
.comment-item { background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); padding: 1rem; border-radius: 12px; }
.comment-header { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.comment-name { font-weight: 600; font-size: 0.9rem; color: var(--text-main); }
.comment-date { font-size: 0.75rem; color: var(--text-muted); font-family: 'Space Mono', monospace; }
.comment-body { font-size: 0.9rem; color: var(--text-muted); line-height: 1.4; word-break: break-word; }

/* ===== MUSIC PLAYER & VISUALIZER ===== */
.music-player { margin-top: 1rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--card-border); border-radius: 16px; padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; position: relative; z-index: 3; overflow: hidden; }
.visualizer { position: absolute; bottom: 0; left: 0; width: 100%; height: 30px; display: flex; align-items: flex-end; justify-content: space-around; opacity: 0.3; pointer-events: none; }
.bar { width: 10%; background: var(--accent-1); transition: height 0.1s ease; height: 0%; border-radius: 2px 2px 0 0; }
.playing .bar { animation: bounce 0.5s infinite alternate ease-in-out; }
.playing .bar:nth-child(even) { animation-duration: 0.7s; background: var(--accent-2); }
@keyframes bounce { from { height: 10%; } to { height: 100%; } }
.player-info { display: flex; align-items: center; gap: 1rem; z-index: 2; }
.player-art { width: 44px; height: 44px; background: var(--accent-gradient); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #000; }
[data-theme="dark"] .player-art, [data-theme="ocean"] .player-art { color: #fff; }
.player-text { display: flex; flex-direction: column; }
.player-title { font-size: 0.9rem; font-weight: 600; }
.player-artist { font-size: 0.75rem; color: var(--text-muted); }
.player-controls { display: flex; justify-content: center; z-index: 2; }
.play-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--text-main); color: var(--bg); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; font-size: 0.9rem; }
.play-btn:hover { transform: scale(1.05); }
.player-progress { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; z-index: 2; }
.progress-bar { height: 100%; background: var(--accent-1); width: 0%; transition: width 0.1s linear; }

/* ===== FOOTER & CLOCK ===== */
.footer { margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--card-border); padding-top: 1rem; font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--text-muted); position: relative; z-index: 3; }
.footer-left { display: flex; align-items: center; gap: 0.4rem; }
