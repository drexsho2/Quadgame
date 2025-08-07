
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
  },
  {
    q: "Solve using quadratic formula: x² - 6x + 5 = 0",
    options: ["x = 1 or 5", "x = -1 or 5", "x = 2 or 3", "x = -2 or -3"],
    correct: 0,
    explanation: "x = [6 ± √(36 - 20)] / 2 = 1 or 5"
  },
  {
    q: "Find roots: x² + 4x + 4 = 0",
    options: ["x = -2 (repeated root)", "x = ±2", "x = -4 or 0", "x = 4 or -1"],
    correct: 0,
    explanation: "Perfect square trinomial: (x + 2)² = 0 → x = -2"
  },
  {
    q: "Solve: x² - 10x + 21 = 0",
    options: ["x = 3 or 7", "x = -3 or -7", "x = 4 or 6", "x = -4 or -6"],
    correct: 0,
    explanation: "Factor: (x - 3)(x - 7) = 0 → x = 3 or 7"
  }
];

let usedQuestions = [];

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
    setTimeout(() => document.body.style.backgroundColor = "#1e1e2f", 200);
    showRotEnemy();
  }
  scoreEl.textContent = score;
  checkUnlock();
  loadQuestion();
}

const questions = [
  {
    q: "Solve: x² - 5x + 6 = 0",
    options: ["x = 2 or 3", "x = -2 or -3", "x = 1 or 6", "x = -1 or -6"],
    correct: 0,
    explanation: "Factor: (x - 2)(x - 3) = 0 → x = 2 or 3"
  },
  {
    q: "Solve: x² + 3x + 2 = 0",
    options: ["x = -1 or -2", "x = 2 or -1", "x = 1 or -3", "x = -2 or 3"],
    correct: 0,
    explanation: "Factor: (x + 1)(x + 2) = 0 → x = -1 or -2"
  },
  {
    q: "Use quadratic formula: x² - 4x + 1 = 0",
    options: ["x = 2 ± √3", "x = 1 ± √3", "x = 2 ± √2", "x = 1 ± √2"],
    correct: 2,
    explanation: "Quadratic formula: x = [4 ± √(16 - 4)] / 2 = 2 ± √2"
  }
];

const characters = [
  { points: 30, name: "🧠 Rotto", desc: "A brain with glasses who thinks too hard." },
  { points: 60, name: "🤓 X²-Maniac", desc: "Obsessed with factorizing." },
  { points: 90, name: "👑 Discriminatrix", desc: "Queen of the discriminant." }
];

let score = 0;
let currentQ = 0;
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const charBox = document.getElementById("characterBox");
const charName = document.getElementById("characterName");
const charDesc = document.getElementById("characterDesc");

function loadQuestion() {
  if (currentQ >= questions.length) {
    questionEl.textContent = "✅ Game Over!";
    answersEl.innerHTML = "";
    return;
  }
  const q = questions[currentQ];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  const q = questions[currentQ];
  if (index === q.correct) {
    score += 10;
    alert("✅ Correct! +10 points!");
  } else {
    score -= 5;
    alert(`❌ Wrong! -5 points!\nRight answer: ${q.options[q.correct]}\nExplanation: ${q.explanation}`);
    document.body.style.backgroundColor = "#400";
    setTimeout(() => document.body.style.backgroundColor = "#1e1e2f", 200);
    showRotEnemy();
  }
  scoreEl.textContent = score;
  checkUnlock();
  currentQ++;
  loadQuestion();
}

function checkUnlock() {
  const char = characters.find(c => c.points === score);
  if (char) {
    charBox.style.display = "block";
    charName.textContent = char.name;
    charDesc.textContent = char.desc;
  } else {
    charBox.style.display = "none";
  }
}

function showRotEnemy() {
  const rotEnemies = [
    { name: "Rotzilla", msg: "Mwahaha! Your math is no match for me!" },
    { name: "Blunderbrain", msg: "Guess again, genius." },
    { name: "Math-eater", msg: "I snack on wrong answers." }
  ];
  const enemy = rotEnemies[Math.floor(Math.random() * rotEnemies.length)];
  alert(`👹 ${enemy.name} appears!\n"${enemy.msg}"`);
}

loadQuestion();


function updateLeaderboard(name, score) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));

  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  leaderboard.slice(0, 5).forEach(entry => {
    const item = document.createElement("li");
    item.textContent = `${entry.name}: ${entry.score}`;
    list.appendChild(item);
  });
}

// Hook into end of game
function loadQuestion() {
  if (currentQ >= questions.length) {
    questionEl.textContent = "✅ Game Over!";
    answersEl.innerHTML = "";

    const playerName = document.getElementById("playerName").value || "Player";
    updateLeaderboard(playerName, score);

    return;
  }
  const q = questions[currentQ];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    answersEl.appendChild(btn);
  });
}

function loadQuestion() {
  const q = getNewQuestion();
  if (!q) {
    questionEl.textContent = "✅ Game Over!";
    answersEl.innerHTML = "";

    const playerName = document.getElementById("playerName").value || "Player";
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
