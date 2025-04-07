let dataNovel = [];
let babSekarang = 0;
async function loadNovel() {
  const res = await fetch('novel.json');
  dataNovel = await res.json();
  tampilkanBab();
}
function tampilkanBab() {
  const judul = document.getElementById('judul');
  const isi = document.getElementById('isi-novel');
  judul.textContent = dataNovel[babSekarang].judul;
  isi.textContent = dataNovel[babSekarang].isi;
}
function nextBab() {
  if (babSekarang < dataNovel.length - 1) {
    babSekarang++;
    tampilkanBab();
  }
}
function prevBab() {
  if (babSekarang > 0) {
    babSekarang--;
    tampilkanBab();
  }
}
loadNovel();
