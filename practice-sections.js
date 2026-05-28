(() => {
  const STORE_KEY = "italian-a1-a2-practice-sections";
  const categories = window.PRACTICE_CATEGORIES || [];
  if (!categories.length) return;

  let currentCategoryId = categories[0].id;
  let subtypeByCategory = Object.fromEntries(categories.map((category) => [category.id, "All"]));
  let round = [];
  let index = 0;
  let score = 0;
  let wordOrderSelection = [];
  let store = loadStore();

  function loadStore() {
    try {
      return {
        correct: {},
        missed: {},
        attempts: {},
        seen: 0,
        ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}")
      };
    } catch {
      return { correct: {}, missed: {}, attempts: {}, seen: 0 };
    }
  }

  function saveStore() {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘`´]/g, "'")
      .replace(/\s*'\s*/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[.!?]+$/g, "")
      .replace(/[,:;()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stripArticle(value) {
    return normalize(value).replace(/^(il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/, "");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function nl2br(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function currentCategory() {
    return categories.find((category) => category.id === currentCategoryId) || categories[0];
  }

  function subtypes(category) {
    return ["All", ...new Set(category.exercises.map((exercise) => exercise.subtype))];
  }

  function keyFor(exercise) {
    return `${exercise.category}:${exercise.id}`;
  }

  function weakExercises(category) {
    return category.exercises.filter((exercise) => store.missed[keyFor(exercise)]);
  }

  function knownCount(category) {
    return category.exercises.filter((exercise) => store.correct[keyFor(exercise)]).length;
  }

  function setActive(buttonId) {
    document.querySelectorAll(".mode-button").forEach((button) => button.classList.remove("active"));
    document.querySelector(`#${buttonId}`)?.classList.add("active");
  }

  function ensureNavigation() {
    const nav = document.querySelector(".mode-nav");
    if (!nav) return;

    let anchor = document.querySelector("#vocabMode") || document.querySelector("#pathMode");
    categories.forEach((category) => {
      const existing = document.querySelector(`#${category.navId}`);
      const button = existing ? existing.cloneNode(true) : document.createElement("button");
      button.className = "mode-button";
      button.id = category.navId;
      button.type = "button";
      button.innerHTML = `<span aria-hidden="true">${escapeHtml(category.icon)}</span>${escapeHtml(category.shortTitle)}`;
      button.addEventListener("click", () => renderCategoryHome(category.id));

      if (existing) {
        existing.replaceWith(button);
        anchor = button;
      } else if (anchor && anchor.parentElement === nav) {
        anchor.insertAdjacentElement("afterend", button);
        anchor = button;
      } else {
        nav.append(button);
        anchor = button;
      }
    });
  }

  function renderCategoryHome(categoryId = currentCategoryId) {
    currentCategoryId = categoryId;
    const category = currentCategory();
    const selectedSubtype = subtypeByCategory[category.id] || "All";
    const weakCount = weakExercises(category).length;
    const subtypeList = subtypes(category);

    setActive(category.navId);
    document.querySelector("#stageEyebrow").textContent = category.eyebrow;
    document.querySelector("#stageTitle").textContent = category.title;

    document.querySelector("#app").innerHTML = `
      <section class="vocab-panel practice-section-panel">
        <div class="vocab-intro">
          <div>
            <p class="question-kicker">Practice</p>
            <h2>${escapeHtml(category.title)}</h2>
            <p>${escapeHtml(category.description)}</p>
          </div>
          <div class="vocab-counts" aria-label="${escapeHtml(category.title)} progress">
            <div><strong>${category.exercises.length}</strong><span>exercises</span></div>
            <div><strong>${knownCount(category)}</strong><span>known</span></div>
            <div><strong>${weakCount}</strong><span>weak</span></div>
          </div>
        </div>

        <div class="exercise-subtype-grid" aria-label="Exercise subtypes">
          ${subtypeList.filter((subtype) => subtype !== "All").map((subtype) => {
            const count = category.exercises.filter((exercise) => exercise.subtype === subtype).length;
            return `<button class="exercise-subtype-card ${selectedSubtype === subtype ? "active-choice" : ""}" type="button" data-subtype="${escapeHtml(subtype)}">
              <strong>${escapeHtml(subtype)}</strong>
              <span>${count} exercise${count === 1 ? "" : "s"}</span>
            </button>`;
          }).join("")}
        </div>

        <div class="vocab-controls practice-controls">
          <label class="vocab-select-label" for="practiceSubtype">Subtype</label>
          <select id="practiceSubtype" class="vocab-select">
            ${subtypeList.map((subtype) => `<option value="${escapeHtml(subtype)}" ${subtype === selectedSubtype ? "selected" : ""}>${escapeHtml(subtype)}</option>`).join("")}
          </select>
          <button class="primary-button" type="button" id="startPracticeRound">Start round</button>
          <button class="ghost-button" type="button" id="startPracticeWeak" ${weakCount ? "" : "disabled"}>Weak items</button>
        </div>
      </section>
    `;

    document.querySelectorAll("[data-subtype]").forEach((button) => {
      button.addEventListener("click", () => {
        subtypeByCategory[category.id] = button.dataset.subtype;
        renderCategoryHome(category.id);
      });
    });

    document.querySelector("#practiceSubtype").addEventListener("change", (event) => {
      subtypeByCategory[category.id] = event.target.value;
    });
    document.querySelector("#startPracticeRound").addEventListener("click", () => startRound(false));
    document.querySelector("#startPracticeWeak").addEventListener("click", () => startRound(true));
  }

  function startRound(weakOnly) {
    const category = currentCategory();
    const selectedSubtype = subtypeByCategory[category.id] || "All";
    const pool = weakOnly
      ? weakExercises(category)
      : category.exercises.filter((exercise) => selectedSubtype === "All" || exercise.subtype === selectedSubtype);

    round = shuffle(pool).slice(0, Math.min(12, pool.length));
    index = 0;
    score = 0;
    wordOrderSelection = [];
    renderExercise();
  }

  function promptLabel(exercise) {
    if (exercise.situation) return `${exercise.subtype} · ${exercise.situation}`;
    return exercise.subtype;
  }

  function renderExercise(result = null) {
    const category = currentCategory();
    const exercise = round[index];
    if (!exercise) {
      renderCategoryHome(category.id);
      return;
    }

    const progress = Math.round((index / round.length) * 100);
    document.querySelector("#stageEyebrow").textContent = `${category.title} · ${index + 1}/${round.length}`;
    document.querySelector("#stageTitle").textContent = exercise.subtype;
    document.querySelector("#app").innerHTML = `
      <article class="question-panel practice-question-panel">
        <header class="lesson-header">
          <div>
            <span class="pill">${escapeHtml(promptLabel(exercise))}</span>
            <h2>${escapeHtml(category.title)}</h2>
          </div>
          <div class="lesson-header-tools">
            <button class="ghost-button unit-exit-button" type="button" id="practiceExit">${escapeHtml(category.shortTitle)}</button>
            <div class="progress-track" aria-label="Practice progress">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
        </header>
        <div class="question-body">
          ${exercise.situation ? `<p class="question-kicker">${escapeHtml(exercise.situation)}</p>` : ""}
          <div class="prompt practice-prompt">${nl2br(exercise.prompt)}</div>
          ${renderFocusTags(exercise)}
          ${renderInteraction(exercise, result)}
          ${result ? renderFeedback(exercise, result) : ""}
        </div>
      </article>
    `;

    document.querySelector("#practiceExit").addEventListener("click", () => renderCategoryHome(category.id));

    if (result) {
      document.querySelector("#practiceNext").addEventListener("click", () => {
        index += 1;
        wordOrderSelection = [];
        if (index >= round.length) renderResult();
        else renderExercise();
      });
      return;
    }

    attachInteractionHandlers(exercise);
  }

  function renderFocusTags(exercise) {
    if (!exercise.focusTags?.length) return "";
    return `<div class="practice-tags">${exercise.focusTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`;
  }

  function renderInteraction(exercise, result) {
    if (exercise.interaction === "choice") {
      return `<div class="choice-grid practice-choice-grid">
        ${exercise.options.map((option) => `<button class="choice-card" type="button" data-choice="${escapeHtml(option)}" ${result ? "disabled" : ""}>${escapeHtml(option)}</button>`).join("")}
      </div>`;
    }

    if (exercise.interaction === "multi-blank") {
      const answers = result?.answer || [];
      return `<div class="multi-blank-grid">
        ${exercise.answers.map((_, blankIndex) => `<label>Blank ${blankIndex + 1}<input class="answer-input practice-blank" data-blank="${blankIndex}" type="text" autocomplete="off" ${result ? "disabled" : ""} value="${escapeHtml(answers[blankIndex] || "")}" /></label>`).join("")}
        ${result ? "" : `<button class="primary-button" type="button" id="practiceCheck">Check</button>`}
      </div>`;
    }

    if (exercise.interaction === "word-order") {
      return `<div class="word-order-tool">
        <div class="word-order-answer" id="wordOrderAnswer" aria-label="Built sentence">${escapeHtml(wordOrderSelection.join(" ")) || "Choose words below"}</div>
        <div class="word-bank">
          ${exercise.wordBank.map((word, wordIndex) => `<button class="chip-button" type="button" data-word-index="${wordIndex}" ${wordOrderSelection.includes(wordIndex) || result ? "disabled" : ""}>${escapeHtml(word)}</button>`).join("")}
        </div>
        <div class="action-row">
          ${result ? "" : `<button class="ghost-button" type="button" id="wordOrderReset">Reset</button><button class="primary-button" type="button" id="practiceCheck">Check</button>`}
        </div>
      </div>`;
    }

    if (exercise.interaction === "guided-writing") {
      return `<div class="guided-writing-tool">
        ${renderRequirements(exercise)}
        <textarea class="answer-input practice-textarea" id="practiceAnswer" rows="6" autocomplete="off" ${result ? "disabled" : ""}>${escapeHtml(result?.answer || "")}</textarea>
        ${result ? "" : `<button class="primary-button" type="button" id="practiceCheck">Check</button>`}
      </div>`;
    }

    if (exercise.interaction === "category-recall") {
      return `<div class="guided-writing-tool">
        <p class="hint">Separate words with commas, spaces, or new lines.</p>
        <textarea class="answer-input practice-textarea" id="practiceAnswer" rows="4" autocomplete="off" ${result ? "disabled" : ""}>${escapeHtml(result?.answer || "")}</textarea>
        ${result ? "" : `<button class="primary-button" type="button" id="practiceCheck">Check</button>`}
      </div>`;
    }

    return `<div class="type-row">
      <input class="answer-input" id="practiceAnswer" type="text" autocomplete="off" ${result ? "disabled" : ""} value="${escapeHtml(result?.answer || "")}" />
      ${result ? "" : `<button class="primary-button" type="button" id="practiceCheck">Check</button>`}
    </div>`;
  }

  function renderRequirements(exercise) {
    const required = [...(exercise.requiredWords || [])];
    if (exercise.requiredAny?.length) {
      exercise.requiredAny.forEach((group) => required.push(group.join(" / ")));
    }
    if (!required.length && !exercise.minSentences) return "";

    return `<div class="practice-requirements">
      ${exercise.minSentences ? `<span>${exercise.minSentences}+ sentences</span>` : ""}
      ${required.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
    </div>`;
  }

  function attachInteractionHandlers(exercise) {
    if (exercise.interaction === "choice") {
      document.querySelectorAll("[data-choice]").forEach((button) => {
        button.addEventListener("click", () => submitAnswer(button.dataset.choice));
      });
      return;
    }

    if (exercise.interaction === "word-order") {
      document.querySelectorAll("[data-word-index]").forEach((button) => {
        button.addEventListener("click", () => {
          wordOrderSelection.push(Number(button.dataset.wordIndex));
          renderExercise();
        });
      });
      document.querySelector("#wordOrderReset")?.addEventListener("click", () => {
        wordOrderSelection = [];
        renderExercise();
      });
      document.querySelector("#practiceCheck")?.addEventListener("click", () => {
        submitAnswer(wordOrderSelection.map((wordIndex) => exercise.wordBank[wordIndex]).join(" "));
      });
      return;
    }

    if (exercise.interaction === "multi-blank") {
      document.querySelector("#practiceCheck")?.addEventListener("click", () => {
        const answers = [...document.querySelectorAll(".practice-blank")].map((input) => input.value);
        submitAnswer(answers);
      });
      document.querySelectorAll(".practice-blank").forEach((input) => {
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            const answers = [...document.querySelectorAll(".practice-blank")].map((field) => field.value);
            submitAnswer(answers);
          }
        });
      });
      document.querySelector(".practice-blank")?.focus();
      return;
    }

    const input = document.querySelector("#practiceAnswer");
    input?.focus();
    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && exercise.interaction !== "guided-writing" && exercise.interaction !== "category-recall") {
        submitAnswer(input.value);
      }
    });
    document.querySelector("#practiceCheck")?.addEventListener("click", () => submitAnswer(input?.value || ""));
  }

  function submitAnswer(answer) {
    const exercise = round[index];
    const evaluation = evaluateExercise(exercise, answer);
    const key = keyFor(exercise);

    store.seen = (store.seen || 0) + 1;
    store.attempts[key] = (store.attempts[key] || 0) + 1;
    if (evaluation.correct) {
      score += 1;
      store.correct[key] = (store.correct[key] || 0) + 1;
      delete store.missed[key];
    } else {
      store.missed[key] = { answer, expected: displayAnswer(exercise), subtype: exercise.subtype, lastTried: new Date().toISOString() };
    }
    saveStore();
    renderExercise({ correct: evaluation.correct, answer, detail: evaluation.detail });
  }

  function evaluateExercise(exercise, answer) {
    if (exercise.interaction === "choice" || exercise.interaction === "typed") {
      const accepted = exercise.acceptedAnswers || [exercise.answer];
      const correct = accepted.some((acceptedAnswer) => normalize(answer) === normalize(acceptedAnswer));
      return { correct };
    }

    if (exercise.interaction === "multi-blank") {
      const responses = Array.isArray(answer) ? answer : [];
      const correct = exercise.answers.every((expected, answerIndex) => {
        const accepted = exercise.acceptedAnswers?.[answerIndex] || [expected];
        return accepted.some((acceptedAnswer) => normalize(responses[answerIndex]) === normalize(acceptedAnswer));
      });
      return { correct, detail: `${responses.filter((response) => normalize(response)).length}/${exercise.answers.length} blanks filled` };
    }

    if (exercise.interaction === "word-order") {
      return { correct: normalize(answer) === normalize(exercise.answer) };
    }

    if (exercise.interaction === "category-recall") {
      const accepted = new Set((exercise.acceptedAnswers || []).map((item) => stripArticle(item)));
      const responses = normalize(answer)
        .split(/[\s,;\n]+/)
        .map((item) => stripArticle(item))
        .filter(Boolean);
      const matched = new Set(responses.filter((item) => accepted.has(item)));
      const needed = exercise.requiredCount || 5;
      return { correct: matched.size >= needed, detail: `Found ${matched.size}/${needed} accepted words` };
    }

    if (exercise.interaction === "guided-writing") {
      const text = normalize(answer);
      const requiredWords = exercise.requiredWords || [];
      const requiredAny = exercise.requiredAny || [];
      let matches = requiredWords.filter((word) => text.includes(normalize(word))).length;
      matches += requiredAny.filter((group) => group.some((word) => text.includes(normalize(word)))).length;
      const needed = exercise.minRequiredMatches || requiredWords.length + requiredAny.length || 1;
      const sentenceCount = countSentences(answer);
      const sentenceOk = !exercise.minSentences || sentenceCount >= exercise.minSentences;
      return {
        correct: matches >= needed && sentenceOk,
        detail: `${matches}/${needed} required items${exercise.minSentences ? `, ${sentenceCount}/${exercise.minSentences} sentences` : ""}`
      };
    }

    return { correct: false };
  }

  function countSentences(value) {
    const text = String(value || "").trim();
    if (!text) return 0;
    const punctuated = text.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
    const lines = text.split(/\n+/).map((part) => part.trim()).filter(Boolean).length;
    return Math.max(punctuated, lines);
  }

  function displayAnswer(exercise) {
    if (exercise.fullAnswer) return exercise.fullAnswer;
    if (exercise.modelAnswer) return exercise.modelAnswer;
    if (exercise.answers) return exercise.answers.join(" / ");
    if (exercise.answer) return exercise.answer;
    if (exercise.requiredCount) return `${exercise.requiredCount} correct words from the category`;
    return "See explanation";
  }

  function renderFeedback(exercise, result) {
    return `
      <div class="feedback show ${result.correct ? "good" : "bad"}">
        <strong>${result.correct ? "Correct" : "Correct answer"}: ${escapeHtml(displayAnswer(exercise))}</strong>
        ${result.detail ? `<br>${escapeHtml(result.detail)}` : ""}
        ${result.correct ? "" : `<br>Your answer: ${escapeHtml(Array.isArray(result.answer) ? result.answer.join(" / ") : result.answer || "blank")}`}
        <p>${escapeHtml(exercise.explanation)}</p>
        <div class="action-row">
          <button class="primary-button" type="button" id="practiceNext">${index === round.length - 1 ? "Finish" : "Continue"}</button>
        </div>
      </div>
    `;
  }

  function renderResult() {
    const category = currentCategory();
    const accuracy = round.length ? Math.round((score / round.length) * 100) : 0;
    document.querySelector("#stageEyebrow").textContent = "Round complete";
    document.querySelector("#stageTitle").textContent = category.title;
    document.querySelector("#app").innerHTML = `
      <section class="result-panel">
        <h2>${escapeHtml(category.title)} round complete</h2>
        <p>${accuracy >= 80 ? "Strong round. Try a different subtype next." : "Good diagnostic. Missed exercises were saved as weak items."}</p>
        <div class="result-score">
          <div><strong>${accuracy}%</strong><span>accuracy</span></div>
          <div><strong>${score}/${round.length}</strong><span>correct</span></div>
          <div><strong>${weakExercises(category).length}</strong><span>weak items</span></div>
        </div>
        <div class="action-row">
          <button class="primary-button" type="button" id="practiceAgain">New round</button>
          <button class="ghost-button" type="button" id="practiceWeak">Weak items</button>
          <button class="ghost-button" type="button" id="practiceHome">${escapeHtml(category.shortTitle)} home</button>
        </div>
      </section>
    `;
    document.querySelector("#practiceAgain").addEventListener("click", () => startRound(false));
    document.querySelector("#practiceWeak").addEventListener("click", () => startRound(true));
    document.querySelector("#practiceHome").addEventListener("click", () => renderCategoryHome(category.id));
  }

  ensureNavigation();
  window.renderPracticeCategory = renderCategoryHome;
})();
