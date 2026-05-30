(() => {
  if (window.__ITALIAN_EXAM_META_POLISH_V2__) return;
  window.__ITALIAN_EXAM_META_POLISH_V2__ = true;

  let pending = false;

  function updateExamScoreMeta() {
    const panel = document.querySelector(".exam-panel");
    if (!panel) return;

    const scoreCard = panel.querySelectorAll(".exam-meta-card")[3];
    if (!scoreCard) return;

    const value = scoreCard.querySelector("strong");
    const label = scoreCard.querySelector("span");
    if (!value || !label) return;

    const correct = String(value.textContent || "0/0").split("/")[0] || "0";
    const nextValue = `${correct}/125`;
    if (value.textContent !== nextValue) value.textContent = nextValue;
    if (label.textContent !== "score") label.textContent = "score";
  }

  function scheduleExamMetaUpdate() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(() => {
      pending = false;
      updateExamScoreMeta();
    });
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#openFullExam, #examMode, #checkExamExercise, #nextExamExercise, #restartExam, #examAgain")) return;
    scheduleExamMetaUpdate();
  });

  window.addEventListener("load", scheduleExamMetaUpdate);
  scheduleExamMetaUpdate();
})();
