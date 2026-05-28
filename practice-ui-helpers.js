(() => {
  function updateWordOrderPreview() {
    const answer = document.querySelector("#wordOrderAnswer");
    if (!answer || document.querySelector(".feedback")) return;

    const raw = answer.textContent.trim();
    if (!/^\d+( \d+)*$/.test(raw)) return;

    const buttons = [...document.querySelectorAll(".word-bank .chip-button")];
    const words = raw
      .split(" ")
      .map((index) => buttons[Number(index)]?.textContent.trim())
      .filter(Boolean);

    if (words.length) {
      answer.textContent = words.join(" ");
    }
  }

  const app = document.querySelector("#app");
  if (app) {
    new MutationObserver(updateWordOrderPreview).observe(app, { childList: true, subtree: true });
  }
})();
