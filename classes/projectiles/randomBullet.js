class Projectile {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.directions = [
        { dx: 0, dy: -1 },    // Up
        { dx: 1, dy: -1 },    // Up-right
        { dx: 1, dy: 0 },     // Right
        { dx: 1, dy: 1 },     // Down-right
        { dx: 0, dy: 1 },     // Down
        { dx: -1, dy: 1 },    // Down-left
        { dx: -1, dy: 0 },    // Left
        { dx: -1, dy: -1 }    // Up-left
      ];
      this.bullets = [];
      this.maxBullets = 8;
    }
  
    update() {
  
      if (this.bullets.length < this.maxBullets) {
        const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
        const bullet = { x: this.x, y: this.y, dx: direction.dx, dy: direction.dy };
        this.bullets.push(bullet);
      }
  
  
      for (let i = 0; i < this.bullets.length; i++) {
        const bullet = this.bullets[i];
        bullet.x += bullet.dx * this.speed;
        bullet.y += bullet.dy * this.speed;
      }
  
     
      this.bullets = this.bullets.filter(bullet => {
        return (
          bullet.x >= 0 &&
          bullet.x <= canvas.width &&
          bullet.y >= 0 &&
          bullet.y <= canvas.height
        );
      });
    }
  
    draw() {
      for (let i = 0; i < this.bullets.length; i++) {
        const bullet = this.bullets[i];
   
       c.fillRect(bullet.x, bullet.y, 5, 5);
      }
    }
  }