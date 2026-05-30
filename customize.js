function unlockPracticePath() {
  document.querySelectorAll(".lesson-card").forEach((card) => {
    if (card.classList.contains("locked")) {
      card.classList.remove("locked");
    }

    if (card.disabled) {
      card.disabled = false;
      card.removeAttribute("disabled");
    }

    const action = card.querySelector(".lesson-action");
    if (!action) return;

    const desiredLabel = card.classList.contains("complete") ? "Review" : "Start";
    if (action.textContent !== desiredLabel) {
      action.textContent = desiredLabel;
    }
  });
}

function goToPath() {
  if (typeof window.renderLessonPath === "function") {
    window.renderLessonPath();
  } else if (typeof window.renderHome === "function") {
    window.renderHome();
  } else {
    document.querySelector("#pathMode")?.click();
  }
  window.setTimeout(unlockPracticePath, 0);
}

function addExitButton() {
  const header = document.querySelector(".lesson-header");
  if (!header || header.querySelector(".unit-exit-button")) return;

  const progress = header.querySelector(".progress-track");
  const tools = document.createElement("div");
  tools.className = "lesson-header-tools";

  const exitButton = document.createElement("button");
  exitButton.className = "ghost-button unit-exit-button";
  exitButton.type = "button";
  exitButton.textContent = "Path";
  exitButton.title = "Leave this unit and return to the lesson path";
  exitButton.addEventListener("click", goToPath);

  tools.append(exitButton);
  if (progress) {
    tools.append(progress);
  }
  header.append(tools);
}

let pendingLearnScrollTarget = null;

function scrollPendingLearnTarget() {
  if (!pendingLearnScrollTarget) return;
  const selector = pendingLearnScrollTarget === "category" ? ".learn-category-page" : ".learn-category-index";
  const target = document.querySelector(selector);
  pendingLearnScrollTarget = null;
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ block: "start" });
  });
}

function enhanceCurrentScreen() {
  unlockPracticePath();
  addExitButton();
  scrollPendingLearnTarget();
}

let enhancePending = false;
function scheduleEnhance() {
  if (enhancePending) return;
  enhancePending = true;
  window.requestAnimationFrame(() => {
    enhancePending = false;
    enhanceCurrentScreen();
  });
}

function loadStylesheetOnce(href, marker) {
  if (document.querySelector(`link[href*="${marker}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.append(link);
}

function loadScriptOnce(src, marker) {
  if (document.querySelector(`script[src*="${marker}"]`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
  });
}

function loadPracticeExtensions() {
  loadStylesheetOnce("dark.css?v=2", "dark.css");
  loadStylesheetOnce("dashboard-exam.css?v=1", "dashboard-exam.css");
  loadStylesheetOnce("exercise-exam-bank.css?v=1", "exercise-exam-bank.css");
  loadScriptOnce("vocab-extras.js?v=1", "vocab-extras.js")
    .then(() => loadScriptOnce("vocab-direction.js?v=1", "vocab-direction.js"))
    .then(() => loadScriptOnce("practice-data.js?v=1", "practice-data.js"))
    .then(() => loadScriptOnce("practice-sections.js?v=1", "practice-sections.js"))
    .then(() => loadScriptOnce("practice-ui-helpers.js?v=1", "practice-ui-helpers.js"))
    .then(() => loadScriptOnce("learn-data.js?v=1", "learn-data.js"))
    .then(() => loadScriptOnce("learn-v2.js?v=2", "learn-v2.js"))
    .then(() => loadScriptOnce("learn-modal.js?v=1", "learn-modal.js"))
    .then(() => loadScriptOnce("dashboard-exam.js?v=1", "dashboard-exam.js"))
    .then(() => loadScriptOnce("dashboard-exam-polish.js?v=2", "dashboard-exam-polish.js"))
    .then(() => loadScriptOnce("exercise-exam-bank.js?v=1", "exercise-exam-bank.js"))
    .then(() => loadScriptOnce("free-navigation.js?v=1", "free-navigation.js"))
    .then(() => loadScriptOnce("legacy-free-navigation.js?v=1", "legacy-free-navigation.js"))
    .catch(() => {});
}

loadStylesheetOnce("dark.css?v=2", "dark.css");
loadStylesheetOnce("dashboard-exam.css?v=1", "dashboard-exam.css");
loadStylesheetOnce("exercise-exam-bank.css?v=1", "exercise-exam-bank.css");

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-folder]");
  const backButton = event.target.closest("#backToLearnCategories");
  if (categoryButton) pendingLearnScrollTarget = "category";
  if (backButton) pendingLearnScrollTarget = "index";
});

const practiceArea = document.querySelector("#app");
if (practiceArea) {
  enhanceCurrentScreen();
  new MutationObserver(scheduleEnhance).observe(practiceArea, {
    childList: true
  });
}

document.querySelector("#pathMode")?.addEventListener("click", scheduleEnhance);
document.querySelector("#mistakesMode")?.addEventListener("click", scheduleEnhance);
document.querySelector("#examMode")?.addEventListener("click", scheduleEnhance);

window.addEventListener("load", loadPracticeExtensions);
