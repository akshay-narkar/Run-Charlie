import Phaser from 'phaser';
import gameConfig from '../Config/config';
// export default class GameScene extends Phaser.Scene {
//   constructor () {
//     super('Game');
//   }

//   preload () {
//     // load images
//     this.load.image('logo', 'assets/logo.png');
//   }

//   create () {
//     this.add.image(400, 300, 'logo');
//   }
// };

// let game;

// global game options
const gameOptions = {

  // platform speed range, in pixels per second
  platformSpeedRange: [300, 400],

  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],

  // platform width range, in pixels
  platformSizeRange: [90, 300],

  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-10, 10],

  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 10,

  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],

  // player gravity
  playerGravity: 900,

  // player jump force
  jumpForce: 400,

  // player starting X position
  playerStartPosition: 200,

  // consecutive jumps allowed
  jumps: 2,
};

// window.onload = function() {

//     window.focus();
//     resize();
//     window.addEventListener("resize", resize, false);
// }

// window.onload = function() {

//     // object containing configuration options
//     // let gameConfig = {
//     //     type: Phaser.AUTO,
//     //     width: 1280,
//     //     height: 800,
//     //     scene: playGame,
//     //     backgroundColor: 0x444444,

//     //     // physics settings
//     //     physics: {
//     //         default: "arcade"
//     //     }
//     // }
//     // game = new Phaser.Game(gameConfig);
//     window.focus();
//     resize();
//     window.addEventListener("resize", resize, false);
// }

// // playGame scene
// export default class playGame extends Phaser.Scene{

//     constructor(){
//         super("PlayGame");
//     }
//     preload(){
//         this.load.image("platform", "./assets/platform1.png");
//         // this.load.image("player", "./assets/player.png");
//         this.load.spritesheet("player", "./assets/player1.png", {
//             frameWidth: 24,
//             frameHeight: 48
//         });
//     }
//     create(){

//         // group with all active platforms.
//         this.platformGroup = this.add.group({

//             // once a platform is removed, it's added to the pool
//             removeCallback: function(platform){
//                 platform.scene.platformPool.add(platform)
//             }
//         });

//         // pool
//         this.platformPool = this.add.group({

//             // once a platform is removed from the pool, it's added to the active platforms group
//             removeCallback: function(platform){
//                 platform.scene.platformGroup.add(platform)
//             }
//         });

//         // number of consecutive jumps made by the player
//         this.playerJumps = 0;

//         // adding a platform to the game, the arguments are platform width and x position
//         this.addPlatform(this.game.config.width, this.game.config.width / 2);

//         // adding the player;
//         this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.game.config.height / 2, "player");
//         this.player.setGravityY(gameOptions.playerGravity);

//         // setting collisions between the player and the platform group
//         this.physics.add.collider(this.player, this.platformGroup);

//         // checking for input
//         this.input.on("pointerdown", this.jump, this);
//     }

//     // the core of the script: platform are added from the pool or created on the fly
//     addPlatform(platformWidth, posX){
//         let platform;
//         if(this.platformPool.getLength()){
//             platform = this.platformPool.getFirst();
//             platform.x = posX;
//             platform.active = true;
//             platform.visible = true;
//             this.platformPool.remove(platform);
//         }
//         else{
//             platform = this.physics.add.sprite(posX, this.game.config.height * 0.8, "platform");
//             platform.setImmovable(true);
//             platform.setVelocityX(gameOptions.platformStartSpeed * -1);
//             this.platformGroup.add(platform);
//         }
//         platform.displayWidth = platformWidth;
//         this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
//     }

//     // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
//     jump(){
//         if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
//             if(this.player.body.touching.down){
//                 this.playerJumps = 0;
//             }
//             this.player.setVelocityY(gameOptions.jumpForce * -1);
//             this.playerJumps ++;
//         }
//     }
//     update(){

//         // game over
//         if(this.player.y > this.game.config.height){
//             this.scene.start("PlayGame");
//         }
//         this.player.x = gameOptions.playerStartPosition;

//         // recycling platforms
//         let minDistance = this.game.config.width;
//         this.platformGroup.getChildren().forEach(function(platform){
//             let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
//             minDistance = Math.min(minDistance, platformDistance);
//             if(platform.x < - platform.displayWidth / 2){
//                 this.platformGroup.killAndHide(platform);
//                 this.platformGroup.remove(platform);
//             }
//         }, this);

//         // adding new platforms
//         if(minDistance > this.nextPlatformDistance){
//             var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
//             this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2);
//         }
//     }
// };

export default class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  preload() {
    this.load.image('platform', './assets/platform1.png');

    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet('player', './assets/player1.png', {
      frameWidth: 24,
      frameHeight: 48,
    });
  }

  create() {
    // group with all active platforms.
    this.platformGroup = this.add.group({

      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({

      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width, x position and y position
    this.addPlatform(gameConfig.width, gameConfig.width / 2, gameConfig.height * gameOptions.platformVerticalLimit[1]);

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, gameConfig.height * 0.7, 'player');
    this.player.setGravityY(gameOptions.playerGravity);

    // setting player animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup, () => {
      // play "run" animation if the player is on a platform
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null, this);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX, posY) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, posY, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump() {
    if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;

      // stops animation
      this.player.anims.stop();
    }
  }

  update() {
    // game over
    if (this.player.y > gameConfig.height) {
      this.scene.start('Gameover');
    }
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    let minDistance = gameConfig.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = gameConfig.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      const platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = gameConfig.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = gameConfig.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, gameConfig.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}

// function resize(){
//     let canvas = document.querySelector("canvas");
//     let windowWidth = window.innerWidth;
//     let windowHeight = window.innerHeight;
//     let windowRatio = windowWidth / windowHeight;
//     let gameRatio = gameConfig.width / gameConfig.height;
//     if(windowRatio < gameRatio){
//         canvas.style.width = windowWidth + "px";
//         canvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else{
//         canvas.style.width = (windowHeight * gameRatio) + "px";
//         canvas.style.height = windowHeight + "px";
//     }
// }
