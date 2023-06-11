class Enemy {
    static size = 50;
    constructor({position},sprite) {
         this.position = position
        this.velocity = 2;
        this.sprite = sprite;
        this.animation();
          this.direction = 1; // 1 for normal, -1 for mirrored
    }
    animation() {
        const sprites = [
            loadImage('./assets/enemy/demon/chort_run_anim_f0.png'),
            loadImage('./assets/enemy/demon/chort_run_anim_f1.png'),
            loadImage('./assets/enemy/demon/chort_run_anim_f2.png'),
            loadImage('./assets/enemy/demon/chort_run_anim_f3.png'),
        ];

        let currentSprite = sprites[0];
        let spriteIndex = 0;

        setInterval(() => {
            spriteIndex++;
            if (spriteIndex === 4) {
                spriteIndex = 0;
            }
            currentSprite = sprites[spriteIndex];
            this.sprite = currentSprite;
        }, 200);
    }

    update() {
      map =  loadGame(gameConfig.currentLevelIndex);  
      const nextX = this.position.x + this.velocity;
  
      const nextRow = Math.floor(this.position.y / Boundary.size);
      const nextColumn = Math.floor(nextX / Boundary.size );
        
        if (
            map.secoundlayer[nextRow][nextColumn] === "1" ||
            map.secoundlayer[nextRow + 1][nextColumn] === "1" ||
            map.secoundlayer[nextRow][nextColumn + 1] === "1" ||
            map.secoundlayer[nextRow + 1][nextColumn + 1] === "1"
        ) {
            console.log("Enemy collided with a wall");
            this.velocity *= -1;
            if (this.direction == 1) {
                this.direction = -1
            }
            else{
                this.direction = 1
            }
            return;
        }

        this.position.x = nextX;
    }

    draw() {
        const enemyCanvas = document.createElement('canvas');
        const enemyContext = enemyCanvas.getContext('2d');
        enemyCanvas.width = Enemy.size;
        enemyCanvas.height = Enemy.size;
        if (this.direction === 1) {
            // Normal direction
            enemyContext.drawImage(this.sprite, 0, 0, Enemy.size, Enemy.size);
          } else {
            // Mirrored direction
            enemyContext.scale(-1, 1);
            enemyContext.drawImage(this.sprite, -Enemy.size, 0, Enemy.size, Enemy.size);
          }
        
          c.drawImage(enemyCanvas, this.position.x, this.position.y, Enemy.size, Enemy.size);

      }
    }