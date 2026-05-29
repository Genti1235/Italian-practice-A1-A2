(() => {
  if (window.__ITALIAN_EXAM_META_POLISH__) return;
  window.__ITALIAN_EXAM_META_POLISH__ = true;

  function updateExamScoreMeta() {
    const panel = document.querySelector(".exam-panel");
    if (!panel) return;

    const scoreCard = panel.querySelectorAll(".exam-meta-card")[3];
    if (!scoreCard) return;

    const value = scoreCard.querySelector("strong");
    const label = scoreCard.querySelector("span");
    if (!value || !label) return;

    const correct = String(value.textContent || "0/0").split("/")[0] || "0";
    value.textContent = `${correct}/125`;
    label.textContent = "score";
  }

  const app = document.querySelector("#app");
  if (app) {
    new MutationObserver(updateExamScoreMeta).observe(app, { childList: true, subtree: true });
  }
  updateExamScoreMeta();
})();
