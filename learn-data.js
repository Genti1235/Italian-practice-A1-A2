window.LEARN_CATEGORY_TREE = [
  { title: "Basic vocabulary", children: ["Cardinal numbers", "Colors", "Days, months and seasons", "Describing", "Greetings and introductions", "Ordinal numbers", "Time and parts of the day"] },
  { title: "Cities", children: ["Buildings", "Shopping", "Stores", "Streets", "Supermarket"] },
  { title: "Clothing, shoes and accessories", children: ["Accessories", "At the clothing store", "Clothing", "Shoes"] },
  { title: "Communication", children: ["Computers", "Internet", "Mail", "Telephone", "The media"] },
  { title: "Culture", children: ["Art", "Literature", "Music", "Shows and movies", "Stories and legends"] },
  { title: "Education", children: ["Classroom", "College and University", "Education system", "Languages", "Learning a language", "School"] },
  { title: "Food", children: ["Condiments", "Cooking", "Dishes", "Drinks", "Food", "Fruits and nuts", "Meat and Fish", "Sweets", "Vegetables and legumes"] },
  { title: "General Adjectives", children: ["Bodily Action Adjectives", "Distance, Location, Speed Adjectives", "Emotion Adjectives", "Human Character Adjectives", "Mental Sphere Adjectives", "Physical Impact Adjectives", "Size and Form Adjectives", "Subjective Characteristic Adjectives", "Temperature Adjectives", "Time and Age Adjectives"] },
  { title: "General Nouns", children: ["Bodily Action Nouns", "Emotion Nouns", "Human Character Nouns", "Human-only Behavior Nouns", "Life, Existence Nouns", "Measurement Nouns", "Mental Sphere Nouns", "Perception Nouns", "Phase Nouns", "Physical Impact Nouns", "Physical Parameter Nouns", "Speaking, Writing Nouns"] },
  { title: "General Verbs", children: ["Bodily Action Verbs", "Emotion Verbs", "Human-only Action Verbs", "Human-only Behavior Verbs", "Life, Existence Verbs", "Location Verbs", "Mental Sphere Verbs", "Motion Verbs", "Object, Animal Verbs", "Perception Verbs", "Phase Verbs", "Physical Impact Verbs", "Possession Verbs", "Speaking, Writing Verbs", "State Change Verbs"] },
  { title: "Geography", children: ["Continents and oceans", "Countries and regions: Africa", "Countries and regions: Asia", "Countries and regions: Europe", "Countries and regions: Oceania", "Countries and regions: the Americas"] },
  { title: "Health and hygiene", children: ["Grooming and makeup", "Health and illnesses", "Hospital and pharmacy", "In the hospital"] },
  { title: "Home", children: ["Bathroom", "Bedroom", "Chores", "Elements of a house", "Garden", "Home improvement and do it yourself", "House-hunting", "Kitchen", "Layout", "Living room"] },
  { title: "Human body", children: ["Body", "Head", "Physical appearance"] },
  { title: "Leisure and free time", children: ["At a party", "At a restaurant", "At a sporting event", "At the movies", "At the theater", "Celebrations", "Free time", "Games", "Sports"] },
  { title: "Nature", children: ["Camping", "Farm", "Flowers and plants", "Landforms", "Materials", "Natural disasters", "Orientation", "Trees", "Weather"] },
  { title: "People and daily life", children: ["Family", "Life stages", "Personal information", "Routines", "Types of relationships"] },
  { title: "Science", children: ["Energy", "Research", "Space"] },
  { title: "Society", children: ["Economy and finance", "Government and administration", "Politics and elections", "Social issues"] },
  { title: "Travel", children: ["At sea", "At the airport", "At the station", "Lodging", "Modes of transportation", "On the road", "Parts of a car", "Trips"] },
  { title: "Work", children: ["At work", "Business", "Career", "Professions"] }
];

window.LEARN_GRAMMAR_SECTIONS = [
  {
    id: "articles",
    title: "Articles",
    summary: "Italian articles change for gender, number, and the first sound of the noun.",
    rules: [
      "Use il with most masculine singular nouns: il libro.",
      "Use lo before z, gn, ps, x, y, and s + consonant: lo studente, lo zaino.",
      "Use la with feminine singular nouns before consonants: la casa.",
      "Use l’ before a vowel: l’amico, l’università.",
      "Plural forms are i, gli, and le: i libri, gli studenti, le case."
    ],
    examples: ["il libro → i libri", "lo studente → gli studenti", "la casa → le case", "l’amica → le amiche"]
  },
  {
    id: "gender-plural",
    title: "Gender and Plurals",
    summary: "Most nouns ending in -o are masculine, most ending in -a are feminine, and nouns ending in -e can be either.",
    rules: [
      "Masculine -o usually becomes -i: libro → libri.",
      "Feminine -a usually becomes -e: casa → case.",
      "Nouns ending in -e usually become -i: studente → studenti.",
      "Some nouns are invariable, especially accented nouns: città → città, università → università.",
      "Spelling changes keep hard sounds: amica → amiche, albergo → alberghi."
    ],
    examples: ["il libro → i libri", "la penna → le penne", "lo studente → gli studenti", "la città → le città"]
  },
  {
    id: "adjectives",
    title: "Adjective Agreement",
    summary: "Adjectives agree with the noun they describe in gender and number.",
    rules: [
      "-o adjectives have four forms: nuovo, nuova, nuovi, nuove.",
      "-e adjectives usually have two forms: interessante, interessanti.",
      "The adjective normally follows the noun at A1/A2 level: una casa grande.",
      "Nationalities behave like adjectives: italiano, italiana, italiani, italiane."
    ],
    examples: ["La casa è bella.", "I libri sono nuovi.", "Le penne sono rosse.", "Anna è albanese."]
  },
  {
    id: "present-tense",
    title: "Present Tense",
    summary: "The present tense changes with the subject: io, tu, lui/lei, noi, voi, loro.",
    rules: [
      "Regular -are verbs: parlo, parli, parla, parliamo, parlate, parlano.",
      "Regular -ere verbs: prendo, prendi, prende, prendiamo, prendete, prendono.",
      "Regular -ire verbs: dormo, dormi, dorme, dormiamo, dormite, dormono.",
      "Some -ire verbs add -isc-: capisco, capisci, capisce, capiamo, capite, capiscono."
    ],
    examples: ["Io studio italiano.", "Tu prendi un caffè.", "Noi dormiamo.", "Loro capiscono."]
  },
  {
    id: "irregular-verbs",
    title: "Irregular Verbs",
    summary: "The most important A1/A2 irregular verbs must be memorized because they do not follow the regular pattern.",
    rules: [
      "Essere: sono, sei, è, siamo, siete, sono.",
      "Avere: ho, hai, ha, abbiamo, avete, hanno.",
      "Fare: faccio, fai, fa, facciamo, fate, fanno.",
      "Andare: vado, vai, va, andiamo, andate, vanno.",
      "Venire: vengo, vieni, viene, veniamo, venite, vengono."
    ],
    examples: ["Sono albanese.", "Ho venti anni.", "Vado all’università.", "Faccio colazione."]
  },
  {
    id: "modal-verbs",
    title: "Modal Verbs",
    summary: "Potere, volere, and dovere are followed by an infinitive verb.",
    rules: [
      "Potere means can / to be able: posso parlare italiano.",
      "Volere means to want: voglio studiare.",
      "Dovere means must / to have to: devo andare.",
      "The second verb stays in the infinitive: posso parlare, not posso parlo."
    ],
    examples: ["Posso entrare?", "Voglio un caffè.", "Dobbiamo studiare.", "Devi pagare alla cassa."]
  },
  {
    id: "reflexive-verbs",
    title: "Reflexive Verbs",
    summary: "Reflexive verbs use mi, ti, si, ci, vi, si before the conjugated verb.",
    rules: [
      "Svegliarsi: mi sveglio, ti svegli, si sveglia, ci svegliamo, vi svegliate, si svegliano.",
      "Use reflexive verbs for daily routine: mi alzo, mi vesto, mi lavo.",
      "In passato prossimo, reflexive verbs usually use essere: mi sono svegliato/a."
    ],
    examples: ["Mi sveglio alle sette.", "Ti alzi presto?", "Ci vestiamo.", "Mi sono svegliato presto."]
  },
  {
    id: "prepositions",
    title: "Prepositions",
    summary: "Small prepositions are frequent in exam answers and often combine with articles.",
    rules: [
      "Use a with cities: abito a Podgorica.",
      "Use in with countries and many places: studio in Italia.",
      "Use di for origin: sono di Tirana.",
      "A + il = al, a + la = alla, a + l’ = all’. Use all’università.",
      "Di + la = della, da + il = dal, in + il = nel."
    ],
    examples: ["Vado al bar.", "Studio all’università.", "Vado alla stazione.", "La chiave della camera."]
  },
  {
    id: "passato-prossimo",
    title: "Passato Prossimo",
    summary: "Passato prossimo uses an auxiliary verb, avere or essere, plus a past participle.",
    rules: [
      "Most verbs use avere: ho studiato, ho mangiato, ho dormito.",
      "Many movement and change-of-state verbs use essere: sono andato/a, sono uscito/a.",
      "With essere, the participle agrees with the subject: Anna è andata, Marco e Luca sono usciti.",
      "With avere, the participle usually does not change at A1/A2 level: ho mangiato una pizza."
    ],
    examples: ["Ho studiato italiano.", "Sono andato a Roma.", "Sono andata a Roma.", "Abbiamo mangiato una pizza."]
  },
  {
    id: "questions",
    title: "Questions",
    summary: "Italian question words are essential for oral and written exam tasks.",
    rules: [
      "Chi means who: Chi è?",
      "Che cosa / cosa means what: Che cosa fai?",
      "Dove means where: Dove abiti?",
      "Di dove means from where: Di dove sei?",
      "Quanto means how much or how many: Quanto costa? Quanti anni hai?"
    ],
    examples: ["Come ti chiami?", "Di dove sei?", "Quanto costa?", "A che ora parti?"]
  },
  {
    id: "exam-sentences",
    title: "Exam Sentence Patterns",
    summary: "These sentence patterns are useful for short A1/A2 written answers.",
    rules: [
      "Introduction: Mi chiamo ___. Sono di ___. Ho ___ anni.",
      "University: Studio italiano all’università.",
      "Routine: Di solito mi sveglio alle sette e faccio colazione.",
      "Past: Ieri ho studiato italiano e sono uscito/a con amici.",
      "Opinion: Secondo me l’italiano è interessante, ma la grammatica è difficile."
    ],
    examples: ["Mi chiamo Gent.", "Sono albanese.", "Ho venti anni.", "Ieri sono andato al centro."]
  }
];

window.LEARN_PHRASEBOOK = [
  { topic: "Introductions", phrases: ["Ciao, mi chiamo Gent.", "Sono albanese.", "Sono di Podgorica.", "Ho venti anni.", "Studio italiano all’università."] },
  { topic: "University", phrases: ["Studio italiano all’università.", "Ho lezione oggi.", "Il professore è simpatico.", "L’esame è difficile."] },
  { topic: "Bar and restaurant", phrases: ["Vorrei un caffè, per favore.", "Il conto, per favore.", "Quanto costa?", "Prendo una pizza e un’acqua."] },
  { topic: "Directions", phrases: ["Scusi, dov’è la stazione?", "Vada dritto.", "Giri a destra.", "La stazione è vicino al centro."] },
  { topic: "Hotel and house", phrases: ["Ho una prenotazione.", "Vorrei una camera singola.", "La mia casa ha due camere.", "La cucina è piccola ma bella."] },
  { topic: "Daily routine", phrases: ["Mi sveglio alle sette.", "Faccio colazione.", "Vado all’università.", "La sera vado a letto alle undici."] },
  { topic: "Family", phrases: ["La mia famiglia è piccola.", "Mia madre si chiama Ana.", "Ho un fratello e una sorella.", "Mio padre lavora."] },
  { topic: "Shopping and travel", phrases: ["Quanto costa questa camicia?", "Posso provarla?", "Vorrei un biglietto per Roma.", "Il treno parte alle nove."] },
  { topic: "Past weekend", phrases: ["Ieri ho studiato italiano.", "Sabato sono uscito con amici.", "Ho mangiato una pizza.", "Sono andato al centro."] }
];
