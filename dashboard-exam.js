(() => {
  if (window.__ITALIAN_DASHBOARD_EXAM__) return;
  window.__ITALIAN_DASHBOARD_EXAM__ = true;

  const MAIN_STORE_KEY = "italian-a1-a2-practice";
  const FULL_EXAM_STORE_KEY = "italian-a1-a2-full-exam";
  const legacyRenderHome = typeof window.renderHome === "function" ? window.renderHome.bind(window) : null;
  let examState = null;

  const SUBJECTS = [
    { key: "io", label: "io", acceptedLabels: ["io"] },
    { key: "tu", label: "tu", acceptedLabels: ["tu"] },
    { key: "lui", label: "lui/lei", acceptedLabels: ["lui", "lei"] },
    { key: "noi", label: "noi", acceptedLabels: ["noi"] },
    { key: "voi", label: "voi", acceptedLabels: ["voi"] },
    { key: "loro", label: "loro", acceptedLabels: ["loro"] }
  ];

  const FALLBACK_TERMS = [
    { it: "il libro", plural: "i libri", en: "book", topic: "classroom", topicTitle: "Classroom" },
    { it: "la casa", plural: "le case", en: "house", topic: "home", topicTitle: "Home" },
    { it: "lo studente", plural: "gli studenti", en: "male student", topic: "personal", topicTitle: "Personal info" },
    { it: "l'amica", plural: "le amiche", en: "female friend", topic: "routine", topicTitle: "Routine" },
    { it: "la penna", plural: "le penne", en: "pen", topic: "classroom", topicTitle: "Classroom" }
  ];

  const FALLBACK_VERBS = [
    { inf: "essere", en: "to be", io: "sono", tu: "sei", lui: "è", noi: "siamo", voi: "siete", loro: "sono" },
    { inf: "avere", en: "to have", io: "ho", tu: "hai", lui: "ha", noi: "abbiamo", voi: "avete", loro: "hanno" },
    { inf: "studiare", en: "to study", io: "studio", tu: "studi", lui: "studia", noi: "studiamo", voi: "studiate", loro: "studiano" },
    { inf: "andare", en: "to go", io: "vado", tu: "vai", lui: "va", noi: "andiamo", voi: "andate", loro: "vanno" },
    { inf: "dormire", en: "to sleep", io: "dormo", tu: "dormi", lui: "dorme", noi: "dormiamo", voi: "dormite", loro: "dormono" }
  ];

  const FALLBACK_ADJECTIVES = [
    { ms: "italiano", fs: "italiana", mp: "italiani", fp: "italiane", en: "Italian" },
    { ms: "bello", fs: "bella", mp: "belli", fp: "belle", en: "beautiful" },
    { ms: "nuovo", fs: "nuova", mp: "nuovi", fp: "nuove", en: "new" },
    { ms: "rosso", fs: "rossa", mp: "rossi", fp: "rosse", en: "red" },
    { ms: "albanese", fs: "albanese", mp: "albanesi", fp: "albanesi", en: "Albanian" }
  ];

  const DIALOGUES = [
    {
      title: "Introducing yourself",
      lines: ["Ciao, come ti chiami?", "Mi chiamo Gent.", "Di dove sei?", "Sono di Podgorica.", "Piacere!"]
    },
    {
      title: "At a bar",
      lines: ["Buongiorno, vorrei un caffè.", "Certo, desidera altro?", "Un cornetto, per favore.", "Sono tre euro.", "Grazie, arrivederci."]
    },
    {
      title: "Asking for directions",
      lines: ["Scusi, dov'è la stazione?", "Vada dritto.", "Poi giri a destra.", "La stazione è vicino alla piazza.", "Grazie mille."]
    },
    {
      title: "At a hotel",
      lines: ["Buonasera, ho una prenotazione.", "A che nome?", "A nome Gent.", "Ecco la chiave della camera.", "Grazie, buona serata."]
    },
    {
      title: "Buying a train ticket",
      lines: ["Buongiorno, un biglietto per Roma.", "Solo andata o andata e ritorno?", "Solo andata, per favore.", "Il treno parte dal binario due.", "Grazie, arrivederci."]
    },
    {
      title: "Shopping for clothes",
      lines: ["Buongiorno, posso aiutarLa?", "Vorrei provare questa camicia.", "Che taglia porta?", "Porto la taglia media.", "Il camerino è a sinistra."]
    },
    {
      title: "Past weekend",
      lines: ["Che cosa hai fatto ieri?", "Ho studiato italiano.", "Poi sono uscito con amici.", "Abbiamo mangiato una pizza.", "È stato un bel fine settimana."]
    }
  ];

  const REGISTER_SENTENCES = [
    ["Come ti chiami?", "informal", "Ti is informal, used with friends, classmates, or people your age."],
    ["Come si chiama?", "formal", "Si chiama with Lei is the formal way to ask someone's name."],
    ["Puoi ripetere, per favore?", "informal", "Puoi is the tu form of potere."],
    ["Può ripetere, per favore?", "formal", "Può is used with formal Lei."],
    ["Di dove sei?", "informal", "Sei is the tu form of essere."],
    ["Di dov'è, signora?", "formal", "Signora plus the third-person form è makes this formal."],
    ["Vuoi un caffè?", "informal", "Vuoi is the tu form of volere."],
    ["Vorrebbe un caffè?", "formal", "Vorrebbe is polite and formal."],
    ["Ciao, come stai?", "informal", "Ciao and stai are informal."],
    ["Buongiorno, come sta?", "formal", "Buongiorno and sta are formal here."],
    ["Ti piace l'italiano?", "informal", "Ti is informal."],
    ["Le piace l'italiano?", "formal", "Le is formal indirect object pronoun."],
    ["Dove abiti?", "informal", "Abiti is the tu form."],
    ["Dove abita?", "formal", "Abita is used with Lei."],
    ["Hai una prenotazione?", "informal", "Hai is the tu form of avere."],
    ["Ha una prenotazione?", "formal", "Ha is used with Lei."],
    ["Vieni con me?", "informal", "Vieni is the tu form of venire."],
    ["Viene con me?", "formal", "Viene is used with Lei."],
    ["ArrivederLa.", "formal", "The capitalized La marks a formal object pronoun."],
    ["Ci vediamo domani.", "informal", "This is a casual closing between people who know each other."],
    ["Scusi, dov'è il bagno?", "formal", "Scusi is the formal command form."],
    ["Scusa, dov'è il bagno?", "informal", "Scusa is the informal command form."],
    ["Posso aiutarLa?", "formal", "AiutarLa uses the formal object pronoun La."],
    ["Ti posso aiutare?", "informal", "Ti is informal."],
    ["Lei è il professore?", "formal", "Lei is the formal subject pronoun."],
    ["Tu sei il mio collega?", "informal", "Tu is informal."],
    ["Mi può dire dov'è la stazione?", "formal", "Può is formal and polite."],
    ["Mi puoi dire dov'è la stazione?", "informal", "Puoi is informal."],
    ["Desidera una camera singola?", "formal", "Desidera is a polite formal form."],
    ["Vuoi una camera singola?", "informal", "Vuoi is informal."],
    ["Può firmare qui, per favore?", "formal", "Può is formal."],
    ["Puoi firmare qui, per favore?", "informal", "Puoi is informal."]
  ];

  const ADJECTIVE_FRAMES = [
    { sentence: "Il libro è ___", form: "ms", reason: "Libro is masculine singular." },
    { sentence: "La casa è ___", form: "fs", reason: "Casa is feminine singular." },
    { sentence: "I libri sono ___", form: "mp", reason: "Libri is masculine plural." },
    { sentence: "Le penne sono ___", form: "fp", reason: "Penne is feminine plural." },
    { sentence: "Marco è ___", form: "ms", reason: "Marco is masculine singular." },
    { sentence: "Anna è ___", form: "fs", reason: "Anna is feminine singular." },
    { sentence: "Marco e Luca sono ___", form: "mp", reason: "Two masculine people take the masculine plural." },
    { sentence: "Anna e Lucia sono ___", form: "fp", reason: "Two feminine people take the feminine plural." },
    { sentence: "Lo studente è ___", form: "ms", reason: "Studente is masculine singular." },
    { sentence: "Le ragazze sono ___", form: "fp", reason: "Ragazze is feminine plural." }
  ];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeAnswer(value) {
    return String(value ?? "")
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

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function readJson(key, fallback) {
    try {
      return { ...fallback, ...JSON.parse(localStorage.getItem(key) || "{}") };
    } catch {
      return fallback;
    }
  }

  function getTopics() {
    try {
      if (typeof VOCAB_TOPICS !== "undefined" && Array.isArray(VOCAB_TOPICS)) return VOCAB_TOPICS;
    } catch {}
    return [];
  }

  function getLessons() {
    try {
      if (typeof LESSONS !== "undefined" && Array.isArray(LESSONS)) return LESSONS;
    } catch {}
    return [];
  }

  function getVerbs() {
    try {
      if (typeof VERBS !== "undefined" && Array.isArray(VERBS)) return VERBS;
    } catch {}
    return FALLBACK_VERBS;
  }

  function getAdjectives() {
    try {
      if (typeof ADJECTIVES !== "undefined" && Array.isArray(ADJECTIVES)) return ADJECTIVES;
    } catch {}
    return FALLBACK_ADJECTIVES;
  }

  function getVocabularyTerms() {
    const topics = getTopics();
    const terms = topics.flatMap((topic) => (topic.terms || []).map((term) => ({
      ...term,
      topic: term.topic || topic.id,
      topicTitle: topic.title
    })));
    return terms.length ? terms : FALLBACK_TERMS;
  }

  function setStage(eyebrow, title) {
    const eyebrowNode = document.querySelector("#stageEyebrow");
    const titleNode = document.querySelector("#stageTitle");
    if (eyebrowNode) eyebrowNode.textContent = eyebrow;
    if (titleNode) titleNode.textContent = title;
  }

  function formatPercent(value) {
    const number = Number(value) || 0;
    return `${Math.round(number)}%`;
  }

  function localDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function dashboardStats() {
    const main = readJson(MAIN_STORE_KEY, { xp: 0, streak: 0, completed: {}, examBest: 0 });
    const fullExam = readJson(FULL_EXAM_STORE_KEY, { bestPercent: 0, attempts: 0 });
    const lessons = getLessons();
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    const completedCount = Object.keys(main.completed || {}).filter((id) => !lessonIds.size || lessonIds.has(id)).length;
    const done = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;
    const bestExam = Math.max(Number(fullExam.bestPercent) || 0, Math.round((Number(main.examBest) || 0) * 100));

    return [
      [main.xp || 0, "XP"],
      [main.streak || 0, "streak"],
      [`${done}%`, "done"],
      [`${bestExam}%`, "exam best"]
    ];
  }

  function renderStats() {
    return `<div class="dashboard-stats" aria-label="Progress statistics">
      ${dashboardStats().map(([value, label]) => `<div class="dashboard-stat-tile"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join("")}
    </div>`;
  }

  function ensureTopMenuButton() {
    const topbar = document.querySelector(".topbar");
    const resetButton = document.querySelector("#resetButton");
    if (!topbar || !resetButton) return;

    let actions = topbar.querySelector(".topbar-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "topbar-actions";
      resetButton.insertAdjacentElement("beforebegin", actions);
      actions.append(resetButton);
    }

    let menuButton = document.querySelector("#mainMenuButton");
    if (!menuButton) {
      menuButton = document.createElement("button");
      menuButton.className = "ghost-button";
      menuButton.id = "mainMenuButton";
      menuButton.type = "button";
      menuButton.textContent = "Menu";
      menuButton.addEventListener("click", renderDashboardHome);
      actions.insertBefore(menuButton, resetButton);
    }
  }

  function renderDashboardHome() {
    document.body.classList.add("exam-dashboard-ready");
    examState = null;
    setStage("Main menu", "Italian A1/A2 practice");
    const app = document.querySelector("#app");
    if (!app) return;

    app.innerHTML = `
      <section class="dashboard-home">
        ${renderStats()}
        <div class="dashboard-section-title">
          <div>
            <p class="question-kicker">Choose what you want to do now</p>
            <h2>Study menu</h2>
          </div>
        </div>
        <div class="dashboard-menu-grid" aria-label="Main study menu">
          <button class="dashboard-menu-card" type="button" id="openLearnMenu">
            <span class="dashboard-menu-mark" aria-hidden="true">L</span>
            <h2>Learn</h2>
            <small>Read grammar rules, vocabulary pages, verb tables, and exam phrases.</small>
          </button>
          <button class="dashboard-menu-card" type="button" id="openExerciseMenu">
            <span class="dashboard-menu-mark" aria-hidden="true">E</span>
            <h2>Exercise</h2>
            <small>Practice vocabulary, word forms, verb forms, sentences, and written communication.</small>
          </button>
          <button class="dashboard-menu-card" type="button" id="openFullExam">
            <span class="dashboard-menu-mark" aria-hidden="true">X</span>
            <h2>Exam</h2>
            <small>Start a 5-page exam: 5 exercises per page, 5 tasks per exercise.</small>
          </button>
        </div>
      </section>
    `;

    document.querySelector("#openLearnMenu")?.addEventListener("click", () => openExternalPage(() => window.renderLearnHome?.(), "Learn"));
    document.querySelector("#openExerciseMenu")?.addEventListener("click", renderExerciseHub);
    document.querySelector("#openFullExam")?.addEventListener("click", startFullExam);
    ensureTopMenuButton();
  }

  function openExternalPage(action, fallbackTitle) {
    try {
      action?.();
    } catch {
      renderUnavailable(fallbackTitle);
    }
    ensureTopMenuButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderUnavailable(title) {
    const app = document.querySelector("#app");
    if (!app) return;
    setStage("Unavailable", title);
    app.innerHTML = `
      <section class="empty-state">
        <div>
          <h2>${escapeHtml(title)} is not ready</h2>
          <p>This section could not be opened because its script did not load.</p>
          <button class="primary-button" type="button" id="backToDashboard">Back to menu</button>
        </div>
      </section>
    `;
    document.querySelector("#backToDashboard")?.addEventListener("click", renderDashboardHome);
  }

  function renderExerciseHub() {
    document.body.classList.add("exam-dashboard-ready");
    examState = null;
    setStage("Practice sections", "Exercise");
    const app = document.querySelector("#app");
    if (!app) return;

    const cards = [
      { id: "exercisePath", title: "Units", detail: "Use the original unit path for mixed short lessons.", action: renderLessonPath },
      { id: "exerciseVocab", title: "Vocabulary", detail: "Translate exam words Italian to English or English to Italian.", action: () => window.renderDirectionalVocabHome?.() },
      { id: "exerciseWordForms", title: "Word Forms", detail: "Articles, gender, plurals, adjective agreement, and nationality forms.", action: () => window.renderPracticeCategory?.("word-forms") },
      { id: "exerciseVerbForms", title: "Verb Forms", detail: "Present tense, modal verbs, reflexives, auxiliaries, and passato prossimo.", action: () => window.renderPracticeCategory?.("verb-forms") },
      { id: "exerciseSentences", title: "Sentence Building", detail: "Word order, translation, completion, cloze paragraphs, and corrections.", action: () => window.renderPracticeCategory?.("sentence-building") },
      { id: "exerciseCommunication", title: "Communication Practice", detail: "Written exam situations, mini-dialogues, guided writing, and category recall.", action: () => window.renderPracticeCategory?.("communication-practice") }
    ];

    app.innerHTML = `
      <section class="exercise-hub">
        <div class="dashboard-section-title">
          <div>
            <p class="question-kicker">Exercise</p>
            <h2>Choose a practice section</h2>
          </div>
          <button class="ghost-button" type="button" id="exerciseBackMenu">Menu</button>
        </div>
        <div class="exercise-hub-grid">
          ${cards.map((card) => `<button class="exercise-hub-card" type="button" id="${card.id}"><h2>${escapeHtml(card.title)}</h2><small>${escapeHtml(card.detail)}</small></button>`).join("")}
        </div>
      </section>
    `;

    document.querySelector("#exerciseBackMenu")?.addEventListener("click", renderDashboardHome);
    cards.forEach((card) => {
      document.querySelector(`#${card.id}`)?.addEventListener("click", () => openExternalPage(card.action, card.title));
    });
  }

  function renderLessonPath() {
    if (!legacyRenderHome) {
      renderUnavailable("Units");
      return;
    }
    legacyRenderHome();
    ensureTopMenuButton();
  }

  function getArticle(value) {
    const match = String(value || "").match(/^(l[’']|un[’']|il|lo|la|i|gli|le|un|uno|una)\s*/i);
    return match ? match[1].replace("’", "'").toLowerCase() : "";
  }

  function stripArticle(value) {
    return String(value || "").replace(/^(l[’']|un[’']|il|lo|la|i|gli|le|un|uno|una)\s*/i, "").trim();
  }

  function formatWithArticle(article, noun) {
    return `${article}${article.endsWith("'") ? "" : " "}${noun}`;
  }

  function wrongArticle(article) {
    const normalized = article.replace("’", "'").toLowerCase();
    return {
      il: "la",
      lo: "il",
      la: "il",
      "l'": "la",
      i: "le",
      gli: "i",
      le: "i",
      un: "una",
      uno: "un",
      una: "un",
      "un'": "un"
    }[normalized] || "il";
  }

  function makeTask({ id, input, prompt, options = [], answer, acceptedAnswers = null, explanation, note = "" }) {
    return {
      id,
      input,
      prompt,
      options: input === "choice" ? shuffle(options) : options,
      answer,
      acceptedAnswers: acceptedAnswers || [answer],
      explanation,
      note
    };
  }

  function buildWordChoiceTaskPool() {
    const terms = getVocabularyTerms().filter((term) => getArticle(term.it));
    const singular = terms.map((term, index) => {
      const article = getArticle(term.it);
      const noun = stripArticle(term.it);
      const wrong = formatWithArticle(wrongArticle(article), noun);
      return makeTask({
        id: `word-choice-singular-${index}`,
        input: "choice",
        prompt: `Choose the correct Italian form for "${term.en}".`,
        options: [term.it, wrong],
        answer: term.it,
        explanation: `${term.it} is the correct article and noun for ${term.en}.`,
        note: term.topicTitle || "Vocabulary"
      });
    });

    const plural = terms.filter((term) => term.plural && term.plural !== "-" && getArticle(term.plural)).map((term, index) => {
      const article = getArticle(term.plural);
      const noun = stripArticle(term.plural);
      const wrong = formatWithArticle(wrongArticle(article), noun);
      return makeTask({
        id: `word-choice-plural-${index}`,
        input: "choice",
        prompt: `Choose the correct plural of "${term.it}".`,
        options: [term.plural, wrong],
        answer: term.plural,
        explanation: `${term.it} becomes ${term.plural} in the plural.`,
        note: "Plural forms"
      });
    });

    return shuffle([...singular, ...plural]);
  }

  function buildVerbTaskPool() {
    return shuffle(getVerbs().flatMap((verb) => SUBJECTS.map((subject) => {
      const answer = verb[subject.key];
      const accepted = [answer, ...subject.acceptedLabels.map((label) => `${label} ${answer}`)];
      return makeTask({
        id: `verb-${verb.inf}-${subject.key}`,
        input: "typed",
        prompt: `${subject.label} + ${verb.inf}`,
        answer,
        acceptedAnswers: accepted,
        explanation: `${verb.inf}: ${subject.label} ${answer}.`,
        note: verb.en || "Present tense"
      });
    })).filter((task) => task.answer));
  }

  function buildDialogueExercises() {
    const selectedDialogues = shuffle(DIALOGUES).slice(0, 5);
    while (selectedDialogues.length < 5) selectedDialogues.push(...shuffle(DIALOGUES).slice(0, 5 - selectedDialogues.length));

    return selectedDialogues.map((dialogue, exerciseIndex) => ({
      id: `dialogue-exercise-${exerciseIndex + 1}`,
      title: dialogue.title,
      tasks: dialogue.lines.map((line, lineIndex) => makeTask({
        id: `dialogue-${exerciseIndex + 1}-${lineIndex + 1}`,
        input: "choice",
        prompt: `Put the dialogue in order. Choose sentence ${lineIndex + 1} of 5.`,
        options: dialogue.lines,
        answer: line,
        explanation: `Sentence ${lineIndex + 1} is: ${line}`,
        note: dialogue.title
      }))
    }));
  }

  function buildRegisterTaskPool() {
    return shuffle(REGISTER_SENTENCES.map(([sentence, answer, explanation], index) => makeTask({
      id: `register-${index}`,
      input: "choice",
      prompt: sentence,
      options: ["formal", "informal"],
      answer,
      explanation,
      note: "Choose the register"
    })));
  }

  function buildAdjectiveTaskPool() {
    return shuffle(getAdjectives().flatMap((adjective, adjectiveIndex) => ADJECTIVE_FRAMES.map((frame, frameIndex) => {
      const answer = adjective[frame.form];
      return makeTask({
        id: `adjective-${adjectiveIndex}-${frameIndex}`,
        input: "typed",
        prompt: `${frame.sentence} (${adjective.en}).`,
        answer,
        acceptedAnswers: [answer],
        explanation: `${frame.reason} The correct form is ${answer}.`,
        note: "Adjective agreement"
      });
    })).filter((task) => task.answer));
  }

  function exercisesFromPool(prefix, pool) {
    const tasks = shuffle(pool);
    return Array.from({ length: 5 }, (_, exerciseIndex) => ({
      id: `${prefix}-exercise-${exerciseIndex + 1}`,
      title: `Exercise ${exerciseIndex + 1}`,
      tasks: Array.from({ length: 5 }, (_, taskIndex) => {
        const task = tasks[(exerciseIndex * 5 + taskIndex) % tasks.length];
        return { ...task, id: `${task.id}-${exerciseIndex + 1}-${taskIndex + 1}` };
      })
    }));
  }

  function generateFullExam() {
    return [
      {
        id: "word-choice",
        title: "Word Choice",
        description: "Choose which of the two Italian words or forms is correct.",
        exercises: exercisesFromPool("word-choice", buildWordChoiceTaskPool())
      },
      {
        id: "verb-forms",
        title: "Verb Forms",
        description: "Write the correct verb form for the given pronoun and infinitive.",
        exercises: exercisesFromPool("verb-forms", buildVerbTaskPool())
      },
      {
        id: "dialogue-sorting",
        title: "Dialogue Sorting",
        description: "Put five short dialogue lines into a natural order.",
        exercises: buildDialogueExercises()
      },
      {
        id: "formal-informal",
        title: "Formal or Informal",
        description: "Choose whether the sentence is formal or informal Italian.",
        exercises: exercisesFromPool("formal-informal", buildRegisterTaskPool())
      },
      {
        id: "adjectives",
        title: "Adjective Agreement",
        description: "Write the adjective form that matches gender and number.",
        exercises: exercisesFromPool("adjectives", buildAdjectiveTaskPool())
      }
    ];
  }

  function startFullExam() {
    document.body.classList.add("exam-dashboard-ready");
    examState = {
      pageIndex: 0,
      exerciseIndex: 0,
      pages: generateFullExam(),
      results: [],
      checked: false,
      startedAt: Date.now()
    };
    renderExamExercise();
  }

  function flatExerciseNumber() {
    return examState.pageIndex * 5 + examState.exerciseIndex + 1;
  }

  function currentExamPage() {
    return examState.pages[examState.pageIndex];
  }

  function currentExamExercise() {
    return currentExamPage().exercises[examState.exerciseIndex];
  }

  function renderExamExercise() {
    const page = currentExamPage();
    const exercise = currentExamExercise();
    const result = examState.results[flatExerciseNumber() - 1];
    const checked = Boolean(result);
    const progress = Math.round(((flatExerciseNumber() - 1) / 25) * 100);
    const app = document.querySelector("#app");
    if (!app) return;

    setStage(`Page ${examState.pageIndex + 1}/5 · ${page.title}`, `Exercise ${examState.exerciseIndex + 1}/5`);
    app.innerHTML = `
      <section class="exam-panel">
        <div class="dashboard-section-title">
          <div>
            <p class="question-kicker">Full exam</p>
            <h2>${escapeHtml(page.title)}</h2>
            <p>${escapeHtml(page.description)}</p>
          </div>
          <button class="ghost-button" type="button" id="examBackMenu">Menu</button>
        </div>
        <div class="exam-meta-grid" aria-label="Exam progress">
          <div class="exam-meta-card"><strong>${examState.pageIndex + 1}/5</strong><span>page</span></div>
          <div class="exam-meta-card"><strong>${examState.exerciseIndex + 1}/5</strong><span>exercise</span></div>
          <div class="exam-meta-card"><strong>${flatExerciseNumber()}/25</strong><span>round</span></div>
          <div class="exam-meta-card"><strong>${examScore().correct}/${examScore().total}</strong><span>checked</span></div>
        </div>
        <div class="exam-progress-track" aria-label="Full exam progress"><div class="exam-progress-fill" style="width: ${progress}%"></div></div>
        <div class="exam-task-list">
          ${exercise.tasks.map((task, index) => renderExamTask(task, index, result?.tasks?.[index])).join("")}
        </div>
        ${checked ? renderExerciseFeedback(result) : ""}
        <div class="exam-action-row">
          ${checked
            ? `<button class="primary-button" type="button" id="nextExamExercise">${flatExerciseNumber() === 25 ? "Finish exam" : "Next exercise"}</button>`
            : `<button class="primary-button" type="button" id="checkExamExercise">Check exercise</button>`}
          <button class="ghost-button" type="button" id="restartExam">New exam</button>
        </div>
      </section>
    `;

    document.querySelector("#examBackMenu")?.addEventListener("click", renderDashboardHome);
    document.querySelector("#restartExam")?.addEventListener("click", startFullExam);
    document.querySelector("#checkExamExercise")?.addEventListener("click", checkExamExercise);
    document.querySelector("#nextExamExercise")?.addEventListener("click", nextExamExercise);
  }

  function renderExamTask(task, index, result) {
    const disabled = result ? "disabled" : "";
    const value = result?.response || "";
    const control = task.input === "choice"
      ? `<div class="exam-option-grid">
          ${task.options.map((option, optionIndex) => {
            const checked = normalizeAnswer(option) === normalizeAnswer(value) ? "checked" : "";
            return `<label class="exam-option" for="exam-task-${index}-${optionIndex}"><input id="exam-task-${index}-${optionIndex}" type="radio" name="exam-task-${index}" value="${escapeHtml(option)}" ${checked} ${disabled}> <span>${escapeHtml(option)}</span></label>`;
          }).join("")}
        </div>`
      : `<input class="exam-answer-input" id="exam-task-${index}" data-exam-input="${index}" type="text" autocomplete="off" value="${escapeHtml(value)}" ${disabled} placeholder="Type your answer">`;

    return `<article class="exam-task">
      <div class="exam-task-header">
        <div>
          <p class="question-kicker">${escapeHtml(task.note || "Task")}</p>
          <h3>${escapeHtml(task.prompt)}</h3>
        </div>
        <span class="exam-task-number">${index + 1}</span>
      </div>
      ${control}
    </article>`;
  }

  function collectTaskAnswer(task, index) {
    if (task.input === "choice") {
      return document.querySelector(`input[name="exam-task-${index}"]:checked`)?.value || "";
    }
    return document.querySelector(`[data-exam-input="${index}"]`)?.value || "";
  }

  function taskIsCorrect(task, response) {
    return (task.acceptedAnswers || [task.answer]).some((answer) => normalizeAnswer(answer) === normalizeAnswer(response));
  }

  function checkExamExercise() {
    const exercise = currentExamExercise();
    const result = {
      pageId: currentExamPage().id,
      exerciseId: exercise.id,
      tasks: exercise.tasks.map((task, index) => {
        const response = collectTaskAnswer(task, index);
        return {
          taskId: task.id,
          prompt: task.prompt,
          response,
          answer: task.answer,
          correct: taskIsCorrect(task, response),
          explanation: task.explanation
        };
      })
    };
    examState.results[flatExerciseNumber() - 1] = result;
    renderExamExercise();
  }

  function renderExerciseFeedback(result) {
    return `<div class="exam-feedback-list" aria-label="Exercise feedback">
      ${result.tasks.map((task, index) => `<div class="exam-feedback-item ${task.correct ? "good" : "bad"}">
        <strong>${task.correct ? "Correct" : "Task " + (index + 1) + " correct answer: " + escapeHtml(task.answer)}</strong>
        ${task.correct ? `<p>${escapeHtml(task.answer)}</p>` : `<p>Your answer: ${escapeHtml(task.response || "blank")}</p>`}
        <p>${escapeHtml(task.explanation)}</p>
      </div>`).join("")}
    </div>`;
  }

  function nextExamExercise() {
    if (flatExerciseNumber() === 25) {
      renderFullExamResult();
      return;
    }

    if (examState.exerciseIndex < 4) {
      examState.exerciseIndex += 1;
    } else {
      examState.pageIndex += 1;
      examState.exerciseIndex = 0;
    }
    renderExamExercise();
  }

  function examScore() {
    const taskResults = examState?.results?.flatMap((result) => result?.tasks || []) || [];
    const correct = taskResults.filter((task) => task.correct).length;
    return { correct, total: taskResults.length };
  }

  function saveFullExamResult(correct, total, percent) {
    const previous = readJson(FULL_EXAM_STORE_KEY, { bestPercent: 0, attempts: 0, history: [] });
    const record = { correct, total, percent, finishedAt: new Date().toISOString() };
    const next = {
      bestPercent: Math.max(previous.bestPercent || 0, percent),
      attempts: (previous.attempts || 0) + 1,
      history: [record, ...(previous.history || [])].slice(0, 10)
    };
    localStorage.setItem(FULL_EXAM_STORE_KEY, JSON.stringify(next));

    const main = readJson(MAIN_STORE_KEY, { xp: 0, streak: 0, lastStudy: null, completed: {}, mistakes: [], examBest: 0 });
    const today = localDateKey(new Date());
    const yesterday = localDateKey(new Date(Date.now() - 86400000));
    if (main.lastStudy !== today) {
      main.streak = main.lastStudy === yesterday ? (main.streak || 0) + 1 : 1;
      main.lastStudy = today;
    }
    main.xp = (main.xp || 0) + correct * 2;
    main.examBest = Math.max(main.examBest || 0, percent / 100);
    localStorage.setItem(MAIN_STORE_KEY, JSON.stringify(main));

    try {
      if (typeof store !== "undefined") {
        store.xp = main.xp;
        store.streak = main.streak;
        store.lastStudy = main.lastStudy;
        store.examBest = main.examBest;
      }
      if (typeof updateStats === "function") updateStats();
    } catch {}
  }

  function renderFullExamResult() {
    const score = examScore();
    const total = 125;
    const percent = total ? Math.round((score.correct / total) * 100) : 0;
    saveFullExamResult(score.correct, total, percent);
    setStage("Exam complete", "Full A1/A2 exam result");

    const pageSummaries = examState.pages.map((page, pageIndex) => {
      const pageResults = examState.results.slice(pageIndex * 5, pageIndex * 5 + 5).flatMap((result) => result?.tasks || []);
      const correct = pageResults.filter((task) => task.correct).length;
      return { title: page.title, correct, total: pageResults.length || 25 };
    });

    const app = document.querySelector("#app");
    if (!app) return;
    app.innerHTML = `
      <section class="exam-result-panel">
        <div>
          <p class="question-kicker">Full exam score</p>
          <h2>${formatPercent(percent)}</h2>
          <p>${percent >= 80 ? "Strong result. Repeat the page with the lowest score next." : "Useful diagnostic. The page scores show what to review before the exam."}</p>
        </div>
        <div class="exam-score-grid">
          <div class="exam-score-card"><strong>${score.correct}/${total}</strong><span>tasks correct</span></div>
          <div class="exam-score-card"><strong>${formatPercent(percent)}</strong><span>accuracy</span></div>
          <div class="exam-score-card"><strong>${readJson(FULL_EXAM_STORE_KEY, { bestPercent: 0 }).bestPercent}%</strong><span>best score</span></div>
          <div class="exam-score-card"><strong>+${score.correct * 2}</strong><span>XP</span></div>
        </div>
        <ul class="exam-review-list">
          ${pageSummaries.map((summary) => `<li><strong>${escapeHtml(summary.title)}</strong><br><span>${summary.correct}/${summary.total} correct</span></li>`).join("")}
        </ul>
        <div class="exam-action-row">
          <button class="primary-button" type="button" id="examAgain">New exam</button>
          <button class="ghost-button" type="button" id="examResultMenu">Menu</button>
          <button class="ghost-button" type="button" id="examResultExercise">Exercise</button>
        </div>
      </section>
    `;

    document.querySelector("#examAgain")?.addEventListener("click", startFullExam);
    document.querySelector("#examResultMenu")?.addEventListener("click", renderDashboardHome);
    document.querySelector("#examResultExercise")?.addEventListener("click", renderExerciseHub);
  }

  function bindResetRefresh() {
    document.querySelector("#resetButton")?.addEventListener("click", () => {
      window.setTimeout(() => {
        if (document.body.classList.contains("exam-dashboard-ready")) renderDashboardHome();
      }, 0);
    });
  }

  window.renderLessonPath = renderLessonPath;
  window.renderDashboardHome = renderDashboardHome;
  window.startFullExam = startFullExam;
  window.startExam = startFullExam;
  ensureTopMenuButton();
  bindResetRefresh();
  renderDashboardHome();
})();
