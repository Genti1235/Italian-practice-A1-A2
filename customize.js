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
  if (typeof window.renderHome === "function") {
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

function enhanceCurrentScreen() {
  unlockPracticePath();
  addExitButton();
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

function loadVocabularyExtensions() {
  loadScriptOnce("vocab-extras.js?v=1", "vocab-extras.js")
    .then(() => loadScriptOnce("vocab-direction.js?v=1", "vocab-direction.js"))
    .catch(() => {});
}

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

window.addEventListener("load", loadVocabularyExtensions);
