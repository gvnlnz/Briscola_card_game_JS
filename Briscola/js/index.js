/*
 * Briscola Game - Classic Italian Card Game
 * Copyright (c) 2025 Lorenzo Gaviani
 * Licensed under the MIT License
 */
import { Game } from './Game.js'
import { cardAnimation } from './Utils.js'

cardAnimation()

const playButton = document.getElementById('playButton')
playButton.addEventListener('click', () => {
    const game = new Game()
    game.initGame()
});
