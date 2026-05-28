const VOCAB_STORE_KEY = "italian-a1-a2-vocabulary";

const VOCAB_PRONOUNS = [
  ["io", "I"],
  ["tu", "you informal singular"],
  ["lui", "he"],
  ["lei", "she"],
  ["Lei", "you formal"],
  ["noi", "we"],
  ["voi", "you plural/informal"],
  ["loro", "they"],
  ["mi", "me/to me/myself"],
  ["ti", "you/to you/yourself"],
  ["lo", "him/it masculine"],
  ["la", "her/it feminine"],
  ["ci", "us/to us/ourselves/there"],
  ["vi", "you all/to you all/yourselves"],
  ["li", "them masculine/mixed"],
  ["le", "them feminine/to her"],
  ["gli", "to him/to them"],
  ["ne", "of it/of them/some"]
];

let vocabItems = [];
let vocabRound = [];
let vocabIndex = 0;
let vocabScore = 0;
let vocabCurrentGroup = "All";
let vocabStore = loadVocabStore();

function loadVocabStore() {
  try {
    return {
      correct: {},
      missed: {},
      seen: 0,
      ...JSON.parse(localStorage.getItem(VOCAB_STORE_KEY) || "{}")
    };
  } catch {
    return { correct: {}, missed: {}, seen: 0 };
  }
}

function saveVocabStore() {
  localStorage.setItem(VOCAB_STORE_KEY, JSON.stringify(vocabStore));
}

function vocabNormalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’]/g, "'")
    .replace(/[.,!?;:()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function vocabShuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function vocabEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function itemKey(item) {
  return vocabNormalize(`${item.group}|${item.it}|${item.en}`);
}

function splitMeanings(meaning) {
  const cleaned = String(meaning)
    .replace(/\([^)]*\)/g, "")
    .replace(/\bmasculine\b|\bfeminine\b|\bmixed\b|\binformal\b|\bformal\b|\bsingular\b|\bplural\b/gi, "")
    .trim();

  return [meaning, ...cleaned.split(/[\/;,]|\bor\b/i)]
    .map((part) => vocabNormalize(part))
    .filter((part) => part.length >= 2);
}

function isVocabCorrect(answer, item) {
  const response = vocabNormalize(answer);
  if (!response) return false;
  const accepted = splitMeanings(item.en);
  return accepted.some((meaning) => response === meaning || response.includes(meaning) || meaning.includes(response));
}

function addVocabButton() {
  const nav = document.querySelector(".mode-nav");
  if (!nav || document.querySelector("#vocabMode")) return;

  const button = document.createElement("button");
  button.className = "mode-button";
  button.id = "vocabMode";
  button.type = "button";
  button.innerHTML = `<span aria-hidden="true">A</span>Vocab`;
  button.addEventListener("click", renderVocabHome);
  nav.insertBefore(button, document.querySelector("#mistakesMode"));
}

function buildVocabItems() {
  if (vocabItems.length) return vocabItems;

  const items = [];
  if (typeof VOCAB_TOPICS !== "undefined") {
    VOCAB_TOPICS.forEach((topic) => {
      topic.terms.forEach((term) => {
        items.push({ it: term.it, en: term.en, group: topic.title, kind: "Nouns and topic words" });
      });
    });
  }

  if (typeof ADJECTIVES !== "undefined") {
    ADJECTIVES.forEach((adj) => {
      [adj.ms, adj.fs, adj.mp, adj.fp].forEach((form) => {
        if (form) items.push({ it: form, en: adj.en, group: "Adjectives", kind: "Adjectives" });
      });
    });
  }

  if (typeof VERBS !== "undefined") {
    VERBS.forEach((verb) => {
      items.push({ it: verb.inf, en: verb.en, group: "Verbs", kind: "Verbs" });
    });
  }

  VOCAB_PRONOUNS.forEach(([it, en]) => items.push({ it, en, group: "Pronouns", kind: "Pronouns" }));

  if (typeof QUESTION_WORDS !== "undefined") {
    QUESTION_WORDS.forEach(([it, en]) => items.push({ it, en, group: "Question words", kind: "Question words" }));
  }

  if (typeof CONNECTORS !== "undefined") {
    CONNECTORS.forEach(([it, en]) => items.push({ it, en, group: "Connectors and adverbs", kind: "Connectors" }));
  }

  if (typeof PREPOSITIONS !== "undefined") {
    PREPOSITIONS.forEach(([it, sentence, example, en]) => {
      items.push({ it, en, group: "Prepositions", kind: "Prepositions" });
    });
  }

  const seen = new Set();
  vocabItems = items.filter((item) => {
    const key = itemKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return vocabItems;
}

function vocabGroups() {
  return ["All", ...new Set(buildVocabItems().map((item) => item.group))];
}

function setVocabModeActive() {
  document.querySelectorAll(".mode-button").forEach((button) => button.classList.remove("active"));
  document.querySelector("#vocabMode")?.classList.add("active");
}

function renderVocabHome() {
  setVocabModeActive();
  document.querySelector("#stageEyebrow").textContent = "Italian to English";
  document.querySelector("#stageTitle").textContent = "Vocabulary practice";

  const items = buildVocabItems();
  const groups = vocabGroups();
  const weakCount = Object.keys(vocabStore.missed || {}).length;

  document.querySelector("#app").innerHTML = `
    <section class="vocab-panel">
      <div class="vocab-intro">
        <div>
          <p class="question-kicker">Full exam word list</p>
          <h2>Translate Italian words into English</h2>
          <p>Practice all ${items.length} words from your exam pack: topic vocabulary, adjective forms, verbs, pronouns, question words, connectors, and prepositions.</p>
        </div>
        <div class="vocab-counts" aria-label="Vocabulary progress">
          <div><strong>${items.length}</strong><span>words</span></div>
          <div><strong>${Object.keys(vocabStore.correct || {}).length}</strong><span>known</span></div>
          <div><strong>${weakCount}</strong><span>weak</span></div>
        </div>
      </div>

      <div class="vocab-controls">
        <label class="vocab-select-label" for="vocabGroup">Topic</label>
        <select id="vocabGroup" class="vocab-select">
          ${groups.map((group) => `<option value="${vocabEscape(group)}" ${group === vocabCurrentGroup ? "selected" : ""}>${vocabEscape(group)}</option>`).join("")}
        </select>
        <button class="primary-button" type="button" id="startVocabRound">Start 20-word round</button>
        <button class="ghost-button" type="button" id="startWeakRound" ${weakCount ? "" : "disabled"}>Weak words</button>
      </div>
    </section>
  `;

  document.querySelector("#vocabGroup").addEventListener("change", (event) => {
    vocabCurrentGroup = event.target.value;
  });
  document.querySelector("#startVocabRound").addEventListener("click", () => startVocabRound(false));
  document.querySelector("#startWeakRound").addEventListener("click", () => startVocabRound(true));
}

function startVocabRound(weakOnly) {
  const allItems = buildVocabItems();
  const pool = weakOnly
    ? allItems.filter((item) => vocabStore.missed[itemKey(item)])
    : allItems.filter((item) => vocabCurrentGroup === "All" || item.group === vocabCurrentGroup);

  vocabRound = vocabShuffle(pool).slice(0, 20);
  vocabIndex = 0;
  vocabScore = 0;
  renderVocabQuestion();
}

function renderVocabQuestion(result = null) {
  const item = vocabRound[vocabIndex];
  if (!item) {
    renderVocabHome();
    return;
  }

  const progress = Math.round((vocabIndex / vocabRound.length) * 100);
  document.querySelector("#stageEyebrow").textContent = `${item.group} · ${vocabIndex + 1}/${vocabRound.length}`;
  document.querySelector("#stageTitle").textContent = "Vocabulary practice";
  document.querySelector("#app").innerHTML = `
    <article class="question-panel vocab-question-panel">
      <header class="lesson-header">
        <div>
          <span class="pill">${vocabEscape(item.kind)}</span>
          <h2>Translate to English</h2>
        </div>
        <div class="lesson-header-tools">
          <button class="ghost-button unit-exit-button" type="button" id="vocabExit">Vocab</button>
          <div class="progress-track" aria-label="Vocabulary progress">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
      </header>
      <div class="question-body">
        <p class="question-kicker">Italian</p>
        <div class="prompt">${vocabEscape(item.it)}</div>
        <p class="hint">Type the English meaning. Short answers are accepted when the word has several meanings.</p>
        <div class="type-row">
          <input class="answer-input" id="vocabAnswer" type="text" autocomplete="off" ${result ? "disabled" : ""} value="${result ? vocabEscape(result.answer) : ""}" />
          <button class="primary-button" type="button" id="vocabCheck" ${result ? "disabled" : ""}>Check</button>
        </div>
        ${result ? renderVocabFeedback(item, result) : ""}
      </div>
    </article>
  `;

  document.querySelector("#vocabExit").addEventListener("click", renderVocabHome);

  if (result) {
    document.querySelector("#vocabNext").addEventListener("click", () => {
      vocabIndex += 1;
      if (vocabIndex >= vocabRound.length) renderVocabResult();
      else renderVocabQuestion();
    });
    return;
  }

  const input = document.querySelector("#vocabAnswer");
  input.focus();
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkVocabAnswer();
  });
  document.querySelector("#vocabCheck").addEventListener("click", checkVocabAnswer);
}

function checkVocabAnswer() {
  const item = vocabRound[vocabIndex];
  const answer = document.querySelector("#vocabAnswer").value;
  const correct = isVocabCorrect(answer, item);
  const key = itemKey(item);

  vocabStore.seen = (vocabStore.seen || 0) + 1;
  if (correct) {
    vocabScore += 1;
    vocabStore.correct[key] = (vocabStore.correct[key] || 0) + 1;
    delete vocabStore.missed[key];
  } else {
    vocabStore.missed[key] = { it: item.it, en: item.en, group: item.group, kind: item.kind, lastAnswer: answer };
  }
  saveVocabStore();
  renderVocabQuestion({ correct, answer });
}

function renderVocabFeedback(item, result) {
  return `
    <div class="feedback show ${result.correct ? "good" : "bad"}">
      <strong>${result.correct ? "Correct" : "Correct answer"}: ${vocabEscape(item.en)}</strong>
      ${result.correct ? "" : `<br>Your answer: ${vocabEscape(result.answer || "blank")}`}
      <div class="action-row">
        <button class="primary-button" type="button" id="vocabNext">${vocabIndex === vocabRound.length - 1 ? "Finish" : "Continue"}</button>
      </div>
    </div>
  `;
}

function renderVocabResult() {
  const accuracy = vocabRound.length ? Math.round((vocabScore / vocabRound.length) * 100) : 0;
  document.querySelector("#stageEyebrow").textContent = "Round complete";
  document.querySelector("#stageTitle").textContent = "Vocabulary practice";
  document.querySelector("#app").innerHTML = `
    <section class="result-panel">
      <h2>Vocabulary round complete</h2>
      <p>${accuracy >= 80 ? "Strong vocabulary round. Keep rotating topics." : "Good diagnostic. Missed words were saved into Weak words."}</p>
      <div class="result-score">
        <div><strong>${accuracy}%</strong><span>accuracy</span></div>
        <div><strong>${vocabScore}/${vocabRound.length}</strong><span>correct</span></div>
        <div><strong>${Object.keys(vocabStore.missed || {}).length}</strong><span>weak words</span></div>
      </div>
      <div class="action-row">
        <button class="primary-button" type="button" id="vocabAgain">New round</button>
        <button class="ghost-button" type="button" id="vocabWeak">Weak words</button>
        <button class="ghost-button" type="button" id="vocabHome">Vocab home</button>
      </div>
    </section>
  `;
  document.querySelector("#vocabAgain").addEventListener("click", () => startVocabRound(false));
  document.querySelector("#vocabWeak").addEventListener("click", () => startVocabRound(true));
  document.querySelector("#vocabHome").addEventListener("click", renderVocabHome);
}

addVocabButton();
