// Tile.Class.js

class Tile {
  constructor(index, size) {
    this.index = index;
    this.size = size;
    this.pattern = randomInt(4); // 0-3
    this.rotation = 0;
    this.flipped = false;
  }

  draw(ctx) {
    let x = (this.index % 4) * this.size;
    let y = Math.floor(this.index / 4) * this.size;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation * Math.PI / 2);
    ctx.scale(this.flipped ? -1 : 1, 1);

    // Draw tile pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    switch (this.pattern) {
      case 0:
        ctx.fillRect(0, 0, this.size, this.size);
        break;
      case 1:
        ctx.fillRect(0, 0, this.size / 2, this.size);
        break;
      case 2:
        ctx.fillRect(0, 0, this.size, this.size / 2);
        break;
      case 3:
        ctx.fillRect(this.size / 2, 0, this.size / 2, this.size);
        break;
    }

    ctx.restore();
  }

  rotate() {
    this.rotation = (this.rotation + 1) % 4;
  }

  mirror() {
    this.flipped = !this.flipped;
  }

  reset() {
    this.pattern = randomInt(4);
    this.rotation = 0;
    this.flipped = false;
  }

  isSymmetric(other) {
    return this.pattern === other.pattern &&
      this.rotation === other.rotation &&
      this.flipped === !other.flipped;
  }
}
