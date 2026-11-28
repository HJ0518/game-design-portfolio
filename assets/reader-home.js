"use strict";
const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const folds = all("[data-project]");
const cards = all("[data-card]");
const aliases = { top: "profile", about: "profile", jm: "breaker", works: "team-projects" };
let opened = null;
function openProject(id) {
  opened = folds.find(fold => fold.dataset.project === id) || null;
  for (const fold of folds) fold.hidden = fold !== opened;
  for (const card of cards) {
    const on = card.dataset.card === id;
    card.setAttribute("aria-expanded", String(on));
    card.querySelector(".action").textContent = on ? "접기 ▴" : "자세히 보기 ▾";
  }
}
function goToHash(hash, smooth = true, focus = false) {
  const key = hash.slice(1) || "profile";
  const target = document.getElementById(Object.hasOwn(aliases,key) ? aliases[key] : key);
  if (!target) return false;
  const owner = target.closest("[data-project]");
  if (owner || ["projects","team-projects","profile"].includes(target.id)) openProject(owner?.dataset.project);
  if (focus && target.matches(".paper")) target.focus({preventScroll:true});
  target.scrollIntoView({behavior: smooth && !reduceMotion.matches ? "smooth" : "instant", block:"start"});
  updateReader();
  return true;
}
function navigate(hash, focus = false) {
  if (hash !== location.hash) history.pushState(null,"",hash);
  goToHash(hash,true,focus);
}
function closeCard(id) {
  const card = cards.find(item => item.dataset.card === id);
  navigate(["ramen","paint-rumble","project-h"].includes(id) ? "#team-projects" : "#projects");
  card?.focus({preventScroll:true});
}
document.addEventListener("click",event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const card = event.target.closest("[data-card]");
  if (card) {
    event.preventDefault();
    if (card.getAttribute("aria-expanded") === "true") closeCard(card.dataset.card);
    else navigate("#" + card.dataset.card,true);
    return;
  }
  const close = event.target.closest("[data-close]");
  if (close) { closeCard(close.dataset.close); return; }
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor) { event.preventDefault(); navigate(anchor.hash,true); }
});
let lastRoute;
function restore() {
  if (lastRoute === location.href) return;
  lastRoute = location.href;
  requestAnimationFrame(() => {lastRoute = null; goToHash(location.hash,false);});
}
window.addEventListener("popstate",restore);
window.addEventListener("hashchange",restore);
if (performance.getEntriesByType("navigation")[0]?.type === "reload" && location.hash) {
  history.replaceState(null,"",location.pathname + location.search);
  window.scrollTo(0,0);
}
if (location.hash) goToHash(location.hash,false);

for (const deck of all(".deck")) {
  const frames = all("[data-frame]",deck);
  const select = deck.querySelector("select");
  const prev = deck.querySelector("[data-prev]");
  const next = deck.querySelector("[data-next]");
  function show(index) {
    frames.forEach((frame,i) => {
      frame.hidden = i !== index;
      const img = frame.querySelector("img");
      if (i === index && img.dataset.src && !img.hasAttribute("src")) img.src = img.dataset.src;
    });
    select.selectedIndex = index;
    prev.disabled = index === 0;
    next.disabled = index === frames.length - 1;
  }
  prev.onclick = () => show(select.selectedIndex-1);
  next.onclick = () => show(select.selectedIndex+1);
  select.onchange = () => show(select.selectedIndex);
  show(0);
}
function markActive(links,hash) {
  for (const link of links) {
    const active = link.hash === hash;
    link.classList.toggle("active",active);
    if (active) link.setAttribute("aria-current","location"); else link.removeAttribute("aria-current");
  }
}
function updateReader() {
  let current = "#profile";
  const probe = window.innerHeight * .34;
  if (document.getElementById("projects").getBoundingClientRect().top < probe) current = "#projects";
  if (document.getElementById("team-projects").getBoundingClientRect().top < probe) current = "#team-projects";
  if (opened) {
    const sheet = opened.querySelector(".paper");
    const rect = sheet.getBoundingClientRect();
    const sections = all(".paper section",opened);
    const active = sections.filter(s => s.getBoundingClientRect().top <= probe).pop() || sections[0];
    const ratio = Math.min(1,Math.max(0,(probe-rect.top)/Math.max(1,rect.height-window.innerHeight*.5)));
    opened.querySelector("progress").value = ratio * 100;
    opened.querySelector("output").textContent = Math.round(ratio*100) + "%";
    markActive(all(".reader nav a",opened),"#" + active.id);
    if (rect.top < probe && rect.bottom > 0) current = ["breaker","bounty-hunter","blood-hunter"].includes(opened.dataset.project) ? "#projects" : "#team-projects";
  }
  if (window.scrollY > 0 && window.innerHeight+window.scrollY >= document.documentElement.scrollHeight-3) current = !opened && location.hash === "#team-projects" ? "#team-projects" : "#contact";
  markActive(all(".topbar nav a"),current);
}
let framePending = false;
function scheduleReader() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {framePending=false;updateReader();});
}
window.addEventListener("scroll",scheduleReader,{passive:true});
window.addEventListener("resize",scheduleReader);
updateReader();

// One wheel gesture moves between the two opening screens on large displays.
let pagingUntil = 0;
let previousWheel = 0;
function pageIntro(event,direction) {
  if (innerWidth <= 1000 || !direction) return;
  const targetY = document.getElementById("projects").getBoundingClientRect().top + scrollY - document.querySelector(".topbar").offsetHeight;
  if (targetY > innerHeight * 1.25) return;
  const now = performance.now();
  if (now < pagingUntil) {event.preventDefault();return;}
  if (direction > 0 ? scrollY >= targetY-4 : scrollY <= 1 || scrollY > targetY+4) return;
  event.preventDefault();
  pagingUntil = now + (reduceMotion.matches ? 120 : 750);
  scrollTo({top:direction>0?targetY:0,behavior:reduceMotion.matches?"instant":"smooth"});
}
window.addEventListener("wheel",event => {
  if (event.ctrlKey || !event.deltaY || Math.abs(event.deltaX)>Math.abs(event.deltaY)) return;
  const now = performance.now();
  if (previousWheel && now-previousWheel < 180 && now<pagingUntil) event.preventDefault();
  else pageIntro(event,Math.sign(event.deltaY));
  previousWheel = now;
},{passive:false});
window.addEventListener("keydown",event => {
  if (event.altKey||event.ctrlKey||event.metaKey||event.target.closest("input,button,a,select,textarea,summary")) return;
  if (["ArrowDown","PageDown"," "].includes(event.key)) pageIntro(event,1);
  if (["ArrowUp","PageUp"].includes(event.key)) pageIntro(event,-1);
});
if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.remove("waiting");observer.unobserve(entry.target);}
  }));
  for (const card of cards) {card.classList.add("reveal","waiting");observer.observe(card);}
}
window.addEventListener("beforeprint",() => {
  for (const img of all(".deck img[data-src]")) if (!img.hasAttribute("src")) img.src = img.dataset.src;
});
