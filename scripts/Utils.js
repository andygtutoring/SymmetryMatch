// Utils.js

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

// Initialize game
const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

// Handle touch events
canvas.addEventListener('touchstart', (event) => {
  game.handleTouch(event);
});


