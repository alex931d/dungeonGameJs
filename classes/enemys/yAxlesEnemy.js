class goblin{
    static size = 50;
    constructor(x,y,sprite){
      this.position = {
        x: x * goblin.size,
        y: y * goblin.size
    };
    this.velocity = 2;
    this.sprite = sprite;
    this.state = 'moving';
    this.animation();
    }
    update() {
      if (this.state === 'moving') {
      const nextY = this.position.y + this.velocity
      const nextRow = Math.floor(nextY / goblin.size);
      const column = Math.floor(this.position.x / goblin.size);
      map =  loadGame(gameConfig.currentLevelIndex);  
      if (
        map.secoundlayer[nextRow][column] === "1" ||
        map.secoundlayer[nextRow + 1][column] === "1"
      ) {
        console.log("Enemy collided with a wall");
        this.velocity *= -1; 
        this.state = 'idle'
        this.startIdleTimer();
        return;
      }
    
      this.position.y = nextY;
    }
    }
    animation() {
      let sprites = [];
      if (this.state === 'moving') {
       sprites = [
        loadImage('./assets/enemy/orc/orc_warrior_run_anim_f0.png'),
        loadImage('./assets/enemy/orc/orc_warrior_run_anim_f1.png'),
        loadImage('./assets/enemy/orc/orc_warrior_run_anim_f2.png'),
        loadImage('./assets/enemy/orc/orc_warrior_run_anim_f3.png'),
      ];
   }
  else{
     sprites = [
      loadImage('./assets/enemy/orc/idle/orc_warrior_idle_anim_f0.png'),
      loadImage('./assets/enemy/orc/idle/orc_warrior_idle_anim_f1.png'),
      loadImage('./assets/enemy/orc/idle/orc_warrior_idle_anim_f2.png'),
      loadImage('./assets/enemy/orc/idle/orc_warrior_idle_anim_f3.png'),
    ];
   }
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
  startIdleTimer() {
    const idleDuration = Math.random(1,4)
    setTimeout(() => {
      this.state = 'moving';
    }, idleDuration * 1000);
  }
    draw(){
      c.drawImage(this.sprite, this.position.x, this.position.y, goblin.size, goblin.size);
    }
  }