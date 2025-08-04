import { Deck } from "./Deck.js"
import { Player } from "./Player.js"
import { PC } from "./PC.js"
import {drawCard, showStats} from "./Utils.js"

class Game {
    
    /**
     * `initGame`
     * - `Inizializza` il gioco impostando l'HTML in modo che sia funzionale
     *      alle funzioni che avverranno in seguito.
     * - Istanzia i giocatori, il mazzo, sceglie la briscola e distribuisce le prime 6 carte.
     */
    initGame() {
        const deck = new Deck()
        const pc = new PC("pc")
        const player = new Player("player")

        // rimozione schermata iniziale
        document.getElementById("intro").style.display = "none"

        // inserimento area di gioco
        const gameSection = (document.getElementById("gameSection")
            .style.display = "flex")
        
        deck.shuffle()
        deck.dealFirstSixCards(pc, player)
        let briscola = deck.setBriscola()
        this.play(deck, pc, player, briscola)
    }

    /**
     * `play`
     * - Funge da `driver` del gioco.
     * - Setta le variabili principale come le carte giocate ogni turno e il vincitore, 
     *      utile per le stats finali.
     * - Sceglie randomicamente quale giocatore comincia.
     * - Passa il turno al giocatore che vince quello precedente (funzione turnWinner()).
     * - `ATTENZIONE`: tutti i delay inseriti in questa funzione e in quelle successive
     *      hanno una tempistica scelta col puro scopo di rendere l'interazione con l'utente
     *      più controllata, non lenta, non veloce.
     */
    async play(deck, pc, player, briscola) {

        let playerCard, pcCard, winner
        let turn = Math.random() > 0.5 ? "player" : "pc"
        
        while (player.cards.length > 0 || pc.cards.length > 0) {
            if (deck.cards.length === 0) {
                console.log("Il deck è vuoto")
                const briscolaArea = document.getElementById("briscola")
                Array.from(briscolaArea.children).forEach((child) => {
                    child.remove()
                })
            }
            if (turn === "player") {
                await this.delay(200)
                playerCard = await player.playerTurn()
                
                await this.delay(700)

                pcCard = await pc.pcTurn()
                await this.delay(700)
            } else {
                await this.delay(700)
                pcCard = await pc.pcTurn(pc, deck)
                
                await this.delay(200)
                
                playerCard = await player.playerTurn(player, deck)
                await this.delay(700)
            }
            
            turn = await this.processTurn(pcCard, playerCard, deck, player, pc, turn, briscola)

            await this.delay(1000)
            console.clear()
        }
        console.warn("determino vincitore finale")
        winner = this.finalWinner(pc, player)
        showStats(player, pc, winner)
    }

    /**
     * `processTurn`
     * - Stabilisce il `vincitore del turno` tramite `turnWinner()`.
     * - `Ripulisce la duelArea` dalle carte appena giocate.
     * - I giocatori `pescano` in base al turno.
     */
    async processTurn(pcCard,playerCard,deck,player,pc,turn,briscola) {
        
        let tw = this.turnWinner(pcCard,playerCard,briscola,turn,player,pc)
        console.warn(`VINCITORE TURNO: ${tw}`)

        if (tw !== turn)
            turn = tw

        const duelArea = document.getElementById("duelArea")
        this.cleanDuelArea(duelArea)

        if(tw === "player"){
            drawCard(player.cards, deck.cards, "#playerSection")
            drawCard(pc.cards, deck.cards, "#pcSection")
        } else {
            drawCard(pc.cards, deck.cards, "#pcSection")
            drawCard(player.cards, deck.cards, "#playerSection")
        }

        return tw
    }

    /**
     * `turnWinner`
     * - Stabilisce il vincitore del turno secondo le regole della briscola.
     */
    turnWinner(pcCard, playerCard, briscola, turn, player, pc) {
        const briscolaSeed = briscola.seed
        console.log(`seme briscola: ${briscolaSeed}`)

        let winner = ""

        // Verifica che entrambe le carte siano valide
        if (!playerCard || !pcCard) {
            console.warn("Una delle carte è undefined/null, nessun punto assegnato.")
            return turn
        }

        // player gioca briscola, pc no
        if ((playerCard.seed === briscolaSeed) && (pcCard.seed !== briscolaSeed)) {
            winner = "player"
        }
        // pc gioca briscola, player no
        else if ((pcCard.seed === briscolaSeed) && (playerCard.seed !== briscolaSeed)) {
            winner = "pc"
        }
        // giochiamo stesso seme
        else if (playerCard.seed === pcCard.seed) {
            if (playerCard.value > pcCard.value) {
                winner = "player"
            } else if (pcCard.value > playerCard.value) {
                winner = "pc"
            } else {
                winner = (turn === "player") ? "player" : "pc"
            }
        }
        // giochiamo semi diversi, diversi dalla briscola
        else {
            winner = (turn === "player") ? "player" : "pc"
        }

        // Assegna i punti solo se entrambe le carte sono valide
        const playerCardPoints = typeof playerCard.value !== "undefined" ? playerCard.value : playerCard.value
        const pcCardPoints = typeof pcCard.value !== "undefined" ? pcCard.value : pcCard.value

        if (winner === "player") {
            player.points = Number(player.points) + Number(playerCardPoints) + Number(pcCardPoints)
            console.log(`punti player aggiornati: ${player.points}`)
        } else {
            pc.points = Number(pc.points) + Number(playerCardPoints) + Number(pcCardPoints)
            console.log(`punti pc aggiornati: ${pc.points}`)
        }
        return winner
    }

    /**
     * `cleanDuelArea`
     * - Rimuove le carte appena giocate.
     */
    async cleanDuelArea(duelArea) {
        // Rimuovi solo se ci sono esattamente due figli (carte giocate)
        if (duelArea.children.length === 2) {
            Array.from(duelArea.children).forEach(child => child.remove())
        } else {
            console.warn(`cleanDuelArea: non rimuovo, figli presenti: ${duelArea.children.length}`)
        }
        await this.delay(800)
    }

    /**
     * `finalWinner`
     * - Stabilisce il vincitore della partita.
     */
    finalWinner(pc, player) {
        if (player.points > pc.points) {
            console.log("Il player vince la partita!")
            return "player"
        } else if (pc.points > player.points) {
            console.log("Il PC vince la partita!")
            return "pc"
        } else {
            console.log("La partita è un pareggio!")
            return "pareggio"
        }
    }

    /**
     * `delay`
     * - `Helper` per adattare il gioco a una UX più gradevole.
     */
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}

export { Game }
