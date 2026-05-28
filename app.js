const VOCAB_TOPICS = [
  {
    id: "personal",
    title: "Personal info and university",
    terms: [
      ["il nome", "i nomi", "name"],
      ["il cognome", "i cognomi", "surname"],
      ["l'età", "le età", "age"],
      ["la nazionalità", "le nazionalità", "nationality"],
      ["la città", "le città", "city"],
      ["il paese", "i paesi", "country/town"],
      ["l'indirizzo", "gli indirizzi", "address"],
      ["il numero", "i numeri", "number"],
      ["il telefono", "i telefoni", "telephone"],
      ["lo studente", "gli studenti", "male student"],
      ["la studentessa", "le studentesse", "female student"],
      ["il professore", "i professori", "male professor"],
      ["la professoressa", "le professoresse", "female professor"],
      ["il corso", "i corsi", "course"],
      ["l'università", "le università", "university"],
      ["la lingua", "le lingue", "language"],
      ["la classe", "le classi", "class"],
      ["il collega", "i colleghi", "male classmate"],
      ["la collega", "le colleghe", "female classmate"],
      ["l'esame", "gli esami", "exam"]
    ]
  },
  {
    id: "classroom",
    title: "Classroom and study",
    terms: [
      ["il libro", "i libri", "book"],
      ["il quaderno", "i quaderni", "notebook"],
      ["la penna", "le penne", "pen"],
      ["la matita", "le matite", "pencil"],
      ["il banco", "i banchi", "desk"],
      ["la sedia", "le sedie", "chair"],
      ["il tavolo", "i tavoli", "table"],
      ["la lavagna", "le lavagne", "board"],
      ["lo zaino", "gli zaini", "backpack"],
      ["l'orologio", "gli orologi", "clock/watch"],
      ["la finestra", "le finestre", "window"],
      ["la porta", "le porte", "door"],
      ["il cellulare", "i cellulari", "mobile phone"],
      ["il foglio", "i fogli", "sheet of paper"],
      ["il dizionario", "i dizionari", "dictionary"],
      ["la pagina", "le pagine", "page"],
      ["la parola", "le parole", "word"],
      ["la frase", "le frasi", "sentence"],
      ["l'esercizio", "gli esercizi", "exercise"],
      ["la domanda", "le domande", "question"]
    ]
  },
  {
    id: "time",
    title: "Time and calendar",
    terms: [
      ["il giorno", "i giorni", "day"],
      ["la settimana", "le settimane", "week"],
      ["il mese", "i mesi", "month"],
      ["l'anno", "gli anni", "year"],
      ["la mattina", "le mattine", "morning"],
      ["il pomeriggio", "i pomeriggi", "afternoon"],
      ["la sera", "le sere", "evening"],
      ["la notte", "le notti", "night"],
      ["l'ora", "le ore", "hour/time"],
      ["il minuto", "i minuti", "minute"],
      ["oggi", "-", "today"],
      ["ieri", "-", "yesterday"],
      ["domani", "-", "tomorrow"],
      ["sempre", "-", "always"],
      ["spesso", "-", "often"],
      ["qualche volta", "-", "sometimes"],
      ["mai", "-", "never"],
      ["prima", "-", "before"],
      ["dopo", "-", "after"],
      ["adesso", "-", "now"]
    ]
  },
  {
    id: "food",
    title: "Food, bar and restaurant",
    terms: [
      ["l'acqua", "le acque", "water"],
      ["il caffè", "i caffè", "coffee"],
      ["il tè", "i tè", "tea"],
      ["il latte", "i latti", "milk"],
      ["la birra", "le birre", "beer"],
      ["il vino", "i vini", "wine"],
      ["il pane", "i pani", "bread"],
      ["il panino", "i panini", "sandwich"],
      ["la pizza", "le pizze", "pizza"],
      ["la pasta", "le paste", "pasta"],
      ["il cornetto", "i cornetti", "croissant"],
      ["il gelato", "i gelati", "ice cream"],
      ["lo zucchero", "gli zuccheri", "sugar"],
      ["il sale", "i sali", "salt"],
      ["il conto", "i conti", "bill"],
      ["il prezzo", "i prezzi", "price"],
      ["l'euro", "gli euro", "euro"],
      ["il bar", "i bar", "cafe/bar"],
      ["il ristorante", "i ristoranti", "restaurant"],
      ["il menù", "i menù", "menu"]
    ]
  },
  {
    id: "travel",
    title: "City, transport and travel",
    terms: [
      ["la strada", "le strade", "street/road"],
      ["la piazza", "le piazze", "square"],
      ["la via", "le vie", "street"],
      ["il centro", "i centri", "center"],
      ["la stazione", "le stazioni", "station"],
      ["il treno", "i treni", "train"],
      ["l'autobus", "gli autobus", "bus"],
      ["il biglietto", "i biglietti", "ticket"],
      ["il binario", "i binari", "platform"],
      ["la fermata", "le fermate", "stop"],
      ["l'aeroporto", "gli aeroporti", "airport"],
      ["la macchina", "le macchine", "car"],
      ["il taxi", "i taxi", "taxi"],
      ["la bicicletta", "le biciclette", "bicycle"],
      ["il viaggio", "i viaggi", "trip"],
      ["la destra", "-", "right side"],
      ["la sinistra", "-", "left side"],
      ["la cartina", "le cartine", "map"],
      ["il passaporto", "i passaporti", "passport"],
      ["la valigia", "le valigie", "suitcase"]
    ]
  },
  {
    id: "home",
    title: "House, hotel and rooms",
    terms: [
      ["la casa", "le case", "house/home"],
      ["l'appartamento", "gli appartamenti", "apartment"],
      ["la camera", "le camere", "room"],
      ["il bagno", "i bagni", "bathroom"],
      ["la cucina", "le cucine", "kitchen"],
      ["il soggiorno", "i soggiorni", "living room"],
      ["il letto", "i letti", "bed"],
      ["la chiave", "le chiavi", "key"],
      ["l'albergo", "gli alberghi", "hotel"],
      ["l'hotel", "gli hotel", "hotel"],
      ["la camera singola", "le camere singole", "single room"],
      ["la camera doppia", "le camere doppie", "double room"],
      ["la prenotazione", "le prenotazioni", "reservation"],
      ["il servizio", "i servizi", "service/bathroom"],
      ["l'ascensore", "gli ascensori", "elevator"],
      ["il piano", "i piani", "floor"],
      ["il giardino", "i giardini", "garden"],
      ["il balcone", "i balconi", "balcony"]
    ]
  },
  {
    id: "routine",
    title: "Routine and free time",
    terms: [
      ["la colazione", "le colazioni", "breakfast"],
      ["il pranzo", "i pranzi", "lunch"],
      ["la cena", "le cene", "dinner"],
      ["il lavoro", "i lavori", "work/job"],
      ["lo studio", "gli studi", "study"],
      ["il tempo libero", "i tempi liberi", "free time"],
      ["lo sport", "gli sport", "sport"],
      ["la musica", "le musiche", "music"],
      ["il cinema", "i cinema", "cinema"],
      ["il film", "i film", "film/movie"],
      ["la palestra", "le palestre", "gym"],
      ["il parco", "i parchi", "park"],
      ["l'amico", "gli amici", "male friend"],
      ["l'amica", "le amiche", "female friend"],
      ["la festa", "le feste", "party/holiday"]
    ]
  },
  {
    id: "weather",
    title: "Weather, seasons and nature",
    terms: [
      ["il tempo", "-", "weather/time"],
      ["il sole", "i soli", "sun"],
      ["la pioggia", "le piogge", "rain"],
      ["la neve", "le nevi", "snow"],
      ["il vento", "i venti", "wind"],
      ["la primavera", "le primavere", "spring"],
      ["l'estate", "le estati", "summer"],
      ["l'autunno", "gli autunni", "autumn"],
      ["l'inverno", "gli inverni", "winter"],
      ["il grado", "i gradi", "degree"],
      ["la temperatura", "le temperature", "temperature"],
      ["la nuvola", "le nuvole", "cloud"]
    ]
  },
  {
    id: "family",
    title: "Family and people",
    terms: [
      ["la famiglia", "le famiglie", "family"],
      ["la madre", "le madri", "mother"],
      ["il padre", "i padri", "father"],
      ["la mamma", "le mamme", "mom"],
      ["il papà", "i papà", "dad"],
      ["il fratello", "i fratelli", "brother"],
      ["la sorella", "le sorelle", "sister"],
      ["il figlio", "i figli", "son/child"],
      ["la figlia", "le figlie", "daughter"],
      ["il marito", "i mariti", "husband"],
      ["la moglie", "le mogli", "wife"],
      ["il nonno", "i nonni", "grandfather"],
      ["la nonna", "le nonne", "grandmother"],
      ["lo zio", "gli zii", "uncle"],
      ["la zia", "le zie", "aunt"],
      ["il cugino", "i cugini", "male cousin"],
      ["la cugina", "le cugine", "female cousin"],
      ["il ragazzo", "i ragazzi", "boy"],
      ["la ragazza", "le ragazze", "girl"],
      ["la persona", "le persone", "person"]
    ]
  },
  {
    id: "shopping",
    title: "Clothes and shopping",
    terms: [
      ["il vestito", "i vestiti", "dress/suit"],
      ["la camicia", "le camicie", "shirt"],
      ["la maglietta", "le magliette", "T-shirt"],
      ["i pantaloni", "i pantaloni", "trousers"],
      ["i jeans", "i jeans", "jeans"],
      ["le scarpe", "le scarpe", "shoes"],
      ["la gonna", "le gonne", "skirt"],
      ["la giacca", "le giacche", "jacket"],
      ["il cappotto", "i cappotti", "coat"],
      ["il colore", "i colori", "color"],
      ["la taglia", "le taglie", "size"],
      ["il negozio", "i negozi", "shop"],
      ["il commesso", "i commessi", "male shop assistant"],
      ["la commessa", "le commesse", "female shop assistant"],
      ["la cassa", "le casse", "cash desk"],
      ["lo sconto", "gli sconti", "discount"]
    ]
  }
].map((topic) => ({
  ...topic,
  terms: topic.terms.map(([it, plural, en]) => ({ it, plural, en, topic: topic.id }))
}));

const ADJECTIVES = [
  ["italiano", "italiana", "italiani", "italiane", "Italian"],
  ["albanese", "albanese", "albanesi", "albanesi", "Albanian"],
  ["montenegrino", "montenegrina", "montenegrini", "montenegrine", "Montenegrin"],
  ["tedesco", "tedesca", "tedeschi", "tedesche", "German"],
  ["inglese", "inglese", "inglesi", "inglesi", "English"],
  ["grande", "grande", "grandi", "grandi", "big"],
  ["piccolo", "piccola", "piccoli", "piccole", "small"],
  ["bello", "bella", "belli", "belle", "beautiful"],
  ["buono", "buona", "buoni", "buone", "good"],
  ["nuovo", "nuova", "nuovi", "nuove", "new"],
  ["vecchio", "vecchia", "vecchi", "vecchie", "old"],
  ["simpatico", "simpatica", "simpatici", "simpatiche", "nice"],
  ["intelligente", "intelligente", "intelligenti", "intelligenti", "intelligent"],
  ["interessante", "interessante", "interessanti", "interessanti", "interesting"],
  ["facile", "facile", "facili", "facili", "easy"],
  ["difficile", "difficile", "difficili", "difficili", "difficult"],
  ["caro", "cara", "cari", "care", "expensive"],
  ["economico", "economica", "economici", "economiche", "cheap"],
  ["caldo", "calda", "caldi", "calde", "hot/warm"],
  ["freddo", "fredda", "freddi", "fredde", "cold"],
  ["contento", "contenta", "contenti", "contente", "happy"],
  ["stanco", "stanca", "stanchi", "stanche", "tired"]
].map(([ms, fs, mp, fp, en]) => ({ ms, fs, mp, fp, en }));

const VERBS = [
  ["essere", "to be", "sono", "sei", "è", "siamo", "siete", "sono", "stato/a", "essere"],
  ["avere", "to have", "ho", "hai", "ha", "abbiamo", "avete", "hanno", "avuto", "avere"],
  ["chiamarsi", "to be called", "mi chiamo", "ti chiami", "si chiama", "ci chiamiamo", "vi chiamate", "si chiamano", "chiamato/a", "essere"],
  ["abitare", "to live", "abito", "abiti", "abita", "abitiamo", "abitate", "abitano", "abitato", "avere"],
  ["studiare", "to study", "studio", "studi", "studia", "studiamo", "studiate", "studiano", "studiato", "avere"],
  ["lavorare", "to work", "lavoro", "lavori", "lavora", "lavoriamo", "lavorate", "lavorano", "lavorato", "avere"],
  ["parlare", "to speak", "parlo", "parli", "parla", "parliamo", "parlate", "parlano", "parlato", "avere"],
  ["andare", "to go", "vado", "vai", "va", "andiamo", "andate", "vanno", "andato/a", "essere"],
  ["venire", "to come", "vengo", "vieni", "viene", "veniamo", "venite", "vengono", "venuto/a", "essere"],
  ["fare", "to do/make", "faccio", "fai", "fa", "facciamo", "fate", "fanno", "fatto", "avere"],
  ["stare", "to stay/be", "sto", "stai", "sta", "stiamo", "state", "stanno", "stato/a", "essere"],
  ["prendere", "to take/order", "prendo", "prendi", "prende", "prendiamo", "prendete", "prendono", "preso", "avere"],
  ["mangiare", "to eat", "mangio", "mangi", "mangia", "mangiamo", "mangiate", "mangiano", "mangiato", "avere"],
  ["bere", "to drink", "bevo", "bevi", "beve", "beviamo", "bevete", "bevono", "bevuto", "avere"],
  ["comprare", "to buy", "compro", "compri", "compra", "compriamo", "comprate", "comprano", "comprato", "avere"],
  ["pagare", "to pay", "pago", "paghi", "paga", "paghiamo", "pagate", "pagano", "pagato", "avere"],
  ["volere", "to want", "voglio", "vuoi", "vuole", "vogliamo", "volete", "vogliono", "voluto", "avere"],
  ["potere", "can/to be able", "posso", "puoi", "può", "possiamo", "potete", "possono", "potuto", "avere"],
  ["dovere", "must/to have to", "devo", "devi", "deve", "dobbiamo", "dovete", "devono", "dovuto", "avere"],
  ["uscire", "to go out", "esco", "esci", "esce", "usciamo", "uscite", "escono", "uscito/a", "essere"],
  ["dormire", "to sleep", "dormo", "dormi", "dorme", "dormiamo", "dormite", "dormono", "dormito", "avere"],
  ["svegliarsi", "to wake up", "mi sveglio", "ti svegli", "si sveglia", "ci svegliamo", "vi svegliate", "si svegliano", "svegliato/a", "essere"],
  ["alzarsi", "to get up", "mi alzo", "ti alzi", "si alza", "ci alziamo", "vi alzate", "si alzano", "alzato/a", "essere"],
  ["vestirsi", "to get dressed", "mi vesto", "ti vesti", "si veste", "ci vestiamo", "vi vestite", "si vestono", "vestito/a", "essere"],
  ["tornare", "to return", "torno", "torni", "torna", "torniamo", "tornate", "tornano", "tornato/a", "essere"],
  ["arrivare", "to arrive", "arrivo", "arrivi", "arriva", "arriviamo", "arrivate", "arrivano", "arrivato/a", "essere"],
  ["partire", "to leave", "parto", "parti", "parte", "partiamo", "partite", "partono", "partito/a", "essere"],
  ["leggere", "to read", "leggo", "leggi", "legge", "leggiamo", "leggete", "leggono", "letto", "avere"],
  ["scrivere", "to write", "scrivo", "scrivi", "scrive", "scriviamo", "scrivete", "scrivono", "scritto", "avere"],
  ["capire", "to understand", "capisco", "capisci", "capisce", "capiamo", "capite", "capiscono", "capito", "avere"],
  ["preferire", "to prefer", "preferisco", "preferisci", "preferisce", "preferiamo", "preferite", "preferiscono", "preferito", "avere"],
  ["finire", "to finish", "finisco", "finisci", "finisce", "finiamo", "finite", "finiscono", "finito", "avere"],
  ["prenotare", "to book", "prenoto", "prenoti", "prenota", "prenotiamo", "prenotate", "prenotano", "prenotato", "avere"],
  ["provare", "to try on", "provo", "provi", "prova", "proviamo", "provate", "provano", "provato", "avere"]
].map(([inf, en, io, tu, lui, noi, voi, loro, pp, aux]) => ({ inf, en, io, tu, lui, noi, voi, loro, pp, aux }));

const QUESTION_WORDS = [
  ["chi", "who"],
  ["che cosa / cosa", "what"],
  ["dove", "where"],
  ["di dove", "from where"],
  ["quando", "when"],
  ["quanto/a/i/e", "how much/many"],
  ["come", "how"],
  ["perché", "why/because"],
  ["quale/i", "which"],
  ["a che ora", "at what time"]
];

const CONNECTORS = [
  ["e", "and"],
  ["ma", "but"],
  ["o", "or"],
  ["anche", "also/too"],
  ["perché", "because/why"],
  ["quindi", "therefore/so"],
  ["poi", "then"],
  ["prima", "before/first"],
  ["dopo", "after"],
  ["invece", "instead"],
  ["però", "however"],
  ["secondo me", "in my opinion"],
  ["di solito", "usually"],
  ["per esempio", "for example"],
  ["allora", "so/then"]
];

const PREPOSITIONS = [
  ["di", "Sono ___ Tirana.", "Sono di Tirana.", "of/from"],
  ["a", "Vivo ___ Roma.", "Vivo a Roma.", "to/at/in"],
  ["da", "Vado ___ Marco.", "Vado da Marco.", "to someone's place"],
  ["in", "Studio ___ Italia.", "Studio in Italia.", "in/to"],
  ["con", "Esco ___ un amico.", "Esco con un amico.", "with"],
  ["per", "Un biglietto ___ Roma.", "Un biglietto per Roma.", "for/to"],
  ["tra", "Parto ___ due giorni.", "Parto tra due giorni.", "in time"],
  ["al", "Vado ___ bar.", "Vado al bar.", "a + il"],
  ["alla", "Vado ___ stazione.", "Vado alla stazione.", "a + la"],
  ["nel", "Sono ___ centro.", "Sono nel centro.", "in + il"],
  ["della", "La chiave ___ camera.", "La chiave della camera.", "di + la"],
  ["dal", "Vengo ___ professore.", "Vengo dal professore.", "da + il"]
];

const PHRASES = [
  ["Introducing yourself", "Ciao, mi chiamo ___. Sono di ___. Sono ___. Ho ___ anni. Studio ___. Abito a ___."],
  ["Asking for repetition", "Scusi, non capisco. Può ripetere, per favore?"],
  ["Ordering", "Vorrei un caffè e un panino, per favore. Quanto costa?"],
  ["Directions", "Scusi, dov'è la stazione? Vada dritto, poi giri a destra."],
  ["Routine", "Di solito mi sveglio alle sette, faccio colazione e vado all'università."],
  ["Past weekend", "Sabato sono uscito con amici. Abbiamo mangiato una pizza e abbiamo visto un film."],
  ["Weather", "Oggi fa freddo e piove. Domani farà bel tempo."],
  ["Family", "La mia famiglia è piccola. Ho un fratello e una sorella."],
  ["Shopping", "Quanto costa questa camicia? Posso provarla? Avete una taglia più grande?"],
  ["Opinion", "Secondo me l'italiano è interessante, ma la grammatica è difficile."]
];

const LESSONS = [
  { id: "sounds", unit: "Start", title: "Italian sounds", short: "c/g/sc, gn, gli, and double consonants.", level: "A1", focus: "pronunciation", build: buildSoundQuestions },
  { id: "personal", unit: "Unit 1", title: "Introduce yourself", short: "Personal info, university words, and first verbs.", level: "A1", focus: "vocabulary", topics: ["personal"], build: (lesson) => [...buildVocabQuestions(lesson.topics, 8), ...buildVerbQuestions(["essere", "avere", "chiamarsi", "abitare", "studiare"], 4)] },
  { id: "articles", unit: "Unit 2", title: "Articles and gender", short: "il, lo, la, l', un, uno, una, un'.", level: "A1", focus: "grammar", build: buildArticleQuestions },
  { id: "classroom", unit: "Unit 3", title: "Classroom sprint", short: "Objects, plurals, and study phrases.", level: "A1", focus: "vocabulary", topics: ["classroom"], build: (lesson) => [...buildVocabQuestions(lesson.topics, 10), ...buildPluralQuestions(["classroom"], 4)] },
  { id: "food", unit: "Unit 4", title: "Bar and restaurant", short: "Ordering, prices, and food words.", level: "A1", focus: "dialogue", topics: ["food"], build: (lesson) => [...buildVocabQuestions(lesson.topics, 8), ...buildSentenceBuilders("food"), ...buildListeningQuestions("food")] },
  { id: "verbs", unit: "Unit 5", title: "Present tense core", short: "Regular verbs, essere, avere, modal verbs.", level: "A1/A2", focus: "verbs", build: () => [...buildVerbQuestions(null, 12), ...buildModalQuestions()] },
  { id: "adjectives", unit: "Unit 6", title: "Adjective agreement", short: "Gender and number agreement in exam sentences.", level: "A1/A2", focus: "grammar", build: buildAdjectiveQuestions },
  { id: "city", unit: "Unit 7", title: "City and travel", short: "Directions, tickets, stations, and transport.", level: "A2", focus: "travel", topics: ["travel", "home"], build: (lesson) => [...buildVocabQuestions(lesson.topics, 8), ...buildPrepositionQuestions(), ...buildSentenceBuilders("travel")] },
  { id: "routine", unit: "Unit 8", title: "Daily routine", short: "Reflexive verbs, time words, and free time.", level: "A2", focus: "routine", topics: ["routine", "time"], build: (lesson) => [...buildVocabQuestions(lesson.topics, 8), ...buildVerbQuestions(["svegliarsi", "alzarsi", "vestirsi", "dormire", "uscire"], 5), ...buildSentenceBuilders("routine")] },
  { id: "family-weather", unit: "Unit 9", title: "Family and weather", short: "People, seasons, and descriptive phrases.", level: "A1/A2", focus: "speaking", topics: ["family", "weather"], build: (lesson) => [...buildVocabQuestions(lesson.topics, 10), ...buildListeningQuestions("family"), ...buildAdjectiveQuestions().slice(0, 3)] },
  { id: "shopping", unit: "Unit 10", title: "Shopping and clothes", short: "Sizes, prices, trying things on.", level: "A2", focus: "dialogue", topics: ["shopping"], build: (lesson) => [...buildVocabQuestions(lesson.topics, 8), ...buildSentenceBuilders("shopping"), ...buildPrepositionQuestions().slice(0, 3)] },
  { id: "past", unit: "Unit 11", title: "Passato prossimo", short: "Auxiliaries, participles, and weekend stories.", level: "A2", focus: "past tense", build: buildPastQuestions },
  { id: "dialogues", unit: "Exam", title: "Oral exam phrases", short: "Memorized mini-dialogues from your pack.", level: "A1/A2", focus: "speaking", build: buildDialogueQuestions }
];

const STORE_KEY = "italian-a1-a2-practice";
const allTerms = VOCAB_TOPICS.flatMap((topic) => topic.terms);
const subjectKeys = ["io", "tu", "lui", "noi", "voi", "loro"];
let store = loadStore();
let session = null;
let currentMode = "path";

const app = document.querySelector("#app");
const stageTitle = document.querySelector("#stageTitle");
const stageEyebrow = document.querySelector("#stageEyebrow");

function loadStore() {
  const fallback = { xp: 0, streak: 0, lastStudy: null, completed: {}, mistakes: [], examBest: 0 };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORE_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveStore() {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
  updateStats();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’]/g, "'")
    .replace(/[.,!?;:]/g, "")
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

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function pickOptions(answer, pool, count = 4) {
  const wrong = shuffle(unique(pool).filter((item) => normalize(item) !== normalize(answer))).slice(0, count - 1);
  return shuffle(unique([answer, ...wrong])).slice(0, count);
}

function questionKey(question) {
  return normalize(`${question.kind}|${question.prompt}|${question.answer}`);
}

function getTopicTerms(topicIds) {
  return allTerms.filter((term) => topicIds.includes(term.topic));
}

function articleOf(italian) {
  const match = italian.match(/^(l'|un'|il|lo|la|i|gli|le|un|uno|una)\s*/i);
  return match ? match[1] : "";
}

function withoutArticle(italian) {
  return italian.replace(/^(l'|un'|il|lo|la|i|gli|le|un|uno|una)\s*/i, "").trim();
}

function makeMultiple(kind, prompt, answer, choices, hint = "", explanation = "", listenText = "") {
  return { type: listenText ? "listen" : "multiple", kind, prompt, answer, choices: pickOptions(answer, choices), hint, explanation, listenText };
}

function makeType(kind, prompt, answer, hint = "", explanation = "") {
  return { type: "type", kind, prompt, answer, accepted: [answer], hint, explanation };
}

function makeBuild(kind, prompt, answer, chips, hint = "") {
  return { type: "build", kind, prompt, answer, chips: shuffle(chips), hint };
}

function buildVocabQuestions(topicIds, count = 8) {
  const terms = shuffle(getTopicTerms(topicIds)).slice(0, count);
  const englishPool = allTerms.map((term) => term.en);
  const italianPool = allTerms.map((term) => term.it);
  const pluralPool = allTerms.map((term) => term.plural).filter((plural) => plural !== "-");

  return terms.map((term, index) => {
    if (index % 3 === 0) {
      return makeMultiple("Vocabulary", `What does “${term.it}” mean?`, term.en, englishPool, "Recognize the word with its article.", `${term.it} = ${term.en}`);
    }
    if (index % 3 === 1 || term.plural === "-") {
      return makeMultiple("Vocabulary", `Choose the Italian for “${term.en}”.`, term.it, italianPool, "Keep the article attached to the noun.", `${term.en} = ${term.it}`);
    }
    return makeMultiple("Plural", `Choose the plural of “${term.it}”.`, term.plural, pluralPool, "Italian usually changes the final vowel, not by adding -s.", `${term.it} → ${term.plural}`);
  });
}

function buildPluralQuestions(topicIds, count = 6) {
  return shuffle(getTopicTerms(topicIds).filter((term) => term.plural !== "-"))
    .slice(0, count)
    .map((term) => makeType("Plural", `Type the plural of “${term.it}”.`, term.plural, "Include the article.", `${term.it} → ${term.plural}`));
}

function buildArticleQuestions() {
  const terms = shuffle(allTerms.filter((term) => articleOf(term.it))).slice(0, 14);
  const articlePool = ["il", "lo", "la", "l'", "i", "gli", "le", "un", "uno", "una", "un'"];
  return terms.map((term) => {
    const article = articleOf(term.it);
    return makeMultiple("Articles", `Choose the article for “${withoutArticle(term.it)}” (${term.en}).`, article, articlePool, "Look at gender, number, and starting sound.", `${article} ${withoutArticle(term.it)}`);
  });
}

function buildSoundQuestions() {
  return [
    makeMultiple("Pronunciation", "Which word keeps a hard k sound with ch?", "che", ["che", "ciao", "centro", "gelato"], "ch + e/i keeps the hard k sound."),
    makeMultiple("Pronunciation", "Which word has the soft g sound?", "giorno", ["giorno", "gatto", "spaghetti", "albergo"], "g + e/i is soft."),
    makeMultiple("Pronunciation", "Which word has the sh sound?", "scena", ["scena", "scuola", "casa", "zaino"], "sc + e/i sounds like sh."),
    makeMultiple("Pronunciation", "Which pair shows why double consonants matter?", "nono / nonno", ["nono / nonno", "pane / pani", "libro / libri", "casa / case"], "Double consonants can change meaning."),
    makeMultiple("Pronunciation", "Which word contains the Italian gn sound?", "bagno", ["bagno", "banco", "gonna", "giorno"], "gn is close to nj."),
    makeMultiple("Pronunciation", "Which word contains the gli sound?", "famiglia", ["famiglia", "gelato", "giorno", "valigia"], "gli is close to lj."),
    makeMultiple("Pronunciation", "Why does amica become amiche?", "to keep the hard k sound", ["to keep the hard k sound", "because it is masculine", "because it is plural with -i", "because it is a verb"], "h preserves the hard sound before e/i."),
    makeMultiple("Pronunciation", "Why does albergo become alberghi?", "to keep the hard g sound", ["to keep the hard g sound", "because it is feminine", "because it starts with a vowel", "because it is invariant"], "h preserves the hard g sound before i.")
  ];
}

function buildVerbQuestions(allowedInfinitives = null, count = 10) {
  const verbs = allowedInfinitives ? VERBS.filter((verb) => allowedInfinitives.includes(verb.inf)) : VERBS;
  return shuffle(verbs.flatMap((verb) => subjectKeys.map((subject) => ({ verb, subject, answer: verb[subject] }))))
    .slice(0, count)
    .map(({ verb, subject, answer }, index) => {
      const prompt = `Complete: ${subject} ___ (${verb.inf}, ${verb.en})`;
      if (index % 3 === 0) {
        return makeType("Present tense", prompt, answer, "Type only the verb form.", `${subject} ${answer}`);
      }
      return makeMultiple("Present tense", prompt, answer, VERBS.flatMap((item) => subjectKeys.map((key) => item[key])), "The ending tells you the subject.", `${subject} ${answer}`);
    });
}

function buildModalQuestions() {
  return [
    makeMultiple("Modal verbs", "Complete: io ___ studiare italiano.", "voglio", ["voglio", "vuoi", "vuole", "vogliamo"], "volere + infinitive"),
    makeMultiple("Modal verbs", "Complete: tu ___ ripetere, per favore?", "puoi", ["puoi", "posso", "può", "potete"], "potere + infinitive"),
    makeMultiple("Modal verbs", "Complete: noi ___ andare all'università.", "dobbiamo", ["dobbiamo", "devo", "deve", "dovete"], "dovere + infinitive"),
    makeType("Modal verbs", "Type the missing form: Lei ___ pagare alla cassa. (dovere)", "deve", "Formal Lei uses third person singular.")
  ];
}

function buildAdjectiveQuestions() {
  const nounFrames = [
    ["il libro", "ms"],
    ["la casa", "fs"],
    ["i libri", "mp"],
    ["le case", "fp"],
    ["lo studente", "ms"],
    ["la ragazza", "fs"],
    ["gli studenti", "mp"],
    ["le ragazze", "fp"]
  ];
  return shuffle(ADJECTIVES).slice(0, 12).map((adj, index) => {
    const [noun, form] = nounFrames[index % nounFrames.length];
    const answer = adj[form];
    return makeMultiple("Adjectives", `Complete: ${noun} ___ (${adj.en})`, answer, [adj.ms, adj.fs, adj.mp, adj.fp], "Adjectives agree with the noun.", `${noun} ${answer}`);
  });
}

function buildPrepositionQuestions() {
  return shuffle(PREPOSITIONS).slice(0, 8).map(([answer, sentence, example, meaning]) => {
    return makeMultiple("Prepositions", sentence, answer, PREPOSITIONS.map(([prep]) => prep), meaning, example);
  });
}

function buildSentenceBuilders(topic) {
  const builders = {
    food: [
      ["Build: I would like a coffee and a sandwich, please.", "Vorrei un caffè e un panino per favore", ["Vorrei", "un", "caffè", "e", "un", "panino", "per", "favore", "sono", "la"]],
      ["Build: How much does it cost?", "Quanto costa", ["Quanto", "costa", "Dove", "sono", "per", "favore"]]
    ],
    travel: [
      ["Build: Excuse me, where is the station?", "Scusi dov'è la stazione", ["Scusi", "dov'è", "la", "stazione", "il", "bar", "quanto"]],
      ["Build: Go straight, then turn right.", "Vada dritto poi giri a destra", ["Vada", "dritto", "poi", "giri", "a", "destra", "sinistra", "sono"]]
    ],
    routine: [
      ["Build: Usually I wake up at seven.", "Di solito mi sveglio alle sette", ["Di", "solito", "mi", "sveglio", "alle", "sette", "sono", "vado"]],
      ["Build: I have breakfast and go to university.", "Faccio colazione e vado all'università", ["Faccio", "colazione", "e", "vado", "all'università", "sono", "studio"]]
    ],
    shopping: [
      ["Build: How much does this shirt cost?", "Quanto costa questa camicia", ["Quanto", "costa", "questa", "camicia", "questo", "pantaloni", "posso"]],
      ["Build: Can I try it on?", "Posso provarla", ["Posso", "provarla", "voglio", "dove", "la", "taglia"]]
    ]
  };
  return (builders[topic] || []).map(([prompt, answer, chips]) => makeBuild("Sentence builder", prompt, answer, chips, "Tap the words in order."));
}

function buildListeningQuestions(topic) {
  const sets = {
    food: [
      ["Listen and choose the sentence.", "Vorrei un caffè, per favore.", ["Vorrei un caffè, per favore.", "Vado alla stazione.", "Sono di Tirana.", "Ho una sorella."]],
      ["Listen and choose the sentence.", "Il conto, per favore.", ["Il conto, per favore.", "Il treno parte domani.", "Mi chiamo Marco.", "La casa è grande."]]
    ],
    family: [
      ["Listen and choose the sentence.", "La mia famiglia è piccola.", ["La mia famiglia è piccola.", "La stazione è a destra.", "Vorrei un panino.", "Studio medicina."]],
      ["Listen and choose the sentence.", "Oggi fa freddo e piove.", ["Oggi fa freddo e piove.", "Oggi compro una camicia.", "Oggi parto per Roma.", "Oggi leggo un libro."]]
    ]
  };
  return (sets[topic] || []).map(([prompt, answer, choices]) => makeMultiple("Listening", prompt, answer, choices, "Use the speaker button if your browser supports it.", answer, answer));
}

function buildPastQuestions() {
  return [
    makeMultiple("Passato prossimo", "Complete: Io ___ studiato italiano.", "ho", ["ho", "sono", "hai", "è"], "Most verbs use avere."),
    makeMultiple("Passato prossimo", "Complete: Lei ___ andata a Roma.", "è", ["è", "ha", "sono", "ho"], "Movement verbs often use essere."),
    makeMultiple("Passato prossimo", "Choose the past participle of fare.", "fatto", ["fatto", "fato", "facuto", "fare"], "fare has an irregular past participle."),
    makeMultiple("Passato prossimo", "Choose the past participle of leggere.", "letto", ["letto", "leggiato", "legguto", "leggere"], "leggere → letto."),
    makeMultiple("Passato prossimo", "Complete: Noi ___ usciti con amici.", "siamo", ["siamo", "abbiamo", "sono", "avete"], "uscire uses essere."),
    makeType("Passato prossimo", "Translate: I ate a pizza.", "Ho mangiato una pizza", "Accent-insensitive. Punctuation is optional."),
    makeType("Passato prossimo", "Translate: We watched a film.", "Abbiamo visto un film", "vedere has the irregular participle visto."),
    makeBuild("Passato prossimo", "Build: Saturday I went out with friends.", "Sabato sono uscito con amici", ["Sabato", "sono", "uscito", "con", "amici", "ho", "mangiato"]),
    makeBuild("Passato prossimo", "Build: We ate a pizza.", "Abbiamo mangiato una pizza", ["Abbiamo", "mangiato", "una", "pizza", "sono", "andato"])
  ];
}

function buildDialogueQuestions() {
  const phraseQuestions = PHRASES.map(([situation, phrase]) => makeMultiple("Dialogue", `Choose the phrase for: ${situation}.`, phrase, PHRASES.map((item) => item[1]), "These are direct exam-ready phrases from your pack."));
  const extra = [
    makeMultiple("Question words", "Which question asks where someone is from?", "Di dove sei?", ["Di dove sei?", "Come ti chiami?", "Quanto costa?", "A che ora parti?"], "di dove = from where"),
    makeMultiple("Question words", "Which question asks the price?", "Quanto costa?", ["Quanto costa?", "Dove abiti?", "Chi è?", "Quando parti?"], "quanto = how much"),
    makeType("Oral exam", "Answer pattern: What is your name?", "Mi chiamo", "A full answer can be: Mi chiamo Genti."),
    makeType("Oral exam", "Answer pattern: Where do you live?", "Abito a", "A full answer can be: Abito a Podgorica.")
  ];
  return shuffle([...phraseQuestions, ...extra]).slice(0, 12);
}

function buildExamQuestions() {
  return shuffle([
    ...buildSoundQuestions(),
    ...buildVocabQuestions(["personal", "food", "travel", "family", "shopping"], 14),
    ...buildArticleQuestions().slice(0, 6),
    ...buildVerbQuestions(null, 8),
    ...buildAdjectiveQuestions().slice(0, 5),
    ...buildPrepositionQuestions().slice(0, 5),
    ...buildPastQuestions(),
    ...buildDialogueQuestions().slice(0, 6)
  ]).slice(0, 24);
}

function updateStats() {
  const completedCount = LESSONS.filter((lesson) => store.completed[lesson.id]).length;
  const done = Math.round((completedCount / LESSONS.length) * 100);
  document.querySelector("#xpStat").textContent = store.xp;
  document.querySelector("#streakStat").textContent = store.streak;
  document.querySelector("#doneStat").textContent = `${done}%`;
  document.querySelector("#heartsStat").textContent = session ? session.hearts : 5;
}

function setActiveMode(mode) {
  currentMode = mode;
  document.querySelectorAll(".mode-button").forEach((button) => button.classList.remove("active"));
  const buttonId = mode === "path" ? "pathMode" : mode === "mistakes" ? "mistakesMode" : "examMode";
  document.querySelector(`#${buttonId}`).classList.add("active");
}

function renderHome() {
  session = null;
  setActiveMode("path");
  updateStats();
  stageEyebrow.textContent = "Personal exam path";
  stageTitle.textContent = "Italian A1/A2 practice";
  const firstOpenIndex = LESSONS.findIndex((lesson) => !store.completed[lesson.id]);
  const unlockUntil = firstOpenIndex === -1 ? LESSONS.length : firstOpenIndex + 1;

  app.innerHTML = `
    <div class="dashboard-grid">
      <div class="path-list">
        ${LESSONS.map((lesson, index) => {
          const complete = Boolean(store.completed[lesson.id]);
          const locked = index > unlockUntil;
          return `
            <button class="lesson-card ${complete ? "complete" : ""} ${locked ? "locked" : ""}" type="button" data-lesson="${lesson.id}" ${locked ? "disabled" : ""}>
              <span class="lesson-node" aria-hidden="true">${complete ? "✓" : index + 1}</span>
              <span class="lesson-copy">
                <span class="pill">${escapeHtml(lesson.unit)} · ${escapeHtml(lesson.level)}</span>
                <h2>${escapeHtml(lesson.title)}</h2>
                <p>${escapeHtml(lesson.short)}</p>
                <span class="lesson-meta">
                  <span class="pill">${escapeHtml(lesson.focus)}</span>
                  <span class="pill">${complete ? `${Math.round(store.completed[lesson.id] * 100)}% best` : "new"}</span>
                </span>
              </span>
              <span class="lesson-action">${locked ? "Locked" : complete ? "Review" : "Start"}</span>
            </button>
          `;
        }).join("")}
      </div>
      <aside>
        <section class="tool-panel">
          <h2>Today</h2>
          <p>${nextStudyLine()}</p>
          <div class="lesson-tags">
            <span class="pill">${allTerms.length} vocab items</span>
            <span class="pill">${VERBS.length} verbs</span>
            <span class="pill">${PHRASES.length} oral phrases</span>
          </div>
        </section>
        <section class="tool-panel">
          <h3>Weak spots</h3>
          ${renderWeakSpotList()}
        </section>
      </aside>
    </div>
  `;

  app.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => startLesson(button.dataset.lesson));
  });
}

function nextStudyLine() {
  const nextLesson = LESSONS.find((lesson) => !store.completed[lesson.id]) || LESSONS[LESSONS.length - 1];
  if (store.mistakes.length > 0) {
    return `You have ${store.mistakes.length} saved mistake${store.mistakes.length === 1 ? "" : "s"}. Clear a few, then continue with ${nextLesson.title}.`;
  }
  return `Continue with ${nextLesson.title}. Keep sessions short and repeat the missed forms.`;
}

function renderWeakSpotList() {
  if (!store.mistakes.length) {
    return `<p>No saved mistakes yet.</p>`;
  }
  const counts = store.mistakes.reduce((acc, item) => {
    acc[item.kind] = (acc[item.kind] || 0) + 1;
    return acc;
  }, {});
  return `
    <ul class="focus-list">
      ${Object.entries(counts).map(([kind, count]) => `<li><strong>${escapeHtml(kind)}</strong><br><span class="pill">${count} saved</span></li>`).join("")}
    </ul>
  `;
}

function startLesson(lessonId) {
  const lesson = LESSONS.find((item) => item.id === lessonId);
  const questions = shuffle(lesson.build(lesson)).slice(0, 14);
  session = {
    mode: "lesson",
    lesson,
    questions,
    current: 0,
    score: 0,
    hearts: 5,
    results: [],
    chipPicks: {}
  };
  setActiveMode("path");
  stageEyebrow.textContent = `${lesson.unit} · ${lesson.level}`;
  stageTitle.textContent = lesson.title;
  updateStats();
  renderQuestion();
}

function startExam() {
  session = {
    mode: "exam",
    lesson: { id: "exam", title: "A1/A2 exam mode", unit: "Exam", level: "A1/A2" },
    questions: buildExamQuestions(),
    current: 0,
    score: 0,
    hearts: 5,
    results: [],
    chipPicks: {}
  };
  setActiveMode("exam");
  stageEyebrow.textContent = "Timed-style mixed review";
  stageTitle.textContent = "A1/A2 exam mode";
  updateStats();
  renderQuestion();
}

function startMistakes() {
  setActiveMode("mistakes");
  stageEyebrow.textContent = "Mistake review";
  stageTitle.textContent = "Practice saved misses";
  if (!store.mistakes.length) {
    session = null;
    updateStats();
    app.innerHTML = `
      <div class="empty-state">
        <div>
          <h2>No mistakes saved</h2>
          <p>Missed questions will appear here automatically.</p>
          <button class="primary-button" type="button" id="backToPath">Back to path</button>
        </div>
      </div>
    `;
    document.querySelector("#backToPath").addEventListener("click", renderHome);
    return;
  }
  session = {
    mode: "mistakes",
    lesson: { id: "mistakes", title: "Mistake review", unit: "Review", level: "A1/A2" },
    questions: shuffle(store.mistakes).slice(0, 16),
    current: 0,
    score: 0,
    hearts: 5,
    results: [],
    chipPicks: {}
  };
  updateStats();
  renderQuestion();
}

function renderQuestion() {
  const question = session.questions[session.current];
  const result = session.results[session.current];
  const progress = Math.round((session.current / session.questions.length) * 100);
  app.innerHTML = `
    <article class="question-panel">
      <header class="lesson-header">
        <div>
          <span class="pill">${escapeHtml(session.lesson.unit)} · ${escapeHtml(session.lesson.level)}</span>
          <h2>${escapeHtml(session.lesson.title)}</h2>
        </div>
        <div class="progress-track" aria-label="Lesson progress">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </header>
      <div class="question-body">
        <p class="question-kicker">${escapeHtml(question.kind)}</p>
        <div class="prompt">${escapeHtml(question.prompt)}</div>
        ${question.hint ? `<p class="hint">${escapeHtml(question.hint)}</p>` : ""}
        ${renderQuestionControl(question, result)}
        ${renderFeedback(question, result)}
      </div>
    </article>
  `;
  bindQuestionControls(question, result);
  updateStats();
}

function renderQuestionControl(question, result) {
  if (question.type === "multiple" || question.type === "listen") {
    const listenButton = question.type === "listen" ? `<button class="speaker-button" type="button" id="speakButton" title="Play Italian audio">${speakerSvg()}</button>` : "";
    return `
      ${listenButton ? `<div class="action-row" style="margin-top: 0; margin-bottom: 16px;">${listenButton}</div>` : ""}
      <div class="option-grid">
        ${question.choices.map((choice, index) => {
          const selected = result && normalize(result.response) === normalize(choice);
          const correct = result && normalize(choice) === normalize(question.answer);
          const incorrect = selected && !result.correct;
          return `<button class="option-button ${selected ? "selected" : ""} ${correct ? "correct" : ""} ${incorrect ? "incorrect" : ""}" type="button" data-choice-index="${index}" ${result ? "disabled" : ""}>${escapeHtml(choice)}</button>`;
        }).join("")}
      </div>
    `;
  }

  if (question.type === "type") {
    return `
      <div class="type-row">
        <input class="answer-input" id="answerInput" type="text" autocomplete="off" ${result ? "disabled" : ""} value="${result ? escapeHtml(result.response) : ""}" />
        <button class="primary-button" type="button" id="checkButton" ${result ? "disabled" : ""}>Check</button>
      </div>
    `;
  }

  const picks = session.chipPicks[session.current] || [];
  return `
    <div class="chip-answer" aria-label="Built sentence">
      ${picks.length ? picks.map((chipIndex) => `<button class="chip-button" type="button" data-remove-chip="${chipIndex}" ${result ? "disabled" : ""}>${escapeHtml(question.chips[chipIndex])}</button>`).join("") : `<span class="hint">Tap words below</span>`}
    </div>
    <div class="chip-grid">
      ${question.chips.map((chip, index) => `<button class="chip-button ${picks.includes(index) ? "used" : ""}" type="button" data-chip-index="${index}" ${result ? "disabled" : ""}>${escapeHtml(chip)}</button>`).join("")}
    </div>
    <div class="action-row">
      <button class="primary-button" type="button" id="checkButton" ${result ? "disabled" : ""}>Check</button>
      <button class="ghost-button" type="button" id="clearChips" ${result ? "disabled" : ""}>Clear</button>
    </div>
  `;
}

function renderFeedback(question, result) {
  if (!result) {
    return `<div class="feedback" id="feedback"></div>`;
  }
  return `
    <div class="feedback show ${result.correct ? "good" : "bad"}">
      <strong>${result.correct ? "Correct" : "Correct answer"}: ${escapeHtml(question.answer)}</strong>
      ${question.explanation ? `<br>${escapeHtml(question.explanation)}` : ""}
      <div class="action-row">
        <button class="primary-button" type="button" id="nextButton">${session.current === session.questions.length - 1 ? "Finish" : "Continue"}</button>
      </div>
    </div>
  `;
}

function bindQuestionControls(question, result) {
  if (result) {
    document.querySelector("#nextButton").addEventListener("click", nextQuestion);
    return;
  }

  if (question.type === "multiple" || question.type === "listen") {
    document.querySelectorAll("[data-choice-index]").forEach((button) => {
      button.addEventListener("click", () => checkAnswer(question.choices[Number(button.dataset.choiceIndex)]));
    });
    const speakButton = document.querySelector("#speakButton");
    if (speakButton) {
      speakButton.addEventListener("click", () => speakItalian(question.listenText || question.answer));
    }
    return;
  }

  if (question.type === "type") {
    const input = document.querySelector("#answerInput");
    const checkButton = document.querySelector("#checkButton");
    input.focus();
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        checkAnswer(input.value);
      }
    });
    checkButton.addEventListener("click", () => checkAnswer(input.value));
    return;
  }

  document.querySelectorAll("[data-chip-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.chipIndex);
      const picks = session.chipPicks[session.current] || [];
      if (!picks.includes(index)) {
        session.chipPicks[session.current] = [...picks, index];
        renderQuestion();
      }
    });
  });
  document.querySelectorAll("[data-remove-chip]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeChip);
      session.chipPicks[session.current] = (session.chipPicks[session.current] || []).filter((item) => item !== index);
      renderQuestion();
    });
  });
  document.querySelector("#checkButton").addEventListener("click", () => {
    const picks = session.chipPicks[session.current] || [];
    checkAnswer(picks.map((index) => question.chips[index]).join(" "));
  });
  document.querySelector("#clearChips").addEventListener("click", () => {
    session.chipPicks[session.current] = [];
    renderQuestion();
  });
}

function checkAnswer(response) {
  const question = session.questions[session.current];
  const accepted = question.accepted || [question.answer];
  const correct = accepted.some((answer) => normalize(answer) === normalize(response));
  session.results[session.current] = { response, correct };
  if (correct) {
    session.score += 1;
    if (session.mode === "mistakes") {
      const key = questionKey(question);
      store.mistakes = store.mistakes.filter((item) => questionKey(item) !== key);
      saveStore();
    }
  } else {
    session.hearts = Math.max(0, session.hearts - 1);
    saveMistake(question);
  }
  renderQuestion();
}

function saveMistake(question) {
  const cleanQuestion = {
    type: question.type,
    kind: question.kind,
    prompt: question.prompt,
    answer: question.answer,
    accepted: question.accepted,
    choices: question.choices,
    chips: question.chips,
    hint: question.hint,
    explanation: question.explanation,
    listenText: question.listenText
  };
  const key = questionKey(cleanQuestion);
  store.mistakes = [cleanQuestion, ...store.mistakes.filter((item) => questionKey(item) !== key)].slice(0, 50);
  saveStore();
}

function nextQuestion() {
  if (session.current < session.questions.length - 1) {
    session.current += 1;
    renderQuestion();
    return;
  }
  finishSession();
}

function finishSession() {
  const accuracy = session.score / session.questions.length;
  const xpEarned = session.score * 8 + (accuracy >= 0.85 ? 20 : 0);
  store.xp += xpEarned;
  updateStreak();

  if (session.mode === "lesson") {
    store.completed[session.lesson.id] = Math.max(store.completed[session.lesson.id] || 0, accuracy);
  }
  if (session.mode === "exam") {
    store.examBest = Math.max(store.examBest || 0, accuracy);
  }
  saveStore();

  const title = session.mode === "exam" ? "Exam round complete" : session.mode === "mistakes" ? "Review complete" : "Lesson complete";
  app.innerHTML = `
    <section class="result-panel">
      <h2>${title}</h2>
      <p>${sessionSummaryLine(accuracy)}</p>
      <div class="result-score">
        <div><strong>${Math.round(accuracy * 100)}%</strong><span>accuracy</span></div>
        <div><strong>${session.score}/${session.questions.length}</strong><span>correct</span></div>
        <div><strong>${xpEarned}</strong><span>XP earned</span></div>
      </div>
      <div class="action-row">
        <button class="primary-button" type="button" id="continuePath">Back to path</button>
        <button class="ghost-button" type="button" id="repeatLesson">Repeat</button>
        <button class="ghost-button" type="button" id="reviewMistakes">Mistakes</button>
      </div>
    </section>
  `;
  document.querySelector("#continuePath").addEventListener("click", renderHome);
  document.querySelector("#repeatLesson").addEventListener("click", () => {
    if (session.mode === "exam") startExam();
    else if (session.mode === "mistakes") startMistakes();
    else startLesson(session.lesson.id);
  });
  document.querySelector("#reviewMistakes").addEventListener("click", startMistakes);
}

function sessionSummaryLine(accuracy) {
  if (accuracy >= 0.9) return "Strong round. This lesson is ready for exam-speed review.";
  if (accuracy >= 0.7) return "Good pass. Repeat the saved mistakes once to make it stick.";
  return "Useful diagnostic. The missed items are saved for focused review.";
}

function updateStreak() {
  const today = localDateKey(new Date());
  const yesterday = localDateKey(new Date(Date.now() - 86400000));
  if (store.lastStudy === today) return;
  store.streak = store.lastStudy === yesterday ? store.streak + 1 : 1;
  store.lastStudy = today;
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function speakerSvg() {
  const template = document.querySelector("#speakerIcon");
  return template ? template.innerHTML : "Play";
}

function speakItalian(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "it-IT";
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

document.querySelector("#pathMode").addEventListener("click", renderHome);
document.querySelector("#mistakesMode").addEventListener("click", startMistakes);
document.querySelector("#examMode").addEventListener("click", startExam);
document.querySelector("#resetButton").addEventListener("click", () => {
  if (!window.confirm("Reset all local progress for this practice app?")) return;
  store = { xp: 0, streak: 0, lastStudy: null, completed: {}, mistakes: [], examBest: 0 };
  saveStore();
  renderHome();
});

renderHome();
