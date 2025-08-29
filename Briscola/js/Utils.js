import { Deck } from "./Deck.js";

/**
 * `cardAnimation`
 * - Gestisce l'animazione iniziale del gioco.
 */
function cardAnimation() {
    const animationDeck = new Deck();
    animationDeck.shuffle();
    const cardAnimation = document.getElementById("cardAnimation");
    animationDeck.cards.forEach((card) => {
        const cardContainer = document.createElement("div");
        cardContainer.id = "cardItem";

        const cardImage = document.createElement("img");
        cardImage.src = card.imgUrl;
        cardContainer.appendChild(cardImage);
        cardAnimation.appendChild(cardContainer);

        cardContainer.style.animation = "scrollX 30s linear infinite";
    });
}

/**
 * `renderCard`
 * - Carica l'immagine di una carta (il suo attributo `imgUrl`) ogni volta che deve essere aggiornato.
 * - Gestisce gli elementi HTML neccessari affinchè venga mostrato tutto correttamente.
 */
function renderCard(src, className, parent) {
    const cardImage = document.createElement("img");
    cardImage.src = src;
    cardImage.className = className;
    parent.appendChild(cardImage);
}

/**
 * `renderHand`
 * - Gestisce il corretto caricamento delle immagini delle carte.
 * - Gestisce gli elementi HTML neccessari affinchè venga mostrato tutto correttamente (tramite `renderCard()`).
 * - In base al Player o al PC, mostra la carta o il suo retro.
 */
function renderHand(cards, area) {
    const cardAreas = document.querySelectorAll(`${area} .cardArea`);
    // Svuota tutte le cardArea
    cardAreas.forEach((area) => (area.innerHTML = ""));
    // Aggiungi le carte attuali
    cards.forEach((card, i) => {
        if (cardAreas[i]) {
            if (area === "#pcSection")
                renderCard("assets/img/back.png", "deckImage", cardAreas[i]);
            else renderCard(card.imgUrl, "cardImage", cardAreas[i]);
        }
    });

    // disabilito slot vuoti
    for (let i = cards.length; i < cardAreas.length; i++) {
        cardAreas[i].style.pointerEvents = "none";
    }
}

/**
 * `drawCard`
 * - Funzione che permette a un giocatore di pescare dal mazzo.
 */
function drawCard(cards, deck, area) {
    let card = deck.shift();
    if (card) {
        cards.push(card);
        renderHand(cards, area);
    }
    return card;
}

/**
 * `showStats`
 * - A fine partita mostra il vincitore e i punteggi ottenuti.
 */
function showStats(player, pc, winner) {
    console.log("show stats chiamata");
    const statsContainer = document.createElement("div");
    statsContainer.className = "statsContainer flex";

    const resultText = document.createElement("div");
    resultText.className = "resultText";
    if (winner === "player") resultText.textContent = "Hai vinto (gg bro) 🗿";
    else if (winner === "pc") resultText.textContent = "Hai perso (greve) 💀";
    else resultText.textContent = "Pareggio (crazy) 😳";

    statsContainer.appendChild(resultText);

    const playerPoints = document.createElement("div");
    playerPoints.className = "playerPoints";
    playerPoints.textContent = `i tuoi punti: ${player.points}`;
    statsContainer.appendChild(playerPoints);

    const pcPoints = document.createElement("div");
    pcPoints.className = "pcPoints";
    pcPoints.textContent = `i punti del avversario: ${pc.points}`;
    statsContainer.appendChild(pcPoints);

    const quitBtn = document.createElement("button");
    quitBtn.className = "btn";
    quitBtn.textContent = "Esci";
    statsContainer.appendChild(quitBtn);

    quitBtn.addEventListener("click", () => {
        window.location.reload();
    });

    const gameSection = document.getElementById("gameSection");
    Array.from(gameSection.children).forEach((child) => {
        child.remove();
    });
    gameSection.appendChild(statsContainer);
}

/**
    `safeExit`
    - Permette di abbandonare la partita quando lo si desidera.
 */
function safeExit() {
    const gameSection = document.getElementById("gameSection");
    const banner = document.createElement("div");
    banner.className = "banner flex";

    const text = document.createElement("p");
    text.textContent = "Sei sicuro di voler uscire?";
    banner.appendChild(text);

    const quitBtn = document.createElement("button");
    quitBtn.id = "quitBtn";
    quitBtn.className = "btn";
    quitBtn.textContent = "Si";

    const dontQuitBtn = document.createElement("button");
    dontQuitBtn.className = "btn";
    dontQuitBtn.textContent = "No";

    const btnBox = document.createElement("div");
    btnBox.className = "flex";
    btnBox.style.gap = "2vw";
    btnBox.appendChild(quitBtn);
    btnBox.appendChild(dontQuitBtn);

    banner.appendChild(btnBox);

    gameSection.append(banner);

    quitBtn.addEventListener("click", () => {
        window.location.reload();
    });

    dontQuitBtn.addEventListener("click", () => {
        banner.remove();
    });
}

function updateDeckCards(cardsLength) {
    const infoArea = document.getElementById("info");
    cardsLength === 0
        ? (infoArea.innerHTML = "Il mazzo è finito")
        : (infoArea.innerHTML = `Carte nel mazzo: ${cardsLength}`);
}

function showTurnWinner(winner) {
    const banner = document.createElement("div");
    banner.className = "banner flex";

    const msg = document.createElement("p");
    banner.appendChild(msg);
    document.getElementById("gameSection").appendChild(banner);

    winner === "player"
        ? (msg.textContent = "Hai preso tu 😲")
        : (msg.textContent = "Ha preso lui 🫵🏻 🤣");

    setTimeout(() => {
        document.getElementById("gameSection").removeChild(banner);
    }, 800);
}

function itsYourTurn() {
    const banner = document.createElement("div");
    banner.className = "banner flex";

    const msg = document.createElement("p");
    banner.appendChild(msg);
    document.getElementById("gameSection").appendChild(banner);

    msg.textContent = "Tocca a te 🏌🏻‍♂️";

    setTimeout(() => {
        document.getElementById("gameSection").removeChild(banner);
    }, 800);
}

export {
    renderCard,
    cardAnimation,
    renderHand,
    drawCard,
    showStats,
    safeExit,
    updateDeckCards,
    showTurnWinner,
    itsYourTurn,
};
