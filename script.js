/*
  This is your site JavaScript code - you can add interactivity!
*/

const bg = new Map();
bg.set("А", "/ä/");, 'a as in "apart"'
bg.set("Б", "/b/");, 'b as in "bug"'
bg.set("В", "/v/");, 'v as in "vet"'
bg.set("Г", "/g/");, 'g as in "good"'
bg.set("Д", "/d̪/");, 'd as in "dog"'
bg.set("Е", '/\u025B/');, 'e as in "best"'
bg.set("Ж", "/\u0292/");, 's as in "treasure"'
bg.set("З", "/z/");, 'z as in "zoo"'
bg.set("И", "/i/");, 'i as in "machine"'
bg.set("Й", "/j/");, 'y as in "yes"'
bg.set("К", "/k/");, 'k as in "kick"'
bg.set("Л", "/l/");, 'l as in "call"'
bg.set("М", "/m/");, ''
bg.set("Н", "/n/");
bg.set("О", "/\u0254/");
bg.set("П", "/p/");
bg.set("Р", "/r/");
bg.set("С", "/s/");
bg.set("Т", "/t/");
bg.set("У", "/u/");
bg.set("Ф", "/f/");
bg.set("x", "/x/");
bg.set("Ц", "/\u02A6/");
bg.set("Ч", "/\u0074\u0361\u0283/");
bg.set("Ш", "/\u0283/");
bg.set("Щ", "/ʃt/");
bg.set("Ъ", "/ɤ/");
bg.set("Ь", "/j/");
bg.set("Ю", "/ju/");
bg.set("Я", "/ja/");


// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function pick(number) {
  const items = [...bg.entries()];
  const result = [];

  for (let i = 0; i < number; i++) {
    const pickIdx = Math.floor(Math.random() * items.length);
    const pick = items[pickIdx];
    items.splice(pickIdx, 1);

    result.push(pick);
  }

  return result;
}

function makeLetterBox(character) {
  const el = document.createElement("div");
  el.classList.add("prime");

  el.innerText = character;

  return el;
}

function makeCandidate([cy, latin], key) {
  const template = document.querySelector("#candidate-tpl");

  const candidate = template.content.cloneNode(true);
  const p = candidate.querySelectorAll("p");
  p[0].textContent = latin;
  p[1].textContent = key;

  return candidate;
}

const tableEl = document.getElementById("stage");
const candidatesEl = document.getElementById("candidates");
const correctEl = document.getElementById("correct-counter");

let correct = 0;
let target = pick(1)[0];
let candidates = shuffle([...pick(3), target]);
const keys = "hjkl".split("");

function reset() {
  tableEl.replaceChildren();
  candidatesEl.replaceChildren();
}

function round() {
  reset();
  target = pick(1)[0];
  candidates = shuffle([...pick(3), target]);
  tableEl.appendChild(makeLetterBox(target[0]));

  for (let i = 0; i < 4; i++) {
    const key = keys[i];
    const candidate = candidates[i];
    candidatesEl.appendChild(makeCandidate(candidate, key));
  }
  
  correctEl.textContent = correct;
}

round();

function match(key) {
  const keyIdx = keys.findIndex((k) => k === key);
  const selectedCandidate = candidates[keyIdx];
  
  return (selectedCandidate[0] === target[0]);
}

window.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  const isGuessCorrect = match(event.key);
  if (isGuessCorrect) {
    correct++;
  }
  
  round();
});
