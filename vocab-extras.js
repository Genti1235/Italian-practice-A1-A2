const VOCAB_EXTRAS = [
  ["francese", "French", "Adjectives", "Adjectives"],
  ["francesi", "French", "Adjectives", "Adjectives"],
  ["spagnolo", "Spanish", "Adjectives", "Adjectives"],
  ["spagnola", "Spanish", "Adjectives", "Adjectives"],
  ["spagnoli", "Spanish", "Adjectives", "Adjectives"],
  ["spagnole", "Spanish", "Adjectives", "Adjectives"],
  ["brutto", "ugly/bad", "Adjectives", "Adjectives"],
  ["brutta", "ugly/bad", "Adjectives", "Adjectives"],
  ["brutti", "ugly/bad", "Adjectives", "Adjectives"],
  ["brutte", "ugly/bad", "Adjectives", "Adjectives"],
  ["giovane", "young", "Adjectives", "Adjectives"],
  ["giovani", "young", "Adjectives", "Adjectives"],
  ["alto", "tall/high", "Adjectives", "Adjectives"],
  ["alta", "tall/high", "Adjectives", "Adjectives"],
  ["alti", "tall/high", "Adjectives", "Adjectives"],
  ["alte", "tall/high", "Adjectives", "Adjectives"],
  ["basso", "short/low", "Adjectives", "Adjectives"],
  ["bassa", "short/low", "Adjectives", "Adjectives"],
  ["bassi", "short/low", "Adjectives", "Adjectives"],
  ["basse", "short/low", "Adjectives", "Adjectives"],
  ["antipatico", "unpleasant", "Adjectives", "Adjectives"],
  ["antipatica", "unpleasant", "Adjectives", "Adjectives"],
  ["antipatici", "unpleasant", "Adjectives", "Adjectives"],
  ["antipatiche", "unpleasant", "Adjectives", "Adjectives"],
  ["importante", "important", "Adjectives", "Adjectives"],
  ["importanti", "important", "Adjectives", "Adjectives"],
  ["triste", "sad", "Adjectives", "Adjectives"],
  ["tristi", "sad", "Adjectives", "Adjectives"],
  ["sposato", "married", "Adjectives", "Adjectives"],
  ["sposata", "married", "Adjectives", "Adjectives"],
  ["sposati", "married", "Adjectives", "Adjectives"],
  ["sposate", "married", "Adjectives", "Adjectives"],
  ["single", "single", "Adjectives", "Adjectives"],
  ["piacere", "to like/be pleasing", "Verbs", "Verbs"],
  ["lavarsi", "to wash oneself", "Verbs", "Verbs"],
  ["proporre", "to propose/suggest", "Verbs", "Verbs"],
  ["costare", "to cost", "Verbs", "Verbs"],
  ["servire", "to need/serve", "Verbs", "Verbs"]
].map(([it, en, group, kind]) => ({ it, en, group, kind }));

const originalBuildVocabItems = buildVocabItems;
buildVocabItems = function buildVocabItemsWithExtras() {
  const items = originalBuildVocabItems();
  const seen = new Set(items.map((item) => itemKey(item)));

  VOCAB_EXTRAS.forEach((item) => {
    const key = itemKey(item);
    if (!seen.has(key)) {
      items.push(item);
      seen.add(key);
    }
  });

  return items;
};
