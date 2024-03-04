/*
  This is your site JavaScript code - you can add interactivity!
*/

const cyrillicAlphabet = new Map();
cyrillicAlphabet.set("Д", "d");

function makeLetterBox(character) {
  const el = document.createElement("div");
  el.classList.add("prime");

  el.innerText = character;

  return el;
}

const tableEl = document.getElementById("table");
for (const [cyrillic, phonetic] of cyrillicAlphabet) {
  tableEl.appendChild(makeLetterBox(cyrillic));
}
