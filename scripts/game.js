// game.js

// Import dependencies
import Tile from './tile.js';
import { randomInt } from './utils.js';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tiles = [];
    this.gridSize = 4;
    this.tileSize = canvas.width / this.gridSize;
    this.score = 0;

    // Initialize tiles
    for (let i = 0; i < this.gridSize * this.gridSize / 2; i++) {
      this.tiles.push(new Tile(i, this.tileSize));
    }

    // Draw initial game state
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
      }
    }

    // Draw tiles
    for (let tile of this.tiles) {
      tile.draw(this.ctx);
    }

    // Draw score
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Score: ${this.score}`, 10, 10);
  }

  rotateTile(index) {
    this.tiles[index].rotate();
    this.checkSymmetry();
  }

  mirrorTile(index) {
    this.tiles[index].mirror();
    this.checkSymmetry();
  }

  checkSymmetry() {
    // Check if left half matches right half
    let symmetric = true;
    for (let i = 0; i < this.gridSize * this.gridSize / 2; i++) {
      let leftTile = this.tiles[i];
      let rightTile = this.tiles[i + this.gridSize * this.gridSize / 2];
      if (!leftTile.isSymmetric(rightTile)) {
        symmetric = false;
        break;
      }
    }

    if (symmetric) {
      this.score++;
      this.resetTiles();
    }

    this.draw();
  }

  resetTiles() {
    // Randomly generate new tile patterns
    for (let tile of this.tiles) {
      tile.reset();
    }
  }

  handleTouch(event) {
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;
    let col = Math.floor(x / this.tileSize);
    let row = Math.floor(y / this.tileSize);
    let index = row * this.gridSize + col;

    if (col < this.gridSize / 2) {
      // Rotate tile
      this.rotateTile(index);
    } else {
      // Mirror tile
      this.mirrorTile(index);
    }
  }
}

