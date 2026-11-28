"use strict";
const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const cards = all("[data-card]");
const aliases = {top: "#profile", about: "#profile", works: "#team-projects", jm: "dnf-breaker.html"};
function followLegacyLink() {
  const key = location.hash.slice(1);
  const oldDeck = /^(breaker|bounty-hunter)(?:-part-([0-9]+))?$/.exec(key);
  const route = oldDeck ? "dnf-" + oldDeck[1] + ".html" + (oldDeck[2] ? (oldDeck[2] === "1" ? "#slides" : "#notes") : "") : Object.hasOwn(aliases,key) ? aliases[key] : null;
  if (route) location.replace(route);
}
window.addEventListener("hashchange",followLegacyLink);
followLegacyLink();
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
  if (window.scrollY > 0 && window.innerHeight+window.scrollY >= document.documentElement.scrollHeight-3) current = location.hash === "#team-projects" ? "#team-projects" : "#contact";
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
