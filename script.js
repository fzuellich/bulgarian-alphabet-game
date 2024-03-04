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
  const items = [...cyrillicAlphabet.entries()];
  const result = [];
  
  for (let i = 0; i < number; i++) {
    const pickIdx = Math.floor(Math.random() * items.length)
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

const tableEl = document.getElementById("table");
const candidatesEl = document.getElementById("candidates");

const target = pick(1)[0];
const candidates = shuffle(...pick(4), target);

tableEl.appendChild(makeLetterBox(target[0]));

