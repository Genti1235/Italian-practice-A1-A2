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
  exitButton.addEventListener("click", () => {
    if (typeof window.renderHome === "function") {
      window.renderHome();
    }
    window.setTimeout(unlockPracticePath, 0);
  });

  tools.append(exitButton);
  if (progress) {
    tools.append(progress);
  }
  header.append(tools);
}

if (typeof window.renderHome === "function") {
  const originalRenderHome = window.renderHome;
  window.renderHome = function renderHomeUnlocked(...args) {
    const result = originalRenderHome.apply(this, args);
    unlockPracticePath();
    return result;
  };
}

if (typeof window.renderQuestion === "function") {
  const originalRenderQuestion = window.renderQuestion;
  window.renderQuestion = function renderQuestionWithExit(...args) {
    const result = originalRenderQuestion.apply(this, args);
    addExitButton();
    return result;
  };
}

document.querySelector("#pathMode")?.addEventListener("click", () => {
  window.setTimeout(unlockPracticePath, 0);
});

document.querySelector("#mistakesMode")?.addEventListener("click", () => {
  window.setTimeout(addExitButton, 0);
});

document.querySelector("#examMode")?.addEventListener("click", () => {
  window.setTimeout(addExitButton, 0);
});

unlockPracticePath();
addExitButton();
