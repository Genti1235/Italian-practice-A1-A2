(() => {
  if (window.__ITALIAN_CONTEXTUAL_BACK__) return;
  window.__ITALIAN_CONTEXTUAL_BACK__ = true;

  let scheduled = false;

  function app() {
    return document.querySelector("#app");
  }

  function visible(selector) {
    const node = document.querySelector(selector);
    if (!node || node.disabled) return null;
    return node.offsetParent === null && getComputedStyle(node).position !== "fixed" ? node : node;
  }

  function clickFirst(selectors) {
    for (const selector of selectors) {
      const node = visible(selector);
      if (node) {
        node.click();
        return true;
      }
    }
    return false;
  }

  function openExerciseMenu() {
    if (typeof window.renderExamTaskBank === "function") {
      window.renderExamTaskBank();
      return;
    }

    if (typeof window.renderDashboardHome === "function") {
      window.renderDashboardHome();
      window.setTimeout(() => document.querySelector("#openExerciseMenu")?.click(), 0);
      return;
    }

    document.querySelector("#openExerciseMenu")?.click();
  }

  function goBack() {
    if (clickFirst([
      "#practiceBack:not([disabled])",
      "#vocabBack:not([disabled])",
      "#prevExamExercise:not([disabled])",
      "#prevExamPracticeSet:not([disabled])",
      "#legacyBack:not([disabled])",
      "#backToLearnCategories:not([disabled])"
    ])) return;

    if (document.querySelector(".practice-question-panel")) {
      document.querySelector("#practiceExit")?.click();
      return;
    }

    if (document.querySelector(".vocab-question-panel")) {
      document.querySelector("#vocabExit")?.click();
      return;
    }

    if (document.querySelector(".practice-section-panel") || document.querySelector(".vocab-panel")) {
      openExerciseMenu();
      return;
    }

    if (document.querySelector(".exercise-hub")) {
      window.renderDashboardHome?.();
      return;
    }

    if (document.querySelector(".learn-category-page")) {
      document.querySelector("#backToLearnCategories")?.click();
      return;
    }

    if (document.querySelector(".learn-shell") || document.querySelector(".learn-category-index")) {
      window.renderDashboardHome?.();
      return;
    }

    if (document.querySelector(".exam-panel") || document.querySelector(".exam-result-panel")) {
      window.renderDashboardHome?.();
      return;
    }

    window.renderDashboardHome?.();
  }

  function ensureTopbarBack() {
    const topbar = document.querySelector(".topbar");
    if (!topbar) return;

    let button = document.querySelector("#globalBackButton");
    if (!button) {
      button = document.createElement("button");
      button.className = "ghost-button";
      button.id = "globalBackButton";
      button.type = "button";
      button.textContent = "Back";
      button.title = "Go back one level";
      button.addEventListener("click", goBack);
    }

    const reset = document.querySelector("#resetButton");
    const container = reset?.parentElement || topbar;
    const reference = reset?.parentElement === container ? reset : null;

    if (button.parentElement !== container) {
      button.remove();
      container.insertBefore(button, reference);
      return;
    }

    if (reference && button.nextElementSibling !== reference) {
      container.insertBefore(button, reference);
    }
  }

  function addButton(container, id, label, handler) {
    if (!container || document.querySelector(`#${id}`)) return;
    const button = document.createElement("button");
    button.className = "ghost-button";
    button.id = id;
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", handler);
    container.prepend(button);
  }

  function ensureLocalBacks() {
    addButton(document.querySelector(".practice-section-panel .practice-controls"), "practiceSectionExerciseMenu", "Exercise menu", openExerciseMenu);
    addButton(document.querySelector(".vocab-panel:not(.practice-section-panel) .vocab-controls"), "vocabExerciseMenu", "Exercise menu", openExerciseMenu);

    const examTitle = document.querySelector(".exam-panel .dashboard-section-title");
    if (examTitle && !document.querySelector("#examPanelBackHome") && !document.querySelector("#examBackMenu")) {
      const button = document.createElement("button");
      button.className = "ghost-button";
      button.id = "examPanelBackHome";
      button.type = "button";
      button.textContent = "Menu";
      button.addEventListener("click", () => window.renderDashboardHome?.());
      examTitle.append(button);
    }
  }

  function refresh() {
    scheduled = false;
    ensureTopbarBack();
    ensureLocalBacks();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(refresh);
  }

  document.addEventListener("click", () => window.setTimeout(schedule, 0), true);
  window.addEventListener("load", schedule);
  schedule();

  const target = app();
  if (target) {
    new MutationObserver(schedule).observe(target, { childList: true, subtree: true });
  }
})();
