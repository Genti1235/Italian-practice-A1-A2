function unlockPracticePath() {
  document.querySelectorAll(".lesson-card").forEach((card) => {
    card.classList.remove("locked");
    card.disabled = false;
    card.removeAttribute("disabled");

    const action = card.querySelector(".lesson-action");
    if (!action) return;
    action.textContent = card.classList.contains("complete") ? "Review" : "Start";
  });
}

const practiceArea = document.querySelector("#app");
if (practiceArea) {
  unlockPracticePath();
  new MutationObserver(unlockPracticePath).observe(practiceArea, {
    childList: true,
    subtree: true
  });
}
