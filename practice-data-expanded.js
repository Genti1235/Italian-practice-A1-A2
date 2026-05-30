(() => {
  if (window.__ITALIAN_PRACTICE_DATA_EXPANDED__) return;
  window.__ITALIAN_PRACTICE_DATA_EXPANDED__ = true;

  const MIN_PER_SUBTYPE = 20;
  const categories = Array.isArray(window.PRACTICE_CATEGORIES) ? window.PRACTICE_CATEGORIES : [];
  const articleChoices = ["il", "lo", "la", "l’"];
  const genderOptions = ["masculine", "feminine"];
  const subjectOptions = ["io", "tu", "lui/lei", "noi", "voi", "loro"];
  const subjectPronouns = [
    { key: "io", label: "io", reflexive: "mi" },
    { key: "tu", label: "tu", reflexive: "ti" },
    { key: "lui", label: "lui/lei", reflexive: "si" },
    { key: "noi", label: "noi", reflexive: "ci" },
    { key: "voi", label: "voi", reflexive: "vi" },
    { key: "loro", label: "loro", reflexive: "si" }
  ];

  const nouns = [
    ["il", "libro", "i libri", "book", "masculine", "Libro is masculine singular: il libro."],
    ["la", "penna", "le penne", "pen", "feminine", "Penna is feminine singular: la penna."],
    ["lo", "studente", "gli studenti", "male student", "masculine", "Studente starts with s + consonant, so use lo."],
    ["la", "studentessa", "le studentesse", "female student", "feminine", "Studentessa is feminine singular: la studentessa."],
    ["l’", "amico", "gli amici", "male friend", "masculine", "Amico starts with a vowel, so use l’amico."],
    ["l’", "amica", "le amiche", "female friend", "feminine", "Amica starts with a vowel; in the plural it becomes amiche."],
    ["l’", "università", "le università", "university", "feminine", "Università is feminine and invariable."],
    ["la", "città", "le città", "city", "feminine", "Città is feminine and invariable."],
    ["la", "casa", "le case", "house", "feminine", "Casa is feminine singular: la casa."],
    ["la", "camera", "le camere", "room", "feminine", "Camera is feminine singular: la camera."],
    ["il", "bagno", "i bagni", "bathroom", "masculine", "Bagno is masculine singular: il bagno."],
    ["la", "cucina", "le cucine", "kitchen", "feminine", "Cucina is feminine singular: la cucina."],
    ["il", "tavolo", "i tavoli", "table", "masculine", "Tavolo is masculine singular: il tavolo."],
    ["la", "sedia", "le sedie", "chair", "feminine", "Sedia is feminine singular: la sedia."],
    ["il", "treno", "i treni", "train", "masculine", "Treno is masculine singular: il treno."],
    ["la", "stazione", "le stazioni", "station", "feminine", "Stazione ends in -e but is feminine: la stazione."],
    ["il", "biglietto", "i biglietti", "ticket", "masculine", "Biglietto is masculine singular: il biglietto."],
    ["l’", "albergo", "gli alberghi", "hotel", "masculine", "Albergo starts with a vowel, so use l’albergo."],
    ["la", "prenotazione", "le prenotazioni", "reservation", "feminine", "Prenotazione is feminine: la prenotazione."],
    ["il", "passaporto", "i passaporti", "passport", "masculine", "Passaporto is masculine singular: il passaporto."],
    ["il", "caffè", "i caffè", "coffee", "masculine", "Caffè is masculine and invariable."],
    ["il", "panino", "i panini", "sandwich", "masculine", "Panino is masculine singular: il panino."],
    ["la", "pizza", "le pizze", "pizza", "feminine", "Pizza is feminine singular: la pizza."],
    ["il", "ristorante", "i ristoranti", "restaurant", "masculine", "Ristorante ends in -e but is masculine: il ristorante."],
    ["il", "bar", "i bar", "bar", "masculine", "Bar is masculine and invariable."],
    ["la", "famiglia", "le famiglie", "family", "feminine", "Famiglia is feminine; the plural is famiglie."],
    ["la", "madre", "le madri", "mother", "feminine", "Madre is feminine: la madre."],
    ["il", "padre", "i padri", "father", "masculine", "Padre is masculine: il padre."],
    ["il", "fratello", "i fratelli", "brother", "masculine", "Fratello is masculine singular: il fratello."],
    ["la", "sorella", "le sorelle", "sister", "feminine", "Sorella is feminine singular: la sorella."],
    ["l’", "autobus", "gli autobus", "bus", "masculine", "Autobus is masculine and invariable."],
    ["la", "farmacia", "le farmacie", "pharmacy", "feminine", "Farmacia is feminine; the plural is farmacie."],
    ["la", "piazza", "le piazze", "square", "feminine", "Piazza is feminine; the plural is piazze."],
    ["la", "strada", "le strade", "street", "feminine", "Strada is feminine singular: la strada."],
    ["il", "negozio", "i negozi", "shop", "masculine", "Negozio is masculine singular: il negozio."],
    ["la", "giacca", "le giacche", "jacket", "feminine", "Giacca is feminine; the plural is giacche."],
    ["il", "vestito", "i vestiti", "dress/suit", "masculine", "Vestito is masculine singular: il vestito."],
    ["la", "gonna", "le gonne", "skirt", "feminine", "Gonna is feminine singular: la gonna."],
    ["la", "scarpa", "le scarpe", "shoe", "feminine", "Scarpa is feminine singular: la scarpa."],
    ["il", "corso", "i corsi", "course", "masculine", "Corso is masculine singular: il corso."],
    ["l’", "esame", "gli esami", "exam", "masculine", "Esame starts with a vowel and is masculine: l’esame."],
    ["la", "lezione", "le lezioni", "lesson", "feminine", "Lezione is feminine: la lezione."]
  ].map(([article, noun, plural, en, gender, note]) => ({
    article,
    noun,
    singular: `${article}${article === "l’" ? "" : " "}${noun}`,
    plural,
    en,
    gender,
    note
  }));

  const adjectives = [
    ["bello", "bella", "belli", "belle", "beautiful", "bell__"],
    ["nuovo", "nuova", "nuovi", "nuove", "new", "nuov__"],
    ["rosso", "rossa", "rossi", "rosse", "red", "ross__"],
    ["piccolo", "piccola", "piccoli", "piccole", "small", "piccol__"],
    ["grande", "grande", "grandi", "grandi", "big", "grand__"],
    ["simpatico", "simpatica", "simpatici", "simpatiche", "nice", "simpatic__"],
    ["stanco", "stanca", "stanchi", "stanche", "tired", "stanc__"],
    ["occupato", "occupata", "occupati", "occupate", "busy", "occupat__"],
    ["aperto", "aperta", "aperti", "aperte", "open", "apert__"],
    ["chiuso", "chiusa", "chiusi", "chiuse", "closed", "chius__"],
    ["caro", "cara", "cari", "care", "expensive/dear", "car__"],
    ["economico", "economica", "economici", "economiche", "cheap/economical", "economic__"],
    ["comodo", "comoda", "comodi", "comode", "comfortable", "comod__"],
    ["pulito", "pulita", "puliti", "pulite", "clean", "pulit__"],
    ["interessante", "interessante", "interessanti", "interessanti", "interesting", "interessant__"],
    ["importante", "importante", "importanti", "importanti", "important", "important__"],
    ["giovane", "giovane", "giovani", "giovani", "young", "giovan__"],
    ["facile", "facile", "facili", "facili", "easy", "facil__"],
    ["difficile", "difficile", "difficili", "difficili", "difficult", "difficil__"],
    ["veloce", "veloce", "veloci", "veloci", "fast", "veloc__"]
  ].map(([ms, fs, mp, fp, en, stem]) => ({ ms, fs, mp, fp, en, stem }));

  const nationalities = [
    ["italiano", "italiana", "italiani", "italiane", "Italian", "italian__"],
    ["albanese", "albanese", "albanesi", "albanesi", "Albanian", "albanes__"],
    ["montenegrino", "montenegrina", "montenegrini", "montenegrine", "Montenegrin", "montenegrin__"],
    ["tedesco", "tedesca", "tedeschi", "tedesche", "German", "tedesc__"],
    ["francese", "francese", "francesi", "francesi", "French", "frances__"],
    ["spagnolo", "spagnola", "spagnoli", "spagnole", "Spanish", "spagnol__"],
    ["inglese", "inglese", "inglesi", "inglesi", "English", "ingles__"],
    ["americano", "americana", "americani", "americane", "American", "american__"],
    ["greco", "greca", "greci", "greche", "Greek", "grec__"],
    ["cinese", "cinese", "cinesi", "cinesi", "Chinese", "cines__"]
  ].map(([ms, fs, mp, fp, en, stem]) => ({ ms, fs, mp, fp, en, stem }));

  const verbs = [
    ["essere", "to be", "sono", "sei", "è", "siamo", "siete", "sono"],
    ["avere", "to have", "ho", "hai", "ha", "abbiamo", "avete", "hanno"],
    ["studiare", "to study", "studio", "studi", "studia", "studiamo", "studiate", "studiano"],
    ["abitare", "to live", "abito", "abiti", "abita", "abitiamo", "abitate", "abitano"],
    ["parlare", "to speak", "parlo", "parli", "parla", "parliamo", "parlate", "parlano"],
    ["lavorare", "to work", "lavoro", "lavori", "lavora", "lavoriamo", "lavorate", "lavorano"],
    ["mangiare", "to eat", "mangio", "mangi", "mangia", "mangiamo", "mangiate", "mangiano"],
    ["comprare", "to buy", "compro", "compri", "compra", "compriamo", "comprate", "comprano"],
    ["prendere", "to take", "prendo", "prendi", "prende", "prendiamo", "prendete", "prendono"],
    ["leggere", "to read", "leggo", "leggi", "legge", "leggiamo", "leggete", "leggono"],
    ["scrivere", "to write", "scrivo", "scrivi", "scrive", "scriviamo", "scrivete", "scrivono"],
    ["dormire", "to sleep", "dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono"],
    ["partire", "to leave", "parto", "parti", "parte", "partiamo", "partite", "partono"],
    ["aprire", "to open", "apro", "apri", "apre", "apriamo", "aprite", "aprono"],
    ["finire", "to finish", "finisco", "finisci", "finisce", "finiamo", "finite", "finiscono"],
    ["capire", "to understand", "capisco", "capisci", "capisce", "capiamo", "capite", "capiscono"],
    ["andare", "to go", "vado", "vai", "va", "andiamo", "andate", "vanno"],
    ["fare", "to do/make", "faccio", "fai", "fa", "facciamo", "fate", "fanno"],
    ["venire", "to come", "vengo", "vieni", "viene", "veniamo", "venite", "vengono"],
    ["uscire", "to go out", "esco", "esci", "esce", "usciamo", "uscite", "escono"],
    ["potere", "can/to be able", "posso", "puoi", "può", "possiamo", "potete", "possono"],
    ["volere", "to want", "voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono"],
    ["dovere", "must/to have to", "devo", "devi", "deve", "dobbiamo", "dovete", "devono"]
  ].map(([inf, en, io, tu, lui, noi, voi, loro]) => ({ inf, en, io, tu, lui, noi, voi, loro }));

  const reflexives = [
    ["svegliarsi", "sveglio", "svegli", "sveglia", "svegliamo", "svegliate", "svegliano", "to wake up"],
    ["alzarsi", "alzo", "alzi", "alza", "alziamo", "alzate", "alzano", "to get up"],
    ["lavarsi", "lavo", "lavi", "lava", "laviamo", "lavate", "lavano", "to wash oneself"],
    ["vestirsi", "vesto", "vesti", "veste", "vestiamo", "vestite", "vestono", "to get dressed"],
    ["chiamarsi", "chiamo", "chiami", "chiama", "chiamiamo", "chiamate", "chiamano", "to be called"],
    ["divertirsi", "diverto", "diverti", "diverte", "divertiamo", "divertite", "divertono", "to have fun"],
    ["mettersi", "metto", "metti", "mette", "mettiamo", "mettete", "mettono", "to put on"],
    ["addormentarsi", "addormento", "addormenti", "addormenta", "addormentiamo", "addormentate", "addormentano", "to fall asleep"]
  ].map(([inf, io, tu, lui, noi, voi, loro, en]) => ({ inf, en, io, tu, lui, noi, voi, loro }));

  function idSafe(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
  }

  function categoryById(id) {
    return categories.find((category) => category.id === id);
  }

  function fill(categoryId, subtype, pool) {
    const category = categoryById(categoryId);
    if (!category || !Array.isArray(category.exercises)) return;
    const existingCount = category.exercises.filter((exercise) => exercise.subtype === subtype).length;
    const needed = Math.max(0, MIN_PER_SUBTYPE - existingCount);
    if (!needed) return;
    const ids = new Set(category.exercises.map((exercise) => exercise.id));
    for (let index = 0; index < needed && pool.length; index += 1) {
      const item = { ...pool[index % pool.length], category: categoryId, subtype };
      const baseId = item.id || `exp-${categoryId}-${idSafe(subtype)}-${index + 1}`;
      let id = baseId;
      let suffix = 2;
      while (ids.has(id)) {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      ids.add(id);
      category.exercises.push({ ...item, id });
    }
  }

  function typed(id, prompt, answer, explanation, focusTags = [], extras = {}) {
    return { id, interaction: "typed", prompt, answer, acceptedAnswers: extras.acceptedAnswers || [answer], explanation, focusTags, ...extras };
  }

  function choice(id, prompt, options, answer, explanation, focusTags = [], extras = {}) {
    return { id, interaction: "choice", prompt, options, answer, explanation, focusTags, ...extras };
  }

  function multiBlank(id, prompt, answers, explanation, focusTags = [], extras = {}) {
    return { id, interaction: "multi-blank", prompt, answers, acceptedAnswers: extras.acceptedAnswers || answers.map((answer) => [answer]), explanation, focusTags, ...extras };
  }

  function wordOrder(id, words, answer, explanation, focusTags = []) {
    return { id, interaction: "word-order", prompt: "Arrange the words into a correct sentence.", wordBank: words, answer, explanation, focusTags };
  }

  function guidedWriting(id, prompt, explanation, focusTags, extras) {
    return { id, interaction: "guided-writing", prompt, explanation, focusTags, ...extras };
  }

  function categoryRecall(id, prompt, acceptedAnswers, explanation, focusTags = []) {
    return { id, interaction: "category-recall", prompt, acceptedAnswers, requiredCount: 5, explanation, focusTags };
  }

  fill("word-forms", "Vocabulary recall", nouns.map((noun) => typed(
    `exp-wf-vocab-${idSafe(noun.noun)}`,
    noun.en,
    noun.noun,
    `${noun.noun} means ${noun.en}. ${noun.note}`,
    ["vocabulary", noun.gender],
    { acceptedAnswers: [noun.noun, noun.singular] }
  )));

  fill("word-forms", "Article + noun choice", nouns.map((noun) => choice(
    `exp-wf-article-${idSafe(noun.noun)}`,
    `___ ${noun.noun}`,
    articleChoices,
    noun.article,
    `${noun.note} The correct article is ${noun.article}.`,
    ["articles", noun.gender]
  )));

  fill("word-forms", "Gender choice", nouns.map((noun) => choice(
    `exp-wf-gender-${idSafe(noun.noun)}`,
    noun.noun,
    genderOptions,
    noun.gender,
    `${noun.note}`,
    ["gender", "nouns"]
  )));

  fill("word-forms", "Singular to plural transformation", nouns.map((noun) => typed(
    `exp-wf-plural-${idSafe(noun.noun)}`,
    noun.singular,
    noun.plural,
    `${noun.singular} becomes ${noun.plural}. Watch both the article and the noun ending.`,
    ["plural nouns", "articles"]
  )));

  const adjectiveFrames = [
    ["La casa è {stem}.", "fs", "Casa is feminine singular."],
    ["Il libro è {stem}.", "ms", "Libro is masculine singular."],
    ["I libri sono {stem}.", "mp", "Libri is masculine plural."],
    ["Le penne sono {stem}.", "fp", "Penne is feminine plural."],
    ["La camera è {stem}.", "fs", "Camera is feminine singular."],
    ["Il treno è {stem}.", "ms", "Treno is masculine singular."],
    ["Gli studenti sono {stem}.", "mp", "Studenti is masculine plural."],
    ["Le case sono {stem}.", "fp", "Case is feminine plural."]
  ];
  fill("word-forms", "Adjective agreement", adjectives.flatMap((adj) => adjectiveFrames.map(([frame, form, reason]) => typed(
    `exp-wf-adj-${idSafe(adj[form])}-${idSafe(frame)}`,
    frame.replace("{stem}", adj.stem),
    adj[form],
    `${reason} The correct form of ${adj.en} is ${adj[form]}.`,
    ["adjective agreement", form]
  ))));

  const nationalityFrames = [
    ["Marco è {stem}.", "ms", "Marco is masculine singular."],
    ["Anna è {stem}.", "fs", "Anna is feminine singular."],
    ["Marco e Luca sono {stem}.", "mp", "Two masculine people take masculine plural."],
    ["Anna e Lucia sono {stem}.", "fp", "Two feminine people take feminine plural."],
    ["Io sono {stem}. (male speaker)", "ms", "A male speaker uses the masculine singular form."],
    ["Io sono {stem}. (female speaker)", "fs", "A female speaker uses the feminine singular form."]
  ];
  fill("word-forms", "Nationality agreement", nationalities.flatMap((nat) => nationalityFrames.map(([frame, form, reason]) => typed(
    `exp-wf-nationality-${idSafe(nat[form])}-${idSafe(frame)}`,
    frame.replace("{stem}", nat.stem),
    nat[form],
    `${reason} The correct ${nat.en} form is ${nat[form]}.`,
    ["nationalities", "agreement"]
  ))));

  fill("verb-forms", "Pronoun to verb conjugation", verbs.flatMap((verb) => subjectPronouns.map((subject) => typed(
    `exp-vf-conj-${idSafe(verb.inf)}-${subject.key}`,
    `${subject.label} + ${verb.inf}`,
    verb[subject.key],
    `${verb.inf}: ${subject.label} ${verb[subject.key]}.`,
    ["present tense", verb.inf]
  ))));

  const reverseForms = [
    ["sei", "tu", ["io", "tu", "noi", "loro"], "Sei is the tu form of essere."],
    ["è", "lui/lei", ["io", "tu", "lui/lei", "noi"], "È is the lui/lei form of essere."],
    ["siamo", "noi", ["io", "tu", "noi", "loro"], "Siamo is the noi form of essere."],
    ["siete", "voi", ["tu", "lui/lei", "voi", "loro"], "Siete is the voi form of essere."],
    ["hai", "tu", ["io", "tu", "noi", "loro"], "Hai is the tu form of avere."],
    ["ha", "lui/lei", ["io", "tu", "lui/lei", "noi"], "Ha is the lui/lei form of avere."],
    ["abbiamo", "noi", ["io", "noi", "voi", "loro"], "Abbiamo is the noi form of avere."],
    ["avete", "voi", ["io", "tu", "voi", "loro"], "Avete is the voi form of avere."],
    ["studiamo", "noi", subjectOptions, "Studiamo is the noi form of studiare."],
    ["parlate", "voi", subjectOptions, "Parlate is the voi form of parlare."],
    ["mangiano", "loro", subjectOptions, "Mangiano is the loro form of mangiare."],
    ["prendo", "io", subjectOptions, "Prendo is the io form of prendere."],
    ["leggi", "tu", subjectOptions, "Leggi is the tu form of leggere."],
    ["dorme", "lui/lei", subjectOptions, "Dorme is the lui/lei form of dormire."],
    ["partite", "voi", subjectOptions, "Partite is the voi form of partire."],
    ["capiscono", "loro", subjectOptions, "Capiscono is the loro form of capire."],
    ["vado", "io", subjectOptions, "Vado is the io form of andare."],
    ["fai", "tu", subjectOptions, "Fai is the tu form of fare."],
    ["viene", "lui/lei", subjectOptions, "Viene is the lui/lei form of venire."],
    ["esco", "io", subjectOptions, "Esco is the io form of uscire."]
  ];
  fill("verb-forms", "Reverse conjugation", reverseForms.map(([prompt, answer, options, explanation]) => choice(
    `exp-vf-reverse-${idSafe(prompt)}`,
    prompt,
    options,
    answer,
    explanation,
    ["reverse conjugation", "present tense"]
  )));

  const contextVerbs = [
    ["Io ___ albanese.", ["sono", "sei", "è", "siamo"], "sono", "Io uses sono."],
    ["Tu ___ una penna.", ["ho", "hai", "ha", "hanno"], "hai", "Tu uses hai."],
    ["Lei ___ a Roma.", ["abito", "abiti", "abita", "abitano"], "abita", "Lei uses the third-person singular form."],
    ["Noi ___ italiano all’università.", ["studio", "studia", "studiamo", "studiano"], "studiamo", "Noi uses studiamo."],
    ["Voi ___ inglese?", ["parli", "parla", "parlate", "parlano"], "parlate", "Voi uses parlate."],
    ["Loro ___ al bar.", ["mangio", "mangi", "mangiano", "mangiamo"], "mangiano", "Loro uses mangiano."],
    ["Io ___ un biglietto.", ["compro", "compra", "compriamo", "comprano"], "compro", "Io uses compro."],
    ["Tu ___ il treno.", ["prendo", "prendi", "prende", "prendono"], "prendi", "Tu uses prendi."],
    ["Marco ___ un libro.", ["leggo", "leggi", "legge", "leggono"], "legge", "Marco uses the third-person singular form."],
    ["Noi ___ una email.", ["scrivo", "scrivi", "scriviamo", "scrivono"], "scriviamo", "Noi uses scriviamo."],
    ["Voi ___ bene?", ["dormo", "dormi", "dormite", "dormono"], "dormite", "Voi uses dormite."],
    ["Il treno ___ alle otto.", ["parto", "parti", "parte", "partono"], "parte", "Il treno is third-person singular."],
    ["Io ___ la porta.", ["apro", "apri", "apre", "aprono"], "apro", "Io uses apro."],
    ["Anna ___ il compito.", ["finisco", "finisci", "finisce", "finiamo"], "finisce", "Anna uses the third-person singular form."],
    ["Noi ___ la lezione.", ["capisco", "capisce", "capiamo", "capiscono"], "capiamo", "Noi uses capiamo."],
    ["Io ___ all’università.", ["vado", "vai", "va", "vanno"], "vado", "Io uses vado."],
    ["Tu ___ colazione.", ["faccio", "fai", "fa", "fanno"], "fai", "Tu uses fai."],
    ["Lei ___ da Podgorica.", ["vengo", "vieni", "viene", "veniamo"], "viene", "Lei uses viene."],
    ["Noi ___ con amici.", ["esco", "esci", "usciamo", "escono"], "usciamo", "Noi uses usciamo."],
    ["Loro ___ in centro.", ["vado", "vai", "va", "vanno"], "vanno", "Loro uses vanno."]
  ];
  fill("verb-forms", "Sentence-context verb choice", contextVerbs.map(([prompt, options, answer, explanation]) => choice(
    `exp-vf-context-${idSafe(prompt)}`,
    prompt,
    options,
    answer,
    explanation,
    ["sentence context", "present tense"]
  )));

  const modalPrompts = [
    ["potere", "parlare italiano"],
    ["volere", "un caffè"],
    ["dovere", "studiare per l’esame"],
    ["potere", "andare a casa"],
    ["volere", "comprare un biglietto"],
    ["dovere", "fare i compiti"]
  ];
  const modalVerbs = verbs.filter((verb) => ["potere", "volere", "dovere"].includes(verb.inf));
  fill("verb-forms", "Modal verbs", modalVerbs.flatMap((verb) => subjectPronouns.map((subject, index) => {
    const complement = modalPrompts[(index + modalVerbs.indexOf(verb)) % modalPrompts.length][1];
    return choice(
      `exp-vf-modal-${idSafe(verb.inf)}-${subject.key}`,
      `${subject.label} ___ ${complement}.`,
      [verb.io, verb.tu, verb.lui, verb.noi, verb.voi, verb.loro],
      verb[subject.key],
      `${verb.inf}: ${subject.label} ${verb[subject.key]}.`,
      ["modal verbs", verb.inf]
    );
  })));

  fill("verb-forms", "Reflexive verbs", reflexives.flatMap((verb) => subjectPronouns.map((subject) => typed(
    `exp-vf-reflexive-${idSafe(verb.inf)}-${subject.key}`,
    `${subject.label} + ${verb.inf}`,
    `${subject.reflexive} ${verb[subject.key]}`,
    `${verb.inf} is reflexive: ${subject.label} ${subject.reflexive} ${verb[subject.key]}.`,
    ["reflexive verbs", "daily routine"]
  ))));

  const passatoBuilders = [
    ["io + mangiare + una pizza", "Ho mangiato una pizza.", "Mangiare usually uses avere: ho mangiato."],
    ["io + studiare + italiano", "Ho studiato italiano.", "Studiare uses avere: ho studiato."],
    ["io + comprare + un biglietto", "Ho comprato un biglietto.", "Comprare uses avere: ho comprato."],
    ["io + leggere + un libro", "Ho letto un libro.", "Leggere has the past participle letto."],
    ["io + scrivere + una email", "Ho scritto una email.", "Scrivere has the past participle scritto."],
    ["io + prendere + un caffè", "Ho preso un caffè.", "Prendere has the past participle preso."],
    ["io + dormire + bene", "Ho dormito bene.", "Dormire uses avere: ho dormito."],
    ["io + andare + a Roma, male speaker", "Sono andato a Roma.", "Andare uses essere; masculine singular is andato."],
    ["io + andare + a Roma, female speaker", "Sono andata a Roma.", "Andare uses essere; feminine singular is andata."],
    ["Marco + uscire + ieri", "Marco è uscito ieri.", "Uscire uses essere; Marco is masculine singular."],
    ["Anna + uscire + ieri", "Anna è uscita ieri.", "Uscire uses essere; Anna is feminine singular."],
    ["noi + andare + al cinema, mixed group", "Siamo andati al cinema.", "With a mixed or masculine group, use andati."],
    ["noi + andare + al bar, female group", "Siamo andate al bar.", "With an all-female group, use andate."],
    ["loro + arrivare + alla stazione, masculine group", "Sono arrivati alla stazione.", "Arrivare uses essere; masculine plural is arrivati."],
    ["loro + partire + alle otto, female group", "Sono partite alle otto.", "Partire uses essere; feminine plural is partite."],
    ["tu + fare + colazione", "Hai fatto colazione.", "Fare has the past participle fatto."],
    ["Lei + vedere + il museo", "Ha visto il museo.", "Vedere has the past participle visto and uses avere."],
    ["noi + visitare + la città", "Abbiamo visitato la città.", "Visitare uses avere: abbiamo visitato."],
    ["voi + finire + la lezione", "Avete finito la lezione.", "Finire uses avere: avete finito."],
    ["loro + mangiare + al ristorante", "Hanno mangiato al ristorante.", "Mangiare uses avere: hanno mangiato."]
  ];
  fill("verb-forms", "Passato prossimo builder", passatoBuilders.map(([prompt, answer, explanation]) => typed(
    `exp-vf-passato-${idSafe(prompt)}`,
    prompt,
    answer,
    explanation,
    ["passato prossimo"]
  )));

  const auxiliaries = [
    ["Io ___ studiato italiano.", ["ho", "sono"], "ho", "Studiare uses avere."],
    ["Io ___ uscito ieri.", ["ho", "sono"], "sono", "Uscire uses essere."],
    ["Anna ___ andata a casa.", ["ha", "è"], "è", "Andare uses essere."],
    ["Marco ___ mangiato una pizza.", ["ha", "è"], "ha", "Mangiare uses avere."],
    ["Noi ___ arrivati alla stazione.", ["abbiamo", "siamo"], "siamo", "Arrivare uses essere."],
    ["Noi ___ comprato i biglietti.", ["abbiamo", "siamo"], "abbiamo", "Comprare uses avere."],
    ["Voi ___ partiti alle otto.", ["avete", "siete"], "siete", "Partire uses essere."],
    ["Voi ___ letto il libro.", ["avete", "siete"], "avete", "Leggere uses avere."],
    ["Loro ___ dormito bene.", ["hanno", "sono"], "hanno", "Dormire uses avere."],
    ["Loro ___ venuti a casa.", ["hanno", "sono"], "sono", "Venire uses essere."],
    ["Tu ___ fatto colazione.", ["hai", "sei"], "hai", "Fare uses avere."],
    ["Tu ___ tornato tardi.", ["hai", "sei"], "sei", "Tornare uses essere."],
    ["Lei ___ scritto una email.", ["ha", "è"], "ha", "Scrivere uses avere."],
    ["Lei ___ entrata in classe.", ["ha", "è"], "è", "Entrare uses essere."],
    ["Io ___ preso un caffè.", ["ho", "sono"], "ho", "Prendere uses avere."],
    ["Io ___ nato a Podgorica.", ["ho", "sono"], "sono", "Nascere uses essere."],
    ["Noi ___ visto il museo.", ["abbiamo", "siamo"], "abbiamo", "Vedere uses avere."],
    ["Noi ___ restati a casa.", ["abbiamo", "siamo"], "siamo", "Restare uses essere."],
    ["Marco ___ lavorato ieri.", ["ha", "è"], "ha", "Lavorare uses avere."],
    ["Lucia ___ caduta.", ["ha", "è"], "è", "Cadere usually uses essere."]
  ];
  fill("verb-forms", "Auxiliary choice: avere or essere", auxiliaries.map(([prompt, options, answer, explanation]) => choice(
    `exp-vf-aux-${idSafe(prompt)}`,
    prompt,
    options,
    answer,
    explanation,
    ["auxiliaries", "passato prossimo"]
  )));

  const participles = [
    ["Anna è andat__ a casa.", "andata", "Anna is feminine singular."],
    ["Marco è andat__ a casa.", "andato", "Marco is masculine singular."],
    ["Marco e Luca sono uscit__.", "usciti", "Marco and Luca are masculine plural."],
    ["Anna e Lucia sono uscit__.", "uscite", "Anna and Lucia are feminine plural."],
    ["Io sono arrivat__ a Roma. (male speaker)", "arrivato", "A male speaker uses masculine singular."],
    ["Io sono arrivat__ a Roma. (female speaker)", "arrivata", "A female speaker uses feminine singular."],
    ["Noi siamo partit__. (mixed group)", "partiti", "A mixed group uses masculine plural."],
    ["Noi siamo partit__. (female group)", "partite", "An all-female group uses feminine plural."],
    ["Il treno è arrivat__.", "arrivato", "Treno is masculine singular."],
    ["La lezione è finit__.", "finita", "Lezione is feminine singular."],
    ["Gli studenti sono entrat__.", "entrati", "Studenti is masculine plural."],
    ["Le studentesse sono entrat__.", "entrate", "Studentesse is feminine plural."],
    ["Mio padre è nat__ a Roma.", "nato", "Padre is masculine singular."],
    ["Mia madre è nat__ a Milano.", "nata", "Madre is feminine singular."],
    ["I miei amici sono venut__.", "venuti", "Amici is masculine plural."],
    ["Le mie amiche sono venut__.", "venute", "Amiche is feminine plural."],
    ["L’albergo è stat__ comodo.", "stato", "Albergo is masculine singular."],
    ["La camera è stat__ pulita.", "stata", "Camera is feminine singular."],
    ["I negozi sono stat__ chiusi.", "stati", "Negozi is masculine plural."],
    ["Le farmacie sono stat__ aperte.", "state", "Farmacie is feminine plural."]
  ];
  fill("verb-forms", "Past participle agreement", participles.map(([prompt, answer, explanation]) => typed(
    `exp-vf-participle-${idSafe(prompt)}`,
    prompt,
    answer,
    `${explanation} With essere, the participle agrees with the subject.`,
    ["participle agreement", "essere"]
  )));

  const wordOrders = [
    [["italiano", "all’università", "Studio"], "Studio italiano all’università.", "Use all’università for at the university."],
    [["albanese", "Sono"], "Sono albanese.", "Use essere for nationality."],
    [["venti", "anni", "Ho"], "Ho venti anni.", "Italian uses avere for age."],
    [["Podgorica", "a", "Abito"], "Abito a Podgorica.", "Use a with cities."],
    [["alle", "sette", "Mi", "sveglio"], "Mi sveglio alle sette.", "The reflexive pronoun mi comes before sveglio."],
    [["colazione", "Faccio", "al", "bar"], "Faccio colazione al bar.", "Fare colazione means to have breakfast."],
    [["favore", "caffè", "Vorrei", "per", "un"], "Vorrei un caffè, per favore.", "Vorrei is a polite request."],
    [["stazione", "Dov’è", "la"], "Dov’è la stazione?", "Dov’è means where is."],
    [["vicino", "La", "è", "piazza", "farmacia", "alla"], "La farmacia è vicino alla piazza.", "A + la becomes alla."],
    [["una", "Ho", "prenotazione"], "Ho una prenotazione.", "Use avere for possession."],
    [["camera", "è", "La", "piccola", "mia"], "La mia camera è piccola.", "Mia agrees with camera."],
    [["fratello", "chiama", "Mio", "si", "Luca"], "Mio fratello si chiama Luca.", "Si chiama means is called."],
    [["il", "è", "bello", "tempo", "Oggi"], "Oggi il tempo è bello.", "Il tempo means the weather."],
    [["italiano", "ieri", "studiato", "Ho"], "Ho studiato italiano ieri.", "Studiare uses avere in passato prossimo."],
    [["a", "Sono", "casa", "andato", "ieri"], "Sono andato a casa ieri.", "Andare uses essere."],
    [["Roma", "biglietto", "un", "Vorrei", "per"], "Vorrei un biglietto per Roma.", "Use per for the destination in a ticket request."],
    [["costa", "Quanto", "giacca", "la"], "Quanto costa la giacca?", "Quanto costa asks how much something costs."],
    [["la", "italiana", "Mi", "cucina", "piace"], "Mi piace la cucina italiana.", "Mi piace means I like."],
    [["autobus", "all’università", "in", "Vado"], "Vado all’università in autobus.", "Use in with means of transport."],
    [["sono", "penne", "rosse", "Le"], "Le penne sono rosse.", "Rosse agrees with penne."],
    [["uscito", "ieri", "Marco", "è"], "Marco è uscito ieri.", "Uscire uses essere."],
    [["otto", "Il", "parte", "alle", "treno"], "Il treno parte alle otto.", "Parte is the third-person singular form."],
    [["a", "dritto", "Vada"], "Vada dritto.", "Vada is a polite/formal direction."],
    [["sinistra", "Giri", "a"], "Giri a sinistra.", "Use a sinistra for to the left."],
    [["la", "famiglia", "mia", "Questa", "è"], "Questa è la mia famiglia.", "Questa is feminine singular."]
  ];
  fill("sentence-building", "Word order puzzle", wordOrders.map(([words, answer, explanation]) => wordOrder(
    `exp-sb-order-${idSafe(answer)}`,
    words,
    answer,
    explanation,
    ["word order"]
  )));

  const translations = [
    ["I am a student.", "Sono studente.", "Use essere for identity."],
    ["I am Albanian.", "Sono albanese.", "Use essere for nationality."],
    ["I live in Podgorica.", "Abito a Podgorica.", "Use a with cities."],
    ["I study Italian at the university.", "Studio italiano all’università.", "A + l’università becomes all’università."],
    ["I have twenty years.", "Ho venti anni.", "Italian uses avere for age."],
    ["I have a book.", "Ho un libro.", "Use avere for possession."],
    ["She is German.", "Lei è tedesca.", "Tedesca agrees with lei."],
    ["The house is big.", "La casa è grande.", "Casa is feminine singular."],
    ["The books are new.", "I libri sono nuovi.", "Libri is masculine plural."],
    ["The pens are red.", "Le penne sono rosse.", "Penne is feminine plural."],
    ["I would like a coffee, please.", "Vorrei un caffè, per favore.", "Vorrei is polite."],
    ["Where is the station?", "Dov’è la stazione?", "Stazione is feminine."],
    ["I have a reservation.", "Ho una prenotazione.", "Prenotazione is feminine."],
    ["I go to university by bus.", "Vado all’università in autobus.", "Use in autobus."],
    ["Yesterday I studied Italian.", "Ieri ho studiato italiano.", "Studiare uses avere."],
    ["Marco went home yesterday.", "Marco è andato a casa ieri.", "Andare uses essere."],
    ["Anna went out with friends.", "Anna è uscita con amici.", "Uscire uses essere and agrees with Anna."],
    ["We ate at the restaurant.", "Abbiamo mangiato al ristorante.", "Mangiare uses avere."],
    ["How much does the jacket cost?", "Quanto costa la giacca?", "Giacca is feminine."],
    ["The pharmacy is near the square.", "La farmacia è vicino alla piazza.", "A + la becomes alla."]
  ];
  fill("sentence-building", "Sentence translation", translations.map(([prompt, answer, explanation]) => typed(
    `exp-sb-translate-${idSafe(prompt)}`,
    prompt,
    answer,
    explanation,
    ["translation"]
  )));

  const completions = [
    ["Mi chiamo Gent. ___ albanese.", "Sono", "Use sono for I am."],
    ["Studio italiano ___ università.", "all’", "A + l’università becomes all’università."],
    ["Abito ___ Podgorica.", "a", "Use a with cities."],
    ["Ho venti ___.", "anni", "Use anni for age."],
    ["Faccio ___ al bar.", "colazione", "Fare colazione means to have breakfast."],
    ["Vorrei un caffè, per ___.", "favore", "Per favore means please."],
    ["Dov’è ___ stazione?", "la", "Stazione is feminine."],
    ["La farmacia è vicino ___ piazza.", "alla", "A + la becomes alla."],
    ["Ho una ___.", "prenotazione", "Una prenotazione means a reservation."],
    ["La mia camera è ___.", "piccola", "Piccola agrees with camera."],
    ["Mio fratello si ___ Luca.", "chiama", "Si chiama means is called."],
    ["Oggi il tempo ___ bello.", "è", "Tempo uses è here."],
    ["Ieri ho ___ italiano.", "studiato", "Studiare becomes studiato in passato prossimo."],
    ["Sono andato ___ casa ieri.", "a", "Use a casa."],
    ["Vorrei un biglietto ___ Roma.", "per", "Use per for the destination."],
    ["Quanto ___ la giacca?", "costa", "Quanto costa means how much does it cost."],
    ["Mi ___ la cucina italiana.", "piace", "Mi piace means I like."],
    ["Vado all’università ___ autobus.", "in", "Use in with autobus."],
    ["Le penne sono ___.", "rosse", "Rosse agrees with penne."],
    ["Il treno parte ___ otto.", "alle", "Use alle with the hour eight."]
  ];
  fill("sentence-building", "Sentence completion", completions.map(([prompt, answer, explanation]) => typed(
    `exp-sb-complete-${idSafe(prompt)}`,
    prompt,
    answer,
    explanation,
    ["sentence completion"]
  )));

  const clozes = [
    ["Mi chiamo Gent. ___ albanese. ___ venti anni. Abito ___ Podgorica.", ["Sono", "Ho", "a"], "Use sono, ho, and a with a city."],
    ["Studio italiano ___ università. Vado ___ autobus. La lezione inizia ___ otto.", ["all’", "in", "alle"], "Use all’università, in autobus, and alle otto."],
    ["Al bar: ___ un caffè, per favore. Quanto ___? ___ due euro.", ["Vorrei", "costa", "Costa"], "Use vorrei, costa, and costa for price."],
    ["Per la strada: ___, dov’è la stazione? ___ dritto e poi ___ a destra.", ["Scusi", "Vada", "giri"], "Formal directions use scusi, vada, and giri."],
    ["In albergo: Buonasera, ___ una prenotazione. ___ nome Gent. Ecco ___ passaporto.", ["ho", "A", "il"], "Use ho, a nome, and il passaporto."],
    ["La mia casa ___ piccola. Ha due ___. La cucina ___ luminosa.", ["è", "camere", "è"], "Use è and the plural camere."],
    ["La mattina mi ___. Faccio ___. Poi ___ italiano.", ["sveglio", "colazione", "studio"], "Daily routine uses present tense."],
    ["Oggi il tempo ___ bello. ___ caldo e non ___.", ["è", "Fa", "piove"], "Use fa caldo and piove."],
    ["La mia famiglia ___ grande. Mia madre si ___ Anna. Mio padre ___ medico.", ["è", "chiama", "è"], "Use essere and si chiama."],
    ["Marco ___ alto. Ha i capelli ___. È molto ___.", ["è", "neri", "simpatico"], "Adjectives agree with nouns."],
    ["Vorrei un biglietto ___ Roma. Solo ___. Da quale ___ parte il treno?", ["per", "andata", "binario"], "Train ticket vocabulary."],
    ["In negozio: Quanto ___ questa giacca? Posso ___? Porto la ___ media.", ["costa", "provarla", "taglia"], "Shopping for clothes phrases."],
    ["Ieri ___ studiato italiano. Poi sono ___ con amici. Abbiamo ___ una pizza.", ["ho", "uscito", "mangiato"], "Passato prossimo with avere and essere."],
    ["Il libro ___ nuovo. I libri sono ___. La penna ___ rossa.", ["è", "nuovi", "è"], "Adjective agreement."],
    ["L’amica ___ simpatica. Le amiche sono ___. L’amico ___ italiano.", ["è", "simpatiche", "è"], "Use l’ before a vowel and agreement."],
    ["Noi ___ all’università. Voi ___ a casa. Loro ___ al ristorante.", ["andiamo", "andate", "vanno"], "Present tense of andare."],
    ["Io ___ parlare italiano. Tu ___ studiare. Noi ___ comprare un biglietto.", ["posso", "devi", "vogliamo"], "Modal verbs use an infinitive after them."],
    ["Anna è ___ a casa. Marco è ___. Gli studenti sono ___.", ["andata", "uscito", "arrivati"], "Past participles agree with essere."],
    ["La farmacia è ___ alla piazza. Il bar è ___ alla stazione. La banca è ___ sinistra.", ["vicino", "vicino", "a"], "Location and directions."],
    ["Mi ___ Gent. Sono ___ Montenegro. Studio italiano ___ università.", ["chiamo", "del", "all’"], "Introductory exam sentences."]
  ];
  fill("sentence-building", "Cloze paragraph", clozes.map(([prompt, answers, explanation]) => multiBlank(
    `exp-sb-cloze-${idSafe(prompt)}`,
    prompt,
    answers,
    explanation,
    ["cloze", "context"]
  )));

  const mixed = [
    ["Complete: Ieri Marco ___ andat__ ___ stazione.", ["è", "andato", "alla"], "Andare uses essere; Marco is masculine; a + la = alla."],
    ["Complete: Anna ___ uscit__ ___ amici.", ["è", "uscita", "con"], "Uscire uses essere; Anna is feminine."],
    ["Complete: Noi ___ mangiat__ ___ ristorante.", ["abbiamo", "mangiato", "al"], "Mangiare uses avere; a + il = al."],
    ["Complete: Le penne ___ ross__ ___ tavolo.", ["sono", "rosse", "sul"], "Penne is feminine plural; su + il = sul."],
    ["Complete: Il libro ___ nuov__ e ___ interessante.", ["è", "nuovo", "è"], "Libro is masculine singular."],
    ["Complete: La camera ___ piccol__ ma ___ pulita.", ["è", "piccola", "è"], "Camera is feminine singular."],
    ["Complete: Gli studenti ___ arrivat__ ___ università.", ["sono", "arrivati", "all’"], "Arrivare uses essere; studenti is masculine plural."],
    ["Complete: Le studentesse ___ entrat__ ___ classe.", ["sono", "entrate", "in"], "Entrare uses essere; studentesse is feminine plural."],
    ["Complete: Io ___ venti ___ e ___ albanese.", ["ho", "anni", "sono"], "Age uses avere; nationality uses essere."],
    ["Complete: Tu ___ un biglietto ___ Roma?", ["vuoi", "per"], "Volere: tu vuoi; use per with the destination."],
    ["Complete: Noi ___ studiare ___ esame.", ["dobbiamo", "per l’"], "Dovere: noi dobbiamo; per l’esame."],
    ["Complete: Voi ___ andare ___ bar?", ["potete", "al"], "Potere: voi potete; a + il = al."],
    ["Complete: La farmacia ___ vicin__ ___ piazza.", ["è", "vicina", "alla"], "Farmacia is feminine singular; a + la = alla."],
    ["Complete: I negozi ___ stat__ chiusi ieri.", ["sono", "stati"], "With essere, stati agrees with negozi."],
    ["Complete: Le lezioni ___ finit__ ___ cinque.", ["sono", "finite", "alle"], "Finire can use essere here for ended; lezioni is feminine plural."],
    ["Complete: L’esame ___ difficil__ ma importante.", ["è", "difficile"], "Esame is masculine, but difficile is the same in singular."],
    ["Complete: Le città ___ bell__ e grandi.", ["sono", "belle"], "Città is feminine plural; bello becomes belle."],
    ["Complete: Ho ___ una pizza e ___ bevuto acqua.", ["mangiato", "ho"], "Both verbs use avere here."],
    ["Complete: Sono ___ a Podgorica e ho ___ italiano.", ["andato", "studiato"], "Andare uses essere; studiare uses avere."],
    ["Complete: Mia madre ___ nata ___ Montenegro.", ["è", "in"], "Nascere uses essere; use in with countries."]
  ];
  fill("sentence-building", "Mixed grammar context", mixed.map(([prompt, answers, explanation]) => multiBlank(
    `exp-sb-mixed-${idSafe(prompt)}`,
    prompt,
    answers,
    explanation,
    ["mixed grammar"]
  )));

  const corrections = [
    ["Io sei studente.", "Io sono studente.", "Io uses sono, not sei."],
    ["La libro è nuova.", "Il libro è nuovo.", "Libro is masculine singular."],
    ["Ho andato a casa ieri.", "Sono andato a casa ieri.", "Andare uses essere."],
    ["Tu sono albanese.", "Tu sei albanese.", "Tu uses sei."],
    ["Io ha una penna.", "Io ho una penna.", "Io uses ho."],
    ["Lei abito a Roma.", "Lei abita a Roma.", "Lei uses abita."],
    ["Noi studiate italiano.", "Noi studiamo italiano.", "Noi uses studiamo."],
    ["Lo casa è bella.", "La casa è bella.", "Casa is feminine singular."],
    ["Il studente è italiano.", "Lo studente è italiano.", "Studente starts with s + consonant."],
    ["La amica è simpatica.", "L’amica è simpatica.", "Use l’ before a vowel."],
    ["I libro sono nuovi.", "I libri sono nuovi.", "Libro becomes libri."],
    ["Le penne sono rosso.", "Le penne sono rosse.", "Rosso agrees with feminine plural penne."],
    ["Marco è italiana.", "Marco è italiano.", "Marco is masculine singular."],
    ["Anna è tedesco.", "Anna è tedesca.", "Anna is feminine singular."],
    ["Sono uscito con amiche. (female speaker)", "Sono uscita con amiche.", "A female speaker uses uscita."],
    ["Anna ha andata a casa.", "Anna è andata a casa.", "Andare uses essere."],
    ["Noi siamo mangiato al ristorante.", "Noi abbiamo mangiato al ristorante.", "Mangiare uses avere."],
    ["Vado a l’università.", "Vado all’università.", "A + l’università becomes all’università."],
    ["La farmacia è vicino a la piazza.", "La farmacia è vicino alla piazza.", "A + la becomes alla."],
    ["Vorrei una caffè.", "Vorrei un caffè.", "Caffè is masculine."],
    ["Quanto costa il giacca?", "Quanto costa la giacca?", "Giacca is feminine."],
    ["Ieri studio italiano.", "Ieri ho studiato italiano.", "Use passato prossimo for yesterday."],
    ["Mi sveglio a sette.", "Mi sveglio alle sette.", "Use alle with the hour."],
    ["Ho venti anno.", "Ho venti anni.", "Use plural anni."],
    ["Sono di il Montenegro.", "Sono del Montenegro.", "Di + il becomes del."]
  ];
  fill("sentence-building", "Error correction", corrections.map(([prompt, answer, explanation]) => typed(
    `exp-sb-error-${idSafe(prompt)}`,
    prompt,
    answer,
    explanation,
    ["error correction"]
  )));

  const miniDialogues = [
    ["A: Come ti chiami?\nB: Mi ___ Gent.", "chiamo", "Mi chiamo means my name is."],
    ["A: Di dove sei?\nB: ___ albanese.", "Sono", "Use sono for nationality."],
    ["A: Quanto costa?\nB: ___ cinque euro.", "Costa", "Costa means it costs."],
    ["A: Dove abiti?\nB: ___ a Podgorica.", "Abito", "Use abito for I live."],
    ["A: Quanti anni hai?\nB: ___ venti anni.", "Ho", "Italian uses avere for age."],
    ["A: Che cosa studi?\nB: ___ italiano.", "Studio", "Io studio."],
    ["A: Vuoi un caffè?\nB: Sì, ___ favore.", "per", "Per favore means please."],
    ["A: Dov’è la stazione?\nB: ___ dritto.", "Vada", "Vada dritto is a formal direction."],
    ["A: Ha una prenotazione?\nB: Sì, ___ una prenotazione.", "ho", "Use ho for I have."],
    ["A: A che nome?\nB: ___ nome Gent.", "A", "A nome means under the name."],
    ["A: Com’è la camera?\nB: ___ piccola ma pulita.", "È", "Use è for it is."],
    ["A: Che tempo fa?\nB: ___ caldo.", "Fa", "Fa caldo means it is hot."],
    ["A: Come si chiama tuo fratello?\nB: Si ___ Luca.", "chiama", "Si chiama means he is called."],
    ["A: Che cosa hai fatto ieri?\nB: Ho ___ italiano.", "studiato", "Use the past participle studiato."],
    ["A: Sei uscito ieri?\nB: Sì, sono ___ con amici.", "uscito", "Male speaker: uscito."],
    ["A: Dove sei andata?\nB: Sono ___ al bar.", "andata", "Female speaker: andata."],
    ["A: Vorrei un biglietto per Roma.\nB: Solo ___?", "andata", "Solo andata means one-way."],
    ["A: Che taglia porta?\nB: Porto la taglia ___.", "media", "Taglia media means medium size."],
    ["A: Posso provare questa giacca?\nB: Certo, il camerino è ___ sinistra.", "a", "A sinistra means on the left."],
    ["A: Le piace l’italiano?\nB: Sì, mi ___ molto.", "piace", "Mi piace means I like it."]
  ];
  fill("communication-practice", "Mini dialogues", miniDialogues.map(([prompt, answer, explanation]) => typed(
    `exp-cp-dialogue-${idSafe(prompt)}`,
    prompt,
    answer,
    explanation,
    ["mini dialogue"]
  )));

  const situations = [
    ["Introducing yourself", "Write a sentence saying your name is Gent.", "Mi chiamo Gent.", ["Mi chiamo Gent."], "Use mi chiamo for my name is."],
    ["Introducing yourself", "Write a sentence saying you are Albanian.", "Sono albanese.", ["Sono albanese."], "Use sono for nationality."],
    ["At university", "Say that you study Italian at the university.", "Studio italiano all’università.", ["Studio italiano all’università.", "Studio l’italiano all’università."], "Use all’università."],
    ["At university", "Ask where the lesson is.", "Dov’è la lezione?", ["Dov’è la lezione?", "Dove è la lezione?"], "Lezione is feminine."],
    ["At a bar", "Ask for a coffee politely.", "Vorrei un caffè, per favore.", ["Vorrei un caffè, per favore.", "Un caffè, per favore."], "Vorrei is polite."],
    ["At a restaurant", "Ask for the menu.", "Il menù, per favore.", ["Il menù, per favore.", "Vorrei il menù, per favore."], "A short polite request is acceptable."],
    ["Directions", "Ask where the station is.", "Dov’è la stazione?", ["Dov’è la stazione?", "Dove è la stazione?"], "Use dov’è."],
    ["Directions", "Tell someone to go straight.", "Vada dritto.", ["Vada dritto."], "Formal direction: vada."],
    ["Hotel", "Say that you have a reservation.", "Ho una prenotazione.", ["Ho una prenotazione."], "Use avere."],
    ["Hotel", "Say your reservation is under the name Gent.", "A nome Gent.", ["A nome Gent.", "La prenotazione è a nome Gent."], "A nome means under the name."],
    ["House", "Say your house is small.", "La mia casa è piccola.", ["La mia casa è piccola.", "Casa mia è piccola."], "Piccola agrees with casa."],
    ["House", "Say your room is clean.", "La mia camera è pulita.", ["La mia camera è pulita."], "Pulita agrees with camera."],
    ["Daily routine", "Say that you wake up at seven.", "Mi sveglio alle sette.", ["Mi sveglio alle sette."], "Use mi sveglio and alle sette."],
    ["Daily routine", "Say that you have breakfast at the bar.", "Faccio colazione al bar.", ["Faccio colazione al bar."], "Fare colazione means to have breakfast."],
    ["Weather", "Say that today the weather is beautiful.", "Oggi il tempo è bello.", ["Oggi il tempo è bello."], "Il tempo means the weather."],
    ["Family", "Say that your brother is called Luca.", "Mio fratello si chiama Luca.", ["Mio fratello si chiama Luca."], "Use si chiama."],
    ["Person description", "Say that Anna is tall and nice.", "Anna è alta e simpatica.", ["Anna è alta e simpatica."], "Both adjectives agree with Anna."],
    ["Train tickets", "Ask for a ticket to Rome.", "Vorrei un biglietto per Roma.", ["Vorrei un biglietto per Roma.", "Un biglietto per Roma, per favore."], "Use per before the destination."],
    ["Shopping", "Ask how much the jacket costs.", "Quanto costa la giacca?", ["Quanto costa la giacca?"], "Giacca is feminine."],
    ["Past weekend", "Say that yesterday you studied Italian.", "Ieri ho studiato italiano.", ["Ieri ho studiato italiano.", "Ho studiato italiano ieri."], "Use passato prossimo."],
    ["Past weekend", "Say that you went out with friends, male speaker.", "Sono uscito con amici.", ["Sono uscito con amici."], "Uscire uses essere; male speaker uses uscito."]
  ];
  fill("communication-practice", "Situation-based practice", situations.map(([situation, prompt, answer, acceptedAnswers, explanation]) => typed(
    `exp-cp-situation-${idSafe(situation)}-${idSafe(prompt)}`,
    prompt,
    answer,
    explanation,
    ["situation", situation.toLowerCase()],
    { situation, acceptedAnswers }
  )));

  const personalAnswers = [
    ["Come ti chiami?", "Mi chiamo Gent.", [["mi chiamo"]], "Use mi chiamo."],
    ["Di dove sei?", "Sono albanese. Sono di Podgorica.", [["sono"], ["albanese", "del montenegro", "di podgorica"]], "Use essere for origin."],
    ["Quanti anni hai?", "Ho venti anni.", [["ho"], ["anni"]], "Age uses avere."],
    ["Dove abiti?", "Abito a Podgorica.", [["abito"], ["a"]], "Use a with cities."],
    ["Che cosa studi?", "Studio italiano all’università.", [["studio"], ["italiano"], ["all’università", "università"]], "Use study vocabulary."],
    ["Che lingue parli?", "Parlo albanese, italiano e inglese.", [["parlo"], ["italiano"]], "Use parlare."],
    ["Com’è la tua casa?", "La mia casa è piccola ma comoda.", [["casa"], ["è"], ["piccola", "grande", "comoda"]], "Describe the house with adjectives."],
    ["Com’è la tua camera?", "La mia camera è pulita e luminosa.", [["camera"], ["è"], ["pulita", "piccola", "grande"]], "Use feminine adjective forms."],
    ["Che cosa fai la mattina?", "La mattina mi sveglio alle sette e faccio colazione.", [["mi sveglio"], ["faccio colazione"]], "Use routine verbs."],
    ["Che cosa fai la sera?", "La sera studio italiano e vado a letto.", [["sera"], ["studio", "vado"]], "Use present tense."],
    ["Che tempo fa oggi?", "Oggi il tempo è bello e fa caldo.", [["tempo"], ["fa", "è"]], "Use weather expressions."],
    ["Com’è la tua famiglia?", "La mia famiglia è piccola.", [["famiglia"], ["è"]], "Use famiglia vocabulary."],
    ["Come si chiama tua madre?", "Mia madre si chiama Anna.", [["madre"], ["si chiama"]], "Use si chiama."],
    ["Descrivi un amico.", "Il mio amico è alto e simpatico.", [["amico", "amica"], ["è"], ["simpatico", "simpatica", "alto", "alta"]], "Use adjective agreement."],
    ["Che cosa prendi al bar?", "Prendo un caffè e un panino.", [["prendo"], ["caffè", "panino"]], "Use bar vocabulary."],
    ["Come vai all’università?", "Vado all’università in autobus.", [["vado"], ["all’università"], ["autobus", "treno"]], "Use in with transport."],
    ["Che cosa hai fatto ieri?", "Ieri ho studiato italiano.", [["ieri"], ["ho"], ["studiato", "mangiato", "comprato"]], "Use passato prossimo."],
    ["Dove sei andato ieri?", "Ieri sono andato al bar.", [["sono andato", "sono andata"], ["ieri", "al", "a"]], "Movement verbs use essere."],
    ["Che cosa hai mangiato ieri?", "Ieri ho mangiato una pizza.", [["ho mangiato"], ["pizza", "pasta", "panino"]], "Mangiare uses avere."],
    ["Che cosa vuoi fare domani?", "Domani voglio studiare italiano.", [["voglio"], ["domani"], ["studiare", "andare", "fare"]], "Use volere + infinitive."]
  ];
  fill("communication-practice", "Personal answer practice", personalAnswers.map(([prompt, modelAnswer, requiredAny, explanation]) => guidedWriting(
    `exp-cp-personal-${idSafe(prompt)}`,
    prompt,
    explanation,
    ["personal answer"],
    { modelAnswer, requiredAny, minRequiredMatches: Math.min(2, requiredAny.length) }
  )));

  const guided = [
    ["Write 5 sentences introducing yourself.", ["mi chiamo", "sono", "ho", "abito", "studio"], "Mi chiamo Gent. Sono albanese. Ho venti anni. Abito a Podgorica. Studio italiano.", "Use identity, age, city, and study details."],
    ["Write 5 sentences about your daily routine.", ["mi sveglio", "faccio colazione", "studio", "pranzo", "vado a letto"], "Mi sveglio alle sette. Faccio colazione. Studio italiano. Pranzo a casa. Vado a letto alle undici.", "Use present tense routine verbs."],
    ["Write 5 sentences about your family.", ["famiglia", "madre", "padre", "fratello", "si chiama"], "La mia famiglia è piccola. Mia madre si chiama Anna. Mio padre si chiama Marco. Ho un fratello. Mio fratello è simpatico.", "Use family vocabulary."],
    ["Write 5 sentences about your house.", ["casa", "camera", "cucina", "bagno", "piccola"], "La mia casa è piccola. Ha una camera. La cucina è luminosa. Il bagno è pulito. Mi piace la mia casa.", "Describe rooms and adjectives."],
    ["Write 5 sentences about university.", ["università", "studio", "lezione", "esame", "italiano"], "Studio italiano all’università. La lezione è interessante. Ho un esame. Leggo un libro. Scrivo una email.", "Use school vocabulary."],
    ["Write 5 sentences about a bar or restaurant.", ["bar", "caffè", "panino", "vorrei", "per favore"], "Vado al bar. Vorrei un caffè. Prendo un panino. Il caffè costa due euro. Grazie, per favore.", "Use polite requests."],
    ["Write 5 sentences asking for directions.", ["scusi", "dov’è", "stazione", "vada dritto", "a destra"], "Scusi, dov’è la stazione? Vada dritto. Giri a destra. La stazione è vicino alla piazza. Grazie.", "Use direction phrases."],
    ["Write 5 sentences for a hotel check-in.", ["albergo", "prenotazione", "nome", "passaporto", "camera"], "Sono in albergo. Ho una prenotazione. La prenotazione è a nome Gent. Ecco il passaporto. La camera è piccola.", "Use hotel vocabulary."],
    ["Write 5 sentences about the weather.", ["oggi", "tempo", "fa caldo", "piove", "bello"], "Oggi il tempo è bello. Fa caldo. Non piove. Il cielo è azzurro. Mi piace il sole.", "Use weather expressions."],
    ["Write 5 sentences describing a person.", ["alto", "simpatico", "giovane", "ha", "capelli"], "Marco è alto. È giovane. Ha i capelli neri. È simpatico. Studia italiano.", "Use essere, avere, and adjectives."],
    ["Write 5 sentences buying a train ticket.", ["biglietto", "Roma", "andata", "treno", "binario"], "Vorrei un biglietto per Roma. Solo andata, per favore. Il treno parte alle otto. Parte dal binario due. Grazie.", "Use travel vocabulary."],
    ["Write 5 sentences shopping for clothes.", ["giacca", "taglia", "costa", "provare", "camerino"], "Vorrei provare una giacca. Porto la taglia media. Quanto costa? Il camerino è a sinistra. La giacca è cara.", "Use clothing shop vocabulary."],
    ["Write 5 sentences about last weekend.", ["ieri", "ho studiato", "sono uscito", "ho mangiato", "sono andato"], "Ieri ho studiato italiano. Sono uscito con amici. Ho mangiato una pizza. Sono andato al bar. Il weekend è stato bello.", "Use passato prossimo."],
    ["Write 5 sentences about yesterday using avere verbs.", ["ho studiato", "ho mangiato", "ho comprato", "ho letto", "ho scritto"], "Ieri ho studiato. Ho mangiato una pizza. Ho comprato un biglietto. Ho letto un libro. Ho scritto una email.", "Use passato prossimo with avere."],
    ["Write 5 sentences about yesterday using essere verbs.", ["sono andato", "sono uscito", "sono arrivato", "sono partito", "sono stato"], "Sono andato al bar. Sono uscito con amici. Sono arrivato tardi. Sono partito alle otto. Sono stato a casa.", "Use agreement with essere."],
    ["Write 5 sentences with modal verbs.", ["posso", "devo", "voglio", "studiare", "andare"], "Posso parlare italiano. Devo studiare. Voglio andare al bar. Posso comprare un biglietto. Devo fare i compiti.", "Use modal + infinitive."],
    ["Write 5 sentences with adjectives.", ["bello", "nuovo", "rosso", "grande", "simpatico"], "Il libro è nuovo. La casa è grande. Le penne sono rosse. Marco è simpatico. La città è bella.", "Make adjectives agree."],
    ["Write 5 sentences with articles and nouns.", ["il libro", "la penna", "lo studente", "l’amica", "gli studenti"], "Il libro è nuovo. La penna è rossa. Lo studente è italiano. L’amica è simpatica. Gli studenti sono in classe.", "Use correct articles."],
    ["Write 5 sentences about food and drink.", ["acqua", "caffè", "pizza", "pasta", "panino"], "Bevo acqua. Prendo un caffè. Mangio una pizza. Mi piace la pasta. Vorrei un panino.", "Use food vocabulary."],
    ["Write 5 sentences about transport.", ["autobus", "treno", "biglietto", "stazione", "aeroporto"], "Vado in autobus. Prendo il treno. Compro un biglietto. La stazione è vicino. L’aeroporto è grande.", "Use travel vocabulary."]
  ];
  fill("communication-practice", "Guided writing", guided.map(([prompt, requiredWords, modelAnswer, explanation]) => guidedWriting(
    `exp-cp-guided-${idSafe(prompt)}`,
    prompt,
    explanation,
    ["guided writing"],
    { requiredWords, minRequiredMatches: 4, minSentences: 4, modelAnswer }
  )));

  const recalls = [
    ["Write 5 family words.", ["madre", "padre", "fratello", "sorella", "nonno", "nonna", "zio", "zia", "cugino", "cugina", "figlio", "figlia"]],
    ["Write 5 food/drink words.", ["acqua", "caffè", "pizza", "pasta", "panino", "tè", "latte", "vino", "birra", "pane", "ristorante", "bar"]],
    ["Write 5 transport/travel words.", ["treno", "autobus", "biglietto", "stazione", "binario", "aeroporto", "taxi", "valigia", "passaporto", "albergo"]],
    ["Write 5 university/classroom words.", ["università", "lezione", "esame", "libro", "penna", "studente", "studentessa", "classe", "corso", "compito"]],
    ["Write 5 house words.", ["casa", "camera", "cucina", "bagno", "sedia", "tavolo", "porta", "finestra", "letto", "doccia"]],
    ["Write 5 city/place words.", ["città", "piazza", "strada", "farmacia", "stazione", "bar", "ristorante", "negozio", "banca", "museo"]],
    ["Write 5 clothes words.", ["giacca", "vestito", "gonna", "scarpa", "camicia", "pantaloni", "maglietta", "taglia", "cappotto", "camerino"]],
    ["Write 5 adjectives for people.", ["alto", "basso", "giovane", "simpatico", "antipatico", "stanco", "occupato", "italiano", "albanese", "tedesco"]],
    ["Write 5 weather words/phrases.", ["tempo", "sole", "pioggia", "piove", "fa caldo", "fa freddo", "vento", "nuvoloso", "bello", "brutto"]],
    ["Write 5 daily routine words/phrases.", ["mi sveglio", "mi alzo", "faccio colazione", "pranzo", "studio", "lavoro", "ceno", "vado a letto", "mi lavo", "mi vesto"]],
    ["Write 5 present-tense verbs.", ["sono", "ho", "studio", "abito", "parlo", "mangio", "prendo", "vado", "faccio", "esco"]],
    ["Write 5 passato prossimo forms.", ["ho studiato", "ho mangiato", "ho comprato", "sono andato", "sono uscita", "è arrivato", "abbiamo visto", "hanno dormito", "sei partito", "avete letto"]],
    ["Write 5 question words/phrases.", ["come", "dove", "quando", "quanto", "che cosa", "perché", "chi", "quale", "di dove", "a che ora"]],
    ["Write 5 direction words/phrases.", ["dritto", "a destra", "a sinistra", "vicino", "lontano", "davanti", "dietro", "alla piazza", "alla stazione", "scusi"]],
    ["Write 5 hotel words.", ["albergo", "prenotazione", "camera", "chiave", "passaporto", "bagno", "nome", "singola", "doppia", "reception"]],
    ["Write 5 shopping words.", ["negozio", "costa", "euro", "taglia", "giacca", "scarpe", "vorrei", "provare", "caro", "economico"]],
    ["Write 5 bar/restaurant words.", ["caffè", "panino", "pizza", "pasta", "menù", "conto", "acqua", "ristorante", "bar", "cameriere"]],
    ["Write 5 nationality words.", ["italiano", "italiana", "albanese", "tedesco", "tedesca", "francese", "spagnolo", "inglese", "montenegrino", "americano"]],
    ["Write 5 time words.", ["oggi", "ieri", "domani", "mattina", "sera", "notte", "settimana", "fine settimana", "alle otto", "presto"]],
    ["Write 5 polite expressions.", ["per favore", "grazie", "prego", "scusi", "mi dispiace", "buongiorno", "arrivederci", "vorrei", "posso", "permesso"]]
  ];
  fill("communication-practice", "Category recall", recalls.map(([prompt, acceptedAnswers]) => categoryRecall(
    `exp-cp-recall-${idSafe(prompt)}`,
    prompt,
    acceptedAnswers,
    `Useful answers include: ${acceptedAnswers.slice(0, 8).join(", ")}.`,
    ["category recall"]
  )));
})();
