import { renderHand, renderCard } from './Utils.js'

class PC {
    constructor(_name) {
        this.name = _name
        this.cards = []
        this.points = 0
    }

    /**
     * `pcTurn`
     * - Controller del turno del pc.
     * - Leggere i commenti vicini alle istruzioni per maggiori chiarimenti.
     */
    pcTurn() {
        // seleziono gli slot HTML dove si trovano le carte del pc
        const pcCardsHTML = document.querySelectorAll(
            "#pcSection .cardArea .deckImage"
        )

        // seleziono slot HTML dove avverrà il gioco tra pc e player
        const duelArea = document.getElementById("duelArea")            
        const randomIndex = Math.floor(Math.random() * this.cards.length)
        const randomCard = this.cards[randomIndex]

        // lo ricreo e lo aggiungo alla duelArea
        renderCard(randomCard.imgUrl, "cardImage pcCardImage", duelArea)

        pcCardsHTML[randomIndex].style.display = "none"

        // rimuovo la carta dalla mano del pc
        this.cards.splice(randomIndex, 1) 

        if (randomCard) {
            // Ritorno la carta pescata
            renderHand(this.cards, "#pcSection")                 
            return randomCard
        } else {
            console.error("Elemento HTML della carta non trovato.")
            return null
        }    
    }

}

export { PC }