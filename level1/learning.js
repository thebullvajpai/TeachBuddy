const topics = [
  { id: "noun", title: "Noun", note: "Notes/Noun.html" },
  { id: "pronoun", title: "Pronoun", note: "Notes/Pronoun.html" },
  { id: "verb", title: "Verb", note: "Notes/Verb.html" },
  { id: "adjective", title: "Adjective", note: "Notes/Adjective.html" },
  { id: "adverb", title: "Adverb", note: "Notes/Adverb.html" },
  { id: "preposition", title: "Preposition", note: "Notes/Preposition.html" },
  { id: "article", title: "Article", note: "Notes/Article.html" },
  // NOTE: Your existing files use the spelling "conjuction" (missing 'n').
  { id: "conjuction", title: "Conjunction", note: "Notes/Conjuction.html" },
  { id: "interjection", title: "Interjection", note: "Notes/Interjection.html" },
  { id: "sentence_formation", title: "Sentence Formation", note: "Notes/Sentence_formation.html" },
  { id: "tense", title: "Tense", note: "Notes/Tense.html" }
].map(t => ({
  ...t,
  quiz: `all_quiz.html?topic=${encodeURIComponent(t.id)}`
}));

const container = document.getElementById("topicsContainer");

function readUnlockedIndex() {
  const stored = parseInt(localStorage.getItem("unlockedIndex") || "0", 10);
  if (Number.isNaN(stored)) return 0;

  // Also derive progress-based unlock so it survives accidental cleared index.
  let derived = 0;
  for (let i = 0; i < topics.length; i++) {
    const isCompleted = localStorage.getItem(`progress_${topics[i].id}`) === "completed";
    if (isCompleted) derived = i + 1;
    else break;
  }

  const unlocked = Math.max(stored, derived);
  localStorage.setItem("unlockedIndex", String(unlocked));
  return unlocked;
}

// let unlockedIndex = readUnlockedIndex();
let unlockedIndex = 999;   // temporary full unlock


topics.forEach((topic, index) => {
  const card = document.createElement("div");
  card.className = "topic-card";

  if (index <= unlockedIndex) {
    card.innerHTML = `
      <h3>${topic.title}</h3>
      <button onclick="location.href='${topic.note}'">📖 Learn</button>
      <button onclick="location.href='${topic.quiz}'">📝 Quiz</button>
    `;
  } else {
    card.innerHTML = `
      <h3>${topic.title}</h3>
      <p>🔒 Locked</p>
    `;
    card.classList.add("locked");
  }

  container.appendChild(card);
});


function openNotes(topic) {
  window.location.href = `notes/${capitalize(topic)}.html`;
}

function openQuiz(topic) {
  window.location.href = `all_quiz.html?topic=${topic}`;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
