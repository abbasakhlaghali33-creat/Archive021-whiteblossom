const $ = (s) => document.querySelector(s);
const music = $("#bgMusic");
const soundToggle = $("#soundToggle");
const soundLabel = $("#soundLabel");
let playing = false;

function setMusicLabel() {
  soundLabel.textContent = playing ? "موسیقی روشن" : "موسیقی خاموش";
  soundToggle.classList.toggle("is-playing", playing);
}
soundToggle.addEventListener("click", async () => {
  if (!music.querySelector("source").getAttribute("src")) return;
  if (playing) { music.pause(); playing = false; setMusicLabel(); return; }
  try { await music.play(); playing = true; setMusicLabel(); }
  catch(e) { soundLabel.textContent = "برای پخش دوباره لمس کن"; }
});
music.addEventListener("pause", () => { playing = false; setMusicLabel(); });
music.addEventListener("play", () => { playing = true; setMusicLabel(); });

$("#beginBtn").addEventListener("click", () => {
  document.querySelector("#intro").scrollIntoView({behavior:"smooth"});
});
const progress = $("#progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + "%";
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

$("#unlockBtn").addEventListener("click", () => {
  const answer = $("#memoryAnswer").value.trim();
  if (!answer) {
    $("#memoryAnswer").focus();
    $("#memoryAnswer").placeholder = "یه خاطره کوچیک هم کافیه؛ این بخش رو خالی نذار...";
    return;
  }
  // The answer is intentionally not transmitted or stored.
  $("#question").classList.add("answered");
  document.body.classList.add("unlocked");
  const finale = $("#finale");
  finale.classList.add("unlocked");
  finale.setAttribute("aria-hidden", "false");
  finale.scrollIntoView({behavior:"smooth", block:"start"});
});
$("#replayBtn").addEventListener("click", () => {
  document.body.classList.remove("unlocked");
  const finale = $("#finale");
  finale.classList.remove("unlocked");
  finale.setAttribute("aria-hidden", "true");
  $("#question").style.display = "";
  $("#question").scrollIntoView({behavior:"smooth"});
});
