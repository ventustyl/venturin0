const loadingDiv = document.querySelector('.loading');
const loadCount = document.getElementById('loadCount');
const progressBar = document.getElementById('progress');

let progress = 0;
let pageLoaded = false;

// Chargement progressif jusqu'à 100 %
const interval = setInterval(() => {
  if (progress < 100) {
    loadCount.textContent = progress;
    progressBar.style.width = `${progress}%`;
    progress++;
  }

  // Quand les deux conditions sont réunies : 100% ET page complètement chargée
  if (progress >= 100 && pageLoaded) {
    clearInterval(interval);
    loadingDiv.style.opacity = '0';
    setTimeout(() => {
      loadingDiv.style.display = 'none';
    }, 1000);
  }
}, 15);

// Attente du chargement complet de la page (images comprises)
window.addEventListener('load', () => {
  pageLoaded = true;

  // Si 100% déjà atteint, on déclenche la fin du loader immédiatement
  if (progress >= 100) {
    clearInterval(interval);
    loadCount.textContent = '100';
    progressBar.style.width = '100%';
    loadingDiv.style.opacity = '0';
    setTimeout(() => {
      loadingDiv.style.display = 'none';
    }, 1000);
  }
});

// Création dynamique des étagères avec livres
function initShelves() {
  const container = document.getElementById('shelfContainer');
  if (!container || !window.booksData) return;

  const shelfCount = 3;
  const booksPerShelf = 5;
  let bookIndex = 0;

  for (let i = 0; i < shelfCount; i++) {
    const shelf = document.createElement('div');
    shelf.classList.add('bookshelf');

    for (let j = 0; j < booksPerShelf; j++) {
      const book = document.createElement('div');
      book.classList.add('book');

      const bookData = window.booksData[bookIndex % window.booksData.length];
      book.style.backgroundImage = `url(${bookData.image})`;

      shelf.appendChild(book);
      bookIndex++;
    }

    container.appendChild(shelf);
  }
}

document.addEventListener('DOMContentLoaded', initShelves);
