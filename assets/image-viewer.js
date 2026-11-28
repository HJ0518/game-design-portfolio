(() => {
  const dialog = document.querySelector(".image-viewer");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const stage = dialog.querySelector(".view-stage");
  const image = stage.querySelector("img");
  const zoom = dialog.querySelector("[data-zoom]");
  const source = dialog.querySelector(".view-source");
  let opener;
  document.querySelector(".slide-stack").addEventListener("click", event => {
    const link = event.target.closest(".zoom-image");
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    stage.classList.remove("magnified");
    zoom.setAttribute("aria-pressed", "false");
    zoom.textContent = "더 크게";
    source.href = link.href;
    image.src = link.href;
    image.alt = link.querySelector("img").alt;
    dialog.showModal();
  });
  zoom.addEventListener("click", () => {
    if (!stage.classList.contains("magnified")) {
      const width = Math.max(image.naturalWidth, Math.round(image.clientWidth * 2));
      stage.style.setProperty("--zoom-width", width + "px");
    }
    const magnified = stage.classList.toggle("magnified");
    zoom.setAttribute("aria-pressed", String(magnified));
    zoom.textContent = magnified ? "화면에 맞춤" : "더 크게";
  });
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog && !stage.contains(event.target)) dialog.close();
  });
  dialog.addEventListener("close", () => opener?.focus({preventScroll:true}));
})();
