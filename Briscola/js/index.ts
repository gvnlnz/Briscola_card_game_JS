/*
 * Briscola Game - Classic Italian Card Game
 * Copyright (c) 2025 Lorenzo Gaviani
 * Licensed under the MIT License
 */

import { Game } from "./Game.ts";

const playBtn = document.getElementById("playBtn") as HTMLElement;
playBtn.addEventListener("click", () => {
    const game = new Game();
    game.initGame();
});
