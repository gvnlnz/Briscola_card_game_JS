/*
 * Briscola Game - Classic Italian Card Game
 * Copyright (c) 2025 Lorenzo Gaviani
 * Licensed under the MIT License
 */

import { Game } from './Game.js'

const playBtn = document.getElementById('playBtn')
playBtn.addEventListener('click', () => {
    const game = new Game()
    game.initGame()
});