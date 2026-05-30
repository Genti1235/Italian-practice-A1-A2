(() => {
  if (window.__ITALIAN_LEGACY_FREE_NAVIGATION__) return;
  window.__ITALIAN_LEGACY_FREE_NAVIGATION__ = true;

  const originalRenderQuestion = typeof renderQuestion === "function" ? renderQuestion : null;
  const originalCheckAnswer = typeof checkAnswer === "function" ? checkAnswer : null;
  const originalFinishSession = typeof finishSession === "function" ? finishSession : null;
  const originalSaveMistake = typeof saveMistake === "function" ? saveMistake : null;
  if (!originalRenderQuestion || !originalCheckAnswer || !originalFinishSession) return;

  function currentSession() {
    try {
      return typeof session !== "undefined" ? session : null;
    } catch {
      return null;
    }
  }

  function appNode() {
    try {
      return typeof app !== "undefined" ? app : document.querySelector("#app");
    } catch {
      return document.querySelector("#app");
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeLegacy(value) {
    return String(value ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘`´]/g, "'")
      .replace(/\s*'\s*/g, "'")
      .replace(/[.!?]+$/g, "")
      .replace(/[,:;()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function ensureDrafts(state) {
    if (!state.drafts) state.drafts = {};
    if (!state.chipPicks) state.chipPicks = {};
  }

  function legacyDraft(question, state) {
    ensureDrafts(state);
    if (question.type === "build") {
      return state.chipPicks[state.current] || [];
    }
    return state.drafts[state.current] || "";
  }

  function legacyDraftText(question, state) {
    const draft = legacyDraft(question, state);
    if (question.type === "build") {
      return draft.map((index) => question.chips[index]).join(" ");
    }
    return draft;
  }

  function saveLegacyDraft(question, state) {
    ensureDrafts(state);
    if (state.results[state.current]) return;
    if (question.type === "multiple" || question.type === "listen") {
      state.drafts[state.current] = document.querySelector("[data-choice-index].active-choice")?.dataset.choice || state.drafts[state.current] || "";
      return;
    }
    if (question.type === "type") {
      state.drafts[state.current] = document.querySelector("#answerInput")?.value || "";
      return;
    }
    state.drafts[state.current] = legacyDraftText(question, state);
  }

  function evaluateLegacyQuestion(question, response) {
    const accepted = question.accepted || [question.answer];
    return accepted.some((answer) => normalizeLegacy(answer) === normalizeLegacy(response));
  }

  function renderLegacyControl(question, result, state) {
    const disabled = result ? "disabled" : "";
    const draft = result?.response ?? legacyDraftText(question, state);

    if (question.type === "multiple" || question.type === "listen") {
      const listenButton = question.type === "listen" ? `<button class="speaker-button" type="button" id="speakButton" title="Play Italian audio">Play</button>` : "";
      return `${listenButton ? `<div class="action-row" style="margin-top: 0; margin-bottom: 16px;">${listenButton}</div>` : ""}
        <div class="option-grid">
          ${(question.choices || []).map((choice, index) => {
            const selected = normalizeLegacy(draft) === normalizeLegacy(choice);
            const correct = result && normalizeLegacy(choice) === normalizeLegacy(question.answer);
            const incorrect = result && selected && !result.correct;
            return `<button class="option-button ${selected ? "selected active-choice" : ""} ${correct ? "correct" : ""} ${incorrect ? "incorrect" : ""}" type="button" data-choice-index="${index}" data-choice="${escapeHtml(choice)}" ${disabled}>${escapeHtml(choice)}</button>`;
          }).join("")}
        </div>`;
    }

    if (question.type === "type") {
      return `<div class="type-row"><input class="answer-input" id="answerInput" type="text" autocomplete="off" ${disabled} value="${escapeHtml(draft)}" /></div>`;
    }

    const picks = state.chipPicks[state.current] || [];
    return `<div class="chip-answer" aria-label="Built sentence">
        ${picks.length ? picks.map((chipIndex) => `<button class="chip-button" type="button" data-remove-chip="${chipIndex}" ${disabled}>${escapeHtml(question.chips[chipIndex])}</button>`).join("") : `<span class="hint">Tap words below</span>`}
      </div>
      <div class="chip-grid">
        ${(question.chips || []).map((chip, index) => `<button class="chip-button ${picks.includes(index) ? "used" : ""}" type="button" data-chip-index="${index}" ${picks.includes(index) || result ? "disabled" : ""}>${escapeHtml(chip)}</button>`).join("")}
      </div>
      ${result ? "" : `<div class="action-row"><button class="ghost-button" type="button" id="clearChips">Clear</button></div>`}`;
  }

  function renderLegacyFeedback(question, result) {
    if (!result) return `<div class="feedback" id="feedback"></div>`;
    return `<div class="feedback show ${result.correct ? "good" : "bad"}">
      <strong>${result.correct ? "Correct" : "Correct answer"}: ${escapeHtml(question.answer)}</strong>
      ${question.explanation ? `<br>${escapeHtml(question.explanation)}` : ""}
      ${result.correct ? "" : `<br>Your answer: ${escapeHtml(result.response || "blank")}`}
    </div>`;
  }

  function renderLegacyQuestion() {
    const state = currentSession();
    const target = appNode();
    if (!state || !target || !state.questions?.length) {
      originalRenderQuestion();
      return;
    }

    ensureDrafts(state);
    const question = state.questions[state.current];
    const result = state.results[state.current];
    const progress = Math.round((state.current / state.questions.length) * 100);

    target.innerHTML = `<article class="question-panel">
      <header class="lesson-header">
        <div><span class="pill">${escapeHtml(state.lesson.unit)} · ${escapeHtml(state.lesson.level)}</span><h2>${escapeHtml(state.lesson.title)}</h2></div>
        <div class="lesson-header-tools"><button class="ghost-button unit-exit-button" type="button" id="legacyExit">Path</button><div class="progress-track" aria-label="Lesson progress"><div class="progress-fill" style="width: ${progress}%"></div></div></div>
      </header>
      <div class="question-body">
        <p class="question-kicker">${escapeHtml(question.kind)}</p>
        <div class="prompt">${escapeHtml(question.prompt)}</div>
        ${question.hint ? `<p class="hint">${escapeHtml(question.hint)}</p>` : ""}
        ${renderLegacyControl(question, result, state)}
        ${renderLegacyFeedback(question, result)}
        <div class="action-row">
          <button class="ghost-button" type="button" id="legacyBack" ${state.current === 0 ? "disabled" : ""}>Back</button>
          ${result ? `<button class="ghost-button" type="button" id="legacyEdit">Edit answer</button>` : `<button class="primary-button" type="button" id="legacyCheck">Check</button>`}
          <button class="primary-button" type="button" id="legacyNext">${state.current === state.questions.length - 1 ? "Finish" : "Next"}</button>
        </div>
      </div>
    </article>`;

    bindLegacyControls(question, state, result);
    try {
      if (typeof updateStats === "function") updateStats();
    } catch {}
  }

  function bindLegacyControls(question, state, result) {
    document.querySelector("#legacyExit")?.addEventListener("click", () => {
      if (typeof window.renderLessonPath === "function") window.renderLessonPath();
      else if (typeof renderHome === "function") renderHome();
    });

    document.querySelector("#legacyBack")?.addEventListener("click", () => moveLegacyQuestion(-1));
    document.querySelector("#legacyNext")?.addEventListener("click", () => moveLegacyQuestion(1));
    document.querySelector("#legacyCheck")?.addEventListener("click", () => checkLegacyQuestion());
    document.querySelector("#legacyEdit")?.addEventListener("click", () => {
      if (state.results[state.current]?.correct) state.score = Math.max(0, state.score - 1);
      delete state.results[state.current];
      renderLegacyQuestion();
    });

    document.querySelectorAll("[data-choice-index]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-choice-index]").forEach((item) => item.classList.remove("active-choice", "selected"));
        button.classList.add("active-choice", "selected");
        state.drafts[state.current] = button.dataset.choice;
      });
    });

    document.querySelectorAll("[data-chip-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.chipIndex);
        const picks = state.chipPicks[state.current] || [];
        if (!picks.includes(index)) state.chipPicks[state.current] = [...picks, index];
        renderLegacyQuestion();
      });
    });

    document.querySelectorAll("[data-remove-chip]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.removeChip);
        state.chipPicks[state.current] = (state.chipPicks[state.current] || []).filter((item) => item !== index);
        renderLegacyQuestion();
      });
    });

    document.querySelector("#clearChips")?.addEventListener("click", () => {
      state.chipPicks[state.current] = [];
      renderLegacyQuestion();
    });

    document.querySelector("#answerInput")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") checkLegacyQuestion();
    });
    document.querySelector("#answerInput")?.focus();

    const speakButton = document.querySelector("#speakButton");
    if (speakButton && typeof speakItalian === "function") {
      speakButton.addEventListener("click", () => speakItalian(question.listenText || question.answer));
    }
  }

  function checkLegacyQuestion() {
    const state = currentSession();
    if (!state) return;
    const question = state.questions[state.current];
    saveLegacyDraft(question, state);
    originalCheckAnswer(legacyDraftText(question, state));
  }

  function moveLegacyQuestion(step) {
    const state = currentSession();
    if (!state) return;
    const question = state.questions[state.current];
    saveLegacyDraft(question, state);
    const next = state.current + step;
    if (next < 0) return;
    if (next >= state.questions.length) {
      finishLegacyFreeNavigation(state);
      return;
    }
    state.current = next;
    renderLegacyQuestion();
  }

  function finishLegacyFreeNavigation(state) {
    state.questions.forEach((question, index) => {
      if (state.results[index]) return;
      const previousIndex = state.current;
      state.current = index;
      const response = legacyDraftText(question, state);
      const correct = evaluateLegacyQuestion(question, response);
      state.results[index] = { response, correct };
      if (!correct && originalSaveMistake) originalSaveMistake(question);
      state.current = previousIndex;
    });
    state.score = state.results.filter((result) => result?.correct).length;
    originalFinishSession();
  }

  try {
    renderQuestion = renderLegacyQuestion;
  } catch {}
})();
