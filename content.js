// Page path on <html>, so styles.css can target home, subscriptions, history…

function setPath() {
  document.documentElement.dataset.ytbPath = location.pathname;
}
setPath();
window.addEventListener("yt-navigate-start", setPath);
window.addEventListener("yt-navigate-finish", setPath);
window.addEventListener("popstate", setPath);

// Watched videos: { [videoId]: { title } }, same shape as ImprovedTube's export.

let watched = {};
const ready = browser.storage.local.get({ watched: {} }).then(data => (watched = data.watched));
browser.storage.onChanged.addListener(changes => {
  if (changes.watched) watched = changes.watched.newValue ?? {};
});

function saveWatched() {
  browser.storage.local.set({ watched });
}

function videoId(href) {
  return href?.match(/(?:[?&]v=|\/shorts\/)([\w-]{11})/)?.[1] ?? null;
}

// Track watched videos: every /watch page gets recorded. The title can still be
// the generic "YouTube" right after navigation, so it is refreshed shortly after.

async function track() {
  if (location.pathname !== "/watch") return;
  const id = videoId(location.href);
  if (!id) return;
  await ready;
  watched[id] = { title: document.title };
  saveWatched();
  setTimeout(() => {
    if (videoId(location.href) === id && watched[id] && watched[id].title !== document.title) {
      watched[id] = { title: document.title };
      saveWatched();
    }
  }, 3000);
}
window.addEventListener("yt-navigate-finish", track);

// The "Shorts" filter chip (search results, home) carries no attribute, only
// its text, so it is tagged here for styles.css to hide. YouTube fills the text
// after the chip is in the DOM and reuses chips between pages, so every change
// inside a chip re-evaluates it.

const CHIP = "yt-chip-cloud-chip-renderer";

function tagShortsChip(chip) {
  chip.toggleAttribute("data-ytb-shorts", chip.textContent.trim() === "Shorts");
}

function tagShortsChips(root = document) {
  root.querySelectorAll(CHIP).forEach(tagShortsChip);
}

new MutationObserver(mutations => {
  for (const m of mutations) {
    const target = m.target.nodeType === 1 ? m.target : m.target.parentElement;
    const chip = target?.closest(CHIP);
    if (chip) tagShortsChip(chip);
    else for (const node of m.addedNodes) if (node.nodeType === 1) tagShortsChips(node);
  }
}).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
window.addEventListener("yt-navigate-finish", () => tagShortsChips());

// No video playback when hovering thumbnails.

window.addEventListener("mouseenter", event => {
  const selector = "#content.ytd-rich-item-renderer, #contents.ytd-item-section-renderer, #dismissible.ytd-compact-video-renderer";
  if (event.composedPath().some(el => el.matches?.(selector))) event.stopImmediatePropagation();
}, true);

// Previews that still start are kept muted.

const PREVIEW = "#inline-preview-player, ytd-video-preview, .ytd-video-preview, .ytp-inline-preview";

function mute(video) {
  if (!video.closest(PREVIEW)) return;
  video.muted = true;
  if (video.ytbMuted) return;
  video.ytbMuted = true;
  const remute = () => { if (!video.muted && video.closest(PREVIEW)) video.muted = true; };
  video.addEventListener("volumechange", remute);
  video.addEventListener("play", remute);
}

new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes") {
      if (mutation.target.nodeName === "VIDEO") mute(mutation.target);
      continue;
    }
    for (const node of mutation.addedNodes) {
      if (node.nodeName === "VIDEO") mute(node);
      else if (node.querySelectorAll) node.querySelectorAll("video").forEach(mute);
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
