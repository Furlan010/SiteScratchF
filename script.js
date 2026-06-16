/* ============== INFOTEC — Interactions ============== */

const GAMES = [
  { title:"Pokemon Infinite Fusion", cat:"Aventura",     id:"1070193438", img:"https://tavernf.github.io/scratchFetec/Pokemon.png" },
  { title:"Batman Joker's Maze",     cat:"Labirinto",    id:"1066982033", img:"https://tavernf.github.io/scratchFetec/Batman.png" },
  { title:"Gênio Quiz",              cat:"Quiz",         id:"1070681588", img:"https://tavernf.github.io/scratchFetec/Genio%20quiz.png" },
  { title:"Sonic e Mario",           cat:"Plataforma",   id:"1070685533", img:"https://tavernf.github.io/scratchFetec/Fogoagua.png" },
  { title:"Spongebob Flight",        cat:"Arcade",       id:"1073877425", img:"https://tavernf.github.io/scratchFetec/Sponja.png" },
  { title:"Angry Birds Halloween",   cat:"Habilidade",   id:"1064392867", img:"https://tavernf.github.io/scratchFetec/Angry.png" },
  { title:"Super Minecraft Jump",    cat:"Jump",         id:"1071826286", img:"https://tavernf.github.io/scratchFetec/Mine.png" },
  { title:"Ghetto Heroes",           cat:"Ação",         id:"1070293458", img:"https://tavernf.github.io/scratchFetec/Getto.png" },
  { title:"Dark Ness",               cat:"Minimal",      id:"1073390686", img:"https://tavernf.github.io/scratchFetec/Dark.png" },
  { title:"Tetris",                  cat:"Puzzle",       id:"1071804496", img:"https://tavernf.github.io/scratchFetec/Tetris.png" },
  { title:"Minecraft 2D",            cat:"Sandbox",      id:"1066994031", img:"https://tavernf.github.io/scratchFetec/minecraft.png" },
  { title:"Mortal Kombat",           cat:"Luta",         id:"1070549007", img:"https://tavernf.github.io/scratchFetec/mortal.png" },
  { title:"Water Sort",              cat:"Puzzle",       id:"1067484457", img:"https://tavernf.github.io/scratchFetec/water.png" },
  { title:"Zumbis Famintos",         cat:"Sobrevivência",id:"1067544239", img:"https://tavernf.github.io/scratchFetec/sumbis.png" },
  { title:"Sonic 2",                 cat:"Velocidade",   id:"1067830709", img:"https://tavernf.github.io/scratchFetec/sonico.png" },
];

const GUITAR_HERO_ID = "1066879131"; // a featured Makey Makey project (will fallback)

/* ============== RENDER CARDS ============== */
const grid = document.getElementById("gamesGrid");
function renderCards(list){
  grid.innerHTML = "";
  list.forEach((g,i)=>{
    const card = document.createElement("article");
    card.className = "game-card";
    card.style.transitionDelay = `${(i % 8) * 50}ms`;
    card.dataset.title = g.title.toLowerCase();
    card.dataset.cat = g.cat;
    card.innerHTML = `
      <div class="game-card__img">
        <span class="game-card__num">${String(GAMES.indexOf(g)+1).padStart(2,"0")}</span>
        <span class="game-card__cat">${g.cat}</span>
        <img src="${g.img}" alt="${g.title}" loading="lazy"/>
        <div class="game-card__play"><span><i class="fa-solid fa-play"></i></span></div>
      </div>
      <div class="game-card__body">
        <h3 class="game-card__title">${g.title}</h3>
        <div class="game-card__meta">
          <span><i class="fa-solid fa-user-graduate"></i> 1º Ano Info</span>
          <b>Jogar →</b>
        </div>
      </div>
    `;
    card.addEventListener("click", ()=> openModal(g));
    grid.appendChild(card);
    requestAnimationFrame(()=> io.observe(card));
  });
}

/* ============== FILTERS ============== */
const cats = ["Todos", ...Array.from(new Set(GAMES.map(g=>g.cat)))];
const filtersEl = document.getElementById("filters");
let activeCat = "Todos";
cats.forEach(c=>{
  const b = document.createElement("button");
  b.className = "chip-btn" + (c==="Todos" ? " active":"");
  b.textContent = c;
  b.onclick = ()=>{
    activeCat = c;
    document.querySelectorAll(".chip-btn").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    applyFilters();
  };
  filtersEl.appendChild(b);
});

const searchEl = document.getElementById("searchInput");
searchEl.addEventListener("input", applyFilters);
function applyFilters(){
  const q = searchEl.value.trim().toLowerCase();
  const list = GAMES.filter(g =>
    (activeCat==="Todos" || g.cat===activeCat) &&
    (!q || g.title.toLowerCase().includes(q))
  );
  renderCards(list);
}

/* Shuffle / Surprise me */
document.getElementById("shuffleBtn").onclick = ()=>{
  const pick = GAMES[Math.floor(Math.random()*GAMES.length)];
  toast(`<i class="fa-solid fa-wand-magic-sparkles"></i> Que tal <b>${pick.title}</b>?`);
  openModal(pick);
};

/* ============== MODAL ============== */
const modal = document.getElementById("modal");
const modalFrame = document.getElementById("modalFrame");
const modalTitle = document.getElementById("modalTitle");
const modalCat = document.getElementById("modalCat");
const modalOpen = document.getElementById("modalOpen");
function openModal(g){
  const id = g.id || GUITAR_HERO_ID;
  modalTitle.textContent = g.title;
  modalCat.textContent = g.cat || "Scratch";
  modalFrame.src = `https://scratch.mit.edu/projects/${id}/embed`;
  modalOpen.href = `https://scratch.mit.edu/projects/${id}/fullscreen/`;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  modal.classList.remove("open");
  modalFrame.src = "about:blank";
  document.body.style.overflow = "";
}
document.getElementById("modalClose").onclick = closeModal;
modal.addEventListener("click", e=>{ if(e.target===modal) closeModal(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeModal(); });

/* Play data-play (featured guitar) */
document.addEventListener("click", e=>{
  const playBtn = e.target.closest("[data-play='guitar']");
  if (playBtn){
    openModal({ title:"Guitar Hero — Makey Makey", cat:"Destaque", id:GUITAR_HERO_ID });
  }
  const scrollBtn = e.target.closest("[data-scroll]");
  if (scrollBtn){
    const t = document.querySelector(scrollBtn.dataset.scroll);
    if (t) t.scrollIntoView({ behavior:"smooth", block:"start" });
  }
});

/* ============== TOAST ============== */
const toastEl = document.getElementById("toast");
let tt;
function toast(msg){
  toastEl.innerHTML = msg;
  toastEl.classList.add("show");
  clearTimeout(tt);
  tt = setTimeout(()=> toastEl.classList.remove("show"), 2400);
}

/* ============== NAVBAR scroll + progress ============== */
const nav = document.querySelector(".nav");
const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", ()=>{
  nav.classList.toggle("scrolled", scrollY > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${(scrollY / h) * 100}%`;
});

/* ============== REVEAL ============== */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if (en.isIntersecting){
      en.target.classList.add("in");
      io.unobserve(en.target);
    }
  });
}, { threshold:0.12 });
document.querySelectorAll(".reveal").forEach(el=> io.observe(el));

/* ============== COUNTER ============== */
const counterIO = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if (en.isIntersecting){
      const el = en.target;
      const target = +el.dataset.count;
      const dur = 1400; const t0 = performance.now();
      function step(t){
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1-p,3))) + (target===100 ? "" : "+");
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + (target===100 ? "%" : "+");
      }
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    }
  });
}, { threshold:0.4 });
document.querySelectorAll("[data-count]").forEach(el=> counterIO.observe(el));

/* ============== 3D TILT ============== */
const art = document.getElementById("featuredArt");
if (art){
  art.addEventListener("mousemove", e=>{
    const r = art.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    art.style.transform = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*8}deg) scale(1.02)`;
  });
  art.addEventListener("mouseleave", ()=> art.style.transform = "");
}

/* ============== CURSOR GLOW ============== */
const glow = document.getElementById("cursorGlow");
addEventListener("mousemove", e=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ============== THEME TOGGLE ============== */
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector("i");
const saved = localStorage.getItem("infotec-theme");
if (saved === "dark"){ document.body.classList.replace("theme-light","theme-dark"); icon.className="fa-solid fa-sun"; }
toggle.onclick = ()=>{
  const dark = document.body.classList.toggle("theme-dark");
  document.body.classList.toggle("theme-light", !dark);
  icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  localStorage.setItem("infotec-theme", dark ? "dark" : "light");
};

/* ============== INIT ============== */
renderCards(GAMES);
document.getElementById("year").textContent = new Date().getFullYear();
