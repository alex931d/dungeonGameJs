// Player class
class Player {
    static size = 50;
    constructor(x, y, sprite,velocity) {
        this.position = {
            x: 0,
            y: 0
        };
        this.velocity = velocity;
        this.health = 100;
        this.sprite = sprite;
        this.cameraShake = false;
        this.cameraShakeMagnitude = 10;
        this.cameraShakeDuration = 500;
        this.cameraShakeStartTime = 0;
        this.direction = 'idle'; 
        this.animationFrames = playerAnimationFrames[this.direction]; 
        this.frameIndex = 0; 
        this.frameCount = this.animationFrames.length; 
        this.hasKey = false;
    }

    draw() {
        let playerAnimation = this.animationFrames;
        let currentFrame = playerAnimation[currentAnimationFrame];
        if (currentFrame == undefined) {
          currentFrame = playerAnimation[0];
        }
        c.drawImage(currentFrame, this.position.x, this.position.y, Player.size, Player.size);
    }
    update() {
        if (this.cameraShake) {
          const currentTime = Date.now();
          const elapsedTime = currentTime - this.cameraShakeStartTime;
    
          if (elapsedTime < this.cameraShakeDuration) {
            const randomX = (Math.random() - 0.5) * this.cameraShakeMagnitude;
            const randomY = (Math.random() - 0.5) * this.cameraShakeMagnitude;
            c.translate(randomX, randomY); 
            this.direction = 'hurt';
          } else {
            this.cameraShake = false;
            c.setTransform(1, 0, 0, 1, 0, 0); 
          }
        }
      }
      onCollisionWithEnemy() {
        this.cameraShake = true;
        this.cameraShakeStartTime = Date.now();
        setTimeout(() => {
         this.health = 0;
         enemycollied = false
         hurt.play();
         collidedWithBoss = false
         gameConfig.currentMusic.stop();
         gameConfig.currentMusic.play();
          box.innerHTML = "";
          const slot = `
          <div class="slot">
          <img src="./assets/uiElements/ui_heart_full.png">
      </div>
          `;
          for (let i = 0; i < gameConfig.lives; i++) {
            box.innerHTML += slot;
          }
        }, 400); 
      }

    isAlive() {
        if (this.health <= 0) {
            return false;
        } else {
            return true;
        }
    }
}