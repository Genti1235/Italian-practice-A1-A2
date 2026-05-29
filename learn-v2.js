(() => {
  const grammarSections = window.LEARN_GRAMMAR_SECTIONS || [];
  const phrasebook = window.LEARN_PHRASEBOOK || [];
  const pronouns = ["io", "tu", "lui / lei", "noi", "voi", "loro"];
  const verbKeys = ["io", "tu", "lui", "noi", "voi", "loro"];

  let currentView = "home";
  let selectedFolder = null;
  let selectedEntryId = null;
  let selectedVerbId = "dormire";
  let selectedTense = "presente";
  let searchTerm = "";
  let entryCache = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘`´]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function slug(value) {
    return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function articleOf(italian) {
    const match = String(italian).match(/^(l’|l'|un’|un'|il|lo|la|i|gli|le|un|uno|una)\s*/i);
    return match ? match[1].replace("'", "’") : "";
  }

  function withoutArticle(italian) {
    return String(italian).replace(/^(l’|l'|un’|un'|il|lo|la|i|gli|le|un|uno|una)\s*/i, "").trim();
  }

  function genderFrom(article, plural) {
    const cleanArticle = normalize(article);
    const cleanPlural = normalize(plural);
    if (["il", "lo", "un", "uno", "i", "gli"].includes(cleanArticle)) return "masculine";
    if (["la", "una", "le", "un'"].includes(cleanArticle)) return "feminine";
    if (cleanPlural.startsWith("le ")) return "feminine";
    if (cleanPlural.startsWith("gli ") || cleanPlural.startsWith("i ")) return "masculine";
    return "check article";
  }

  function categoryTree() {
    const source = window.LEARN_CATEGORY_TREE || [];
    return source.map((section) => {
      if (section.title !== "Basic vocabulary") return section;
      return {
        ...section,
        children: unique([
          "Pronouns",
          "Question words",
          "Prepositions",
          "Connectors and adverbs",
          "Fixed expressions",
          "Cardinal numbers",
          "Colors",
          "Days, months and seasons",
          "Time and parts of the day",
          "Greetings and introductions",
          "Describing",
          "Other basic words",
          ...section.children
        ])
      };
    });
  }

  function unique(items) {
    return [...new Set(items.filter(Boolean))];
  }

  function buildLearnEntries() {
    if (entryCache) return entryCache;
    const entries = [];
    const seen = new Set();

    function add(entry) {
      const key = normalize(`${entry.kind}|${entry.it}|${entry.en}`);
      if (seen.has(key)) return;
      seen.add(key);
      const classified = classifyEntry(entry);
      entries.push({ ...entry, ...classified, id: entry.id || slug(`${entry.kind}-${entry.it}-${entry.en}`) });
    }

    if (typeof VOCAB_TOPICS !== "undefined") {
      VOCAB_TOPICS.forEach((topic) => {
        topic.terms.forEach((term) => {
          const article = articleOf(term.it);
          add({
            it: term.it,
            en: term.en,
            group: topic.title,
            topic: topic.id,
            kind: article ? "noun" : "word",
            article,
            base: article ? withoutArticle(term.it) : term.it,
            plural: term.plural,
            gender: article ? genderFrom(article, term.plural) : "",
            notes: term.plural === "-" ? "This word is used without a regular plural in your exam list." : ""
          });
        });
      });
    }

    if (typeof ADJECTIVES !== "undefined") {
      ADJECTIVES.forEach((adj) => {
        add({
          it: adj.ms,
          en: adj.en,
          group: "Adjectives",
          kind: "adjective",
          forms: [
            ["masculine singular", adj.ms],
            ["feminine singular", adj.fs],
            ["masculine plural", adj.mp],
            ["feminine plural", adj.fp]
          ],
          notes: adj.ms === adj.fs ? "This adjective has the same singular form for masculine and feminine." : "Adjectives agree with the noun they describe."
        });
      });
    }

    if (typeof VOCAB_EXTRAS !== "undefined") {
      const extraAdjectives = new Map();
      VOCAB_EXTRAS.filter((item) => item.kind === "Adjectives").forEach((item) => {
        const key = normalize(item.en);
        if (!extraAdjectives.has(key)) extraAdjectives.set(key, { en: item.en, forms: [] });
        extraAdjectives.get(key).forms.push(item.it);
      });
      extraAdjectives.forEach((family) => {
        add({
          it: family.forms[0],
          en: family.en,
          group: "Adjectives",
          kind: "adjective",
          forms: inferAdjectiveForms(family.forms),
          notes: "Extra adjective from your exam vocabulary list."
        });
      });
    }

    if (typeof VERBS !== "undefined") {
      VERBS.forEach((verb) => {
        add({
          it: verb.inf,
          en: verb.en,
          group: "Verbs",
          kind: "verb",
          verb,
          notes: `${verb.inf} uses ${verb.aux} in passato prossimo.`
        });
      });
    }

    if (typeof VOCAB_EXTRAS !== "undefined") {
      VOCAB_EXTRAS.filter((item) => item.kind === "Verbs").forEach((item) => {
        add({ it: item.it, en: item.en, group: "Verbs", kind: "verb", notes: "Extra verb from your exam vocabulary list." });
      });
    }

    addFunctionWords(add);
    entryCache = entries.sort((a, b) => a.it.localeCompare(b.it, "it"));
    return entryCache;
  }

  function addFunctionWords(add) {
    if (typeof buildVocabItems !== "function") return;
    const groupKinds = {
      Pronouns: "pronoun",
      "Question words": "question word",
      "Connectors and adverbs": "connector/adverb",
      Prepositions: "preposition"
    };
    buildVocabItems().forEach((item) => {
      const kind = groupKinds[item.group];
      if (!kind) return;
      add({
        it: item.it,
        en: item.en,
        group: item.group,
        kind,
        base: withoutArticle(item.it),
        notes: functionWordNote(kind)
      });
    });
  }

  function functionWordNote(kind) {
    if (kind === "pronoun") return "Pronouns replace people or things in a sentence.";
    if (kind === "question word") return "Question words help you form exam questions and answers.";
    if (kind === "preposition") return "Prepositions are small words that connect places, people, time, and direction.";
    return "Connectors and adverbs help join ideas and make short exam answers sound natural.";
  }

  function inferAdjectiveForms(forms) {
    const uniqueForms = unique(forms);
    const labels = ["form 1", "form 2", "form 3", "form 4"];
    if (uniqueForms.length === 4) {
      labels[0] = "masculine singular";
      labels[1] = "feminine singular";
      labels[2] = "masculine plural";
      labels[3] = "feminine plural";
    } else if (uniqueForms.length === 2) {
      labels[0] = "singular";
      labels[1] = "plural";
    }
    return uniqueForms.map((form, index) => [labels[index], form]);
  }

  function classifyEntry(entry) {
    const hay = normalize(`${entry.it} ${entry.en} ${entry.group} ${entry.kind} ${entry.topic || ""}`);
    const topic = entry.topic || "";

    if (entry.kind === "verb") return classifyVerb(entry, hay);
    if (entry.kind === "adjective") return classifyAdjective(entry, hay);
    if (entry.kind === "pronoun") return folder("Basic vocabulary", "Pronouns");
    if (entry.kind === "question word") return folder("Basic vocabulary", "Question words");
    if (entry.kind === "preposition") return folder("Basic vocabulary", "Prepositions");
    if (entry.kind === "connector/adverb") return folder("Basic vocabulary", "Connectors and adverbs");

    if (topic === "personal") {
      if (hay.includes("universit") || hay.includes("course") || hay.includes("student") || hay.includes("professor") || hay.includes("exam") || hay.includes("language") || hay.includes("class")) return folder("Education", "College and University");
      return folder("People and daily life", "Personal information");
    }
    if (topic === "classroom") return folder("Education", "Classroom");
    if (topic === "time") {
      if (hay.includes("day") || hay.includes("week") || hay.includes("month") || hay.includes("year")) return folder("Basic vocabulary", "Days, months and seasons");
      return folder("Basic vocabulary", "Time and parts of the day");
    }
    if (topic === "food") return classifyFood(hay);
    if (topic === "travel") return classifyTravel(hay);
    if (topic === "home") return classifyHome(hay);
    if (topic === "routine") return classifyRoutine(hay);
    if (topic === "weather") return folder("Nature", "Weather");
    if (topic === "family") return folder("People and daily life", "Family");
    if (topic === "shopping") return classifyShopping(hay);

    return folder("Basic vocabulary", "Other basic words");
  }

  function folder(major, minor) {
    return { major, minor };
  }

  function classifyFood(hay) {
    if (hay.includes("coffee") || hay.includes("water") || hay.includes("tea") || hay.includes("milk") || hay.includes("beer") || hay.includes("wine")) return folder("Food", "Drinks");
    if (hay.includes("pizza") || hay.includes("pasta") || hay.includes("sandwich") || hay.includes("croissant") || hay.includes("ice cream")) return folder("Food", "Dishes");
    if (hay.includes("sugar") || hay.includes("salt")) return folder("Food", "Condiments");
    if (hay.includes("bar") || hay.includes("restaurant") || hay.includes("menu") || hay.includes("bill") || hay.includes("price") || hay.includes("euro")) return folder("Leisure and free time", "At a restaurant");
    return folder("Food", "Food");
  }

  function classifyTravel(hay) {
    if (hay.includes("station") || hay.includes("ticket") || hay.includes("platform") || hay.includes("stop")) return folder("Travel", "At the station");
    if (hay.includes("train") || hay.includes("bus") || hay.includes("taxi") || hay.includes("bicycle")) return folder("Travel", "Modes of transportation");
    if (hay.includes("airport") || hay.includes("passport") || hay.includes("suitcase")) return folder("Travel", "At the airport");
    if (hay.includes("street") || hay.includes("road") || hay.includes("square") || hay.includes("center") || hay.includes("right") || hay.includes("left")) return folder("Cities", "Streets");
    return folder("Travel", "Trips");
  }

  function classifyHome(hay) {
    if (hay.includes("hotel") || hay.includes("reservation") || hay.includes("single room") || hay.includes("double room")) return folder("Travel", "Lodging");
    if (hay.includes("bathroom")) return folder("Home", "Bathroom");
    if (hay.includes("bed") || hay.includes("room")) return folder("Home", "Bedroom");
    if (hay.includes("kitchen")) return folder("Home", "Kitchen");
    if (hay.includes("living")) return folder("Home", "Living room");
    if (hay.includes("garden")) return folder("Home", "Garden");
    return folder("Home", "Elements of a house");
  }

  function classifyRoutine(hay) {
    if (hay.includes("sport")) return folder("Leisure and free time", "Sports");
    if (hay.includes("cinema") || hay.includes("film")) return folder("Leisure and free time", "At the movies");
    if (hay.includes("music") || hay.includes("party") || hay.includes("park") || hay.includes("free time")) return folder("Leisure and free time", "Free time");
    return folder("People and daily life", "Routines");
  }

  function classifyShopping(hay) {
    if (hay.includes("shoe")) return folder("Clothing, shoes and accessories", "Shoes");
    if (hay.includes("shop") || hay.includes("assistant") || hay.includes("cash") || hay.includes("discount") || hay.includes("size")) return folder("Clothing, shoes and accessories", "At the clothing store");
    return folder("Clothing, shoes and accessories", "Clothing");
  }

  function classifyAdjective(entry, hay) {
    if (hay.includes("hot") || hay.includes("warm") || hay.includes("cold")) return folder("General Adjectives", "Temperature Adjectives");
    if (hay.includes("happy") || hay.includes("sad")) return folder("General Adjectives", "Emotion Adjectives");
    if (hay.includes("tired")) return folder("General Adjectives", "Physical Impact Adjectives");
    if (hay.includes("big") || hay.includes("small") || hay.includes("tall") || hay.includes("short") || hay.includes("high") || hay.includes("low")) return folder("General Adjectives", "Size and Form Adjectives");
    if (hay.includes("italian") || hay.includes("albanian") || hay.includes("montenegrin") || hay.includes("german") || hay.includes("english") || hay.includes("french") || hay.includes("spanish")) return folder("Geography", "Countries and regions: Europe");
    if (hay.includes("young") || hay.includes("old")) return folder("General Adjectives", "Time and Age Adjectives");
    if (hay.includes("intelligent") || hay.includes("nice") || hay.includes("unpleasant")) return folder("General Adjectives", "Human Character Adjectives");
    return folder("General Adjectives", "Subjective Characteristic Adjectives");
  }

  function classifyVerb(entry, hay) {
    if (hay.includes("go") || hay.includes("come") || hay.includes("arrive") || hay.includes("leave") || hay.includes("return") || hay.includes("go out")) return folder("General Verbs", "Motion Verbs");
    if (hay.includes("sleep") || hay.includes("wake") || hay.includes("wash") || hay.includes("dress") || hay.includes("eat") || hay.includes("drink")) return folder("General Verbs", "Bodily Action Verbs");
    if (hay.includes("speak") || hay.includes("write") || hay.includes("read") || hay.includes("called")) return folder("General Verbs", "Speaking, Writing Verbs");
    if (hay.includes("study") || hay.includes("understand") || hay.includes("prefer") || hay.includes("like")) return folder("General Verbs", "Mental Sphere Verbs");
    if (hay.includes("have") || hay.includes("possess")) return folder("General Verbs", "Possession Verbs");
    if (hay.includes("live") || hay.includes("stay") || hay.includes("be")) return folder("General Verbs", "Life, Existence Verbs");
    if (hay.includes("buy") || hay.includes("pay") || hay.includes("book") || hay.includes("cost") || hay.includes("order") || hay.includes("serve")) return folder("General Verbs", "Object, Animal Verbs");
    if (hay.includes("finish")) return folder("General Verbs", "Phase Verbs");
    return folder("General Verbs", "Human-only Action Verbs");
  }

  function ensureLearnButton() {
    const nav = document.querySelector(".mode-nav");
    if (!nav) return;
    const existing = document.querySelector("#learnMode");
    const button = existing ? existing.cloneNode(true) : document.createElement("button");
    button.className = "mode-button";
    button.id = "learnMode";
    button.type = "button";
    button.innerHTML = `<span aria-hidden="true">L</span>Learn`;
    button.addEventListener("click", () => renderLearn("home"));

    if (existing) {
      existing.replaceWith(button);
      return;
    }

    const anchor = document.querySelector("#vocabMode") || document.querySelector("#pathMode");
    if (anchor) anchor.insertAdjacentElement("afterend", button);
    else nav.append(button);
  }

  function setLearnActive() {
    document.querySelectorAll(".mode-button").forEach((button) => button.classList.remove("active"));
    document.querySelector("#learnMode")?.classList.add("active");
  }

  function renderLearn(view = currentView) {
    currentView = view;
    setLearnActive();
    document.querySelector("#stageEyebrow").textContent = "Reference library";
    document.querySelector("#stageTitle").textContent = "Learn Italian A1/A2";

    document.querySelector("#app").innerHTML = `
      <section class="learn-shell">
        <header class="learn-hero">
          <div>
            <p class="question-kicker">Text-based learning</p>
            <h2>Grammar and vocabulary reference</h2>
            <p>Read rules, browse your exam words by Wlingua-style categories, and open verb tables without audio or speaking tools.</p>
          </div>
          <div class="learn-stats">
            <span><strong>${buildLearnEntries().length}</strong> word cards</span>
            <span><strong>${grammarSections.length}</strong> rule pages</span>
            <span><strong>${verbEntries().length}</strong> verbs</span>
          </div>
        </header>
        <nav class="learn-tabs" aria-label="Learning sections">
          ${learnTab("home", "Overview")}
          ${learnTab("vocabulary", "Vocabulary")}
          ${learnTab("grammar", "Grammar")}
          ${learnTab("verbs", "Verb Tables")}
          ${learnTab("phrases", "Phrasebook")}
        </nav>
        <div class="learn-body">${renderLearnBody()}</div>
      </section>
    `;

    bindLearnBody();
    if (currentView === "vocabulary") {
      document.querySelector("#top")?.scrollIntoView({ block: "start" });
    }
  }

  function learnTab(view, label) {
    return `<button class="learn-tab ${currentView === view ? "active-choice" : ""}" type="button" data-learn-view="${view}">${label}</button>`;
  }

  function renderLearnBody() {
    if (currentView === "vocabulary") return renderVocabularyLibrary();
    if (currentView === "grammar") return renderGrammarRules();
    if (currentView === "verbs") return renderVerbTables();
    if (currentView === "phrases") return renderPhrasebook();
    return renderLearnOverview();
  }

  function renderLearnOverview() {
    const cards = [
      ["vocabulary", "Vocabulary Library", "Browse your exam words by topic and open article, plural, adjective, and verb details."],
      ["grammar", "Grammar Rules", "Read the A1/A2 rules from your learning plan: articles, plurals, agreement, verbs, and passato prossimo."],
      ["verbs", "Verb Tables", "Open Wlingua-style verb cards with presente, passato prossimo, and futuro forms."],
      ["phrases", "Exam Phrasebook", "Review short written-answer patterns for introductions, university, travel, food, shopping, and past weekend."]
    ];
    return `<div class="learn-overview-grid">
      ${cards.map(([view, title, copy]) => `<button class="learn-overview-card" type="button" data-learn-view="${view}"><strong>${title}</strong><span>${copy}</span></button>`).join("")}
    </div>`;
  }

  function renderVocabularyLibrary() {
    const entries = filteredEntries();
    const grouped = groupEntries(entries);
    if (selectedFolder || searchTerm) return renderVocabularyCategoryPage(entries);

    return `
      <div class="learn-category-index">
        <label class="learn-search-label" for="learnSearch">Search</label>
        <input id="learnSearch" class="learn-search" type="search" value="${escapeHtml(searchTerm)}" placeholder="Search words or meanings" />
        <div class="learn-folder-scroll learn-folder-index">
          ${grouped.map((section) => renderFolderSection(section)).join("")}
        </div>
      </div>
    `;
  }

  function renderVocabularyCategoryPage(entries) {
    const folderEntries = selectedFolder ? entries.filter((entry) => `${entry.major}|${entry.minor}` === selectedFolder) : entries;
    const title = selectedFolder ? selectedFolder.split("|")[1] : "Search results";
    const selectedEntry = folderEntries.find((entry) => entry.id === selectedEntryId) || folderEntries[0];

    return `
      <div class="learn-category-page">
        <div class="learn-category-toolbar">
          <button class="ghost-button" type="button" id="backToLearnCategories">Back</button>
          <div>
            <p class="question-kicker">Vocabulary category</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${folderEntries.length} word card${folderEntries.length === 1 ? "" : "s"}</p>
          </div>
        </div>
        <section class="learn-word-panel">
          <div class="learn-word-list">
            ${folderEntries.map((entry) => `<button class="learn-word-row ${selectedEntry?.id === entry.id ? "selected" : ""}" type="button" data-entry-id="${entry.id}"><span>${escapeHtml(entry.it)}</span><small>${escapeHtml(entry.en)}</small></button>`).join("")}
          </div>
          ${selectedEntry ? renderWordDetail(selectedEntry) : `<div class="learn-empty">No matching words yet.</div>`}
        </section>
      </div>
    `;
  }

  function filteredEntries() {
    const all = buildLearnEntries();
    const needle = normalize(searchTerm);
    if (!needle) return all;
    return all.filter((entry) => normalize(`${entry.it} ${entry.en} ${entry.group} ${entry.major} ${entry.minor}`).includes(needle));
  }

  function groupEntries(entries) {
    const byFolder = new Map();
    entries.forEach((entry) => {
      const key = `${entry.major}|${entry.minor}`;
      if (!byFolder.has(key)) byFolder.set(key, []);
      byFolder.get(key).push(entry);
    });

    return categoryTree().map((section) => {
      const children = section.children.map((child) => {
        const key = `${section.title}|${child}`;
        return { title: child, key, count: byFolder.get(key)?.length || 0 };
      }).filter((child) => child.count > 0);
      return { title: section.title, children };
    }).filter((section) => section.children.length);
  }

  function renderFolderSection(section) {
    return `<section class="learn-folder-section">
      <h3>${escapeHtml(section.title)}</h3>
      ${section.children.map((child) => `<button class="learn-folder-row ${selectedFolder === child.key ? "selected" : ""}" type="button" data-folder="${escapeHtml(child.key)}"><span>${escapeHtml(child.title)}</span><strong>${child.count}</strong></button>`).join("")}
    </section>`;
  }

  function renderWordDetail(entry) {
    if (entry.kind === "verb") return renderVerbCard(entry.verb || verbFromEntry(entry), entry.en, true);
    if (entry.kind === "adjective") return renderAdjectiveCard(entry);
    if (entry.kind === "noun") return renderNounCard(entry);
    return renderPlainWordCard(entry);
  }

  function renderNounCard(entry) {
    return `<article class="learn-detail-card">
      <p class="question-kicker">${escapeHtml(entry.major)} · ${escapeHtml(entry.minor)}</p>
      <h3>${escapeHtml(entry.it)}</h3>
      <p class="learn-translation">${escapeHtml(entry.en)}</p>
      <table class="learn-form-table"><tbody>
        <tr><th>Article</th><td>${escapeHtml(entry.article || "-")}</td></tr>
        <tr><th>Gender</th><td>${escapeHtml(entry.gender || "-")}</td></tr>
        <tr><th>Singular</th><td>${escapeHtml(entry.it)}</td></tr>
        <tr><th>Plural</th><td>${escapeHtml(entry.plural || "-")}</td></tr>
      </tbody></table>
      <p class="learn-note">${escapeHtml(entry.notes || nounRule(entry))}</p>
    </article>`;
  }

  function nounRule(entry) {
    if (!entry.plural || entry.plural === "-") return "This entry does not have a regular plural form in your exam vocabulary list.";
    if (entry.base?.endsWith("o")) return "Masculine nouns ending in -o usually become -i in the plural.";
    if (entry.base?.endsWith("a")) return "Feminine nouns ending in -a usually become -e in the plural, with spelling changes when needed.";
    return "Learn the noun together with its article and plural form.";
  }

  function renderAdjectiveCard(entry) {
    const forms = entry.forms || [["known form", entry.it]];
    return `<article class="learn-detail-card">
      <p class="question-kicker">${escapeHtml(entry.major)} · ${escapeHtml(entry.minor)}</p>
      <h3>${escapeHtml(entry.it)}</h3>
      <p class="learn-translation">${escapeHtml(entry.en)}</p>
      <table class="learn-form-table"><tbody>
        ${forms.map(([label, form]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(form)}</td></tr>`).join("")}
      </tbody></table>
      <p class="learn-note">${escapeHtml(entry.notes || "Adjectives agree with the noun in gender and number.")}</p>
    </article>`;
  }

  function renderPlainWordCard(entry) {
    return `<article class="learn-detail-card">
      <p class="question-kicker">${escapeHtml(entry.major)} · ${escapeHtml(entry.minor)}</p>
      <h3>${escapeHtml(entry.it)}</h3>
      <p class="learn-translation">${escapeHtml(entry.en)}</p>
      <p class="learn-note">${escapeHtml(entry.notes || "Learn this form as a fixed exam word or phrase.")}</p>
    </article>`;
  }

  function renderGrammarRules() {
    return `<div class="learn-rule-grid">
      ${grammarSections.map((section) => `<article class="learn-rule-card">
        <h3>${escapeHtml(section.title)}</h3>
        <p>${escapeHtml(section.summary)}</p>
        <ul>${section.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
        <div class="learn-example-row">${section.examples.map((example) => `<span>${escapeHtml(example)}</span>`).join("")}</div>
      </article>`).join("")}
    </div>`;
  }

  function verbEntries() {
    return typeof VERBS !== "undefined" ? VERBS : [];
  }

  function renderVerbTables() {
    const verbs = verbEntries();
    const selected = verbs.find((verb) => verb.inf === selectedVerbId) || verbs.find((verb) => verb.inf === "dormire") || verbs[0];
    selectedVerbId = selected?.inf || selectedVerbId;
    return `<div class="learn-verb-layout">
      <aside class="learn-verb-list">
        ${verbs.map((verb) => `<button class="learn-word-row ${selected?.inf === verb.inf ? "selected" : ""}" type="button" data-verb-id="${escapeHtml(verb.inf)}"><span>${escapeHtml(verb.inf)}</span><small>${escapeHtml(verb.en)}</small></button>`).join("")}
      </aside>
      ${selected ? renderVerbCard(selected, selected.en, false) : ""}
    </div>`;
  }

  function verbFromEntry(entry) {
    return typeof VERBS !== "undefined" ? VERBS.find((verb) => verb.inf === entry.it) : null;
  }

  function renderVerbCard(verb, fallbackMeaning = "", compact = false) {
    if (!verb) {
      return `<article class="learn-detail-card"><h3>${escapeHtml(fallbackMeaning)}</h3><p class="learn-note">This verb is in your vocabulary list. Add a full table later if you want deeper conjugation practice.</p></article>`;
    }
    const rows = tenseRows(verb, selectedTense);
    return `<article class="learn-detail-card learn-verb-card ${compact ? "compact" : ""}">
      <div class="learn-word-hero">
        <div class="learn-word-art" aria-hidden="true">${escapeHtml(verb.inf.slice(0, 2).toUpperCase())}</div>
        <div>
          <h3>${escapeHtml(verb.inf)}</h3>
          <p class="learn-translation">${escapeHtml(verb.en)}</p>
        </div>
      </div>
      <label class="learn-select-label" for="learnTense">Tense</label>
      <select id="learnTense" class="learn-tense-select">
        ${["presente", "passato prossimo", "futuro"].map((tense) => `<option value="${tense}" ${selectedTense === tense ? "selected" : ""}>${tense[0].toUpperCase()}${tense.slice(1)}</option>`).join("")}
      </select>
      <table class="learn-conjugation-table"><tbody>
        ${rows.map(([pronoun, form]) => `<tr><th>${escapeHtml(pronoun)}</th><td>${highlightEnding(form)}</td></tr>`).join("")}
      </tbody></table>
      <p class="learn-note">${escapeHtml(verb.inf)} uses ${escapeHtml(verb.aux)} in passato prossimo: ${escapeHtml(passatoExample(verb))}.</p>
    </article>`;
  }

  function tenseRows(verb, tense) {
    if (tense === "passato prossimo") return passatoRows(verb);
    if (tense === "futuro") return futureRows(verb);
    return verbKeys.map((key, index) => [pronouns[index], verb[key]]);
  }

  function passatoRows(verb) {
    const auxForms = verb.aux === "essere"
      ? ["sono", "sei", "è", "siamo", "siete", "sono"]
      : ["ho", "hai", "ha", "abbiamo", "avete", "hanno"];
    return pronouns.map((pronoun, index) => [pronoun, `${auxForms[index]} ${participleFor(verb, index)}`]);
  }

  function participleFor(verb, index) {
    if (!String(verb.pp).includes("/a")) return verb.pp;
    const base = verb.pp.replace("/a", "");
    if (index <= 2) return `${base}/a`;
    return `${base}i/e`;
  }

  function passatoExample(verb) {
    const aux = verb.aux === "essere" ? "sono" : "ho";
    return `${aux} ${participleFor(verb, 0)}`;
  }

  function futureRows(verb) {
    const manual = {
      essere: ["sarò", "sarai", "sarà", "saremo", "sarete", "saranno"],
      avere: ["avrò", "avrai", "avrà", "avremo", "avrete", "avranno"],
      andare: ["andrò", "andrai", "andrà", "andremo", "andrete", "andranno"],
      fare: ["farò", "farai", "farà", "faremo", "farete", "faranno"],
      stare: ["starò", "starai", "starà", "staremo", "starete", "staranno"],
      venire: ["verrò", "verrai", "verrà", "verremo", "verrete", "verranno"],
      potere: ["potrò", "potrai", "potrà", "potremo", "potrete", "potranno"],
      volere: ["vorrò", "vorrai", "vorrà", "vorremo", "vorrete", "vorranno"],
      dovere: ["dovrò", "dovrai", "dovrà", "dovremo", "dovrete", "dovranno"],
      bere: ["berrò", "berrai", "berrà", "berremo", "berrete", "berranno"]
    };
    const forms = manual[verb.inf] || regularFutureForms(verb.inf);
    return pronouns.map((pronoun, index) => [pronoun, forms[index]]);
  }

  function regularFutureForms(inf) {
    const endings = ["ò", "ai", "à", "emo", "ete", "anno"];
    let stem = inf;
    if (inf.endsWith("are")) stem = inf.slice(0, -3) + "er";
    else if (inf.endsWith("ere")) stem = inf.slice(0, -3) + "er";
    else if (inf.endsWith("ire")) stem = inf.slice(0, -3) + "ir";
    return endings.map((ending) => stem + ending);
  }

  function highlightEnding(form) {
    const text = escapeHtml(form);
    const match = text.match(/(.+?)([a-zàèéìòù]+(?:\/[ae])?)$/i);
    if (!match) return text;
    const endingLength = Math.min(match[2].length, text.includes(" ") ? 5 : 4);
    return `${text.slice(0, -endingLength)}<mark>${text.slice(-endingLength)}</mark>`;
  }

  function renderPhrasebook() {
    return `<div class="learn-phrasebook">
      ${phrasebook.map((section) => `<article class="learn-rule-card"><h3>${escapeHtml(section.topic)}</h3><ul>${section.phrases.map((phrase) => `<li>${escapeHtml(phrase)}</li>`).join("")}</ul></article>`).join("")}
    </div>`;
  }

  function bindLearnBody() {
    document.querySelectorAll("[data-learn-view]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedFolder = null;
        selectedEntryId = null;
        searchTerm = "";
        renderLearn(button.dataset.learnView);
      });
    });
    document.querySelector("#learnSearch")?.addEventListener("change", (event) => {
      searchTerm = event.target.value;
      selectedFolder = null;
      selectedEntryId = null;
      renderLearn("vocabulary");
    });
    document.querySelector("#learnSearch")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        searchTerm = event.target.value;
        selectedFolder = null;
        selectedEntryId = null;
        renderLearn("vocabulary");
      }
    });
    document.querySelectorAll("[data-folder]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedFolder = button.dataset.folder;
        selectedEntryId = null;
        searchTerm = "";
        renderLearn("vocabulary");
      });
    });
    document.querySelector("#backToLearnCategories")?.addEventListener("click", () => {
      selectedFolder = null;
      selectedEntryId = null;
      searchTerm = "";
      renderLearn("vocabulary");
    });
    document.querySelectorAll("[data-entry-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedEntryId = button.dataset.entryId;
        renderLearn("vocabulary");
      });
    });
    document.querySelectorAll("[data-verb-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedVerbId = button.dataset.verbId;
        renderLearn("verbs");
      });
    });
    document.querySelector("#learnTense")?.addEventListener("change", (event) => {
      selectedTense = event.target.value;
      renderLearn(currentView);
    });
  }

  ensureLearnButton();
  window.renderLearnHome = () => renderLearn("home");
})();
