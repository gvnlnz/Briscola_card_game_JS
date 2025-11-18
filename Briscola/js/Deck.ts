import { Card } from "./Card.ts";
import { PC } from "./PC.ts";
import { Player } from "./Player.ts";
import { renderCard } from "./Utils.ts";

class Deck {
    cards: Card[];

    constructor() {
        // Array di oggetti Card che istanzia ognuna delle 40 carte di un mazzo di briscola.
        this.cards = [
            new Card("Coppe", "Due", 0, "./assets/img/coppe2.png"),
            new Card("Coppe", "Quattro", 0, "./assets/img/coppe4.png"),
            new Card("Coppe", "Cinque", 0, "./assets/img/coppe5.png"),
            new Card("Coppe", "Sette", 0, "./assets/img/coppe7.png"),
            new Card("Coppe", "Sei", 0, "./assets/img/coppe6.png"),
            new Card("Coppe", "Fante", 2, "./assets/img/coppeFante.png"),
            new Card("Coppe", "Cavallo", 3, "./assets/img/coppeCavallo.png"),
            new Card("Coppe", "Re", 4, "./assets/img/coppeRe.png"),
            new Card("Coppe", "Tre", 10, "./assets/img/coppe3.png"),
            new Card("Coppe", "Asso", 11, "./assets/img/coppeAsso.png"),

            new Card("Denari", "Due", 0, "./assets/img/denara2.png"),
            new Card("Denari", "Quattro", 0, "./assets/img/denara4.png"),
            new Card("Denari", "Cinque", 0, "./assets/img/denara5.png"),
            new Card("Denari", "Sei", 0, "./assets/img/denara6.png"),
            new Card("Denari", "Sette", 0, "./assets/img/denara7.png"),
            new Card("Denari", "Fante", 2, "./assets/img/denaraFante.png"),
            new Card("Denari", "Cavallo", 3, "./assets/img/denaraCavallo.png"),
            new Card("Denari", "Re", 4, "./assets/img/denaraRe.png"),
            new Card("Denari", "Tre", 10, "./assets/img/denara3.png"),
            new Card("Denari", "Asso", 11, "./assets/img/denaraAsso.png"),

            new Card("Spade", "Due", 0, "./assets/img/spade2.png"),
            new Card("Spade", "Quattro", 0, "./assets/img/spade4.png"),
            new Card("Spade", "Cinque", 0, "./assets/img/spade5.png"),
            new Card("Spade", "Sei", 0, "./assets/img/spade6.png"),
            new Card("Spade", "Sette", 0, "./assets/img/spade7.png"),
            new Card("Spade", "Fante", 2, "./assets/img/spadeFante.png"),
            new Card("Spade", "Cavallo", 3, "./assets/img/spadeCavallo.png"),
            new Card("Spade", "Re", 4, "./assets/img/spadeRe.png"),
            new Card("Spade", "Tre", 10, "./assets/img/spade3.png"),
            new Card("Spade", "Asso", 11, "./assets/img/spadeAsso.png"),

            new Card("Bastoni", "Due", 0, "./assets/img/bastoni2.png"),
            new Card("Bastoni", "Quattro", 0, "./assets/img/bastoni4.png"),
            new Card("Bastoni", "Cinque", 0, "./assets/img/bastoni5.png"),
            new Card("Bastoni", "Sei", 0, "./assets/img/bastoni6.png"),
            new Card("Bastoni", "Sette", 0, "./assets/img/bastoni7.png"),
            new Card("Bastoni", "Fante", 2, "./assets/img/bastoniFante.png"),
            new Card(
                "Bastoni",
                "Cavallo",
                3,
                "./assets/img/bastoniCavallo.png"
            ),
            new Card("Bastoni", "Re", 4, "./assets/img/bastoniRe.png"),
            new Card("Bastoni", "Tre", 10, "./assets/img/bastoni3.png"),
            new Card("Bastoni", "Asso", 11, "./assets/img/bastoniAsso.png"),
        ];
    }

    /**
     * `shuffle`
     * - Mescola il mazzo.
     */
    shuffle(): void {
        this.cards.sort((a, b) => 0.5 - Math.random());
    }

    /**
     * `setBriscola`
     * - Sceglie la briscola prendendo l'ultima carta del mazzo e la renderizza.
     * - Renderizza il retro di una carta per simboleggiare il deck "appoggiato".
     */
    setBriscola(): Card {
        let briscola = this.cards[this.cards.length - 1];

        const briscolaSection = document.getElementById(
            "dealArea"
        ) as HTMLElement;
        renderCard(briscola.imgUrl, "cardImage", briscolaSection);

        return briscola;
    }

    /**
     * `dealFirstSixCards`
     * - Distribuisce le prime 6 carte del mazzo ai giocatori, tre a testa.
     */
    dealFirstSixCards(pc: PC, player: Player): void {
        const cardAreas = document.querySelectorAll<HTMLElement>(".cardArea");
        for (let i = 0; i < 3; i++) {
            // prime tre carte pc
            let pcCard = this.cards.shift();
            if (pcCard) {
                pc.cards.push(pcCard);
            }
            renderCard("assets/img/back.png", "deckImage", cardAreas[i]);

            // prime tre carte player
            let playerCard = this.cards.shift();
            if (playerCard) {
                player.cards.push(playerCard);
                renderCard(playerCard.imgUrl, "cardImage", cardAreas[i + 3]);
            }
        }
    }
}

export { Deck };
