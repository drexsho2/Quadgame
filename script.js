
const questions = [
  {
    q: "Solve: x² - 5x + 6 = 0",
    options: ["x = 2 or 3", "x = -2 or -3", "x = 1 or 6", "x = -1 or -6"],
    correct: 0
  },
  {
    q: "Solve: x² + 3x + 2 = 0",
    options: ["x = -1 or -2", "x = 2 or -1", "x = 1 or -3", "x = -2 or 3"],
    correct: 0
  },
  {
    q: "What is the discriminant of x² - 4x + 4?",
    options: ["16", "0", "4", "8"],
    correct: 1
  },
  {
    q: "Solve using quadratic formula: x² - 6x + 8 = 0",
    options: ["x = 2 or 4", "x = 1 or 8", "x = 3 or 5", "x = -2 or -4"],
    correct: 0
  },
  {
    q: "Find the roots: x² + 2x - 8 = 0",
    options: ["x = -4 or 2", "x = 4 or -2", "x = -1 or 8", "x = 1 or -8"],
    correct: 0
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
    questionEl.textContent = "✅ All done!";
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
    alert("❌ Wrong! -5 points!\nRot Tip: Try factoring or using the quadratic formula.");
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
