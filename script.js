// ===== QUESTIONS & GAME LOGIC ===== //
const allQuestions = [
  {
    q: "Solve: x² - 7x + 12 = 0",
    options: ["x = 3 or 4", "x = -3 or -4", "x = 2 or 6", "x = -2 or -6"],
    correct: 0,
    explanation: "Factor: (x - 3)(x - 4) = 0 → x = 3 or 4"
  },
  {
    q: "Solve: x² + 2x - 15 = 0",
    options: ["x = 3 or -5", "x = -3 or 5", "x = -2 or 7", "x = 2 or -7"],
    correct: 0,
    explanation: "Factor: (x + 5)(x - 3) = 0 → x = -5 or 3"
  },
  {
    q: "Find the roots: x² - 9 = 0",
    options: ["x = ±3", "x = 3 or 6", "x = -3 or 6", "x = -1 or 9"],
    correct: 0,
    explanation: "Difference of squares: x² - 9 = (x - 3)(x + 3) → x = ±3"
  }
];

const characters = [
  { points: 30, name: "🧠 Rotto", desc: "A brain with glasses who thinks too hard." },
  { points: 60, name: "🤓 X²-Maniac", desc: "Obsessed with factorizing." },
  { points: 90, name: "👑 Discriminatrix", desc: "Queen of the discriminant." }
];

let score = 0;
let usedQuestions = [];
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const charBox = document.getElementById("characterBox");
const charName = document.getElementById("characterName");
const charDesc = document.getElementById("characterDesc");

// ===== LEADERBOARD FUNCTIONS ===== //
function loadLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard");
  list.innerHTML = leaderboard
    .map(entry => `<li>${entry.name}: ${entry.score}</li>`)
    .join("");
}

function updateLeaderboard(name, score) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  const topScores = leaderboard.slice(0, 5); // Keep top 5
  localStorage.setItem("leaderboard", JSON.stringify(topScores));
  loadLeaderboard(); // Refresh display
}

// ===== GAME FUNCTIONS ===== //
function getNewQuestion() {
  if (usedQuestions.length === allQuestions.length) return null;
  let index;
  do {
    index = Math.floor(Math.random() * allQuestions.length);
  } while (usedQuestions.includes(index));
  usedQuestions.push(index);
  return allQuestions[index];
}

function checkAnswer(index, q) {
  if (index === q.correct) {
    score += 10;
    alert("✅ Correct! +10 points!");
  } else {
    score -= 5;
    alert(`❌ Wrong! -5 points!\nRight answer: ${q.options[q.correct]}\nExplanation: ${q.explanation}`);
    document.body.style.backgroundColor = "#400";
    setTimeout(() => (document.body.style.backgroundColor = "#1e1e2f"), 200);
  }
  scoreEl.textContent = score;
  checkUnlock();
  loadQuestion();
}

function checkUnlock() {
  const char = characters.find(c => c.points === score);
  if (char) {
    charBox.style.display = "block";
    charName.textContent = char.name;
    charDesc.textContent = char.desc;
  }
}

function loadQuestion() {
  const q = getNewQuestion();
  if (!q) {
    questionEl.textContent = "✅ Game Over!";
    answersEl.innerHTML = "";
    
    const playerName = document.getElementById("playerName").value.trim() || "Anonymous";
    updateLeaderboard(playerName, score);
    return;
  }

  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, q);
    answersEl.appendChild(btn);
  });
}

// ===== INITIALIZE GAME ===== //
window.addEventListener("DOMContentLoaded", () => {
  loadLeaderboard(); // Load saved scores on startup
  loadQuestion();    // Start the game
});
