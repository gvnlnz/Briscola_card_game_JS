import { renderCard, renderHand } from './Utils.js'

class Player {
    constructor(_name) {
        this.name = _name
        this.cards = []
        this.points = 0
    }

    /**
    * `playerTurn`
    * - Controller del turno del player.
    * - Utilizza una Promise per garantire il ritorno di una carta cliccata dal player;
    *       questo perchè non è possibile sapere quanto impiegherà a decidere.
    * - Leggere i commenti vicini alle istruzioni per maggiori chiarimenti.
    */
    playerTurn() {
        return new Promise((resolve) => {
            // seleziono gli slot HTML dove si trovano le carte del giocatore
            const playerCardsHTML = document.querySelectorAll(
                "#playerSection .cardArea .cardImage"
            )
            
            // questo forEach assicura che ciascuna delle carte del player possa essere cliccata una volta.
            playerCardsHTML.forEach((c) => {
                c.style.pointerEvents = "auto"
            })
            
            // bordi delle carte colorati, per segnalare l'inizio del proprio turno.
            playerCardsHTML.forEach((c) => {
                c.style.border = "3px solid rgb(0, 187, 255)"
            })
            
            // seleziono slot HTML dove avverrà il gioco tra pc e player 
            const duelArea = document.getElementById("duelArea")
            
            console.log("tutte le cards selezionabili")
            playerCardsHTML.forEach((card, index) => {
                /**
                * `handleClick`: stabilisce cosa succede dopo il click di una carta
                */
                const handleClick = () => {
                    // prendo la carta cliccata
                    const carta = this.cards[index]

                    if(!carta) {
                        console.error(`carta non trovata all'indice index ${index}`)
                        return
                    }
                    // la faccio apparire nell'area di duello
                    renderCard(carta.imgUrl, "cardImage playerCardImage", duelArea)
                    playerCardsHTML[index].style.display = "none"
                    this.cards.splice(index, 1)
                    resolve(carta)
                    renderHand(this.cards, "#playerSection") // aggiorna la UI dopo la rimozione
                    // Disabilita tutti i click dopo la scelta
                    playerCardsHTML.forEach((c) => {
                        c.style.pointerEvents = "none"
                    });
                    card.removeEventListener("click", handleClick)
                }
                // la funzione handleClick viene effettivamente chiamata qua
                card.addEventListener("click", handleClick)
            })
        })
    }
}

export { Player }