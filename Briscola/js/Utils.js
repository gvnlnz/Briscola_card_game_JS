import { Deck } from './Deck.js'

/**
 * `cardAnimation`
 * - Gestisce l'animazione iniziale del gioco.
 */
function cardAnimation() {
    const animationDeck = new Deck()
    animationDeck.shuffle()
    const cardAnimation = document.getElementById("cardAnimation")
    animationDeck.cards.forEach((card) => {
        const cardContainer = document.createElement("div")
        cardContainer.id = "cardItem"
    
        const cardImage = document.createElement("img")
        cardImage.src = card.imgUrl
        cardContainer.appendChild(cardImage)
        cardAnimation.appendChild(cardContainer)
    
        cardContainer.style.animation = "scrollX 30s linear infinite"
    })
}

/**
 * `renderCard`
 * - Carica l'immagine di una carta (il suo attributo `imgUrl`) ogni volta che deve essere aggiornato.
 * - Gestisce gli elementi HTML neccessari affinchè venga mostrato tutto correttamente.
 */
function renderCard(src, className, parent) {
    const cardImage = document.createElement('img')
    cardImage.src = src
    cardImage.className = className
    parent.appendChild(cardImage)
}

/**
 * `renderHand`
 * - Gestisce il corretto caricamento delle immagini delle carte.
 * - Gestisce gli elementi HTML neccessari affinchè venga mostrato tutto correttamente (tramite `renderCard()`).
 * - In base al Player o al PC, mostra la carta o il suo retro.
 */
function renderHand(cards, area) {
    const cardAreas = document.querySelectorAll(`${area} .cardArea`)
    // Svuota tutte le cardArea
    cardAreas.forEach(area => area.innerHTML = "")
    // Aggiungi le carte attuali
    cards.forEach((card, i) => {
        if(cardAreas[i]){
            if(area === "#pcSection")
                renderCard('../assets/img/back.png', 'deckImage', cardAreas[i])
            else
                renderCard(card.imgUrl, 'cardImage', cardAreas[i])
        }
    })

    // disabilito slot vuoti
    for (let i = cards.length; i < cardAreas.length; i++) {
        cardAreas[i].style.pointerEvents = "none"
    }
}

/**
 * `drawCard`
 * - Funzione che permette a un giocatore di pescare dal mazzo.
 */
function drawCard(cards, deck, area) {
    let card = deck.shift()
    if(card) {
        cards.push(card)
        renderHand(cards, area)
    }
    return card
}

/**
 * `showStats`
 * - A fine partita mostra il vincitore e i punteggi ottenuti.
 */
function showStats(player, pc, winner) {
    console.log("show stats chiamata")
    const statsContainer = document.createElement('div')
    statsContainer.className = 'statsContainer'

    const resultText = document.createElement('div')
    resultText.className = 'resultText'
    if(winner === "player")
        resultText.textContent = "Hai vinto (gg bro) 🗿"
    else if (winner === "pc")
        resultText.textContent = "Hai perso (greve) 💀"
    else
        resultText.textContent = "Pareggio (crazy) 😳"

    statsContainer.appendChild(resultText)

    const playerPoints = document.createElement('div')
    playerPoints.className = 'playerPoints'
    playerPoints.textContent = `i tuoi punti: ${player.points}`
    statsContainer.appendChild(playerPoints)

    const pcPoints = document.createElement('div')
    pcPoints.className = 'pcPoints'
    pcPoints.textContent = `i punti del avversario: ${pc.points}`
    statsContainer.appendChild(pcPoints)

    const gameSection = document.getElementById("gameSection")
    Array.from(gameSection.children).forEach((child) => {child.remove()})
    gameSection.appendChild(statsContainer)

}

export { renderCard, cardAnimation, renderHand, drawCard, showStats }