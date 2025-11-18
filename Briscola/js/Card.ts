type Seed = "Coppe" | "Denari" | "Spade" | "Bastoni";
type Figure = 
    | "Due"
    | "Quattro"
    | "Cinque"
    | "Sei"
    | "Sette"
    | "Fante"
    | "Cavallo"
    | "Re"
    | "Tre"
    | "Asso";

/**
    La classe Card contiene i seguenti attributi 
    per la corretta istanziazione di una carta:
    - `seed`: il `seme` della carta stabilisce a quale 
        dei 4 semi possibili la carta appartiene (Denari, Coppe, Spade, Bastoni).
    - `figure`: la `figura` stabilisce quale carta viene effettivamente istanziata
        (Due - 0, Tre - 10, Quattro - 0, Cinque - 0, Sei - 0, Sette - 0, Fante - 2, 
        Cavallo - 3, Re - 4, Asso - 11).
    - `value`: il `valore` della carta stabilisce quanti punti vale e, in caso di vincita
        del turno, vengono assegnati al giocatore (vedi sopra: figura - valore).
    - `imgUrl`: attributo che contiene l'url per il caricamento dell'immagine relativa 
        alla carta per la corretta istanziazione grafica.
    - `covered`: se la carta è covered (`coperta`), verrà mostrato il suo retro (back.png).
 */
class Card {
    seed: Seed;
    figure: Figure; 
    value: number;
    imgUrl: string;

    constructor(seed: Seed, figure: Figure, value: number, imgUrl: string) {
        this.seed = seed;
        this.figure = figure;
        this.value = value;
        this.imgUrl = imgUrl;
    }
}

export { Card };
