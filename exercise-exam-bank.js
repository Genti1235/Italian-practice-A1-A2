(() => {
  if (window.__ITALIAN_EXAM_TASK_BANK__) return;
  window.__ITALIAN_EXAM_TASK_BANK__ = true;

  const STORE_KEY = "italian-a1-a2-exam-task-practice";
  let practiceState = null;

  const SUBJECTS = [
    { key: "io", label: "io", acceptedLabels: ["io"] },
    { key: "tu", label: "tu", acceptedLabels: ["tu"] },
    { key: "lui", label: "lui/lei", acceptedLabels: ["lui", "lei"] },
    { key: "noi", label: "noi", acceptedLabels: ["noi"] },
    { key: "voi", label: "voi", acceptedLabels: ["voi"] },
    { key: "loro", label: "loro", acceptedLabels: ["loro"] }
  ];

  const DIALOGUES = [
    ["Introducing yourself", ["Ciao, come ti chiami?", "Mi chiamo Gent.", "Di dove sei?", "Sono di Podgorica.", "Piacere!"]],
    ["At a bar", ["Buongiorno, vorrei un caffè.", "Certo, desidera altro?", "Un cornetto, per favore.", "Sono tre euro.", "Grazie, arrivederci."]],
    ["Asking for directions", ["Scusi, dov'è la stazione?", "Vada dritto.", "Poi giri a destra.", "La stazione è vicino alla piazza.", "Grazie mille."]],
    ["At a hotel", ["Buonasera, ho una prenotazione.", "A che nome?", "A nome Gent.", "Ecco la chiave della camera.", "Grazie, buona serata."]],
    ["Buying a train ticket", ["Buongiorno, un biglietto per Roma.", "Solo andata o andata e ritorno?", "Solo andata, per favore.", "Il treno parte dal binario due.", "Grazie, arrivederci."]],
    ["Shopping for clothes", ["Buongiorno, posso aiutarLa?", "Vorrei provare questa camicia.", "Che taglia porta?", "Porto la taglia media.", "Il camerino è a sinistra."]],
    ["Past weekend", ["Che cosa hai fatto ieri?", "Ho studiato italiano.", "Poi sono uscito con amici.", "Abbiamo mangiato una pizza.", "È stato un bel fine settimana."]]
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

  const FALLBACK_TERMS = [
    { it: "il libro", plural: "i libri", en: "book", topicTitle: "Classroom" },
    { it: "la casa", plural: "le case", en: "house", topicTitle: "Home" },
    { it: "lo studente", plural: "gli studenti", en: "male student", topicTitle: "Personal info" },
    { it: "l'amica", plural: "le amiche", en: "female friend", topicTitle: "Routine" },
    { it: "la penna", plural: "le penne", en: "pen", topicTitle: "Classroom" }
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

  function readStore() {
    try {
      return { correct: {}, missed: {}, rounds: 0, ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}") };
    } catch {
      return { correct: {}, missed: {}, rounds: 0 };
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }

  function getVocabularyTerms() {
    try {
      if (typeof VOCAB_TOPICS !== "undefined" && Array.isArray(VOCAB_TOPICS)) {
        const terms = VOCAB_TOPICS.flatMap((topic) => (topic.terms || []).map((term) => ({
          ...term,
          topicTitle: topic.title
        })));
        if (terms.length) return terms;
      }
    } catch {}
    return FALLBACK_TERMS;
  }

  function getVerbs() {
    try {
      if (typeof VERBS !== "undefined" && Array.isArray(VERBS) && VERBS.length) return VERBS;
    } catch {}
    return FALLBACK_VERBS;
  }

  function getAdjectives() {
    try {
      if (typeof ADJECTIVES !== "undefined" && Array.isArray(ADJECTIVES) && ADJECTIVES.length) return ADJECTIVES;
    } catch {}
    return FALLBACK_ADJECTIVES;
  }

  function setStage(eyebrow, title) {
    const eyebrowNode = document.querySelector("#stageEyebrow");
    const titleNode = document.querySelector("#stageTitle");
    if (eyebrowNode) eyebrowNode.textContent = eyebrow;
    if (titleNode) titleNode.textContent = title;
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

  function buildWordChoiceTasks() {
    const terms = getVocabularyTerms().filter((term) => getArticle(term.it));
    const singular = terms.map((term, index) => {
      const article = getArticle(term.it);
      const noun = stripArticle(term.it);
      return makeTask({
        id: `exam-bank-word-${index}`,
        input: "choice",
        prompt: `Choose the correct Italian form for "${term.en}".`,
        options: [term.it, formatWithArticle(wrongArticle(article), noun)],
        answer: term.it,
        explanation: `${term.it} is the correct article and noun for ${term.en}.`,
        note: term.topicTitle || "Vocabulary"
      });
    });
    const plural = terms.filter((term) => term.plural && term.plural !== "-" && getArticle(term.plural)).map((term, index) => {
      const article = getArticle(term.plural);
      const noun = stripArticle(term.plural);
      return makeTask({
        id: `exam-bank-plural-${index}`,
        input: "choice",
        prompt: `Choose the correct plural of "${term.it}".`,
        options: [term.plural, formatWithArticle(wrongArticle(article), noun)],
        answer: term.plural,
        explanation: `${term.it} becomes ${term.plural} in the plural.`,
        note: "Plural forms"
      });
    });
    return [...singular, ...plural];
  }

  function buildVerbTasks() {
    return getVerbs().flatMap((verb) => SUBJECTS.map((subject) => {
      const answer = verb[subject.key];
      return makeTask({
        id: `exam-bank-verb-${verb.inf}-${subject.key}`,
        input: "typed",
        prompt: `${subject.label} + ${verb.inf}`,
        answer,
        acceptedAnswers: [answer, ...subject.acceptedLabels.map((label) => `${label} ${answer}`)],
        explanation: `${verb.inf}: ${subject.label} ${answer}.`,
        note: verb.en || "Present tense"
      });
    })).filter((task) => task.answer);
  }

  function buildDialogueTasks() {
    return DIALOGUES.flatMap(([title, lines], dialogueIndex) => lines.map((line, lineIndex) => makeTask({
      id: `exam-bank-dialogue-${dialogueIndex}-${lineIndex}`,
      input: "choice",
      prompt: `Put the dialogue in order. Choose sentence ${lineIndex + 1} of 5.`,
      options: lines,
      answer: line,
      explanation: `Sentence ${lineIndex + 1} is: ${line}`,
      note: title
    })));
  }

  function buildRegisterTasks() {
    return REGISTER_SENTENCES.map(([sentence, answer, explanation], index) => makeTask({
      id: `exam-bank-register-${index}`,
      input: "choice",
      prompt: sentence,
      options: ["formal", "informal"],
      answer,
      explanation,
      note: "Choose the register"
    }));
  }

  function buildAdjectiveTasks() {
    return getAdjectives().flatMap((adjective, adjectiveIndex) => ADJECTIVE_FRAMES.map((frame, frameIndex) => {
      const answer = adjective[frame.form];
      return makeTask({
        id: `exam-bank-adjective-${adjectiveIndex}-${frameIndex}`,
        input: "typed",
        prompt: `${frame.sentence} (${adjective.en}).`,
        answer,
        explanation: `${frame.reason} The correct form is ${answer}.`,
        note: "Adjective agreement"
      });
    })).filter((task) => task.answer);
  }

  const EXAM_PRACTICE_TYPES = [
    { id: "all-exam-tasks", title: "All Exam Tasks", detail: "Mixed practice from every task type used in the full exam.", build: () => examTaskTypes().flatMap((type) => type.build()) },
    { id: "word-choice", title: "Exam Word Choice", detail: "Choose the correct word, article, or plural form.", build: buildWordChoiceTasks },
    { id: "verb-forms", title: "Exam Verb Forms", detail: "Type the correct verb form from pronoun + infinitive.", build: buildVerbTasks },
    { id: "dialogue-sorting", title: "Exam Dialogue Sorting", detail: "Choose the correct order for dialogue sentences.", build: buildDialogueTasks },
    { id: "formal-informal", title: "Exam Formal / Informal", detail: "Identify polite formal forms and informal forms.", build: buildRegisterTasks },
    { id: "adjective-agreement", title: "Exam Adjective Agreement", detail: "Type adjective forms that match gender and number.", build: buildAdjectiveTasks }
  ];

  function examTaskTypes() {
    return EXAM_PRACTICE_TYPES.filter((type) => type.id !== "all-exam-tasks");
  }

  function taskCount(type) {
    return type.build().length;
  }

  function augmentExerciseHub() {
    const grid = document.querySelector(".exercise-hub-grid");
    if (!grid || document.querySelector("#examTaskBankIntro")) return;

    const intro = document.createElement("div");
    intro.id = "examTaskBankIntro";
    intro.className = "exercise-section-divider";
    intro.innerHTML = `<p class="question-kicker">Exam task bank</p><h2>Practice every exam task type separately</h2>`;
    grid.insertAdjacentElement("beforebegin", intro);

    EXAM_PRACTICE_TYPES.forEach((type) => {
      const button = document.createElement("button");
      button.className = "exercise-hub-card exam-bank-card";
      button.type = "button";
      button.dataset.examPracticeType = type.id;
      button.innerHTML = `<h2>${escapeHtml(type.title)}</h2><small>${escapeHtml(type.detail)} ${taskCount(type)} tasks available.</small>`;
      button.addEventListener("click", () => startExamTaskPractice(type.id));
      grid.append(button);
    });
  }

  function startExamTaskPractice(typeId) {
    const type = EXAM_PRACTICE_TYPES.find((item) => item.id === typeId) || EXAM_PRACTICE_TYPES[0];
    const tasks = shuffle(type.build());
    practiceState = {
      type,
      tasks,
      pageIndex: 0,
      results: []
    };
    renderExamTaskPractice();
  }

  function currentPracticeTasks() {
    return practiceState.tasks.slice(practiceState.pageIndex * 5, practiceState.pageIndex * 5 + 5);
  }

  function renderExamTaskPractice() {
    const app = document.querySelector("#app");
    if (!app || !practiceState) return;

    const totalPages = Math.max(1, Math.ceil(practiceState.tasks.length / 5));
    const tasks = currentPracticeTasks();
    const result = practiceState.results[practiceState.pageIndex];
    const checked = Boolean(result);
    const progress = Math.round((practiceState.pageIndex / totalPages) * 100);
    setStage("Exercise · exam task bank", practiceState.type.title);

    app.innerHTML = `
      <section class="exam-panel exam-practice-panel">
        <div class="dashboard-section-title">
          <div>
            <p class="question-kicker">Exercise</p>
            <h2>${escapeHtml(practiceState.type.title)}</h2>
            <p>${escapeHtml(practiceState.type.detail)}</p>
          </div>
          <button class="ghost-button" type="button" id="examBankBack">Exercise menu</button>
        </div>
        <div class="exam-meta-grid" aria-label="Exam task practice progress">
          <div class="exam-meta-card"><strong>${practiceState.pageIndex + 1}/${totalPages}</strong><span>set</span></div>
          <div class="exam-meta-card"><strong>${tasks.length}</strong><span>tasks now</span></div>
          <div class="exam-meta-card"><strong>${practiceState.tasks.length}</strong><span>task bank</span></div>
          <div class="exam-meta-card"><strong>${practiceScore().correct}/${practiceScore().total}</strong><span>score</span></div>
        </div>
        <div class="exam-progress-track" aria-label="Task bank progress"><div class="exam-progress-fill" style="width: ${progress}%"></div></div>
        <div class="exam-task-list">
          ${tasks.map((task, index) => renderPracticeTask(task, index, result?.tasks?.[index])).join("")}
        </div>
        ${checked ? renderPracticeFeedback(result) : ""}
        <div class="exam-action-row">
          ${checked
            ? `<button class="primary-button" type="button" id="nextExamPracticeSet">${practiceState.pageIndex === totalPages - 1 ? "Finish" : "Next set"}</button>`
            : `<button class="primary-button" type="button" id="checkExamPracticeSet">Check set</button>`}
          <button class="ghost-button" type="button" id="newExamPracticeRound">New round</button>
        </div>
      </section>
    `;

    document.querySelector("#examBankBack")?.addEventListener("click", renderExerciseMenu);
    document.querySelector("#checkExamPracticeSet")?.addEventListener("click", checkPracticeSet);
    document.querySelector("#nextExamPracticeSet")?.addEventListener("click", nextPracticeSet);
    document.querySelector("#newExamPracticeRound")?.addEventListener("click", () => startExamTaskPractice(practiceState.type.id));
  }

  function renderExerciseMenu() {
    if (typeof window.renderDashboardHome === "function") {
      window.renderDashboardHome();
      window.setTimeout(() => {
        document.querySelector("#openExerciseMenu")?.click();
        window.setTimeout(augmentExerciseHub, 0);
      }, 0);
    }
  }

  function renderPracticeTask(task, index, result) {
    const disabled = result ? "disabled" : "";
    const value = result?.response || "";
    const control = task.input === "choice"
      ? `<div class="exam-option-grid">
          ${task.options.map((option, optionIndex) => {
            const checked = normalizeAnswer(option) === normalizeAnswer(value) ? "checked" : "";
            return `<label class="exam-option" for="exam-practice-${index}-${optionIndex}"><input id="exam-practice-${index}-${optionIndex}" type="radio" name="exam-practice-${index}" value="${escapeHtml(option)}" ${checked} ${disabled}> <span>${escapeHtml(option)}</span></label>`;
          }).join("")}
        </div>`
      : `<input class="exam-answer-input" id="exam-practice-${index}" data-exam-practice-input="${index}" type="text" autocomplete="off" value="${escapeHtml(value)}" ${disabled} placeholder="Type your answer">`;

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

  function collectPracticeAnswer(task, index) {
    if (task.input === "choice") {
      return document.querySelector(`input[name="exam-practice-${index}"]:checked`)?.value || "";
    }
    return document.querySelector(`[data-exam-practice-input="${index}"]`)?.value || "";
  }

  function isCorrect(task, response) {
    return (task.acceptedAnswers || [task.answer]).some((answer) => normalizeAnswer(answer) === normalizeAnswer(response));
  }

  function checkPracticeSet() {
    const store = readStore();
    const result = {
      tasks: currentPracticeTasks().map((task, index) => {
        const response = collectPracticeAnswer(task, index);
        const correct = isCorrect(task, response);
        if (correct) {
          store.correct[task.id] = (store.correct[task.id] || 0) + 1;
          delete store.missed[task.id];
        } else {
          store.missed[task.id] = { prompt: task.prompt, answer: task.answer, response };
        }
        return { ...task, response, correct };
      })
    };
    store.rounds = (store.rounds || 0) + 1;
    saveStore(store);
    practiceState.results[practiceState.pageIndex] = result;
    renderExamTaskPractice();
  }

  function renderPracticeFeedback(result) {
    return `<div class="exam-feedback-list" aria-label="Exercise feedback">
      ${result.tasks.map((task, index) => `<div class="exam-feedback-item ${task.correct ? "good" : "bad"}">
        <strong>${task.correct ? "Correct" : "Task " + (index + 1) + " correct answer: " + escapeHtml(task.answer)}</strong>
        ${task.correct ? `<p>${escapeHtml(task.answer)}</p>` : `<p>Your answer: ${escapeHtml(task.response || "blank")}</p>`}
        <p>${escapeHtml(task.explanation)}</p>
      </div>`).join("")}
    </div>`;
  }

  function nextPracticeSet() {
    const totalPages = Math.ceil(practiceState.tasks.length / 5);
    if (practiceState.pageIndex < totalPages - 1) {
      practiceState.pageIndex += 1;
      renderExamTaskPractice();
      return;
    }
    renderPracticeResult();
  }

  function practiceScore() {
    const taskResults = practiceState?.results?.flatMap((result) => result?.tasks || []) || [];
    const correct = taskResults.filter((task) => task.correct).length;
    return { correct, total: taskResults.length };
  }

  function renderPracticeResult() {
    const app = document.querySelector("#app");
    if (!app || !practiceState) return;
    const score = practiceScore();
    const accuracy = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    setStage("Exercise complete", practiceState.type.title);
    app.innerHTML = `
      <section class="exam-result-panel">
        <div>
          <p class="question-kicker">Exam task bank</p>
          <h2>${accuracy}%</h2>
          <p>${accuracy >= 80 ? "Strong round. Try the mixed exam task bank next." : "Good diagnostic. Repeat the task type that felt slow."}</p>
        </div>
        <div class="exam-score-grid">
          <div class="exam-score-card"><strong>${score.correct}/${score.total}</strong><span>correct</span></div>
          <div class="exam-score-card"><strong>${practiceState.tasks.length}</strong><span>available</span></div>
          <div class="exam-score-card"><strong>${readStore().rounds || 0}</strong><span>rounds</span></div>
          <div class="exam-score-card"><strong>${Object.keys(readStore().missed || {}).length}</strong><span>weak</span></div>
        </div>
        <div class="exam-action-row">
          <button class="primary-button" type="button" id="examBankAgain">New round</button>
          <button class="ghost-button" type="button" id="examBankMenu">Exercise menu</button>
        </div>
      </section>
    `;
    document.querySelector("#examBankAgain")?.addEventListener("click", () => startExamTaskPractice(practiceState.type.id));
    document.querySelector("#examBankMenu")?.addEventListener("click", renderExerciseMenu);
  }

  function watchExerciseClicks() {
    document.addEventListener("click", (event) => {
      if (!event.target.closest("#openExerciseMenu, #examResultExercise")) return;
      window.setTimeout(augmentExerciseHub, 0);
    });
  }

  window.renderExamTaskBank = () => {
    renderExerciseMenu();
  };
  window.startExamTaskPractice = startExamTaskPractice;
  watchExerciseClicks();
  window.setTimeout(augmentExerciseHub, 0);
})();
