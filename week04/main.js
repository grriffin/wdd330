import Vec from "./vec.js";

window.onload = function(e) {
  const btnaddvecs = document.getElementById('addvecs');
  btnaddvecs.addEventListener('click', addVecs);
};

function addVecs(event) {
  console.log('adding vecs');
  const vecoutput = document.getElementById('vecoutput');
  const v1 = new Vec(1, 2);
  const v2 = new Vec(2, 3);
  const v3 = v1.plus(v2);
  vecoutput.innerHTML = `<p>Output from vectors (${v1.x},${v1.y}) + (${v2.x},${v2.y}) = (${v3.x},${v3.y})</p>`;
}

