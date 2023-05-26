var line1 = "";
var line2 = "";

var word1 = "";
var word2 = "";
var count1 = 0;
var count2 = 0;

var correct = 0;
var tot = 0;

let stats = [];

function initGame() {
  fetch("trim.txt")
    .then((response) => response.text())
    .then((data) => {
      stats = data.split("\n");
      chooseRandomLines();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function chooseRandomLines() {
  const min = document.getElementById("min-oc").value;
  let lines = stats.slice(0, stats.length);
  if (min === "1000") {
    lines = lines.slice(0, 2927);
  } else if (min === "500") {
    lines = lines.slice(0, 4686);
  } else if (min === "200") {
    lines = lines.slice(0, 9065);
  } else if (min === "50") {
    lines = lines.slice(0, lines.length);
  }
  line1 = lines[Math.floor(Math.random() * lines.length)];
  line2 = lines[Math.floor(Math.random() * lines.length)];

  count1 = parseInt(line1.match(/\((\d+)\)$/)[1], 10);
  count2 = parseInt(line2.match(/\((\d+)\)$/)[1], 10);

  while (count1 === count2) {
    line2 = lines[Math.floor(Math.random() * lines.length)];
    count2 = parseInt(line2.match(/\((\d+)\)$/)[1], 10);
  }

  word1 = line1.split(" ")[1];
  word2 = line2.split(" ")[1];

  document.getElementById("leftButton").textContent = word1;
  document.getElementById("rightButton").textContent = word2;

  if (count1 > count2) {
    document.getElementById("result1").textContent = line1;
    document.getElementById("result2").textContent = line2;
  } else {
    document.getElementById("result1").textContent = line2;
    document.getElementById("result2").textContent = line1;
  }
}
function choose(c) {
  if (count1 > count2) {
    left();
  } else {
    right();
  }
  document.getElementById("word-panel").style.display = "none";
  document.getElementById("choosed").style.display = "flex";
  document.getElementById("continue").textContent = "continue";
}
function restart() {
  document.getElementById("left").style.width = "50%";
  document.getElementById("right").style.width = "50%";
  document.getElementById("word-panel").style.display = "flex";
  document.getElementById("choosed").style.display = "none";
  document.getElementById("continue").textContent = "skip";
  chooseRandomLines();
}
function right() {
  document.getElementById("left").style.width = "0%";
  document.getElementById("right").style.width = "100%";
  document.body.style.background = "#ff9000";
}
function left() {
  document.getElementById("left").style.width = "100%";
  document.getElementById("right").style.width = "0%";
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    choose(0);
  } else if (event.key === "ArrowRight") {
    choose(1);
  } else if (
    event.key === "Enter" ||
    event.key === " " ||
    event.key === "c" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowUp"
  ) {
    restart();
  }
});
