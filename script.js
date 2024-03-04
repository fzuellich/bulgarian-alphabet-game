/*
  This is your site JavaScript code - you can add interactivity!
*/

const bg = [
  ["А", "/ä/", 'a as in "apart"'],
["Б", "/b/", 'b as in "bug"'],
["В", "/v/", 'v as in "vet"'],
["Г", "/g/", 'g as in "good"'],
["Д", "/d̪/", 'd as in "dog"'],
["Е", '/\u025B/', 'e as in "best"'],
["Ж", "/\u0292/", 's as in "treasure"'],
["З", "/z/", 'z as in "zoo"'],
["И", "/i/", 'i as in "machine"'],
["Й", "/j/", 'y as in "yes"'],
["К", "/k/", 'k as in "kick"'],
["Л", "/l/", 'l as in "call"'],
["М", "/m/", 'm as in "man"'],
["Н", "/n/", 'n as in "normal"'],
["О", "/\u0254/", 'o as in "order"'],
["П", "/p/", 'p as in "pet"'],
["Р", "/r/", 'r as in spanish "pero"'],
["С", "/s/", 's as in "sound"'],
["Т", "/t/", 't as in "stick"'],
["У", "/u/", 'oo as in "boot"'],
["Ф", "/f/", 'f as in "food"'],
["x", "/x/", 'ch as in "loch"'],
["Ц", "/\u02A6/", 'ts as in "fits"'],
["Ч", "/\u0074\u0361\u0283/", 'ch as in "chip"'],
["Ш", "/\u0283/", 'sh as in "shot"'],
["Щ", "/ʃt/", 'sht as in "shtick"'],
["Ъ", "/ɤ/", 'u as in "turn"'],
["Ь", "/j/", 'y as in "canyon"'],
["Ю", "/ju/", 'yu as in "youth"'],
["Я", "/ja/", 'ya as in "yarn"']

];

const cyr = (l) => l[0];
const ipa = (l) => l[1];
const en = (l) => l[2];

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

    result.push(pick[1]);
  }

  return result;
}

function makeLetterBox(character) {
  const el = document.createElement("div");
  el.classList.add("prime");

  el.innerText = character;

  return el;
}

function makeCandidate(label, key) {
  const template = document.querySelector("#candidate-tpl");

  const candidate = template.content.cloneNode(true);
  const p = candidate.querySelectorAll("p");
  p[0].textContent = label;
  p[1].textContent = key;

  return candidate;
}

const tableEl = document.getElementById("stage");
const candidatesEl = document.getElementById("candidates");
const correctEl = document.getElementById("correct-counter");

let targetLabel = cyr;
let candidateLabel = ipa;

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
  console.log({target});
  candidates = shuffle([...pick(3), target]);
  tableEl.appendChild(makeLetterBox(targetLabel(target)));

  for (let i = 0; i < 4; i++) {
    const key = keys[i];
    const candidate = candidates[i];
    candidatesEl.appendChild(makeCandidate(candidateLabel(candidate), key));
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
