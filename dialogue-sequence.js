(() => {
  if (window.__ITALIAN_DIALOGUE_SEQUENCE__) return;
  window.__ITALIAN_DIALOGUE_SEQUENCE__ = true;

  const MAIN_STORE_KEY = "italian-a1-a2-practice";
  const FULL_EXAM_STORE_KEY = "italian-a1-a2-full-exam";

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

  function normalize(value) {
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

  function makeSequenceTask(id, title, lines) {
    return {
      id,
      input: "sequence",
      prompt: `Put this dialogue in order: ${title}`,
      answer: lines.join(" / "),
      explanation: "Select the sentences in the natural order. The number on the left shows the order you chose.",
      note: title,
      correctLines: lines,
      sequenceChoices: shuffle(lines.map((line, index) => ({ line, index })))
    };
  }

  function buildWordChoiceTasks(prefix = "word-choice") {
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

  function buildVerbTasks(prefix = "verb-forms") {
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

  function buildRegisterTasks(prefix = "formal-informal") {
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

  function buildAdjectiveTasks(prefix = "adjectives") {
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

  function buildDialogueSequenceTasks(prefix = "dialogue") {
    return DIALOGUES.map(([title, lines], index) => makeSequenceTask(`${prefix}-sequence-${index}`, title, lines));
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

  function dialogueSequenceExercises() {
    const selected = shuffle(DIALOGUES).slice(0, 5);
    while (selected.length < 5) selected.push(...shuffle(DIALOGUES).slice(0, 5 - selected.length));
    return selected.map(([title, lines], index) => ({
      id: `dialogue-sequence-exercise-${index + 1}`,
      title,
      tasks: [makeSequenceTask(`dialogue-sequence-${index + 1}`, title, lines)]
    }));
  }

  function generateExam() {
    return [
      { id: "word-choice", title: "Word Choice", description: "Choose which of the two Italian words or forms is correct.", exercises: exercisesFromPool("word-choice", buildWordChoiceTasks("word-choice")) },
      { id: "verb-forms", title: "Verb Forms", description: "Write the correct verb form for the given pronoun and infinitive.", exercises: exercisesFromPool("verb-forms", buildVerbTasks("verb-forms")) },
      { id: "dialogue-sorting", title: "Dialogue Sorting", description: "Select the dialogue sentences in order. Numbers appear as you choose them.", exercises: dialogueSequenceExercises() },
      { id: "formal-informal", title: "Formal or Informal", description: "Choose whether the sentence is formal or informal Italian.", exercises: exercisesFromPool("formal-informal", buildRegisterTasks("formal-informal")) },
      { id: "adjectives", title: "Adjective Agreement", description: "Write the adjective form that matches gender and number.", exercises: exercisesFromPool("adjectives", buildAdjectiveTasks("adjectives")) }
    ];
  }

  function allBankTasks() {
    return shuffle([
      ...buildWordChoiceTasks("bank-word"),
      ...buildVerbTasks("bank-verb"),
      ...buildDialogueSequenceTasks("bank-dialogue"),
      ...buildRegisterTasks("bank-register"),
      ...buildAdjectiveTasks("bank-adjective")
    ]);
  }

  function taskPoints(task) {
    return task.input === "sequence" ? task.correctLines.length : 1;
  }

  function answerIsCorrect(task, response) {
    return (task.acceptedAnswers || [task.answer]).some((answer) => normalize(answer) === normalize(response));
  }

  function gradeTask(task, response) {
    if (task.input === "sequence") {
      const selected = Array.isArray(response) ? response : [];
      const lineResults = task.correctLines.map((expected, position) => {
        const selectedIndex = selected[position];
        const selectedLine = Number.isInteger(selectedIndex) ? task.correctLines[selectedIndex] : "";
        return {
          position: position + 1,
          expected,
          selected: selectedLine,
          correct: selectedIndex === position
        };
      });
      const correctPoints = lineResults.filter((line) => line.correct).length;
      return {
        ...task,
        response: selected,
        answer: task.correctLines.join(" / "),
        correct: correctPoints === task.correctLines.length,
        correctPoints,
        points: task.correctLines.length,
        lineResults
      };
    }

    const correct = answerIsCorrect(task, response || "");
    return { ...task, response: response || "", correct, correctPoints: correct ? 1 : 0, points: 1 };
  }

  function scoreFromResults(results) {
    const taskResults = results.flatMap((result) => result?.tasks || []);
    return taskResults.reduce((score, task) => ({
      correct: score.correct + (task.correctPoints ?? (task.correct ? 1 : 0)),
      total: score.total + (task.points ?? 1)
    }), { correct: 0, total: 0 });
  }

  function renderTask(task, index, namePrefix, answer, result) {
    const disabled = result ? "disabled" : "";
    if (task.input === "sequence") {
      const selected = Array.isArray(result?.response) ? result.response : Array.isArray(answer) ? answer : [];
      const ranks = new Map(selected.map((lineIndex, order) => [Number(lineIndex), order + 1]));
      return `<article class="exam-task sequence-task" data-sequence-task>
        <div class="exam-task-header">
          <div>
            <p class="question-kicker">${escapeHtml(task.note || "Dialogue")}</p>
            <h3>${escapeHtml(task.prompt)}</h3>
          </div>
          <span class="exam-task-number">${task.correctLines.length} lines</span>
        </div>
        <div class="sequence-list" aria-label="Dialogue sentence order">
          ${task.sequenceChoices.map((choice) => {
            const rank = ranks.get(choice.index) || "";
            return `<button class="sequence-option ${rank ? "selected" : ""}" type="button" data-sequence-line="${choice.index}" ${disabled}>
              <span class="sequence-rank">${rank}</span>
              <span>${escapeHtml(choice.line)}</span>
            </button>`;
          }).join("")}
        </div>
        ${result ? "" : `<button class="ghost-button sequence-reset" type="button" data-sequence-reset>Reset order</button>`}
      </article>`;
    }

    const value = result?.response ?? answer ?? "";
    const control = task.input === "choice"
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

  function bindSequenceControls() {
    document.querySelectorAll("[data-sequence-task]").forEach((container) => {
      const updateRanks = () => {
        const buttons = [...container.querySelectorAll("[data-sequence-line]")];
        buttons.forEach((button) => {
          const rank = button.dataset.rank || "";
          button.classList.toggle("selected", Boolean(rank));
          const badge = button.querySelector(".sequence-rank");
          if (badge) badge.textContent = rank;
        });
      };

      container.querySelectorAll("[data-sequence-line]").forEach((button) => {
        button.addEventListener("click", () => {
          if (button.disabled) return;
          const buttons = [...container.querySelectorAll("[data-sequence-line]")];
          if (button.dataset.rank) {
            const removedRank = Number(button.dataset.rank);
            delete button.dataset.rank;
            buttons.forEach((item) => {
              const rank = Number(item.dataset.rank || 0);
              if (rank > removedRank) item.dataset.rank = String(rank - 1);
            });
          } else {
            const nextRank = buttons.filter((item) => item.dataset.rank).length + 1;
            button.dataset.rank = String(nextRank);
          }
          updateRanks();
        });
      });

      container.querySelector("[data-sequence-reset]")?.addEventListener("click", () => {
        container.querySelectorAll("[data-sequence-line]").forEach((button) => delete button.dataset.rank);
        updateRanks();
      });
    });
  }

  function collectTaskAnswer(task, index, namePrefix) {
    if (task.input === "sequence") {
      const container = document.querySelectorAll("[data-sequence-task]")[index];
      if (!container) return [];
      return [...container.querySelectorAll("[data-sequence-line][data-rank]")]
        .sort((a, b) => Number(a.dataset.rank) - Number(b.dataset.rank))
        .map((button) => Number(button.dataset.sequenceLine));
    }
    if (task.input === "choice") {
      return document.querySelector(`input[name="${namePrefix}-${index}"]:checked`)?.value || "";
    }
    return document.querySelector(`[data-task-input="${index}"]`)?.value || "";
  }

  function renderFeedback(tasks) {
    return `<div class="exam-feedback-list" aria-label="Exercise feedback">
      ${tasks.map((task, index) => {
        if (task.input === "sequence") {
          return `<div class="exam-feedback-item ${task.correct ? "good" : "bad"}">
            <strong>${task.correctPoints}/${task.points} lines correct</strong>
            <ol class="sequence-feedback-list">
              ${task.lineResults.map((line) => `<li class="${line.correct ? "good" : "bad"}"><span>${escapeHtml(line.selected || "blank")}</span><small>Correct: ${escapeHtml(line.expected)}</small></li>`).join("")}
            </ol>
            <p>${escapeHtml(task.explanation)}</p>
          </div>`;
        }
        return `<div class="exam-feedback-item ${task.correct ? "good" : "bad"}">
          <strong>${task.correct ? "Correct" : "Task " + (index + 1) + " correct answer: " + escapeHtml(task.answer)}</strong>
          ${task.correct ? `<p>${escapeHtml(task.answer)}</p>` : `<p>Your answer: ${escapeHtml(task.response || "blank")}</p>`}
          <p>${escapeHtml(task.explanation)}</p>
        </div>`;
      }).join("")}
    </div>`;
  }

  function flatExamIndex() {
    return examState.pageIndex * 5 + examState.exerciseIndex;
  }

  function currentPage() {
    return examState.pages[examState.pageIndex];
  }

  function currentExercise() {
    return currentPage().exercises[examState.exerciseIndex];
  }

  function startSequenceExam() {
    document.body.classList.add("exam-dashboard-ready");
    examState = { pages: generateExam(), pageIndex: 0, exerciseIndex: 0, answers: [], results: [], startedAt: Date.now() };
    renderExamExercise();
  }

  function saveExamAnswers() {
    if (!examState) return;
    const flatIndex = flatExamIndex();
    if (examState.results[flatIndex]) return;
    examState.answers[flatIndex] = currentExercise().tasks.map((task, index) => collectTaskAnswer(task, index, "exam-task"));
  }

  function gradeExercise(page, exercise, answers) {
    return {
      pageId: page.id,
      exerciseId: exercise.id,
      tasks: exercise.tasks.map((task, index) => gradeTask(task, answers?.[index]))
    };
  }

  function checkExamExercise() {
    saveExamAnswers();
    examState.results[flatExamIndex()] = gradeExercise(currentPage(), currentExercise(), examState.answers[flatExamIndex()] || []);
    renderExamExercise();
  }

  function moveExam(step) {
    saveExamAnswers();
    const next = flatExamIndex() + step;
    if (next < 0) return;
    if (next >= 25) {
      finishExam();
      return;
    }
    examState.pageIndex = Math.floor(next / 5);
    examState.exerciseIndex = next % 5;
    renderExamExercise();
  }

  function finishExam() {
    saveExamAnswers();
    examState.pages.forEach((page, pageIndex) => {
      page.exercises.forEach((exercise, exerciseIndex) => {
        const flatIndex = pageIndex * 5 + exerciseIndex;
        if (!examState.results[flatIndex]) {
          examState.results[flatIndex] = gradeExercise(page, exercise, examState.answers[flatIndex] || []);
        }
      });
    });
    renderExamResult();
  }

  function renderExamExercise() {
    const app = document.querySelector("#app");
    if (!app || !examState) return;
    const page = currentPage();
    const exercise = currentExercise();
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
      <div class="exam-task-list">${exercise.tasks.map((task, index) => renderTask(task, index, "exam-task", answers[index], result?.tasks?.[index])).join("")}</div>
      ${result ? renderFeedback(result.tasks) : ""}
      <div class="exam-action-row">
        <button class="ghost-button" type="button" id="prevExamExercise" ${flatIndex === 0 ? "disabled" : ""}>Back</button>
        ${result ? `<button class="ghost-button" type="button" id="editExamExercise">Edit answers</button>` : `<button class="primary-button" type="button" id="checkExamExercise">Check exercise</button>`}
        <button class="primary-button" type="button" id="nextExamExercise">${flatIndex === 24 ? "Finish exam" : "Next exercise"}</button>
        <button class="ghost-button" type="button" id="restartExam">New exam</button>
      </div>
    </section>`;

    bindSequenceControls();
    document.querySelector("#examBackMenu")?.addEventListener("click", () => window.renderDashboardHome?.());
    document.querySelector("#prevExamExercise")?.addEventListener("click", () => moveExam(-1));
    document.querySelector("#checkExamExercise")?.addEventListener("click", checkExamExercise);
    document.querySelector("#editExamExercise")?.addEventListener("click", () => { delete examState.results[flatIndex]; renderExamExercise(); });
    document.querySelector("#nextExamExercise")?.addEventListener("click", () => moveExam(1));
    document.querySelector("#restartExam")?.addEventListener("click", startSequenceExam);
  }

  function saveExamResult(correct, total, percent) {
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

  function renderExamResult() {
    const score = scoreFromResults(examState.results);
    const total = 125;
    const percent = Math.round((score.correct / total) * 100);
    saveExamResult(score.correct, total, percent);
    const summaries = examState.pages.map((page, pageIndex) => {
      const pageScore = scoreFromResults(examState.results.slice(pageIndex * 5, pageIndex * 5 + 5));
      return { title: page.title, correct: pageScore.correct, total: pageScore.total || 25 };
    });
    setStage("Exam complete", "Full A1/A2 exam result");
    document.querySelector("#app").innerHTML = `<section class="exam-result-panel">
      <div><p class="question-kicker">Full exam score</p><h2>${percent}%</h2><p>${percent >= 80 ? "Strong result. Repeat the lowest page next." : "Useful diagnostic. The page scores show what to review."}</p></div>
      <div class="exam-score-grid"><div class="exam-score-card"><strong>${score.correct}/${total}</strong><span>tasks correct</span></div><div class="exam-score-card"><strong>${percent}%</strong><span>accuracy</span></div></div>
      <ul class="exam-review-list">${summaries.map((summary) => `<li><strong>${escapeHtml(summary.title)}</strong><br><span>${summary.correct}/${summary.total} correct</span></li>`).join("")}</ul>
      <div class="exam-action-row"><button class="primary-button" type="button" id="examAgain">New exam</button><button class="ghost-button" type="button" id="examResultMenu">Menu</button><button class="ghost-button" type="button" id="examResultExercise">Exercise</button></div>
    </section>`;
    document.querySelector("#examAgain")?.addEventListener("click", startSequenceExam);
    document.querySelector("#examResultMenu")?.addEventListener("click", () => window.renderDashboardHome?.());
    document.querySelector("#examResultExercise")?.addEventListener("click", renderExerciseMenu);
  }

  function startSequenceBank() {
    bankState = { tasks: allBankTasks(), setIndex: 0, answers: [], results: [] };
    renderBankSet();
  }

  function currentBankTasks() {
    return bankState.tasks.slice(bankState.setIndex * 5, bankState.setIndex * 5 + 5);
  }

  function saveBankAnswers() {
    if (!bankState) return;
    if (bankState.results[bankState.setIndex]) return;
    bankState.answers[bankState.setIndex] = currentBankTasks().map((task, index) => collectTaskAnswer(task, index, "exam-practice"));
  }

  function checkBankSet() {
    saveBankAnswers();
    const answers = bankState.answers[bankState.setIndex] || [];
    bankState.results[bankState.setIndex] = { tasks: currentBankTasks().map((task, index) => gradeTask(task, answers[index])) };
    renderBankSet();
  }

  function moveBank(step) {
    saveBankAnswers();
    const totalSets = Math.max(1, Math.ceil(bankState.tasks.length / 5));
    const next = bankState.setIndex + step;
    if (next < 0) return;
    if (next >= totalSets) {
      finishBank();
      return;
    }
    bankState.setIndex = next;
    renderBankSet();
  }

  function finishBank() {
    saveBankAnswers();
    const totalSets = Math.ceil(bankState.tasks.length / 5);
    for (let setIndex = 0; setIndex < totalSets; setIndex += 1) {
      if (bankState.results[setIndex]) continue;
      const tasks = bankState.tasks.slice(setIndex * 5, setIndex * 5 + 5);
      const answers = bankState.answers[setIndex] || [];
      bankState.results[setIndex] = { tasks: tasks.map((task, index) => gradeTask(task, answers[index])) };
    }
    renderBankResult();
  }

  function renderBankSet() {
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
        <div><p class="question-kicker">Exercise</p><h2>Exam Task Practice</h2><p>Mixed exam tasks. Dialogue sorting uses numbered sentence selection.</p></div>
        <button class="ghost-button" type="button" id="examBankBack">Exercise menu</button>
      </div>
      <div class="exam-meta-grid" aria-label="Exam task practice progress">
        <div class="exam-meta-card"><strong>${bankState.setIndex + 1}/${totalSets}</strong><span>set</span></div>
        <div class="exam-meta-card"><strong>${tasks.reduce((sum, task) => sum + taskPoints(task), 0)}</strong><span>points now</span></div>
        <div class="exam-meta-card"><strong>${bankState.tasks.length}</strong><span>items</span></div>
        <div class="exam-meta-card"><strong>${score.correct}/${score.total}</strong><span>checked</span></div>
      </div>
      <div class="exam-progress-track" aria-label="Task bank progress"><div class="exam-progress-fill" style="width: ${progress}%"></div></div>
      <div class="exam-task-list">${tasks.map((task, index) => renderTask(task, index, "exam-practice", answers[index], result?.tasks?.[index])).join("")}</div>
      ${result ? renderFeedback(result.tasks) : ""}
      <div class="exam-action-row">
        <button class="ghost-button" type="button" id="prevExamPracticeSet" ${bankState.setIndex === 0 ? "disabled" : ""}>Back</button>
        ${result ? `<button class="ghost-button" type="button" id="editExamPracticeSet">Edit answers</button>` : `<button class="primary-button" type="button" id="checkExamPracticeSet">Check set</button>`}
        <button class="primary-button" type="button" id="nextExamPracticeSet">${bankState.setIndex === totalSets - 1 ? "Finish" : "Next set"}</button>
        <button class="ghost-button" type="button" id="newExamPracticeRound">New round</button>
      </div>
    </section>`;

    bindSequenceControls();
    document.querySelector("#examBankBack")?.addEventListener("click", renderExerciseMenu);
    document.querySelector("#prevExamPracticeSet")?.addEventListener("click", () => moveBank(-1));
    document.querySelector("#checkExamPracticeSet")?.addEventListener("click", checkBankSet);
    document.querySelector("#editExamPracticeSet")?.addEventListener("click", () => { delete bankState.results[bankState.setIndex]; renderBankSet(); });
    document.querySelector("#nextExamPracticeSet")?.addEventListener("click", () => moveBank(1));
    document.querySelector("#newExamPracticeRound")?.addEventListener("click", startSequenceBank);
  }

  function renderBankResult() {
    const score = scoreFromResults(bankState.results);
    const accuracy = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    setStage("Exercise complete", "Exam Task Practice");
    document.querySelector("#app").innerHTML = `<section class="exam-result-panel">
      <div><p class="question-kicker">Exam task practice</p><h2>${accuracy}%</h2><p>${accuracy >= 80 ? "Strong round. Try the full exam next." : "Good diagnostic. Repeat the areas that felt slow."}</p></div>
      <div class="exam-score-grid"><div class="exam-score-card"><strong>${score.correct}/${score.total}</strong><span>correct</span></div><div class="exam-score-card"><strong>${bankState.tasks.length}</strong><span>items</span></div></div>
      <div class="exam-action-row"><button class="primary-button" type="button" id="examBankAgain">New round</button><button class="ghost-button" type="button" id="examBankMenu">Exercise menu</button></div>
    </section>`;
    document.querySelector("#examBankAgain")?.addEventListener("click", startSequenceBank);
    document.querySelector("#examBankMenu")?.addEventListener("click", renderExerciseMenu);
  }

  function renderExerciseMenu() {
    if (typeof window.renderDashboardHome === "function") {
      window.renderDashboardHome();
      window.setTimeout(() => {
        document.querySelector("#openExerciseMenu")?.click();
        window.setTimeout(rebindExamTaskCard, 0);
      }, 0);
    }
  }

  function rebindExamTaskCard() {
    const card = document.querySelector("#exerciseAllExamTasks");
    if (!card) return;
    const clone = card.cloneNode(true);
    clone.addEventListener("click", startSequenceBank);
    card.replaceWith(clone);
  }

  function interceptClicks() {
    window.addEventListener("click", (event) => {
      const fullExam = event.target.closest("#openFullExam, #examMode");
      const bank = event.target.closest("#exerciseAllExamTasks");
      if (!fullExam && !bank) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (fullExam) startSequenceExam();
      if (bank) startSequenceBank();
    }, true);

    document.addEventListener("click", (event) => {
      if (!event.target.closest("#openExerciseMenu, #examResultExercise")) return;
      window.setTimeout(rebindExamTaskCard, 0);
    });
  }

  window.startFullExam = startSequenceExam;
  window.startExam = startSequenceExam;
  window.startExamTaskPractice = startSequenceBank;
  window.renderExamTaskBank = renderExerciseMenu;

  interceptClicks();
  window.addEventListener("load", () => window.setTimeout(rebindExamTaskCard, 0));
  window.setTimeout(rebindExamTaskCard, 0);
})();
