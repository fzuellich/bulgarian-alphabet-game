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

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
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

function makeCandidate([cy, latin], key) {
  const template = document.querySelector("#candidate-tpl");
  
  const candidate = template.content.cloneNode(true);
  const p = candidate.querySelectorAll("p");
  p[0].textContent = cy;
  p[1].textContent = key;
  
  return candidate
}

const tableEl = document.getElementById("stage");
const candidatesEl = document.getElementById("candidates");

const target = pick(1)[0];
const candidates = shuffle([...pick(4), target]);

tableEl.appendChild(makeLetterBox(target[0]));

const keys = 'hjkl;'.split();
for (let i = 0; i < 5; i++) {
  const key = keys[i];
  const candidate = candidates[i];
  candidatesEl.appendChild(makeCandidate(candidate, key));
}

