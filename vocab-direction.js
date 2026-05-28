(() => {
  const STORE_KEY = "italian-a1-a2-vocabulary-direction";
  let direction = localStorage.getItem("italian-a1-a2-vocab-direction") || "it-en";
  let round = [];
  let index = 0;
  let score = 0;
  let currentGroup = "All";
  let store = loadStore();

  function loadStore() {
    try {
      return {
        correct: {},
        missed: {},
        seen: 0,
        ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}")
      };
    } catch {
      return { correct: {}, missed: {}, seen: 0 };
    }
  }

  function saveStore() {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
    localStorage.setItem("italian-a1-a2-vocab-direction", direction);
  }

  function normalize(value) {
    return String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’]/g, "'")
      .replace(/[.,!?;:()]/g, "")
      .replace(/^to\s+/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function itemKey(item) {
    return normalize(`${direction}|${item.group}|${item.it}|${item.en}`);
  }

  function splitMeanings(meaning) {
    const cleaned = String(meaning)
      .replace(/\([^)]*\)/g, "")
      .replace(/\bmasculine\b|\bfeminine\b|\bmixed\b|\binformal\b|\bformal\b|\bsingular\b|\bplural\b/gi, "")
      .trim();

    return [meaning, ...cleaned.split(/[\/;,]|\bor\b/i)]
      .map((part) => normalize(part))
      .filter((part) => part.length >= 2);
  }

  function articlelessItalian(value) {
    return normalize(value).replace(/^(il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/, "");
  }

  function isCorrect(answer, item) {
    const response = normalize(answer);
    if (!response) return false;

    if (direction === "it-en") {
      const accepted = splitMeanings(item.en);
      return accepted.some((meaning) => response === meaning || response.includes(meaning) || meaning.includes(response));
    }

    const exact = normalize(item.it);
    const withoutArticle = articlelessItalian(item.it);
    return response === exact || response === withoutArticle;
  }

  function promptFor(item) {
    return direction === "it-en" ? item.it : item.en;
  }

  function answerFor(item) {
    return direction === "it-en" ? item.en : item.it;
  }

  function directionLabel() {
    return direction === "it-en" ? "Italian to English" : "English to Italian";
  }

  function allItems() {
    if (typeof window.buildVocabItems === "function") {
      return window.buildVocabItems();
    }
    return [];
  }

  function groups() {
    return ["All", ...new Set(allItems().map((item) => item.group))];
  }

  function weakItems() {
    return allItems().filter((item) => store.missed[itemKey(item)]);
  }

  function setActive() {
    document.querySelectorAll(".mode-button").forEach((button) => button.classList.remove("active"));
    document.querySelector("#vocabMode")?.classList.add("active");
  }

  function ensureButton() {
    const nav = document.querySelector(".mode-nav");
    if (!nav) return;

    const existing = document.querySelector("#vocabMode");
    const button = existing ? existing.cloneNode(true) : document.createElement("button");
    button.className = "mode-button";
    button.id = "vocabMode";
    button.type = "button";
    button.innerHTML = `<span aria-hidden="true">A</span>Vocab`;
    button.addEventListener("click", renderHome);

    if (existing) {
      existing.replaceWith(button);
    } else {
      nav.insertBefore(button, document.querySelector("#mistakesMode"));
    }
  }

  function renderHome() {
    setActive();
    document.querySelector("#stageEyebrow").textContent = directionLabel();
    document.querySelector("#stageTitle").textContent = "Vocabulary practice";

    const items = allItems();
    const weakCount = weakItems().length;
    const groupOptions = groups();

    document.querySelector("#app").innerHTML = `
      <section class="vocab-panel">
        <div class="vocab-intro">
          <div>
            <p class="question-kicker">Full exam word list</p>
            <h2>Translate vocabulary both ways</h2>
            <p>Practice all ${items.length} words from your exam pack. Choose Italian to English for recognition, or English to Italian for active recall.</p>
          </div>
          <div class="vocab-counts" aria-label="Vocabulary progress">
            <div><strong>${items.length}</strong><span>words</span></div>
            <div><strong>${Object.keys(store.correct || {}).length}</strong><span>known</span></div>
            <div><strong>${weakCount}</strong><span>weak</span></div>
          </div>
        </div>

        <div class="vocab-direction-toggle" aria-label="Translation direction">
          <button class="chip-button ${direction === "it-en" ? "active-choice" : ""}" type="button" data-direction="it-en">Italian → English</button>
          <button class="chip-button ${direction === "en-it" ? "active-choice" : ""}" type="button" data-direction="en-it">English → Italian</button>
        </div>

        <div class="vocab-controls">
          <label class="vocab-select-label" for="vocabGroup">Topic</label>
          <select id="vocabGroup" class="vocab-select">
            ${groupOptions.map((group) => `<option value="${escapeHtml(group)}" ${group === currentGroup ? "selected" : ""}>${escapeHtml(group)}</option>`).join("")}
          </select>
          <button class="primary-button" type="button" id="startVocabRound">Start 20-word round</button>
          <button class="ghost-button" type="button" id="startWeakRound" ${weakCount ? "" : "disabled"}>Weak words</button>
        </div>
      </section>
    `;

    document.querySelectorAll("[data-direction]").forEach((button) => {
      button.addEventListener("click", () => {
        direction = button.dataset.direction;
        saveStore();
        renderHome();
      });
    });

    document.querySelector("#vocabGroup").addEventListener("change", (event) => {
      currentGroup = event.target.value;
    });
    document.querySelector("#startVocabRound").addEventListener("click", () => startRound(false));
    document.querySelector("#startWeakRound").addEventListener("click", () => startRound(true));
  }

  function startRound(weakOnly) {
    const pool = weakOnly
      ? weakItems()
      : allItems().filter((item) => currentGroup === "All" || item.group === currentGroup);

    round = shuffle(pool).slice(0, 20);
    index = 0;
    score = 0;
    renderQuestion();
  }

  function renderQuestion(result = null) {
    const item = round[index];
    if (!item) {
      renderHome();
      return;
    }

    const progress = Math.round((index / round.length) * 100);
    document.querySelector("#stageEyebrow").textContent = `${directionLabel()} · ${index + 1}/${round.length}`;
    document.querySelector("#stageTitle").textContent = "Vocabulary practice";
    document.querySelector("#app").innerHTML = `
      <article class="question-panel vocab-question-panel">
        <header class="lesson-header">
          <div>
            <span class="pill">${escapeHtml(item.group)}</span>
            <h2>${escapeHtml(directionLabel())}</h2>
          </div>
          <div class="lesson-header-tools">
            <button class="ghost-button unit-exit-button" type="button" id="vocabExit">Vocab</button>
            <div class="progress-track" aria-label="Vocabulary progress">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
        </header>
        <div class="question-body">
          <p class="question-kicker">${direction === "it-en" ? "Italian" : "English"}</p>
          <div class="prompt">${escapeHtml(promptFor(item))}</div>
          <p class="hint">${direction === "it-en" ? "Type the English meaning." : "Type the Italian word. Articles are accepted but not required for nouns."}</p>
          <div class="type-row">
            <input class="answer-input" id="vocabAnswer" type="text" autocomplete="off" ${result ? "disabled" : ""} value="${result ? escapeHtml(result.answer) : ""}" />
            <button class="primary-button" type="button" id="vocabCheck" ${result ? "disabled" : ""}>Check</button>
          </div>
          ${result ? renderFeedback(item, result) : ""}
        </div>
      </article>
    `;

    document.querySelector("#vocabExit").addEventListener("click", renderHome);

    if (result) {
      document.querySelector("#vocabNext").addEventListener("click", () => {
        index += 1;
        if (index >= round.length) renderResult();
        else renderQuestion();
      });
      return;
    }

    const input = document.querySelector("#vocabAnswer");
    input.focus();
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") checkAnswer();
    });
    document.querySelector("#vocabCheck").addEventListener("click", checkAnswer);
  }

  function checkAnswer() {
    const item = round[index];
    const answer = document.querySelector("#vocabAnswer").value;
    const correct = isCorrect(answer, item);
    const key = itemKey(item);

    store.seen = (store.seen || 0) + 1;
    if (correct) {
      score += 1;
      store.correct[key] = (store.correct[key] || 0) + 1;
      delete store.missed[key];
    } else {
      store.missed[key] = { it: item.it, en: item.en, group: item.group, direction, lastAnswer: answer };
    }
    saveStore();
    renderQuestion({ correct, answer });
  }

  function renderFeedback(item, result) {
    return `
      <div class="feedback show ${result.correct ? "good" : "bad"}">
        <strong>${result.correct ? "Correct" : "Correct answer"}: ${escapeHtml(answerFor(item))}</strong>
        ${result.correct ? "" : `<br>Your answer: ${escapeHtml(result.answer || "blank")}`}
        <div class="action-row">
          <button class="primary-button" type="button" id="vocabNext">${index === round.length - 1 ? "Finish" : "Continue"}</button>
        </div>
      </div>
    `;
  }

  function renderResult() {
    const accuracy = round.length ? Math.round((score / round.length) * 100) : 0;
    document.querySelector("#stageEyebrow").textContent = "Round complete";
    document.querySelector("#stageTitle").textContent = "Vocabulary practice";
    document.querySelector("#app").innerHTML = `
      <section class="result-panel">
        <h2>Vocabulary round complete</h2>
        <p>${accuracy >= 80 ? "Strong vocabulary round. Try the other direction next." : "Good diagnostic. Missed words were saved into Weak words."}</p>
        <div class="result-score">
          <div><strong>${accuracy}%</strong><span>accuracy</span></div>
          <div><strong>${score}/${round.length}</strong><span>correct</span></div>
          <div><strong>${weakItems().length}</strong><span>weak words</span></div>
        </div>
        <div class="action-row">
          <button class="primary-button" type="button" id="vocabAgain">New round</button>
          <button class="ghost-button" type="button" id="vocabWeak">Weak words</button>
          <button class="ghost-button" type="button" id="vocabHome">Vocab home</button>
        </div>
      </section>
    `;
    document.querySelector("#vocabAgain").addEventListener("click", () => startRound(false));
    document.querySelector("#vocabWeak").addEventListener("click", () => startRound(true));
    document.querySelector("#vocabHome").addEventListener("click", renderHome);
  }

  ensureButton();
  window.renderDirectionalVocabHome = renderHome;
})();
