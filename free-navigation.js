(() => {
  if (window.__ITALIAN_FREE_NAVIGATION__) return;
  window.__ITALIAN_FREE_NAVIGATION__ = true;

  const PRACTICE_STORE_KEY = "italian-a1-a2-practice-sections";
  const VOCAB_STORE_KEY = "italian-a1-a2-vocabulary-direction";
  const MAIN_STORE_KEY = "italian-a1-a2-practice";
  const FULL_EXAM_STORE_KEY = "italian-a1-a2-full-exam";
  const EXAM_BANK_STORE_KEY = "italian-a1-a2-exam-task-practice";

  let practiceState = null;
  let vocabState = null;
  let examState = null;
  let bankState = null;

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

  function nl2br(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function normalize(value) {
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

  function stripArticle(value) {
    return normalize(value).replace(/^(il|lo|la|l'|i|gli|le|un|uno|una|un')\s*/, "");
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

  function localDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function setStage(eyebrow, title) {
    const eyebrowNode = document.querySelector("#stageEyebrow");
    const titleNode = document.querySelector("#stageTitle");
    if (eyebrowNode) eyebrowNode.textContent = eyebrow;
    if (titleNode) titleNode.textContent = title;
  }

  function getVocabularyTerms() {
    try {
      if (typeof VOCAB_TOPICS !== "undefined" && Array.isArray(VOCAB_TOPICS)) {
        const terms = VOCAB_TOPICS.flatMap((topic) => (topic.terms || []).map((term) => ({ ...term, topicTitle: topic.title })));
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

  function getPracticeCategories() {
    try {
      if (Array.isArray(window.PRACTICE_CATEGORIES)) return window.PRACTICE_CATEGORIES;
    } catch {}
    return [];
  }

  function getArticle(value) {
    const match = String(value || "").match(/^(l[’']|un[’']|il|lo|la|i|gli|le|un|uno|una)\s*/i);
    return match ? match[1].replace("’", "'").toLowerCase() : "";
  }

  function stripWrittenArticle(value) {
    return String(value || "").replace(/^(l[’']|un[’']|il|lo|la|i|gli|le|un|uno|una)\s*/i, "").trim();
  }

  function formatWithArticle(article, noun) {
    return `${article}${article.endsWith("'") ? "" : " "}${noun}`;
  }

  function wrongArticle(article) {
    return {
      il: "la", lo: "il", la: "il", "l'": "la", i: "le", gli: "i", le: "i", un: "una", uno: "un", una: "un", "un'": "un"
    }[article.replace("’", "'").toLowerCase()] || "il";
  }

  function makeTask({ id, input, interaction, prompt, options = [], answer, acceptedAnswers = null, explanation, note = "" }) {
    return {
      id,
      input: input || interaction || "typed",
      interaction: interaction || input || "typed",
      prompt,
      options: (input || interaction) === "choice" ? shuffle(options) : options,
      answer,
      acceptedAnswers: acceptedAnswers || [answer],
      explanation,
      note
    };
  }

  function displayAnswer(exercise) {
    if (exercise.fullAnswer) return exercise.fullAnswer;
    if (exercise.modelAnswer) return exercise.modelAnswer;
    if (exercise.answers) return exercise.answers.join(" / ");
    if (exercise.answer) return exercise.answer;
    if (exercise.requiredCount) return `${exercise.requiredCount} correct words from the category`;
    return "See explanation";
  }

  function answerIsCorrect(task, response) {
    return (task.acceptedAnswers || [task.answer]).some((answer) => normalize(answer) === normalize(response));
  }

  function splitMeanings(meaning) {
    const cleaned = String(meaning)
      .replace(/\([^)]*\)/g, "")
      .replace(/\bmasculine\b|\bfeminine\b|\bmixed\b|\binformal\b|\bformal\b|\bsingular\b|\bplural\b/gi, "")
      .trim();

    return [meaning, ...cleaned.split(/[\/;,]|\bor\b/i)]
      .map((part) => normalize(part).replace(/^to\s+/, ""))
      .filter((part) => part.length >= 2);
  }

  function countSentences(value) {
    const text = String(value || "").trim();
    if (!text) return 0;
    const punctuated = text.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length;
    const lines = text.split(/\n+/).map((part) => part.trim()).filter(Boolean).length;
    return Math.max(punctuated, lines);
  }

  function evaluatePracticeExercise(exercise, answer) {
    if (exercise.interaction === "choice" || exercise.interaction === "typed") {
      return { correct: (exercise.acceptedAnswers || [exercise.answer]).some((accepted) => normalize(answer) === normalize(accepted)) };
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
      const built = Array.isArray(answer) ? answer.map((wordIndex) => exercise.wordBank[wordIndex]).join(" ") : answer;
      return { correct: normalize(built) === normalize(exercise.answer) };
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
      return { correct: matches >= needed && sentenceOk, detail: `${matches}/${needed} required items${exercise.minSentences ? `, ${sentenceCount}/${exercise.minSentences} sentences` : ""}` };
    }

    return { correct: false };
  }

  function buildWordChoiceTasks(prefix = "exam-bank") {
    const terms = getVocabularyTerms().filter((term) => getArticle(term.it));
    const singular = terms.map((term, index) => {
      const article = getArticle(term.it);
      const noun = stripWrittenArticle(term.it);
      return makeTask({
        id: `${prefix}-word-${index}`,
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
      const noun = stripWrittenArticle(term.plural);
      return makeTask({
        id: `${prefix}-plural-${index}`,
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

  function buildVerbTasks(prefix = "exam-bank") {
    return getVerbs().flatMap((verb) => SUBJECTS.map((subject) => {
      const answer = verb[subject.key];
      return makeTask({
        id: `${prefix}-verb-${verb.inf}-${subject.key}`,
        input: "typed",
        prompt: `${subject.label} + ${verb.inf}`,
        answer,
        acceptedAnswers: [answer, ...subject.acceptedLabels.map((label) => `${label} ${answer}`)],
        explanation: `${verb.inf}: ${subject.label} ${answer}.`,
        note: verb.en || "Present tense"
      });
    })).filter((task) => task.answer);
  }

  function buildDialogueTasks(prefix = "exam-bank") {
    return DIALOGUES.flatMap(([title, lines], dialogueIndex) => lines.map((line, lineIndex) => makeTask({
      id: `${prefix}-dialogue-${dialogueIndex}-${lineIndex}`,
      input: "choice",
      prompt: `Put the dialogue in order. Choose sentence ${lineIndex + 1} of 5.`,
      options: lines,
      answer: line,
      explanation: `Sentence ${lineIndex + 1} is: ${line}`,
      note: title
    })));
  }

  function buildRegisterTasks(prefix = "exam-bank") {
    return REGISTER_SENTENCES.map(([sentence, answer, explanation], index) => makeTask({
      id: `${prefix}-register-${index}`,
      input: "choice",
      prompt: sentence,
      options: ["formal", "informal"],
      answer,
      explanation,
      note: "Choose the register"
    }));
  }

  function buildAdjectiveTasks(prefix = "exam-bank") {
    return getAdjectives().flatMap((adjective, adjectiveIndex) => ADJECTIVE_FRAMES.map((frame, frameIndex) => {
      const answer = adjective[frame.form];
      return makeTask({
        id: `${prefix}-adjective-${adjectiveIndex}-${frameIndex}`,
        input: "typed",
        prompt: `${frame.sentence} (${adjective.en}).`,
        answer,
        explanation: `${frame.reason} The correct form is ${answer}.`,
        note: "Adjective agreement"
      });
    })).filter((task) => task.answer);
  }

  function allExamBankTasks() {
    return [
      ...buildWordChoiceTasks(),
      ...buildVerbTasks(),
      ...buildDialogueTasks(),
      ...buildRegisterTasks(),
      ...buildAdjectiveTasks()
    ];
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

  function buildDialogueExercises() {
    const selected = shuffle(DIALOGUES).slice(0, 5);
    while (selected.length < 5) selected.push(...shuffle(DIALOGUES).slice(0, 5 - selected.length));
    return selected.map(([title, lines], exerciseIndex) => ({
      id: `dialogue-exercise-${exerciseIndex + 1}`,
      title,
      tasks: lines.map((line, lineIndex) => makeTask({
        id: `dialogue-${exerciseIndex + 1}-${lineIndex + 1}`,
        input: "choice",
        prompt: `Put the dialogue in order. Choose sentence ${lineIndex + 1} of 5.`,
        options: lines,
        answer: line,
        explanation: `Sentence ${lineIndex + 1} is: ${line}`,
        note: title
      }))
    }));
  }

  function generateFullExam() {
    return [
      { id: "word-choice", title: "Word Choice", description: "Choose which of the two Italian words or forms is correct.", exercises: exercisesFromPool("word-choice", buildWordChoiceTasks("word-choice")) },
      { id: "verb-forms", title: "Verb Forms", description: "Write the correct verb form for the given pronoun and infinitive.", exercises: exercisesFromPool("verb-forms", buildVerbTasks("verb-forms")) },
      { id: "dialogue-sorting", title: "Dialogue Sorting", description: "Put five short dialogue lines into a natural order.", exercises: buildDialogueExercises() },
      { id: "formal-informal", title: "Formal or Informal", description: "Choose whether the sentence is formal or informal Italian.", exercises: exercisesFromPool("formal-informal", buildRegisterTasks("formal-informal")) },
      { id: "adjectives", title: "Adjective Agreement", description: "Write the adjective form that matches gender and number.", exercises: exercisesFromPool("adjectives", buildAdjectiveTasks("adjectives")) }
    ];
  }

  function renderGenericTask(task, index, namePrefix, answer, result) {
    const disabled = result ? "disabled" : "";
    const value = result?.response ?? answer ?? "";
    const control = task.input === "choice" || task.interaction === "choice"
      ? `<div class="exam-option-grid">
          ${(task.options || []).map((option, optionIndex) => {
            const checked = normalize(option) === normalize(value) ? "checked" : "";
            return `<label class="exam-option" for="${namePrefix}-${index}-${optionIndex}"><input id="${namePrefix}-${index}-${optionIndex}" type="radio" name="${namePrefix}-${index}" value="${escapeHtml(option)}" ${checked} ${disabled}> <span>${escapeHtml(option)}</span></label>`;
          }).join("")}
        </div>`
      : `<input class="exam-answer-input" id="${namePrefix}-${index}" data-task-input="${index}" type="text" autocomplete="off" value="${escapeHtml(value)}" ${disabled} placeholder="Type your answer">`;

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

  function collectGenericTaskAnswer(task, index, namePrefix) {
    if (task.input === "choice" || task.interaction === "choice") {
      return document.querySelector(`input[name="${namePrefix}-${index}"]:checked`)?.value || "";
    }
    return document.querySelector(`[data-task-input="${index}"]`)?.value || "";
  }

  function renderGenericFeedback(tasks) {
    return `<div class="exam-feedback-list" aria-label="Exercise feedback">
      ${tasks.map((task, index) => `<div class="exam-feedback-item ${task.correct ? "good" : "bad"}">
        <strong>${task.correct ? "Correct" : "Task " + (index + 1) + " correct answer: " + escapeHtml(task.answer)}</strong>
        ${task.correct ? `<p>${escapeHtml(task.answer)}</p>` : `<p>Your answer: ${escapeHtml(task.response || "blank")}</p>`}
        <p>${escapeHtml(task.explanation)}</p>
      </div>`).join("")}
    </div>`;
  }

  function scoreFromResults(results) {
    const taskResults = results.flatMap((result) => result?.tasks || []);
    const correct = taskResults.filter((task) => task.correct).length;
    return { correct, total: taskResults.length };
  }

  function collapseExamBankCards() {
    const grid = document.querySelector(".exercise-hub-grid");
    if (!grid) return;

    document.querySelector("#examTaskBankIntro")?.remove();
    grid.querySelectorAll(".exam-bank-card").forEach((card) => card.remove());
    if (grid.querySelector("#exerciseAllExamTasks")) return;

    const button = document.createElement("button");
    button.className = "exercise-hub-card exam-bank-card";
    button.type = "button";
    button.id = "exerciseAllExamTasks";
    button.innerHTML = `<h2>Exam Task Practice</h2><small>Mixed practice from all full-exam task types: word choice, verbs, dialogue order, formal/informal, and adjectives. ${allExamBankTasks().length} tasks available.</small>`;
    button.addEventListener("click", startMixedExamPractice);
    grid.append(button);
  }

  function scheduleCollapseExamBankCards() {
    window.setTimeout(collapseExamBankCards, 0);
  }

  function startMixedExamPractice() {
    const tasks = shuffle(allExamBankTasks());
    bankState = { tasks, setIndex: 0, answers: [], results: [] };
    renderMixedExamPractice();
  }

  function currentBankTasks() {
    return bankState.tasks.slice(bankState.setIndex * 5, bankState.setIndex * 5 + 5);
  }

  function saveBankAnswers() {
    if (!bankState) return;
    const result = bankState.results[bankState.setIndex];
    if (result) return;
    const answers = currentBankTasks().map((task, index) => collectGenericTaskAnswer(task, index, "exam-practice"));
    bankState.answers[bankState.setIndex] = answers;
  }

  function checkBankSet() {
    saveBankAnswers();
    const store = readJson(EXAM_BANK_STORE_KEY, { correct: {}, missed: {}, rounds: 0 });
    const answers = bankState.answers[bankState.setIndex] || [];
    const result = {
      tasks: currentBankTasks().map((task, index) => {
        const response = answers[index] || "";
        const correct = answerIsCorrect(task, response);
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
    localStorage.setItem(EXAM_BANK_STORE_KEY, JSON.stringify(store));
    bankState.results[bankState.setIndex] = result;
    renderMixedExamPractice();
  }

  function moveBankSet(step) {
    saveBankAnswers();
    const totalSets = Math.max(1, Math.ceil(bankState.tasks.length / 5));
    const next = bankState.setIndex + step;
    if (next < 0) return;
    if (next >= totalSets) {
      finishMixedExamPractice();
      return;
    }
    bankState.setIndex = next;
    renderMixedExamPractice();
  }

  function finishMixedExamPractice() {
    saveBankAnswers();
    const totalSets = Math.ceil(bankState.tasks.length / 5);
    for (let setIndex = 0; setIndex < totalSets; setIndex += 1) {
      if (bankState.results[setIndex]) continue;
      const tasks = bankState.tasks.slice(setIndex * 5, setIndex * 5 + 5);
      const answers = bankState.answers[setIndex] || [];
      bankState.results[setIndex] = { tasks: tasks.map((task, index) => ({ ...task, response: answers[index] || "", correct: answerIsCorrect(task, answers[index] || "") })) };
    }
    renderMixedExamResult();
  }

  function renderMixedExamPractice() {
    const app = document.querySelector("#app");
    if (!app || !bankState) return;
    const totalSets = Math.max(1, Math.ceil(bankState.tasks.length / 5));
    const tasks = currentBankTasks();
    const result = bankState.results[bankState.setIndex];
    const answers = bankState.answers[bankState.setIndex] || [];
    const score = scoreFromResults(bankState.results);
    const progress = Math.round((bankState.setIndex / totalSets) * 100);
    setStage("Exercise · exam tasks", "Exam Task Practice");

    app.innerHTML = `<section class="exam-panel exam-practice-panel">
      <div class="dashboard-section-title">
        <div>
          <p class="question-kicker">Exercise</p>
          <h2>Exam Task Practice</h2>
          <p>All exam task types are mixed into this one section.</p>
        </div>
        <button class="ghost-button" type="button" id="examBankBack">Exercise menu</button>
      </div>
      <div class="exam-meta-grid" aria-label="Exam task practice progress">
        <div class="exam-meta-card"><strong>${bankState.setIndex + 1}/${totalSets}</strong><span>set</span></div>
        <div class="exam-meta-card"><strong>${tasks.length}</strong><span>tasks now</span></div>
        <div class="exam-meta-card"><strong>${bankState.tasks.length}</strong><span>task bank</span></div>
        <div class="exam-meta-card"><strong>${score.correct}/${score.total}</strong><span>checked</span></div>
      </div>
      <div class="exam-progress-track" aria-label="Task bank progress"><div class="exam-progress-fill" style="width: ${progress}%"></div></div>
      <div class="exam-task-list">${tasks.map((task, index) => renderGenericTask(task, index, "exam-practice", answers[index], result?.tasks?.[index])).join("")}</div>
      ${result ? renderGenericFeedback(result.tasks) : ""}
      <div class="exam-action-row">
        <button class="ghost-button" type="button" id="prevExamPracticeSet" ${bankState.setIndex === 0 ? "disabled" : ""}>Back</button>
        ${result ? `<button class="ghost-button" type="button" id="editExamPracticeSet">Edit answers</button>` : `<button class="primary-button" type="button" id="checkExamPracticeSet">Check set</button>`}
        <button class="primary-button" type="button" id="nextExamPracticeSet">${bankState.setIndex === totalSets - 1 ? "Finish" : "Next set"}</button>
        <button class="ghost-button" type="button" id="newExamPracticeRound">New round</button>
      </div>
    </section>`;

    document.querySelector("#examBankBack")?.addEventListener("click", renderExerciseMenu);
    document.querySelector("#prevExamPracticeSet")?.addEventListener("click", () => moveBankSet(-1));
    document.querySelector("#checkExamPracticeSet")?.addEventListener("click", checkBankSet);
    document.querySelector("#editExamPracticeSet")?.addEventListener("click", () => { delete bankState.results[bankState.setIndex]; renderMixedExamPractice(); });
    document.querySelector("#nextExamPracticeSet")?.addEventListener("click", () => moveBankSet(1));
    document.querySelector("#newExamPracticeRound")?.addEventListener("click", startMixedExamPractice);
  }

  function renderMixedExamResult() {
    const app = document.querySelector("#app");
    if (!app || !bankState) return;
    const score = scoreFromResults(bankState.results);
    const accuracy = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    setStage("Exercise complete", "Exam Task Practice");
    app.innerHTML = `<section class="exam-result-panel">
      <div>
        <p class="question-kicker">Exam task practice</p>
        <h2>${accuracy}%</h2>
        <p>${accuracy >= 80 ? "Strong round. Try the full exam next." : "Good diagnostic. Go back through the missed task types in Learn and Exercise."}</p>
      </div>
      <div class="exam-score-grid">
        <div class="exam-score-card"><strong>${score.correct}/${score.total}</strong><span>correct</span></div>
        <div class="exam-score-card"><strong>${bankState.tasks.length}</strong><span>available</span></div>
      </div>
      <div class="exam-action-row">
        <button class="primary-button" type="button" id="examBankAgain">New round</button>
        <button class="ghost-button" type="button" id="examBankMenu">Exercise menu</button>
      </div>
    </section>`;
    document.querySelector("#examBankAgain")?.addEventListener("click", startMixedExamPractice);
    document.querySelector("#examBankMenu")?.addEventListener("click", renderExerciseMenu);
  }

  function renderExerciseMenu() {
    if (typeof window.renderDashboardHome === "function") {
      window.renderDashboardHome();
      window.setTimeout(() => {
        document.querySelector("#openExerciseMenu")?.click();
        window.setTimeout(collapseExamBankCards, 0);
      }, 0);
    }
  }

  function practiceStore() {
    return readJson(PRACTICE_STORE_KEY, { correct: {}, missed: {}, attempts: {}, seen: 0 });
  }

  function savePracticeStore(store) {
    localStorage.setItem(PRACTICE_STORE_KEY, JSON.stringify(store));
  }

  function practiceKey(exercise) {
    return `${exercise.category}:${exercise.id}`;
  }

  function renderEnhancedPracticeCategory(categoryId) {
    const categories = getPracticeCategories();
    const category = categories.find((item) => item.id === categoryId) || categories[0];
    if (!category) return;
    practiceState = { category, selectedSubtype: "All", round: [], index: 0, answers: [], results: [] };
    renderPracticeHome();
  }

  function renderPracticeHome() {
    const { category } = practiceState;
    const store = practiceStore();
    const subtypes = ["All", ...new Set(category.exercises.map((exercise) => exercise.subtype))];
    const selectedSubtype = practiceState.selectedSubtype || "All";
    const weak = category.exercises.filter((exercise) => store.missed[practiceKey(exercise)]);
    const known = category.exercises.filter((exercise) => store.correct[practiceKey(exercise)]).length;
    setStage(category.eyebrow, category.title);

    const app = document.querySelector("#app");
    if (!app) return;
    app.innerHTML = `<section class="vocab-panel practice-section-panel">
      <div class="vocab-intro">
        <div>
          <p class="question-kicker">Practice</p>
          <h2>${escapeHtml(category.title)}</h2>
          <p>${escapeHtml(category.description)}</p>
        </div>
        <div class="vocab-counts" aria-label="${escapeHtml(category.title)} progress">
          <div><strong>${category.exercises.length}</strong><span>exercises</span></div>
          <div><strong>${known}</strong><span>known</span></div>
          <div><strong>${weak.length}</strong><span>weak</span></div>
        </div>
      </div>
      <div class="exercise-subtype-grid" aria-label="Exercise subtypes">
        ${subtypes.filter((subtype) => subtype !== "All").map((subtype) => {
          const count = category.exercises.filter((exercise) => exercise.subtype === subtype).length;
          return `<button class="exercise-subtype-card ${selectedSubtype === subtype ? "active-choice" : ""}" type="button" data-subtype="${escapeHtml(subtype)}"><strong>${escapeHtml(subtype)}</strong><span>${count} exercise${count === 1 ? "" : "s"}</span></button>`;
        }).join("")}
      </div>
      <div class="vocab-controls practice-controls">
        <label class="vocab-select-label" for="practiceSubtype">Subtype</label>
        <select id="practiceSubtype" class="vocab-select">
          ${subtypes.map((subtype) => `<option value="${escapeHtml(subtype)}" ${subtype === selectedSubtype ? "selected" : ""}>${escapeHtml(subtype)}</option>`).join("")}
        </select>
        <button class="primary-button" type="button" id="startPracticeRound">Start round</button>
        <button class="ghost-button" type="button" id="startPracticeWeak" ${weak.length ? "" : "disabled"}>Weak items</button>
      </div>
    </section>`;

    document.querySelectorAll("[data-subtype]").forEach((button) => {
      button.addEventListener("click", () => { practiceState.selectedSubtype = button.dataset.subtype; renderPracticeHome(); });
    });
    document.querySelector("#practiceSubtype")?.addEventListener("change", (event) => { practiceState.selectedSubtype = event.target.value; });
    document.querySelector("#startPracticeRound")?.addEventListener("click", () => startPracticeRound(false));
    document.querySelector("#startPracticeWeak")?.addEventListener("click", () => startPracticeRound(true));
  }

  function startPracticeRound(weakOnly) {
    const store = practiceStore();
    const { category } = practiceState;
    const selectedSubtype = practiceState.selectedSubtype || "All";
    const pool = weakOnly
      ? category.exercises.filter((exercise) => store.missed[practiceKey(exercise)])
      : category.exercises.filter((exercise) => selectedSubtype === "All" || exercise.subtype === selectedSubtype);

    practiceState.round = shuffle(pool).slice(0, Math.min(12, pool.length));
    practiceState.index = 0;
    practiceState.answers = [];
    practiceState.results = [];
    renderPracticeQuestion();
  }

  function renderFocusTags(exercise) {
    if (!exercise.focusTags?.length) return "";
    return `<div class="practice-tags">${exercise.focusTags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`;
  }

  function renderRequirements(exercise) {
    const required = [...(exercise.requiredWords || [])];
    if (exercise.requiredAny?.length) exercise.requiredAny.forEach((group) => required.push(group.join(" / ")));
    if (!required.length && !exercise.minSentences) return "";
    return `<div class="practice-requirements">${exercise.minSentences ? `<span>${exercise.minSentences}+ sentences</span>` : ""}${required.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
  }

  function renderPracticeInteraction(exercise, answer, result) {
    const disabled = result ? "disabled" : "";
    if (exercise.interaction === "choice") {
      return `<div class="choice-grid practice-choice-grid">
        ${(exercise.options || []).map((option) => `<button class="choice-card ${normalize(option) === normalize(answer) ? "active-choice" : ""}" type="button" data-choice="${escapeHtml(option)}" ${disabled}>${escapeHtml(option)}</button>`).join("")}
      </div>`;
    }

    if (exercise.interaction === "multi-blank") {
      const answers = Array.isArray(answer) ? answer : [];
      return `<div class="multi-blank-grid">
        ${(exercise.answers || []).map((_, blankIndex) => `<label>Blank ${blankIndex + 1}<input class="answer-input practice-blank" data-blank="${blankIndex}" type="text" autocomplete="off" ${disabled} value="${escapeHtml(answers[blankIndex] || "")}" /></label>`).join("")}
      </div>`;
    }

    if (exercise.interaction === "word-order") {
      const picks = Array.isArray(answer) ? answer : [];
      return `<div class="word-order-tool">
        <div class="word-order-answer" id="wordOrderAnswer" aria-label="Built sentence">${picks.length ? escapeHtml(picks.map((wordIndex) => exercise.wordBank[wordIndex]).join(" ")) : "Choose words below"}</div>
        <div class="word-bank">
          ${(exercise.wordBank || []).map((word, wordIndex) => `<button class="chip-button" type="button" data-word-index="${wordIndex}" ${picks.includes(wordIndex) || result ? "disabled" : ""}>${escapeHtml(word)}</button>`).join("")}
        </div>
        ${result ? "" : `<div class="action-row"><button class="ghost-button" type="button" id="wordOrderReset">Reset</button></div>`}
      </div>`;
    }

    if (exercise.interaction === "guided-writing") {
      return `<div class="guided-writing-tool">${renderRequirements(exercise)}<textarea class="answer-input practice-textarea" id="practiceAnswer" rows="6" autocomplete="off" ${disabled}>${escapeHtml(answer || "")}</textarea></div>`;
    }

    if (exercise.interaction === "category-recall") {
      return `<div class="guided-writing-tool"><p class="hint">Separate words with commas, spaces, or new lines.</p><textarea class="answer-input practice-textarea" id="practiceAnswer" rows="4" autocomplete="off" ${disabled}>${escapeHtml(answer || "")}</textarea></div>`;
    }

    return `<div class="type-row"><input class="answer-input" id="practiceAnswer" type="text" autocomplete="off" ${disabled} value="${escapeHtml(answer || "")}" /></div>`;
  }

  function practiceAnswerFromDom(exercise) {
    if (exercise.interaction === "choice") return document.querySelector("[data-choice].active-choice")?.dataset.choice || practiceState.answers[practiceState.index] || "";
    if (exercise.interaction === "multi-blank") return [...document.querySelectorAll(".practice-blank")].map((input) => input.value);
    if (exercise.interaction === "word-order") return Array.isArray(practiceState.answers[practiceState.index]) ? practiceState.answers[practiceState.index] : [];
    return document.querySelector("#practiceAnswer")?.value || "";
  }

  function savePracticeAnswer() {
    const exercise = practiceState.round[practiceState.index];
    if (!exercise || practiceState.results[practiceState.index]) return;
    practiceState.answers[practiceState.index] = practiceAnswerFromDom(exercise);
  }

  function renderPracticeFeedback(exercise, result) {
    return `<div class="feedback show ${result.correct ? "good" : "bad"}">
      <strong>${result.correct ? "Correct" : "Correct answer"}: ${escapeHtml(displayAnswer(exercise))}</strong>
      ${result.detail ? `<br>${escapeHtml(result.detail)}` : ""}
      ${result.correct ? "" : `<br>Your answer: ${escapeHtml(Array.isArray(result.answer) ? result.answer.join(" / ") : result.answer || "blank")}`}
      <p>${escapeHtml(exercise.explanation)}</p>
    </div>`;
  }

  function renderPracticeQuestion() {
    const { category, round, index } = practiceState;
    const exercise = round[index];
    if (!exercise) { renderPracticeHome(); return; }
    const result = practiceState.results[index];
    const answer = result?.answer ?? practiceState.answers[index] ?? (exercise.interaction === "multi-blank" || exercise.interaction === "word-order" ? [] : "");
    const progress = Math.round((index / round.length) * 100);
    setStage(`${category.title} · ${index + 1}/${round.length}`, exercise.subtype);

    const app = document.querySelector("#app");
    if (!app) return;
    app.innerHTML = `<article class="question-panel practice-question-panel">
      <header class="lesson-header">
        <div><span class="pill">${escapeHtml(exercise.situation ? `${exercise.subtype} · ${exercise.situation}` : exercise.subtype)}</span><h2>${escapeHtml(category.title)}</h2></div>
        <div class="lesson-header-tools">
          <button class="ghost-button unit-exit-button" type="button" id="practiceExit">${escapeHtml(category.shortTitle)}</button>
          <div class="progress-track" aria-label="Practice progress"><div class="progress-fill" style="width: ${progress}%"></div></div>
        </div>
      </header>
      <div class="question-body">
        ${exercise.situation ? `<p class="question-kicker">${escapeHtml(exercise.situation)}</p>` : ""}
        <div class="prompt practice-prompt">${nl2br(exercise.prompt)}</div>
        ${renderFocusTags(exercise)}
        ${renderPracticeInteraction(exercise, answer, result)}
        ${result ? renderPracticeFeedback(exercise, result) : ""}
        <div class="action-row">
          <button class="ghost-button" type="button" id="practiceBack" ${index === 0 ? "disabled" : ""}>Back</button>
          ${result ? `<button class="ghost-button" type="button" id="practiceEdit">Edit answer</button>` : `<button class="primary-button" type="button" id="practiceCheck">Check</button>`}
          <button class="primary-button" type="button" id="practiceNext">${index === round.length - 1 ? "Finish" : "Next"}</button>
        </div>
      </div>
    </article>`;

    document.querySelector("#practiceExit")?.addEventListener("click", renderPracticeHome);
    document.querySelector("#practiceBack")?.addEventListener("click", () => movePractice(-1));
    document.querySelector("#practiceNext")?.addEventListener("click", () => movePractice(1));
    document.querySelector("#practiceCheck")?.addEventListener("click", checkPracticeAnswer);
    document.querySelector("#practiceEdit")?.addEventListener("click", () => { delete practiceState.results[index]; renderPracticeQuestion(); });

    document.querySelectorAll("[data-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-choice]").forEach((item) => item.classList.remove("active-choice"));
        button.classList.add("active-choice");
        practiceState.answers[index] = button.dataset.choice;
      });
    });
    document.querySelectorAll("[data-word-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const picks = Array.isArray(practiceState.answers[index]) ? practiceState.answers[index] : [];
        practiceState.answers[index] = [...picks, Number(button.dataset.wordIndex)];
        renderPracticeQuestion();
      });
    });
    document.querySelector("#wordOrderReset")?.addEventListener("click", () => { practiceState.answers[index] = []; renderPracticeQuestion(); });
    document.querySelector("#practiceAnswer")?.focus();
  }

  function checkPracticeAnswer() {
    savePracticeAnswer();
    const exercise = practiceState.round[practiceState.index];
    const answer = practiceState.answers[practiceState.index] ?? "";
    const evaluation = evaluatePracticeExercise(exercise, answer);
    const store = practiceStore();
    const key = practiceKey(exercise);
    store.seen = (store.seen || 0) + 1;
    store.attempts[key] = (store.attempts[key] || 0) + 1;
    if (evaluation.correct) {
      store.correct[key] = (store.correct[key] || 0) + 1;
      delete store.missed[key];
    } else {
      store.missed[key] = { answer, expected: displayAnswer(exercise), subtype: exercise.subtype, lastTried: new Date().toISOString() };
    }
    savePracticeStore(store);
    practiceState.results[practiceState.index] = { correct: evaluation.correct, answer, detail: evaluation.detail };
    renderPracticeQuestion();
  }

  function movePractice(step) {
    savePracticeAnswer();
    const next = practiceState.index + step;
    if (next < 0) return;
    if (next >= practiceState.round.length) {
      finishPracticeRound();
      return;
    }
    practiceState.index = next;
    renderPracticeQuestion();
  }

  function finishPracticeRound() {
    savePracticeAnswer();
    let correct = 0;
    practiceState.round.forEach((exercise, index) => {
      if (!practiceState.results[index]) {
        const answer = practiceState.answers[index] ?? "";
        const evaluation = evaluatePracticeExercise(exercise, answer);
        practiceState.results[index] = { correct: evaluation.correct, answer, detail: evaluation.detail };
      }
      if (practiceState.results[index].correct) correct += 1;
    });
    renderPracticeResult(correct);
  }

  function renderPracticeResult(correct) {
    const { category, round } = practiceState;
    const accuracy = round.length ? Math.round((correct / round.length) * 100) : 0;
    const weakCount = category.exercises.filter((exercise) => practiceStore().missed[practiceKey(exercise)]).length;
    setStage("Round complete", category.title);
    document.querySelector("#app").innerHTML = `<section class="result-panel">
      <h2>${escapeHtml(category.title)} round complete</h2>
      <p>${accuracy >= 80 ? "Strong round. Try another subtype next." : "Good diagnostic. Checked mistakes were saved as weak items."}</p>
      <div class="result-score">
        <div><strong>${accuracy}%</strong><span>accuracy</span></div>
        <div><strong>${correct}/${round.length}</strong><span>correct</span></div>
        <div><strong>${weakCount}</strong><span>weak items</span></div>
      </div>
      <div class="action-row">
        <button class="primary-button" type="button" id="practiceAgain">New round</button>
        <button class="ghost-button" type="button" id="practiceWeak">Weak items</button>
        <button class="ghost-button" type="button" id="practiceHome">${escapeHtml(category.shortTitle)} home</button>
      </div>
    </section>`;
    document.querySelector("#practiceAgain")?.addEventListener("click", () => startPracticeRound(false));
    document.querySelector("#practiceWeak")?.addEventListener("click", () => startPracticeRound(true));
    document.querySelector("#practiceHome")?.addEventListener("click", renderPracticeHome);
  }

  function vocabItems() {
    if (typeof window.buildVocabItems === "function") return window.buildVocabItems();
    return getVocabularyTerms().map((term) => ({ it: term.it, en: term.en, group: term.topicTitle || "Vocabulary", kind: "Vocabulary" }));
  }

  function vocabDirectionLabel() {
    return vocabState.direction === "it-en" ? "Italian to English" : "English to Italian";
  }

  function vocabAnswerFor(item) {
    return vocabState.direction === "it-en" ? item.en : item.it;
  }

  function vocabPromptFor(item) {
    return vocabState.direction === "it-en" ? item.it : item.en;
  }

  function vocabItemKey(item) {
    return normalize(`${vocabState.direction}|${item.group}|${item.it}|${item.en}`);
  }

  function vocabIsCorrect(answer, item) {
    const response = normalize(answer).replace(/^to\s+/, "");
    if (!response) return false;
    if (vocabState.direction === "it-en") {
      return splitMeanings(item.en).some((meaning) => response === meaning || response.includes(meaning) || meaning.includes(response));
    }
    const exact = normalize(item.it);
    const withoutArticle = stripArticle(item.it);
    return response === exact || response === withoutArticle;
  }

  function renderEnhancedVocabHome() {
    const direction = localStorage.getItem("italian-a1-a2-vocab-direction") || "it-en";
    vocabState = { direction, group: vocabState?.group || "All", round: [], index: 0, answers: [], results: [] };
    const items = vocabItems();
    const groups = ["All", ...new Set(items.map((item) => item.group))];
    const store = readJson(VOCAB_STORE_KEY, { correct: {}, missed: {}, seen: 0 });
    const weak = items.filter((item) => store.missed[vocabItemKey(item)]);
    setStage(vocabDirectionLabel(), "Vocabulary practice");
    document.querySelector("#app").innerHTML = `<section class="vocab-panel">
      <div class="vocab-intro">
        <div>
          <p class="question-kicker">Full exam word list</p>
          <h2>Translate vocabulary both ways</h2>
          <p>Practice all ${items.length} words from your exam pack.</p>
        </div>
        <div class="vocab-counts" aria-label="Vocabulary progress">
          <div><strong>${items.length}</strong><span>words</span></div>
          <div><strong>${Object.keys(store.correct || {}).length}</strong><span>known</span></div>
          <div><strong>${weak.length}</strong><span>weak</span></div>
        </div>
      </div>
      <div class="vocab-direction-toggle" aria-label="Translation direction">
        <button class="chip-button ${vocabState.direction === "it-en" ? "active-choice" : ""}" type="button" data-vocab-direction="it-en">Italian → English</button>
        <button class="chip-button ${vocabState.direction === "en-it" ? "active-choice" : ""}" type="button" data-vocab-direction="en-it">English → Italian</button>
      </div>
      <div class="vocab-controls">
        <label class="vocab-select-label" for="vocabGroup">Topic</label>
        <select id="vocabGroup" class="vocab-select">${groups.map((group) => `<option value="${escapeHtml(group)}" ${group === vocabState.group ? "selected" : ""}>${escapeHtml(group)}</option>`).join("")}</select>
        <button class="primary-button" type="button" id="startVocabRound">Start 20-word round</button>
        <button class="ghost-button" type="button" id="startWeakRound" ${weak.length ? "" : "disabled"}>Weak words</button>
      </div>
    </section>`;
    document.querySelectorAll("[data-vocab-direction]").forEach((button) => button.addEventListener("click", () => {
      localStorage.setItem("italian-a1-a2-vocab-direction", button.dataset.vocabDirection);
      renderEnhancedVocabHome();
    }));
    document.querySelector("#vocabGroup")?.addEventListener("change", (event) => { vocabState.group = event.target.value; });
    document.querySelector("#startVocabRound")?.addEventListener("click", () => startVocabRound(false));
    document.querySelector("#startWeakRound")?.addEventListener("click", () => startVocabRound(true));
  }

  function startVocabRound(weakOnly) {
    const items = vocabItems();
    const store = readJson(VOCAB_STORE_KEY, { correct: {}, missed: {}, seen: 0 });
    const pool = weakOnly ? items.filter((item) => store.missed[vocabItemKey(item)]) : items.filter((item) => vocabState.group === "All" || item.group === vocabState.group);
    vocabState.round = shuffle(pool).slice(0, 20);
    vocabState.index = 0;
    vocabState.answers = [];
    vocabState.results = [];
    renderVocabQuestion();
  }

  function saveVocabAnswer() {
    if (vocabState.results[vocabState.index]) return;
    vocabState.answers[vocabState.index] = document.querySelector("#vocabAnswer")?.value || "";
  }

  function checkVocabAnswer() {
    saveVocabAnswer();
    const item = vocabState.round[vocabState.index];
    const answer = vocabState.answers[vocabState.index] || "";
    const correct = vocabIsCorrect(answer, item);
    const store = readJson(VOCAB_STORE_KEY, { correct: {}, missed: {}, seen: 0 });
    const key = vocabItemKey(item);
    store.seen = (store.seen || 0) + 1;
    if (correct) {
      store.correct[key] = (store.correct[key] || 0) + 1;
      delete store.missed[key];
    } else {
      store.missed[key] = { it: item.it, en: item.en, group: item.group, direction: vocabState.direction, lastAnswer: answer };
    }
    localStorage.setItem(VOCAB_STORE_KEY, JSON.stringify(store));
    vocabState.results[vocabState.index] = { answer, correct };
    renderVocabQuestion();
  }

  function moveVocab(step) {
    saveVocabAnswer();
    const next = vocabState.index + step;
    if (next < 0) return;
    if (next >= vocabState.round.length) { finishVocabRound(); return; }
    vocabState.index = next;
    renderVocabQuestion();
  }

  function renderVocabQuestion() {
    const item = vocabState.round[vocabState.index];
    if (!item) { renderEnhancedVocabHome(); return; }
    const result = vocabState.results[vocabState.index];
    const answer = result?.answer ?? vocabState.answers[vocabState.index] ?? "";
    const progress = Math.round((vocabState.index / vocabState.round.length) * 100);
    setStage(`${vocabDirectionLabel()} · ${vocabState.index + 1}/${vocabState.round.length}`, "Vocabulary practice");
    document.querySelector("#app").innerHTML = `<article class="question-panel vocab-question-panel">
      <header class="lesson-header">
        <div><span class="pill">${escapeHtml(item.group)}</span><h2>${escapeHtml(vocabDirectionLabel())}</h2></div>
        <div class="lesson-header-tools"><button class="ghost-button unit-exit-button" type="button" id="vocabExit">Vocab</button><div class="progress-track" aria-label="Vocabulary progress"><div class="progress-fill" style="width: ${progress}%"></div></div></div>
      </header>
      <div class="question-body">
        <p class="question-kicker">${vocabState.direction === "it-en" ? "Italian" : "English"}</p>
        <div class="prompt">${escapeHtml(vocabPromptFor(item))}</div>
        <p class="hint">${vocabState.direction === "it-en" ? "Type the English meaning." : "Type the Italian word. Articles are accepted but not required for nouns."}</p>
        <div class="type-row"><input class="answer-input" id="vocabAnswer" type="text" autocomplete="off" ${result ? "disabled" : ""} value="${escapeHtml(answer)}" /></div>
        ${result ? `<div class="feedback show ${result.correct ? "good" : "bad"}"><strong>${result.correct ? "Correct" : "Correct answer"}: ${escapeHtml(vocabAnswerFor(item))}</strong>${result.correct ? "" : `<br>Your answer: ${escapeHtml(result.answer || "blank")}`}</div>` : ""}
        <div class="action-row"><button class="ghost-button" type="button" id="vocabBack" ${vocabState.index === 0 ? "disabled" : ""}>Back</button>${result ? `<button class="ghost-button" type="button" id="vocabEdit">Edit answer</button>` : `<button class="primary-button" type="button" id="vocabCheck">Check</button>`}<button class="primary-button" type="button" id="vocabNext">${vocabState.index === vocabState.round.length - 1 ? "Finish" : "Next"}</button></div>
      </div>
    </article>`;
    document.querySelector("#vocabExit")?.addEventListener("click", renderEnhancedVocabHome);
    document.querySelector("#vocabBack")?.addEventListener("click", () => moveVocab(-1));
    document.querySelector("#vocabNext")?.addEventListener("click", () => moveVocab(1));
    document.querySelector("#vocabCheck")?.addEventListener("click", checkVocabAnswer);
    document.querySelector("#vocabEdit")?.addEventListener("click", () => { delete vocabState.results[vocabState.index]; renderVocabQuestion(); });
    document.querySelector("#vocabAnswer")?.focus();
  }

  function finishVocabRound() {
    saveVocabAnswer();
    let correct = 0;
    vocabState.round.forEach((item, index) => {
      if (!vocabState.results[index]) {
        const answer = vocabState.answers[index] || "";
        vocabState.results[index] = { answer, correct: vocabIsCorrect(answer, item) };
      }
      if (vocabState.results[index].correct) correct += 1;
    });
    const accuracy = vocabState.round.length ? Math.round((correct / vocabState.round.length) * 100) : 0;
    setStage("Round complete", "Vocabulary practice");
    document.querySelector("#app").innerHTML = `<section class="result-panel"><h2>Vocabulary round complete</h2><p>${accuracy >= 80 ? "Strong vocabulary round." : "Good diagnostic. Checked mistakes are saved into Weak words."}</p><div class="result-score"><div><strong>${accuracy}%</strong><span>accuracy</span></div><div><strong>${correct}/${vocabState.round.length}</strong><span>correct</span></div></div><div class="action-row"><button class="primary-button" type="button" id="vocabAgain">New round</button><button class="ghost-button" type="button" id="vocabHome">Vocab home</button></div></section>`;
    document.querySelector("#vocabAgain")?.addEventListener("click", () => startVocabRound(false));
    document.querySelector("#vocabHome")?.addEventListener("click", renderEnhancedVocabHome);
  }

  function flatExamIndex() {
    return examState.pageIndex * 5 + examState.exerciseIndex;
  }

  function currentExamPage() {
    return examState.pages[examState.pageIndex];
  }

  function currentExamExercise() {
    return currentExamPage().exercises[examState.exerciseIndex];
  }

  function startEnhancedFullExam() {
    document.body.classList.add("exam-dashboard-ready");
    examState = { pages: generateFullExam(), pageIndex: 0, exerciseIndex: 0, answers: [], results: [], startedAt: Date.now() };
    renderEnhancedExamExercise();
  }

  function saveExamAnswers() {
    if (!examState) return;
    const flatIndex = flatExamIndex();
    if (examState.results[flatIndex]) return;
    examState.answers[flatIndex] = currentExamExercise().tasks.map((task, index) => collectGenericTaskAnswer(task, index, "exam-task"));
  }

  function gradeExamExercise(exercise, answers) {
    return {
      pageId: currentExamPage().id,
      exerciseId: exercise.id,
      tasks: exercise.tasks.map((task, index) => {
        const response = answers?.[index] || "";
        return { taskId: task.id, prompt: task.prompt, response, answer: task.answer, correct: answerIsCorrect(task, response), explanation: task.explanation };
      })
    };
  }

  function checkEnhancedExamExercise() {
    saveExamAnswers();
    const flatIndex = flatExamIndex();
    examState.results[flatIndex] = gradeExamExercise(currentExamExercise(), examState.answers[flatIndex] || []);
    renderEnhancedExamExercise();
  }

  function moveExam(step) {
    saveExamAnswers();
    const flat = flatExamIndex();
    const next = flat + step;
    if (next < 0) return;
    if (next >= 25) { finishEnhancedFullExam(); return; }
    examState.pageIndex = Math.floor(next / 5);
    examState.exerciseIndex = next % 5;
    renderEnhancedExamExercise();
  }

  function finishEnhancedFullExam() {
    saveExamAnswers();
    examState.pages.forEach((page, pageIndex) => {
      page.exercises.forEach((exercise, exerciseIndex) => {
        const flatIndex = pageIndex * 5 + exerciseIndex;
        if (!examState.results[flatIndex]) examState.results[flatIndex] = gradeExamExerciseForPage(page, exercise, examState.answers[flatIndex] || []);
      });
    });
    renderEnhancedExamResult();
  }

  function gradeExamExerciseForPage(page, exercise, answers) {
    return {
      pageId: page.id,
      exerciseId: exercise.id,
      tasks: exercise.tasks.map((task, index) => {
        const response = answers?.[index] || "";
        return { taskId: task.id, prompt: task.prompt, response, answer: task.answer, correct: answerIsCorrect(task, response), explanation: task.explanation };
      })
    };
  }

  function renderEnhancedExamExercise() {
    const app = document.querySelector("#app");
    if (!app || !examState) return;
    const page = currentExamPage();
    const exercise = currentExamExercise();
    const flatIndex = flatExamIndex();
    const result = examState.results[flatIndex];
    const answers = examState.answers[flatIndex] || [];
    const score = scoreFromResults(examState.results);
    const progress = Math.round((flatIndex / 25) * 100);
    setStage(`Page ${examState.pageIndex + 1}/5 · ${page.title}`, `Exercise ${examState.exerciseIndex + 1}/5`);

    app.innerHTML = `<section class="exam-panel">
      <div class="dashboard-section-title">
        <div><p class="question-kicker">Full exam</p><h2>${escapeHtml(page.title)}</h2><p>${escapeHtml(page.description)}</p></div>
        <button class="ghost-button" type="button" id="examBackMenu">Menu</button>
      </div>
      <div class="exam-meta-grid" aria-label="Exam progress">
        <div class="exam-meta-card"><strong>${examState.pageIndex + 1}/5</strong><span>page</span></div>
        <div class="exam-meta-card"><strong>${examState.exerciseIndex + 1}/5</strong><span>exercise</span></div>
        <div class="exam-meta-card"><strong>${flatIndex + 1}/25</strong><span>round</span></div>
        <div class="exam-meta-card"><strong>${score.correct}/${score.total}</strong><span>checked</span></div>
      </div>
      <div class="exam-progress-track" aria-label="Full exam progress"><div class="exam-progress-fill" style="width: ${progress}%"></div></div>
      <div class="exam-task-list">${exercise.tasks.map((task, index) => renderGenericTask(task, index, "exam-task", answers[index], result?.tasks?.[index])).join("")}</div>
      ${result ? renderGenericFeedback(result.tasks) : ""}
      <div class="exam-action-row">
        <button class="ghost-button" type="button" id="prevExamExercise" ${flatIndex === 0 ? "disabled" : ""}>Back</button>
        ${result ? `<button class="ghost-button" type="button" id="editExamExercise">Edit answers</button>` : `<button class="primary-button" type="button" id="checkExamExercise">Check exercise</button>`}
        <button class="primary-button" type="button" id="nextExamExercise">${flatIndex === 24 ? "Finish exam" : "Next exercise"}</button>
        <button class="ghost-button" type="button" id="restartExam">New exam</button>
      </div>
    </section>`;

    document.querySelector("#examBackMenu")?.addEventListener("click", () => window.renderDashboardHome?.());
    document.querySelector("#prevExamExercise")?.addEventListener("click", () => moveExam(-1));
    document.querySelector("#checkExamExercise")?.addEventListener("click", checkEnhancedExamExercise);
    document.querySelector("#editExamExercise")?.addEventListener("click", () => { delete examState.results[flatIndex]; renderEnhancedExamExercise(); });
    document.querySelector("#nextExamExercise")?.addEventListener("click", () => moveExam(1));
    document.querySelector("#restartExam")?.addEventListener("click", startEnhancedFullExam);
  }

  function saveEnhancedFullExamResult(correct, total, percent) {
    const previous = readJson(FULL_EXAM_STORE_KEY, { bestPercent: 0, attempts: 0, history: [] });
    const record = { correct, total, percent, finishedAt: new Date().toISOString() };
    localStorage.setItem(FULL_EXAM_STORE_KEY, JSON.stringify({
      bestPercent: Math.max(previous.bestPercent || 0, percent),
      attempts: (previous.attempts || 0) + 1,
      history: [record, ...(previous.history || [])].slice(0, 10)
    }));

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
  }

  function renderEnhancedExamResult() {
    const score = scoreFromResults(examState.results);
    const total = 125;
    const percent = Math.round((score.correct / total) * 100);
    saveEnhancedFullExamResult(score.correct, total, percent);
    const summaries = examState.pages.map((page, pageIndex) => {
      const pageResults = examState.results.slice(pageIndex * 5, pageIndex * 5 + 5).flatMap((result) => result?.tasks || []);
      return { title: page.title, correct: pageResults.filter((task) => task.correct).length, total: 25 };
    });
    setStage("Exam complete", "Full A1/A2 exam result");
    document.querySelector("#app").innerHTML = `<section class="exam-result-panel">
      <div><p class="question-kicker">Full exam score</p><h2>${percent}%</h2><p>${percent >= 80 ? "Strong result. Repeat the lowest page next." : "Useful diagnostic. The page scores show what to review."}</p></div>
      <div class="exam-score-grid"><div class="exam-score-card"><strong>${score.correct}/${total}</strong><span>tasks correct</span></div><div class="exam-score-card"><strong>${percent}%</strong><span>accuracy</span></div></div>
      <ul class="exam-review-list">${summaries.map((summary) => `<li><strong>${escapeHtml(summary.title)}</strong><br><span>${summary.correct}/${summary.total} correct</span></li>`).join("")}</ul>
      <div class="exam-action-row"><button class="primary-button" type="button" id="examAgain">New exam</button><button class="ghost-button" type="button" id="examResultMenu">Menu</button><button class="ghost-button" type="button" id="examResultExercise">Exercise</button></div>
    </section>`;
    document.querySelector("#examAgain")?.addEventListener("click", startEnhancedFullExam);
    document.querySelector("#examResultMenu")?.addEventListener("click", () => window.renderDashboardHome?.());
    document.querySelector("#examResultExercise")?.addEventListener("click", renderExerciseMenu);
  }

  function interceptFullExamClicks() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("#openFullExam, #examMode");
      if (!target) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      startEnhancedFullExam();
    }, true);
  }

  function interceptExerciseMenuClicks() {
    document.addEventListener("click", (event) => {
      if (!event.target.closest("#openExerciseMenu, #examResultExercise")) return;
      scheduleCollapseExamBankCards();
    });
  }

  window.renderPracticeCategory = renderEnhancedPracticeCategory;
  window.renderDirectionalVocabHome = renderEnhancedVocabHome;
  window.startFullExam = startEnhancedFullExam;
  window.startExam = startEnhancedFullExam;
  window.startExamTaskPractice = startMixedExamPractice;
  window.renderExamTaskBank = renderExerciseMenu;

  interceptFullExamClicks();
  interceptExerciseMenuClicks();
  window.addEventListener("load", scheduleCollapseExamBankCards);
  scheduleCollapseExamBankCards();
})();
