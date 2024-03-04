/*
  This is your site JavaScript code - you can add interactivity!
*/

const cyrillicAlphabet = new Map();
cyrillicAlphabet.set("Д", "/d̪/");
cyrillicAlphabet.set("Р", "/r/");
cyrillicAlphabet.set("М", "/m/");
cyrillicAlphabet.set("Т", "/t/");
cyrillicAlphabet.set("Б", "/b/");
cyrillicAlphabet.set("В", "/v/");
cyrillicAlphabet.set("П", "/p/");
cyrillicAlphabet.set("Ф", "/f/");
cyrillicAlphabet.set("К", "/k/");
cyrillicAlphabet.set("Л", "/l/");

function shuffle() {
  
}

function pick(number) {
  const result = [];
  cyrillicAlphabet.length
}

function makeLetterBox(character) {
  const el = document.createElement("div");
  el.classList.add("prime");

  el.innerText = character;

  return el;
}

const tableEl = document.getElementById("table");
const candidatesEl = document.getElementById("candidates");

const target = pick(1);
const candidates = shuffle(...pick(4), target);

for (const [cyrillic, phonetic] of cyrillicAlphabet) {
  tableEl.appendChild(makeLetterBox(cyrillic));
}
