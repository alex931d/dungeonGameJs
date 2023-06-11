const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const box = document.querySelector(".medium-box");
const overlayer = document.querySelector(".overlayer");
const speech = document.querySelector(".dialogElement");
const timerbox = document.querySelector(".timer");
const keyup = document.querySelector(".upKey");
const keyleft = document.querySelector(".leftKey");
const keyright = document.querySelector(".rightKey");
const keydown = document.querySelector(".downKey");
const inventorySlots = document.querySelector(".slots-wrapper");
const inventorySpeed = document.querySelector(".speed");
const inventoryUI = document.querySelector(".inventory");
let doorcollied = false;
let isGamePaused = false;
let isInvetoryActive = false;




var hurt = new Howl({
  src: ['./assets/sounds/hurt.mp3']
});
var win = new Howl({
  src: ['./assets/sounds/win.mp3']
});
var activate= new Howl({
  src: ['./assets/sounds/activated.mp3'],
  volume: 1
});
var power = new Howl({
  src: ['./assets/sounds/powerup.mp3']
});
var pickup = new Howl({
  src: ['./assets/sounds/itempickup.mp3']
});
var explosion = new Howl({
  src: ['./assets/sounds/SFX_Explosion_02.wav']
});
function musicPlayer(file) {
  var sound = new Howl({
    src: [`./assets/sounds/${file}`]
  });
  return sound
}


document.addEventListener("keydown",(event)=>{
    console.log(event.key)
  if (event.key === "t") {
    inventoryUI.classList.toggle("hidden");
    isGamePaused = true
    isInvetoryActive = true;
  }
 if (isInvetoryActive && inventoryUI.classList.contains("hidden")) {
  isGamePaused = false
  isInvetoryActive = false;
  animate()
 }

});




class dialog{
  static area = 2 * 2
  static size = 50;
  static displayHeigth = 30;
  constructor(x,y,width,height,sprite,type){
    this.x = x;
    this.y = y;
    this.width = width
    this.height = height;
    this.sprite = sprite;
    this.isActive = false;
    this.type = type;
    this.sprites = [];
    this.spriteIndex = 0;

  } 
  controller(){
   if (this.isActive) {
    this.animation();
    this.draw();
   }
      const playerCenterX = player.position.x + player.sprite.naturalWidth / 2;
      const playerCenterY = player.position.y + player.sprite.naturalHeight / 2;
      const ElementCenterX = this.x + dialog.size / 2;
      const ElementCenterY = this.y + dialog.size / 2;
  
      const distanceX = Math.abs(playerCenterX - ElementCenterX);
      const distanceY = Math.abs(playerCenterY - ElementCenterY);
     // if player is inside the area then
      if (distanceX <= dialog.size * dialog.area / 2 && distanceY <= dialog.size * dialog.area / 2) {
        this.isActive = true;
      }
      else{
        this,this.spriteIndex = 0;
        this.isActive = false;
      }
  }
  animation(){

    switch (this.type) {
      case 'indecator':
       this.sprites = [
      loadImage('./assets/dialogs/indecator/tile016.png'),
      loadImage('./assets/dialogs/indecator/tile017.png'),
      loadImage('./assets/dialogs/indecator/tile018.png'),
      loadImage('./assets/dialogs/indecator/tile019.png'),
      loadImage('./assets/dialogs/indecator/tile020.png'),
      loadImage('./assets/dialogs/indecator/tile021.png'),
      loadImage('./assets/dialogs/indecator/tile022.png'),
      loadImage('./assets/dialogs/indecator/tile023.png'),

     ];
        break;
    case  'question':
      this.sprites = [
        loadImage('./assets/dialogs/question/tile024.png'),
        loadImage('./assets/dialogs/question/tile025.png'),
        loadImage('./assets/dialogs/question/tile026.png'),
        loadImage('./assets/dialogs/question/tile027.png'),
        loadImage('./assets/dialogs/question/tile028.png'),
        loadImage('./assets/dialogs/question/tile029.png'),
        loadImage('./assets/dialogs/question/tile030.png'),
        loadImage('./assets/dialogs/question/tile031.png'),
  
       ];
      break;
      default:
        break;
    }
  
  
  let currentSprite = this.sprites[0];
 const x = setInterval(() => {
      this.spriteIndex++;
      if (this.spriteIndex === this.sprites.length) {
          this.spriteIndex = this.sprites.length - 1;
          clearTimeout(x);
          return;
      }
      currentSprite = this.sprites[this.spriteIndex];
      this.sprite = currentSprite;
  }, 500);   
   
  }
  draw(){
    c.drawImage(this.sprite, this.x, this.y - dialog.displayHeigth, this.width, this.height);
  }
}

class Square{
  static normal = 50;
  static large = 100;
  constructor(x,y,width,height,color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.animation();
  }
  animation(){
    const sprites = [
     "red",
     "white"
  ];

  let currentColor = sprites[0];
  let colorIndex = 0;

  setInterval(() => {
      colorIndex++;
      if (colorIndex === sprites.length) {
          colorIndex = 0;
      }
      currentColor = sprites[colorIndex];
      this.color = currentColor;
    }, 200);
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, Square.normal, Square.normal);
  }
} 
class Boss {
  static bossSize = 100;
  constructor(x, y, width, height,sprite) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isAlive = true;
    this.isAttacking = false;
    this.attackCooldown = 10000; 
    this.lastAttackTime = 0;
    this.attackTypes = ['magicBullets','spikes']; 

    this.spikes= [
      [       
      ['1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', 's', '0', 's', '0', 's', '0', '1'],
      ['1', '0', 's', '0', 's', '0', 's', '1'],
      ['1', 's', '0', 's', '0', 's', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1'],
    ],
    [       
      ['1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', 's', '0', 's', '0', 's', '0', '1'],
      ['1', '0', 's', '0', 's', '0', 's', '1'],
      ['1', 's', '0', 's', '0', 's', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1'],
    ],
    [       
      ['1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', '0', '0', '0', '0', '0', '0', '1'],
      ['1', 's', '0', 's', '0', 's', '0', '1'],
      ['1', '0', 's', '0', 's', '0', 's', '1'],
      ['1', 's', '0', 's', '0', 's', '0', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1'],
    ],
    ];
    this.currentAttack = '';
    this.health = 100;
    this.sprite = sprite
    this.idle = true;
    this.runLeft = false;
    this.runRight = false;
    this.vx = 0;
    this.vy = 0;   
    this.sprites = [];
    
     this.animation();
  }

  update(playerX,playerY) {
    if (!this.isAlive) {
      return;
    }

    if (Math.random() < 0.01) {
      this.vx = Math.random() - 2;
      this.vy = Math.random() - 2; 
    }

    this.x += this.vx;
    this.y += this.vy;

    if (Math.random() < 0.01) {
      this.vx = 0;
      this.vy = 0;
    }

    if (this.vx == 0 || this.vy == 0) {
      this.idle = true;
      this.runLeft = false;
      this.runRight = false;
      this.sprites = [
        loadImage('./assets/enemy/boss/idle/big_demon_idle_anim_f0.png'),
        loadImage('./assets/enemy/boss/idle/big_demon_idle_anim_f1.png'),
        loadImage('./assets/enemy/boss/idle/big_demon_idle_anim_f2.png'),
        loadImage('./assets/enemy/boss/idle/big_demon_idle_anim_f3.png'),
      ];
 
    } else if (this.vx < 0) {
      this.runLeft = true
      this.idle = false;
      this.runRight = false;
      this.sprites = [
        loadImage('./assets/enemy/boss/run/big_demon_run_anim_f0.png'),
        loadImage('./assets/enemy/boss/run/big_demon_run_anim_f1.png'),
        loadImage('./assets/enemy/boss/run/big_demon_run_anim_f2.png'),
        loadImage('./assets/enemy/boss/run/big_demon_run_anim_f3.png'),
    ];

    }
    else if(this.vx > 0){
     this.runRight = true;
     this.idle = false;
     this.runLeft = false;
     this.sprites = [
      loadImage('./assets/enemy/boss/run/big_demon_run_anim_f0.png'),
      loadImage('./assets/enemy/boss/run/big_demon_run_anim_f1.png'),
      loadImage('./assets/enemy/boss/run/big_demon_run_anim_f2.png'),
      loadImage('./assets/enemy/boss/run/big_demon_run_anim_f3.png'),
  ];

    }
    else{

    }

    
      const currentTime = Date.now();
      if (currentTime - this.lastAttackTime >= this.attackCooldown) {
        this.lastAttackTime = currentTime;  
        this.isAttacking = true;

      }

      if (this.isAttacking) {

        this.currentAttack = this.attackTypes[Math.floor(Math.random() * this.attackTypes.length)];
        this.attack();
        this.isAttacking = false;

      }
  }
      
          attack() {
            switch (this.currentAttack) {
              case 'magicBullets':
                // console.log("shoot")
                // Projectiles = [];
                // Projectiles.push(new Projectile(this.x,this.y,5));
                break;
              case 'spikes':
               map =  loadGame(gameConfig.currentLevelIndex);         
               map.secoundlayer =  this.spikes[Math.floor(Math.random() * this.spikes.length)];
               traps = [];
                setTimeout(() => { 
                  map.secoundlayer.forEach((row, i) => {
                    row.forEach((number, y) => {
                      if (number === 's') {
                        squares.push(new Square(Square.normal * y, Square.normal * i,50,50, 'red'))
                      }
                    });
                  });
                }, 2000);
                setTimeout(() => {
                   squares = [];
                  map.secoundlayer.forEach((row, i) => {
                    row.forEach((number, y) => {
                      if (number === 's') {
                        traps.push(
                          new Trap({
                            position: {
                              x: Boundary.size * y,
                              y: Boundary.size * i
                            },
                            img: tileImages[12],
                          })
                        );
                      }
                    });
                  });   
                 setTimeout(()=>{
                  traps = [];
                  map.secoundlayer = [];
                  map.secoundlayer =  [
                   ['1', '1', '1', '1', '1', '1', '1', '1'],
                    ['1', '0', '0', '0', '0', '0', '0', '1'],
                    ['1', '0', '0', '0', '0', '0', '0', '1'],
                    ['1', 's', '0', 's', '0', 's', '0', '1'],
                    ['1', '0', 's', '0', 's', '0', 's', '1'],
                    ['1', 's', '0', 's', '0', 's', '0', '1'],
                    ['1', '0', '0', '0', '0', '0', '0', '1'],
                    ['1', '0', '0', '0', '0', '0', '0', '1'],
                    ['1', '1', '1', '1', '1', '1', '1', '1'],      
                    ];
                 },3000)
                }, 6000); 
                break;
            }
          }
  
  collisonWithPlayer(playerX,playerY){
    if (
    !collidedWithBoss &&
    playerY + player.sprite.naturalHeight >= this.y &&
    playerY <= this.y + Boss.bossSize &&
    playerX + player.sprite.naturalWidth>= this.x &&
    playerX <= this.x + Boss.bossSize
    ) {
    
      collidedWithBoss = true;  
      player.onCollisionWithEnemy();

    }

  }
  collisionWithWall(boundary){
    if (
      this.y + this.vy + Boss.bossSize > boundary.position.y &&
      this.y + this.vy < boundary.position.y + boundary.height &&
      this.x + this.vx + Boss.bossSize > boundary.position.x &&
      this.x + this.vx < boundary.position.x + boundary.width
  ) {
    console.log("collison with wall")
    this.vx *= -1;
    this.vy *= -1;
    this.x += this.vx;
    this.y += this.vy;
   }
  }
  animation(){

  let currentSprite =this.sprites[0];
  let spriteIndex = 0;

  setInterval(() => {
      spriteIndex++;
      if (spriteIndex === 4) {
          spriteIndex = 0;
      }
      currentSprite =this.sprites[spriteIndex];
      this.sprite = currentSprite;
  }, 200);
  }
  isAlive() {
    if (this.health > 0) {
      return true;
    }
    return false;
  }
  drawUi() {
    c.fillStyle = "red";
    c.fillRect(this.x, this.y, 100, 10);
    const innerBoxWidth = (this.health / 100) * 100;
    c.fillStyle = "green";
    c.fillRect(this.x , this.y, innerBoxWidth, 10);
  }

  draw() {
    if (!this.isAlive) {
      return;
    }
    if (this.runLeft) {
      c.save();
      c.scale(-1, 1);
      c.drawImage(this.sprite, -this.x - this.width, this.y, this.width, this.height);
      c.restore();
    } else {
      c.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  

  }
}


function countdown(timeToCountTo) {

  const interval = setInterval(function() {  
  let now = new Date().getTime();
    let distance = timeToCountTo - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      clearInterval(interval);
      timerbox.innerHTML = ``
      return
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "white";
    c.font = "30px Arial";
    timerbox.innerHTML = `<span>effect: ${minutes}.${seconds}</span>`
    // c.fillText(`effect last: ${minutes}  ${seconds}`, canvas.width - 130,30);
  },1000);
}

class Boundary {
    static size = 50;
    constructor({position, img}) {
        this.position = position;
        this.img = img;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        c.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
}
class Item {
  static size = 50;
  constructor(sprite, x, y,action,desciption,title,rareity,type) {
    this.sprite = sprite;
    this.position = { x, y };
    this.action = action;
    this.activated = false;
    this.desciption = desciption;
    this.title = title
    this.rareity = rareity;
    this.type = type;
  }
  renderItem(){
    c.drawImage(tileImages[22], player.position.x, player.position.y - Player.size / 2 + 5, Item.size, Item.size);
  }
  draw() {
    c.drawImage(this.sprite, this.position.x, this.position.y,Item.size,Item.size);
  }

}
class Inventory {
  constructor() {
    this.items = [];
    this.maxItemsInSlots = 4;
    this.maxItems = 15;
    this.slotSize = 50;
    this.slotPositions = [];
    this.initSlotPositions();
  }
  updateUi(){    
      inventorySpeed.innerHTML = player.velocity;
    inventorySlots.innerHTML = ""
    this.items.forEach((position, index) => {
      const item = this.items[index];    
      if (item) {    
  
        inventorySlots.innerHTML += `
        <div class="item tooltip">
          <div class="item-image" draggable="true"   
          ondragstart="inventory.dragStart(event, ${index})"
          ondragover="inventory.dragOver(event, ${index})"
          ondragend="inventory.dragEnd()" style="background-image: url(${item.sprite.src});"></div>
              <div class="equipt-box">
                  <span>${index +1}</span>
              </div>
              <div class="top">
              <fieldset>
              <legend class="${item.rareity}">${item.type}</legend>
              <h3>${item.title}</h3>
              <p>${item.desciption}</p>
              <i></i>
              </fieldset>
          </div>
          </div>
      `;
      
      }
    });
    for (let i = 0; i < this.maxItems - this.items.length; i++) {
      inventorySlots.innerHTML += `
      <div class="item">

        </div>
    `;
      
    }
  }
  initSlotPositions() {

    const startX = canvas.width - this.slotSize * 5;
    const startY = 10;
    const paddingX = 10;

    for (let i = 0; i < this.maxItemsInSlots; i++) {
      const posX = startX + (this.slotSize + paddingX) * i;
      const posY = startY;
      this.slotPositions.push({ x: posX, y: posY });
    }
    for (let i = 0; i < this.maxItems; i++) {
      inventorySlots.innerHTML += `
      <div class="item">

        </div>
    `;
      
    }
  
  }
  dragStart(event, index) {
    this.draggedItemIndex = index;
    event.dataTransfer.setData("text/plain", ""); // Required for Firefox
    event.dataTransfer.dropEffect = "move";
    
  }

  dragOver(event, index) {
    event.preventDefault();
    this.draggedOverIndex = index;

  }

  dragEnd() {
    if (this.draggedItemIndex !== null && this.draggedOverIndex !== null) {
      this.swapItems(this.draggedItemIndex, this.draggedOverIndex);
    }
    this.draggedItemIndex = null;
    this.draggedOverIndex = null;
    this.updateUi();

  }

  swapItems(index1, index2) {
    const item1 = this.items[index1];
    const item2 = this.items[index2];
    this.items[index1] = item2;
    this.items[index2] = item1;
    this.draw()
  }
  useItem(index){
      const item = this.items[index];

      switch (item.action) {
        case "speed":
          flashScreen()
          const now = new Date().getTime();
          countdown(now + 60000)
          player.velocity += 2;
          setTimeout(() => {
            player.velocity -= 2;
          }, 60000); 
          break;
          case "health":
            flashScreen()
             gameConfig.lives++;
            break;
            case "key":
              player.hasKey = true;
              break;
              case "bomb":
                item.activated = true;
                equiples.push(item);
                break;
        default:
          break;
      }
      power.play()
     this.removeItem(index);
     this.updateUi();
  }

  addItem(item) {
    if (this.items.length >= this.maxItems) {    
    document.querySelector(".error-box").classList.add("fade-out");  
      document.querySelector(".error-box").classList.remove("hide");
 
      setTimeout(() => {
        document.querySelector(".error-box").classList.add("hide");
         document.querySelector(".error-box").classList.remove("fade-out");
      }, 2000); 
      return;
    }
    else{
   this.items.push(item);
    this.updateUi();
    return;
    }
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      const removedItem = this.items.splice(index, 1)[0];
      return removedItem;
    }
    return null;
  }

  draw() {

    this.slotPositions.forEach((position, index) => {
      const item = this.items[index];    
      if (item) {    
        
        c.drawImage(item.sprite, position.x, position.y, this.slotSize, this.slotSize);
      }

      c.strokeStyle = "white";
      c.strokeRect(position.x, position.y, this.slotSize, this.slotSize);
    });
  }
}
class Tile {
    static size = 50;
    constructor(x, y,width,height, image) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.image = image;
    }
  
    draw() {
      c.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    explosin(tile) {
      const fuseFrames = [
        loadImage('./assets/objects/bomb/bomb_f0.png'),
        loadImage('./assets/objects/bomb/bomb_f1.png'),
        loadImage('./assets/objects/bomb/bomb_f2.png'),
      ];
      const explosionFrames = [
        loadImage('./assets/objects/bomb/explosin/tile000.png'),
        loadImage('./assets/objects/bomb/explosin/tile001.png'),
        loadImage('./assets/objects/bomb/explosin/tile002.png'),
        loadImage('./assets/objects/bomb/explosin/tile003.png'),
        loadImage('./assets/objects/bomb/explosin/tile004.png'),
        loadImage('./assets/objects/bomb/explosin/tile005.png'),
        loadImage('./assets/objects/bomb/explosin/tile006.png'),
        loadImage('./assets/objects/bomb/explosin/tile007.png'),
        loadImage('./assets/objects/bomb/explosin/tile008.png'),
        loadImage('./assets/objects/bomb/explosin/tile009.png'),
        loadImage('./assets/objects/bomb/explosin/tile010.png'),
        loadImage('./assets/objects/bomb/explosin/tile011.png'),
      ];
  
      let currentFrame = 0;
      const tileIndex = explodeAbleTilesArray.indexOf(tile)
      const animateFuse = () => {
        if (currentFrame < fuseFrames.length) {
          this.image = fuseFrames[currentFrame];
          currentFrame++;
          setTimeout(animateFuse, 1000);
        } else {
          currentFrame = 0;
          animateExplosion();
       explodeAbleTilesArray[tileIndex].height = 100;
       explodeAbleTilesArray[tileIndex].width = 100;
       const tileToUpdate = explodeAbleTilesArray[tileIndex];
       
       const widthDifference = tile.width - tileToUpdate.width;
       const heightDifference = tile.height - tileToUpdate.height;
       
       tileToUpdate.x += widthDifference - 50 / 2;
       tileToUpdate.y += heightDifference - 50 / 2;
       explosion.play();
        }
      };
  
      const animateExplosion = () => {    
       

        if (currentFrame < explosionFrames.length) {
          this.image = explosionFrames[currentFrame];
          currentFrame++;
          setTimeout(animateExplosion, 150);
        }
        else{
          
          map =  loadGame(gameConfig.currentLevelIndex);  
          map.secoundlayer =  this.bombFunctionUpdateArray(map.secoundlayer);
         boundaries = [];
         map.secoundlayer.forEach((row, i) => {
          row.forEach((number, y) => {
            switch (number) {
              case '1':
                boundaries.push(
                  new Boundary({
                    position: {
                      x: Boundary.size * y ,
                      y: Boundary.size * i 
                    },
                    img: tileImages[0],
                  })
                );
                break;
            }
          })
         })
        }
      };
  
      animateFuse();
    }
    
    bombFunctionUpdateArray(grid) {
      // find all rows and collumns that has x 
      let xRow, xCol;
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === 'x') {
            xRow = i;
            xCol = j;
            break;
          }
        }
      }
     // replace 1 with 0
      for (let i = xRow - 1; i <= xRow + 1; i++) {
        for (let j = xCol - 1; j <= xCol + 1; j++) {
          if (grid[i][j] === '1') {
            grid[i][j] = '0';
          }
        }
      }
    // return the modifiy array
      return grid;
    }
  
  }
  class trader{
    static size = 50;
    static text = `<span>press <span class="highlight">e</span> to open shop</span>`;
    static area = 2 * 2;
    constructor({position},image,activated){
      this.position = position
      this.image = image
      this.activated = activated
      this.animation();
      this.itemToSell();
      this.sellerInventory = [];
    }
    draw(){
      c.drawImage(this.image,this.position.x,this.position.y,trader.size,trader.size);
    }
    isActivated(){
      speech.classList.add("hide")
    }
    itemToSell(){ 
      const sellerInventory = [];
       const  shop = document.querySelector(".seller-shop-main-items");
       shop.innerHTML = "";
      fetch("./assets/items.json")
      .then((response) => response.json())
      .then(function(data){
        const itemCount = Math.floor(Math.random() * 5) + 3; // Random number between 3 and 7
        const rarityChances = {
          common: 0.8,  
          rare: 0.5,  
        };
        const itemKeys = Object.keys(data.items);
        for (let i = 0; i < itemCount; i++) {
          const randomKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
      const randomItem = data.items[randomKey];
          console.log(data.items)
          if (randomItem.about.type !== "puzzle") {
            const rarityChance = rarityChances[randomItem.about.rareity] || 1;
            if (Math.random() < rarityChance) {
              const item = new Item(
                loadImage(randomItem.sprite),
                0,
                0,
                randomItem.action,
                randomItem.about.description,
                randomItem.about.title,
                randomItem.about.rarety,
                randomItem.about.type
              );
              
               sellerInventory.push(item)
              const itemElement = document.createElement("div");
              itemElement.classList.add("seller-item", "tooltip");
              itemElement.innerHTML = `
                <div class="price-box">
                  <small>10</small>
                </div>  
                <div class="item-image" style="background-image: url(${item.sprite.src});"></div>
                <div class="price">
                  <button class="buy-btn">buy</button>
                </div>
              `;
              shop.appendChild(itemElement);
              const buyButton = itemElement.querySelector(".buy-btn");
              buyButton.addEventListener("click", () => {
                inventory.addItem(item);  
                const itemIndex =  sellerInventory.indexOf(item);
                if (itemIndex > -1) {
                  sellerInventory.splice(itemIndex, 1);
                }
                itemElement.remove();
              });
            }
          }
        }

      });

       

    
    }
    update() {
      const playerCenterX = player.position.x + player.sprite.naturalWidth / 2;
      const playerCenterY = player.position.y + player.sprite.naturalHeight / 2;
      const traderCenterX = this.position.x + trader.size / 2;
      const traderCenterY = this.position.y + trader.size / 2;
  
      const distanceX = Math.abs(playerCenterX - traderCenterX);
      const distanceY = Math.abs(playerCenterY - traderCenterY);
  
      if (distanceX <= trader.size * trader.area / 2 && distanceY <= trader.size * trader.area / 2) {
        speech.innerHTML = trader.text;
        if (!this.activated) {
          speech.classList.remove("hide");
        }
         const test = document.addEventListener('keyup', (event) => {
            if (event.key == 'e') {
             this.activated = true;
             this.isActivated();
              document.querySelector(".seller-shop").classList.toggle("hide");
             return;
             }
            });
      }   
      else{
        speech.classList.add("hide");
      }
      }
    
  
    animation(){
      const sprites = [
        loadImage('./assets/objects/trader/dwarf_m_idle_anim_f0.png'),
        loadImage('./assets/objects/trader/dwarf_m_idle_anim_f1.png'),
        loadImage('./assets/objects/trader/dwarf_m_idle_anim_f2.png'),
        loadImage('./assets/objects/trader/dwarf_m_idle_anim_f3.png'),
    ];

    let currentSprite = sprites[0];
    let spriteIndex = 0;

    setInterval(() => {
        spriteIndex++;
        if (spriteIndex === 4) {
            spriteIndex = 0;
        }
        currentSprite = sprites[spriteIndex];
        this.image = currentSprite;
    }, 200);
    }
  }
  class chest {
    static size = 50;
    static text = `<span>click <span class="highlight">e</span> to open</span>`;
    static area = 3 * 3;
    constructor({position},image,activated){
      this.position = position
      this.image = image
      this.activated = activated
    }
    draw(){
      c.drawImage(this.image,this.position.x,this.position.y,chest.size,chest.size);
    }
    isActivated(){
      if (this.activated) {
         this.animation();
      }
    }
    animation(){
       if (this.activated) {
        
     
       const sprites =[
        loadImage('./assets/objects/chest/chest_full_open_anim_f0.png'),
        loadImage('./assets/objects/chest/chest_full_open_anim_f1.png'),
        loadImage('./assets/objects/chest/chest_full_open_anim_f2.png'),
       ]
       let currentSprite = sprites[0];
       if (this.activated) {
           currentSprite = sprites[2];
       }
       else{
           currentSprite = sprites[0];
       }   
        this.image = currentSprite;  
    }  
  }
  }
  class button{
    static size = 50;
    static text = `<span>click <span class="highlight">e</span> to activate</span>`;
    constructor({position},image,activated,key){
      this.position = position
      this.image = image
      this.activated = activated
      this.key = key
    }
    draw(){
      c.drawImage(this.image,this.position.x,this.position.y,button.size,button.size);
  }
  isActivated(){
    if (this.activated) {
      activate.play()
      this.animation();
      largeDoors.forEach((door)=>{
        if (door.uniqueKey ===this.key) {
          door.open = true;
        }
      })
    }
  }
  animation(){
    const sprites = [
        loadImage('./assets/objects/actions/button/buttonClosed.png'),
        loadImage('./assets/objects/actions/button/buttonOpen.png')
    ];
    
    let currentSprite = sprites[0];
    if (this.activated) {
        currentSprite = sprites[1];
    }
    else{
        currentSprite = sprites[0];
    }   
     this.image = currentSprite;  
   }
 }
  class largeDoor{
    static size = 100;
    constructor({position},image,uniqueKey){
        this.position = position;
        this.image = image;
        this.open = false;
        this.uniqueKey = uniqueKey
    }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y,largeDoor.size,largeDoor.size);
    }
    isOpen(){
     if (this.open) {
        this.animation();
        return true;
     }
     else{
       return false;
     }
    }
   animation(){
    const sprites = [
        loadImage('./assets/objects/largedoor/doorClosed.png'),
        loadImage('./assets/objects/largedoor/doorOpen.png')
    ];
    
    let currentSprite = sprites[0];
    if (this.open) {
        currentSprite = sprites[1];
    }
    else{
        currentSprite = sprites[0];
    }   
     this.image = currentSprite;  
   }
  }
  class Trap {
    static size = 50
    constructor({position,img}){
        this.position = position
        this.img = img
        this.animation();
    }
    animation(){
        const sprites = [
            loadImage('./assets/map/spikes/floor_spikes_anim_f0.png'),
            loadImage('./assets/map/spikes/floor_spikes_anim_f1.png'),
            loadImage('./assets/map/spikes/floor_spikes_anim_f2.png'),
            loadImage('./assets/map/spikes/floor_spikes_anim_f3.png'),
        ];
        
        let currentSprite = sprites[0];
        let spriteIndex = 0;
        setInterval(() => {
            spriteIndex++;
            if (spriteIndex === sprites.length) {
                spriteIndex = 0;
            }
            currentSprite = sprites[spriteIndex];
            this.img = currentSprite;
        }, 600);

    }
    draw(){
        c.drawImage(this.img, this.position.x, this.position.y, Trap.size, Trap.size);
    }
  }
class Door {
    static size = 50;
    constructor({position, img}) {
        this.position = position;
        this.img = img;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        c.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
    update(playerSpriteWidth,playerSpriteHeight) {

        if (
           !doorcollied &&
            player.position.y + playerSpriteHeight >= this.position.y &&
            player.position.y <= this.position.y + this.height &&
            player.position.x + playerSpriteWidth >= this.position.x &&
            player.position.x <= this.position.x + this.width
        ) {
    gameConfig.currentMusic.stop()
           gameConfig.currentLevelIndex++;  
                restart();
            pauseGame();            
            overlayer.classList.remove("hide");
            overlayer.querySelector(".levelname").innerHTML = gameConfig.levels[`level${gameConfig.currentLevelIndex}`].levelName
            doorcollied = true  
            isGamePaused = true;  
            gameConfig.currentMusic.stop()
            if (loadGame(gameConfig.currentLevelIndex).theme == "normal") {
            document.querySelector("body").style.backgroundColor = "#222";
            }
            else{
              document.querySelector("body").style.backgroundColor = "#ACB6BA";
           }
        }
    }
}



function pauseGame(){
  overlayer.addEventListener("click",()=>{     
     map =  loadGame(gameConfig.currentLevelIndex);  

     drawMap();
     overlayer.classList.add("hide");
     gameConfig.score++;
     win.play()
     gameConfig.currentMusic =  musicPlayer(map.music);
     gameConfig.currentMusic.play();
     doorcollied = false;
     isGamePaused = false;
     animate();
  
  });
}

const playerAnimationFrames = {
    right: [
      loadImage('./assets/player/run/knight_m_run_anim_f0.png'),
      loadImage('./assets/player/run/knight_m_run_anim_f1.png'),
      loadImage('./assets/player/run/knight_m_run_anim_f2.png'),
      loadImage('./assets/player/run/knight_m_run_anim_f3.png'),

    ],
    left: [
        loadImage('./assets/player/run/left/knight_m_run_anim_f0.png'),
        loadImage('./assets/player/run/left/knight_m_run_anim_f1.png'),
        loadImage('./assets/player/run/left/knight_m_run_anim_f2.png'),
        loadImage('./assets/player/run/left/knight_m_run_anim_f3.png'),

    ],
    idle: [
      loadImage('./assets/player/idle/knight_m_idle_anim_f0.png'),
      loadImage('./assets/player/idle/knight_m_idle_anim_f1.png'),
      loadImage('./assets/player/idle/knight_m_idle_anim_f2.png'),
      loadImage('./assets/player/idle/knight_m_idle_anim_f3.png')

    ],
    hurt:[
        loadImage('./assets/player/hit/knight_m_hit_anim_f0.png')
    ]
  };

const GameState = {
    MENU: 0,
    PLAYING: 1,
    GAME_OVER: 2,
  };
  
  let gameState = GameState.MENU;

let arrowKeys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  };
let themes ={
  TRADER: "trader",
  NORAML: "normal"
}
  // game config
let gameConfig = {
    score: 0,
    lives: 2,
    currentLevelIndex: 3,  
    currentMusic: musicPlayer('i dont really fucking know'),
    coins: 0,
    levels: {
        level1:{
          levelName: "a jurney begins",
           music: "mainmusic.mp3",
           theme: themes.NORAML,
           firstlayer: [
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0']
        ],
          secoundlayer: [
            ['1', '1', '1', '1', '1', '1', '1', '1'],
            ['1', '0', '0', '0', '0', '0', '0', '1'],
            ['1', '0', '$', '0', '0', '0', '0', '1'],
            ['1', '0', '0', '*', '0', '0', '0', '1'],
            ['1', '0', '0', '0', '0', '0', '0', '1'],
            ['1', '0', '0', '0', '0', '0', '0', '1'],
            ['1', '0', '0', '0', '*', '0', '0', '1'],
            ['1', '4', '0', '0', '0', '0', '0', '1'],
            ['1', '1', '1', '1', '1', '1', '1', '1']
        ],
        thridlayer:[
          ['0', 'c', '0', '0', '0', '0', 'c', '0'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['0', 'h', '0', '0', '0', 'b', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0', '0'],
          ['0', '0', '0', '0', '0', '0', '0', '0']
          ]
        },
    level2: {
      levelName: "the journey extens",
      music: "mainmusic.mp3",
      theme: themes.NORAML,
       firstlayer: [
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0']
    ],
      secoundlayer: [
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '$', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '0', '0', '1'],
        ['1', '*', 'b', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '*', '0', '1'],
        ['1', 'g', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', 's', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', 'd', '0', '0', '1'],
        ['1', '1', '1', '1', '0', '0', '1', '1'],
        ['1', '0', 's', '0', '0', '0', '0', '1'],
        ['1', '4', '0', '0', '0', '0', 'c', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1']
    ],
    thridlayer:[
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', 'h', 'h', 'b', 'h', 'h', '0', '0'],
        ['0', 'c', '0', '0', 'c', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0']
      ]
    },
    level3:{
      levelName: "the trader",
       music: "trader.wav",
       theme: themes.NORAML,
       firstlayer: [
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0']
    ],
      secoundlayer: [
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '$', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '^', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '4', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1']
    ],
    thridlayer:[
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0']
      ]
    },
    level4:{
      levelName: "the exploder",
       music: "mainmusic.mp3",
       theme: themes.NORAML,
       firstlayer: [
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0']
    ],
      secoundlayer: [
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '$', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', 'x', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '4', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1']
    ],
    thridlayer:[
      ['0', 'c', '0', '0', '0', '0', 'c', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', 'b', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0']
      ]
    },
    level5:{
      levelName: "the boss battle",
       music: "bossbattle.wav",
       theme: themes.NORAML,
       firstlayer: [
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0']
    ],
      secoundlayer: [
        ['1', '1', '1', '1', '1', '1', '1', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '$', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', 'Ø', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '0', '0', '0', '0', '0', '0', '1'],
        ['1', '1', '1', '1', '1', '1', '1', '1']
    ],
    thridlayer:[
      ['0', 'c', '0', '0', '0', '0', 'c', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0']
      ]
    },
 }
 }
gameConfig.currentMusic = musicPlayer(loadGame(gameConfig.currentLevelIndex).music)


let map;

function restart() {
   enemies = [];
   boundaries = [];
   doors = [];
   items = [];
   firstlayerArray = [];
   traps = [];
   largeDoors = [];
   buttons = [];
   goblins = [];
   chests = [];
   thridlayerArray = [];
   traders = [];
   explodeAbleTilesArray = [];
   bosses = [];
   squares = [];
   Projectiles = [];
    dialogs = [];
}
function loadGame(currentLevelIndex) {

   const levelName = `level${currentLevelIndex}`;
   let level
   level = gameConfig.levels[levelName];
   return level;
}

function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

const tileImages = [
    loadImage('./assets/map/wall_mid.png'),
    loadImage('./assets/map/wall_left.png'),
    loadImage('./assets/map/floor_stairs.png'),
    loadImage('./assets/player/tile076.png'),
    loadImage('./assets/enemy/demon/chort_run_anim_f0.png'),
    loadImage('./assets/map/floor_1.png'),
    loadImage('./assets/map/wall_outer_mid_right.png'), // 5
    loadImage('./assets/map/wall_outer_mid_left.png'), // 6
    loadImage('./assets/map/wall_outer_top_left.png'), // 2
    loadImage('./assets/map/wall_outer_top_right.png'), //  1
    loadImage('./assets/map/wall_top_left.png'), // 4, 3
    loadImage('./assets/map/none.png'), // none tile
    loadImage('./assets/map/spikes/floor_spikes_anim_f0.png'),
    loadImage('./assets/objects/largedoor/doorClosed.png'),
    loadImage('./assets/objects/actions/button/buttonClosed.png'),
    loadImage('./assets/enemy/orc/orc_warrior_run_anim_f0.png'),
    loadImage('./assets/objects/chest/chest_full_open_anim_f0.png'),
    loadImage('./assets/objects/trader/dwarf_m_idle_anim_f0.png'),
    loadImage('./assets/map/wall_edge_tshape_bottom_left.png'), //  edge
    loadImage('./assets/map/wall_edge_tshape_bottom_right.png'), //  edge
    loadImage('./assets/objects/column_wall.png'), //  column wall
    loadImage('./assets/objects/obtainables/flask_big_blue.png'),
    loadImage('./assets/objects/bomb/bomb_f0.png'),
    loadImage('./assets/map/hole.png'),
    loadImage('./assets/enemy/boss/idle/big_demon_idle_anim_f0.png'),
];
// Calculate the center coordinates of the canvas
const canvasCenterX = canvas.width / 2;
const canvasCenterY = canvas.height / 2;

// Calculate the top-left coordinates of the map

let items = [];
let enemies = [];
let boundaries = [];
let doors = [];
let firstlayerArray = [];
let thridlayerArray = [];
let traps = [];
let largeDoors = [];
let bosses = [];
let buttons = [];
let goblins = [];
let chests = [];
let traders = [];
let equiples = [];
let squares =[];
let Projectiles = [];
let dialogs = [];
let gameover = false;
let explodeAbleTilesArray = [];
map = loadGame(gameConfig.currentLevelIndex).secoundlayer
const numberOfColumns = map.length;
const numberOfRows = map.length;

const tileSize = 50; 
const mapWidth = numberOfColumns * tileSize;
const mapHeight = numberOfRows * tileSize;
function drawMap() {
  let gamemap = loadGame(gameConfig.currentLevelIndex)
  let firstlayer = gamemap.firstlayer;
  let secoundlayer = gamemap.secoundlayer;
  let thridlayer = gamemap.thridlayer;
  c.clearRect(0, 0, canvas.width, canvas.height);
  firstlayer.forEach((row, i) => {
    row.forEach((number, y) => {
      switch (number) {
        case '0':
          if (loadGame(gameConfig.currentLevelIndex).theme == "normal") {
               firstlayerArray.push(
                new Tile(Tile.size * y  , Tile.size * i ,50,50, tileImages[5])
              );
          }
          else{
                    firstlayerArray.push(
                 new Tile(Tile.size * y  , Tile.size * i ,50,50, loadImage('./assets/map/indoor/floor.png'))
               );
          }
          break;
        default:
          break;
      }
    });
  });

  secoundlayer.forEach((row, i) => {
    row.forEach((number, y) => {
      switch (number) {
        case '1':
          if (loadGame(gameConfig.currentLevelIndex).theme == "normal") {
                      boundaries.push(
            new Boundary({
              position: {
                x: Boundary.size * y ,
                y: Boundary.size * i 
              },
              img: tileImages[0],
            })
          );
          }
          else{
          boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.size * y ,
                  y: Boundary.size * i 
                },
                img:  loadImage('./assets/map/indoor/walls/tile043.png'),
              })
            );
          }
          break;

        case '$':
          player.position.x = Boundary.size * y;
          player.position.y = Boundary.size * i;
          player.draw();
          break;
          
        case '*':
          const enemy = new Enemy({position: {
            x: Enemy.size * y,
            y: Enemy.size * i 
          }}, tileImages[4]);
          enemies.push(enemy);
          break;
        case '4':
          if (loadGame(gameConfig.currentLevelIndex).theme == "normal") {
                 doors.push(
            new Door({
              position: {
                x: Boundary.size * y ,
                y: Boundary.size * i 
              },
              img: tileImages[2],
            })
          );
          }
          else{
                doors.push(
              new Door({
                position: {
                  x: Boundary.size * y ,
                  y: Boundary.size * i 
                },
                img: loadImage('./assets/map/indoor/stairs.png'),
              })
            );
          }
          break;
          case 'g':
            goblins.push(
             new goblin(y, i, tileImages[15])
            );
            break;
          case 'b':
            buttons.push(
              new button({
                position: {
                  x: button.size * y ,
                  y: button.size * i 
                },
                
              },
               tileImages[14],
               false,
              "ff1" 
              )
            );
            dialogs.push(
             new dialog(
              button.size * y, button.size * i,40,30,tileImages[10],'indecator'
             )
            );
            break;
            case 'c':
              chests.push(
                new chest({
                  position: {
                    x: chest.size * y ,
                    y: chest.size * i 
                  },
                  
                },
                 tileImages[16],
                 true
                )
              );
              dialogs.push(
                new dialog(
                  chest.size  * y, chest.size  * i,40,30,tileImages[10],'indecator'
                )
              );
              break;
              case '^':
                traders.push(
                  new trader({
                    position: {
                      x: trader.size * y ,
                      y: trader.size * i 
                    },
                    
                  },
                   tileImages[17],
                   false
                  )
                );
                dialogs.push(
                  new dialog(
                    trader.size  * y, trader.size  * i,40,30,tileImages[10],'indecator'
                  )
                );
                break;
          case 's':
            traps.push(
              new Trap({
                position: {
                  x: Boundary.size * y ,
                  y: Boundary.size * i 
                },
                img: tileImages[12],
              })
            );
            break;
            case 'd':
                largeDoors.push(
                    new largeDoor({
                        position: {
                          x: largeDoor.size * y /2 ,
                          y: largeDoor.size * i / 2 
                        }
                      },
                      tileImages[13],
                      "ff1"
                      )     
               
                  );
                  dialogs.push(
                    new dialog(
                      largeDoor.size * y /2 + 25,  largeDoor.size * i / 2 - 7 ,40,30,tileImages[10],'question'
                    )
                  );
                break;
                case 'Ø':
                  bosses.push(
                      new Boss(
                             100 * y /2 ,
                             100 * i / 2,
                        100,
                        100,
                        tileImages[24]
                        )     
                 
                    );
                  break;
                case 'x':
                  explodeAbleTilesArray.push(
                        new Tile(Tile.size * y, Tile.size * i,50,50, tileImages[23])
                      );
                  break;
        default:
          break;
      }
    });
  });
  thridlayer.forEach((row, i) => {
    row.forEach((number, y) => {
      switch (number) {
        case '6':
          thridlayerArray.push(
                new Tile(Tile.size * y, Tile.size * i,50,50, tileImages[6])
              );
          break;
          case 'c':
            thridlayerArray.push(
                  new Tile(Tile.size * y, Tile.size * i,50,150, tileImages[20])
                );
            break;
            case 'h':
              items.push(
                new Item(tileImages[21], Tile.size * y,Tile.size * i,"speed","an small speed potion gives 5+ in speed for an limit time","small speed potion","common","consumable")
                  );
              break;
              case 'b':
                items.push(
                  new Item(tileImages[22], Tile.size * y,Tile.size * i,"bomb","an black powder bomb used to blow up walls","big bomb","common","puzzle")
                    );
                break;
        default:
          break;
      }
    });
  });
}


function OnItemCollidesEffect(item) {
  const itemText = `new item: ${item.action}`;
  c.fillStyle = "white";
  c.font = "20px Arial";
  c.fillText(itemText,player.position.x,player.position.y + Player.size + 20);
  
}

function drawPlayerHealth() {
    const healthText = `Health: ${player.health}`;
    c.fillStyle = "white";
    c.font = "20px Arial";
    c.fillText(healthText, player.position.x, player.position.y + Player.size + 20);
}

let currentAnimationFrame = 0;





const playerSprite = tileImages[3];
const player = new Player(100, 100, playerSprite,3);
const playerSpriteWidth = player.sprite.naturalWidth;
const playerSpriteHeight = player.sprite.naturalHeight;
const inventory = new Inventory();
let collided = false;
let enemycollied = false;
let collidedWIthBtn = false;
let collidedWithBoss = false;
document.addEventListener("click", handleInventoryClick);


function handleInventoryClick(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  inventory.slotPositions.forEach((position, index) => {
    if (
      !undefined &&
      clickX >= position.x &&
      clickX <= position.x + inventory.slotSize &&
      clickY >= position.y &&
      clickY <= position.y + inventory.slotSize
    ) {   
      inventory.useItem(index);
      const removedItem = inventory.removeItem(index);
   

      if (removedItem) {
        removedItem.position.x = player.position.x;
        removedItem.position.y = player.position.y;
        items.push(removedItem);
      }
    }
  });
}
  const menu = document.querySelector("main");
function drawMenu() {

  menu.style.display = "flex";

    document.addEventListener("keydown", startGame);
  }
  
  function startGame(event) {
    menu.style.display = "none";
    if (event.key === "Enter") {
      document.removeEventListener("keydown", startGame);
      gameState = GameState.PLAYING;        
      drawMap();  
     gameConfig.currentMusic.play();
    }
  }




    setInterval(() => {
        currentAnimationFrame = (currentAnimationFrame + 1) % playerAnimationFrames[player.direction].length;
      }, 120);
// Animation loop 
function animate() {
  if (!isGamePaused) {


    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);



    if (gameState === GameState.MENU) {
        drawMenu();
        return;
      }
      else if(gameState === GameState.GAME_OVER){
        drawMenu();
        sound.stop();
        return;
      }
      else if(gameState === GameState.PLAYING){    
      
        firstlayerArray.forEach((tile) => {
        tile.draw();
      });
      
            boundaries.forEach((boundary) => {
        boundary.draw();
    });
        updatePlayerPosition()
   traps.forEach(trap=>{    
     trap.draw();
     if (
        !enemycollied &&
        player.position.y + player.sprite.naturalHeight >= trap.position.y &&
        player.position.y <= trap.position.y + trap.img.naturalWidth &&
        player.position.x + player.sprite.naturalWidth>= trap.position.x &&
        player.position.x <= trap.position.x + trap.img.naturalHeight
    ) {
        console.log("player collided with trap");     
        player.onCollisionWithEnemy();
    }
    })     
     squares.forEach((square) =>{
      square.draw();
    })
   buttons.forEach((btn)=>{    
     btn.draw();
    if (
      player.position.y + player.sprite.naturalHeight >= btn.position.y &&
      player.position.y <= btn.position.y + btn.image.naturalWidth &&
      player.position.x + player.sprite.naturalWidth>= btn.position.x &&
      player.position.x <= btn.position.x + btn.image.naturalHeight
  ) {
    speech.innerHTML = button.text;
    if (!btn.activated) {
      speech.classList.remove("hide");
    }
     const test = document.addEventListener('keyup', (event) => {
        if (event.key == 'e' && btn.activated == false) {
         btn.activated = true;
         btn.isActivated();
         return;
         }
        });
  }   
  else{
         speech.classList.add("hide");
  }

   })
   thridlayerArray.forEach((tile)=>{
    tile.draw();
   })
   traders.forEach((mec)=>{
    mec.draw();
    mec.update();
   })
    dialogs.forEach((dia)=>{
      dia.controller();

    })
   chests.forEach((box)=>{
     box.draw();
     box.isActivated();
   })
    player.draw();
    player.update();
    // check if the player is death
    if (!player.isAlive()) {
        if (gameConfig.lives <= 0) {
           gameConfig.lives = 3;
           gameConfig.currentLevelIndex = 1;
            gameState = GameState.GAME_OVER;
            console.log("you lost the game")
            restart();
            drawMenu();
            return;
        }
        else{
            gameConfig.lives--;
            restart();
            // map = loadGame(gameConfig,gameConfig.currentLevelIndex);
            console.log("you lost a life! " + gameConfig.lives)
            player.health = 100;
            drawMap();
            return;
        }
        
    }


    doors.forEach((door) => {
        door.update(playerSpriteWidth,playerSpriteHeight);
        door.draw();
    });
    items.forEach((item)=>{
  item.draw();
  if (inventory.items.length < inventory.maxItems &&
    player.position.y + player.sprite.naturalHeight >= item.position.y &&
    player.position.y <= item.position.y + item.sprite.naturalWidth &&
    player.position.x + player.sprite.naturalWidth>= item.position.x &&
    player.position.x <= item.position.x + item.sprite.naturalHeight
) {
 
  inventory.addItem(item);  
    OnItemCollidesEffect(inventory.items[inventory.items.length - 1]);
  items.splice(items.indexOf(item),1)
  pickup.play();

}
})
explodeAbleTilesArray.forEach((tile)=>{
  tile.draw();
   equiples.forEach((item)=>{
    if (item.activated && item.action === "bomb") {
      if (
        player.position.y + player.sprite.naturalHeight >= tile.y &&
        player.position.y <= tile.y + tile.image.naturalWidth &&
        player.position.x + player.sprite.naturalWidth>= tile.x &&
        player.position.x <= tile.x + tile.image.naturalHeight
    ) {
      speech.classList.remove("hide")
      const test = document.addEventListener('keyup', (event) => {
        if (event.key == 'e' && item.activated) {
          console.log(item)       
          item.activated = false;
           tile.explosin(tile);
           speech.classList.add("hide");
         return;
         }
        });
       }   
        else{
         speech.classList.add("hide");
      }
    }
   })
})
    player.draw();   
  
     
    largeDoors.forEach((largedoor)=>{
        largedoor.draw();
    });

    goblins.forEach((orc)=>{
      orc.update()
      orc.draw();
      if (
        !enemycollied &&
        player.position.y + playerSpriteHeight >= orc.position.y &&
        player.position.y <= orc.position.y + orc.sprite.naturalWidth &&
        player.position.x + playerSpriteWidth >= orc.position.x &&
        player.position.x <= orc.position.x + orc.sprite.naturalHeight
    ) {
        console.log("Enemy collided with player");     
        player.onCollisionWithEnemy();
        enemycollied = true
    }
    })
        equiples.forEach((equipt)=>{
        if (equipt.activated) {
             equipt.renderItem();
        }
    })
    enemies.forEach((enemy) => {
        enemy.update();
        enemy.draw();
        if (
            !enemycollied &&
            player.position.y + playerSpriteHeight >= enemy.position.y &&
            player.position.y <= enemy.position.y + enemy.sprite.naturalWidth &&
            player.position.x + playerSpriteWidth >= enemy.position.x &&
            player.position.x <= enemy.position.x + enemy.sprite.naturalHeight
        ) {
            console.log("Enemy collided with player");     
            player.onCollisionWithEnemy();
            enemycollied = true
        }
    });
    Projectiles.forEach((bullet)=>{
      bullet.update()
      bullet.draw()
    })
    bosses.forEach(boss=>{
      boss.draw();
      boss.update(player.position.x,player.position.y);
      boundaries.forEach((wall)=>{
        boss.collisionWithWall(wall);
        boss.collisonWithPlayer(player.position.x,player.position.y)
        boss.drawUi();
      })
    })
  }  
} 

inventory.draw();
}
animate();

  document.addEventListener("keydown", (event) => {
    if (event.key in arrowKeys) {
      arrowKeys[event.key] = true;
    }
  });
  
  document.addEventListener("keyup", (event) => {
    if (event.key in arrowKeys) {
      arrowKeys[event.key] = false;
    }  
      enemycollied = false;
      collided = false;
  });
  

function updatePlayerPosition() {
  let collidingWithBoundary = false;

  // Update player's position based on arrow key inputs
  if (arrowKeys.ArrowUp && player.direction !== "hurt") {
    player.position.y -= player.velocity;
    player.direction = 'right';
  }
  if (arrowKeys.ArrowDown && player.direction !== "hurt") {
    player.position.y += player.velocity;
    player.direction = 'right';
  }
  if (arrowKeys.ArrowLeft && player.direction !== "hurt") {
    player.position.x -= player.velocity;
    player.direction = 'left';
  }
  if (arrowKeys.ArrowRight && player.direction !== "hurt") {
    player.position.x += player.velocity;
    player.direction = 'right';
  }
  if (
    !arrowKeys.ArrowUp &&
    !arrowKeys.ArrowDown &&
    !arrowKeys.ArrowLeft &&
    !arrowKeys.ArrowRight
  ) {
    player.direction = 'idle';
  }

  // Check for collision with boundaries
  boundaries.forEach((boundary) => {
    if (
      player.position.y + Player.size > boundary.position.y &&
      player.position.y < boundary.position.y + boundary.height &&
      player.position.x + Player.size > boundary.position.x &&
      player.position.x < boundary.position.x + boundary.width
    ) {
      // Player collided with a boundary, so set the colliding flag
      collidingWithBoundary = true;
    }
  });
  largeDoors.forEach((largedoor)=>{
    if (!largedoor.isOpen()) {
        if (
            player.position.y + player.sprite.naturalHeight >= largedoor.position.y &&
            player.position.y <= largedoor.position.y + largeDoor.size &&
            player.position.x + player.sprite.naturalWidth >= largedoor.position.x &&
            player.position.x <= largedoor.position.x + largeDoor.size
        ) {
          collidingWithBoundary = true;
        } 
    }

 
})
  // Adjust the player's position based on collisions
  if (collidingWithBoundary) {
    // Reset the player's position to the previous valid position
    if (arrowKeys.ArrowUp) {
      player.position.y += player.velocity;
    }
    if (arrowKeys.ArrowDown) {
      player.position.y -= player.velocity;
    }
    if (arrowKeys.ArrowLeft) {
      player.position.x += player.velocity;
    }
    if (arrowKeys.ArrowRight) {
      player.position.x -= player.velocity;
    }
  }

  player.animationFrames = playerAnimationFrames[player.direction];
}