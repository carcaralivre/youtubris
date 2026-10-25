const count = document.getElementById("count");
const status = document.getElementById("status");
const file = document.getElementById("file");

async function load() {
  const { watched } = await browser.storage.local.get({ watched: {} });
  const n = Object.keys(watched).length;
  count.textContent = n === 1 ? "1 vídeo marcado como visto." : `${n.toLocaleString("pt-BR")} vídeos marcados como vistos.`;
}
load();
browser.storage.onChanged.addListener(load);

// Accepts the settings exported by ImprovedTube (or any JSON with a "watched" object)
// and merges its watched videos with the ones already stored.

document.getElementById("import").addEventListener("click", () => file.click());

file.addEventListener("change", async () => {
  try {
    const imported = JSON.parse(await file.files[0].text()).watched;
    if (!imported || typeof imported !== "object") throw new Error();
    const { watched } = await browser.storage.local.get({ watched: {} });
    const added = Object.keys(imported).filter(id => !watched[id]).length;
    await browser.storage.local.set({ watched: { ...imported, ...watched } });
    status.textContent = added === 1 ? "1 vídeo importado." : `${added.toLocaleString("pt-BR")} vídeos importados.`;
  } catch {
    status.textContent = "Arquivo inválido: nenhum vídeo visto encontrado.";
  }
  file.value = "";
});
