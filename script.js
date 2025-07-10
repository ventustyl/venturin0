const loadingDiv = document.querySelector(".loading");
const body = document.querySelector("body");
const contain = document.querySelector(".contain");
let isOnContain = false; // Drapeau pour savoir si on est sur `.contain`
let count = 0;
let loaded = false;

// Interval pour la barre de chargement
const interval = setInterval(() => {
  if (count < 101) {
    loadCount.textContent = count++;
    progress.style.width = count++ + "%";
  } else if (loaded) {
    clearInterval(interval);
    loadingDiv.style.opacity = 0;
    setTimeout(() => {
      loadingDiv.style.display = "none";
    }, 1000);
  }
}, 10);

// Gestion de la fin du chargement
window.addEventListener("load", () => {
  console.log("chargé");
  loaded = true;
  clearInterval(interval);
  loadCount.textContent = 100;
  progress.style.width = "100%";
  loadingDiv.style.opacity = 0;
  setTimeout(() => {
    loadingDiv.style.display = "none";
  }, 1000);
});

// Désactiver l'effet lorsque la souris est sur `.contain`
contain.addEventListener("mouseenter", () => {
  isOnContain = true; // Désactiver la création de cercles
});

contain.addEventListener("mouseleave", () => {
  isOnContain = false; // Réactiver la création de cercles
});

// Gestion des mouvements de souris
body.addEventListener("mousemove", (e) => {
  if (isOnContain) return; // Ne rien faire si la souris est sur `.contain`

  const { clientX: x, clientY: y } = e;

  // Crée 2 cercles
  for (let i = 0; i < 2; i++) {
    createCircle(x, y);
  }
});

// Gestion des mouvements tactiles
body.addEventListener("touchmove", (e) => {
  if (isOnContain) return; // Ne rien faire si le doigt est sur `.contain`

  const touch = e.touches[0];
  const { clientX: x, clientY: y } = touch;

  for (let i = 0; i < 2; i++) {
    createCircle(x, y);
  }
});

// Fonction pour créer un cercle
function createCircle(x, y) {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  // Position aléatoire autour de la souris
  const offsetX = Math.random() * 40 - 20; // Offset entre -20 et 20
  const offsetY = Math.random() * 40 - 20;

  circle.style.left = `${x + offsetX}px`;
  circle.style.top = `${y + offsetY}px`;
  circle.style.backgroundColor = getRandomPastelColor();

  document.body.appendChild(circle);

  // Supprime le cercle après 1 seconde (correspond à l'animation CSS)
  setTimeout(() => {
    circle.remove();
  }, 1000);
}

// Fonction pour générer des couleurs pastel aléatoires
function getRandomPastelColor() {
  const r = Math.floor(Math.random() * 127 + 128); // Entre 128 et 255
  const g = Math.floor(Math.random() * 127 + 128);
  const b = Math.floor(Math.random() * 127 + 128);
  return `rgb(${r}, ${g}, ${b})`;
}

// Ajout des événements sur chaque carte
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  let interval;

  // Survol de la carte avec la souris
  card.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        createPixel(card);
      }
    }, 100);
  });

  // Tactile : début du contact
  card.addEventListener("touchstart", () => {
    interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        createPixel(card);
      }
    }, 100);
  });

  // Fin du survol ou du contact
  card.addEventListener("mouseleave", () => {
    clearInterval(interval);
  });

  card.addEventListener("touchend", () => {
    clearInterval(interval);
  });
});

// Fonction pour créer un pixel sur une carte
function createPixel(parent) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");

  // Position aléatoire dans la carte
  const offsetX = Math.random() * parent.offsetWidth;
  const offsetY = Math.random() * parent.offsetHeight;

  pixel.style.left = `${offsetX}px`;
  pixel.style.top = `${offsetY}px`;
  pixel.style.backgroundColor = getRandomPastelColor();

  parent.appendChild(pixel);

  // Supprime le pixel après 1 seconde
  setTimeout(() => {
    pixel.remove();
  }, 1000);
}
