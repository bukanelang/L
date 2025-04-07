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
  isi.innerHTML = dataNovel[babSekarang].isi;
  highlightKata(document.getElementById('searchInput').value);
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
function setFontSize(size) {
  const isi = document.getElementById('isi-novel');
  isi.style.fontSize = `${size}px`;
}
document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
  setFontSize(e.target.value);
});
document.getElementById('searchInput').addEventListener('input', (e) => {
  highlightKata(e.target.value);
});
function highlightKata(kata) {
  const isi = dataNovel[babSekarang].isi;
  const hasil = isi.replace(
    new RegExp(`(${kata})`, 'gi'),
    '<mark>$1</mark>'
  );
  document.getElementById('isi-novel').innerHTML = hasil || isi;
}
loadNovel();
