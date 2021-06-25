import Phaser from "phaser";
import gameConfig from "../Config/config";
import { getscore } from "../helper/localstorage";
import { updatescore } from "../helper/fetching";

let flag = 0;

const gameOptions = {
  platformSpeedRange: [300, 300],

  mountainSpeed: 80,

  spawnRange: [80, 300],

  platformSizeRange: [90, 300],

  platformHeightRange: [-5, 5],

  platformHeighScale: 20,

  platformVerticalLimit: [0.4, 0.8],

  playerGravity: 900,

  jumpForce: 400,

  playerStartPosition: 200,

  jumps: 3,

  coinPercent: 100,

  firePercent: 25,
};

/* eslint max-len: 0 */

export default class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
    this.points = 0;
  }

  create() {
    this.model = this.sys.game.globals.model;
    if (this.model.bgMusicPlaying) {
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    }

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add("ingame", { volume: 0.3, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }

    this.cameras.main.setBackgroundColor(0x0c88c7);

    this.mountainGroup = this.add.group();

    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.pointstext = this.add.text(50, 60, `Score: ${this.points}`, {
      fontFamily: "FreeMono",
      fontSize: 48,
      fontStyle: "bold",
      color: "#ffffff",
    });

    this.coinGroup = this.add.group({
      removeCallback: (coin) => {
        coin.scene.coinPool.add(coin);
        if (flag === 1) {
          this.points += 25;
          flag = 0;
          this.pointstext.setText(`Score: ${this.points}`);
        }
      },
    });

    this.coinPool = this.add.group({
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    this.fireGroup = this.add.group({
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });

    this.firePool = this.add.group({
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });

    this.addMountains();

    this.addedPlatforms = 0;

    this.playerJumps = 0;

    this.addPlatform(this.game.config.width, this.game.config.width / 2, this.game.config.height * gameOptions.platformVerticalLimit[1]);

    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.game.config.height * 0.7, "player");
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);
    this.player.setScale(1);

    this.dying = false;

    this.platformCollider = this.physics.add.collider(
      this.player,
      this.platformGroup,
      () => {
        if (!this.player.anims.isPlaying) {
          this.player.anims.play("run");
        }
      },
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.coinGroup,
      (player, coin) => {
        flag = 1;
        this.tweens.add({
          targets: coin,
          y: coin.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete() {
            this.coinGroup.killAndHide(coin);
            this.coinGroup.remove(coin);
          },
        });
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.fireGroup,
      () => {
        this.dying = true;
        this.player.anims.stop();
        this.player.setFrame(4);
        this.player.body.setVelocityY(-200);
        this.physics.world.removeCollider(this.platformCollider);
      },
      null,
      this
    );

    this.input.on("pointerdown", this.jump, this);
  }

  addMountains() {
    const rightmostMountain = this.getRightmostMountain();
    if (rightmostMountain < this.game.config.width * 2) {
      const mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), this.game.config.height + Phaser.Math.Between(0, 100), "mountain");
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3));
      this.addMountains();
    }
  }

  getRightmostMountain() {
    let rightmostMountain = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
    });
    return rightmostMountain;
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);

    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 46;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 46, "coin");
          coin.setImmovable(true);
          coin.setScale(3);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play("rotate");
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 96;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 96, "fire");
          fire.setImmovable(true);
          fire.setScale(1.8);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true);
          fire.anims.play("burn");
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  jump() {
    if (!this.dying && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      // stops animation
      this.player.anims.stop();
    }
  }

  update() {
    if (this.player.y > this.game.config.height) {
      getscore(this.points);
      if (localStorage.getItem("highscore") === this.points) updatescore(gameConfig.linker);
      this.points = 0;
      this.pointstext.setText("");
      this.scene.start("Gameover");
    }

    this.player.x = gameOptions.playerStartPosition;

    let minDistance = this.game.config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    this.fireGroup.getChildren().forEach((fire) => {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    this.mountainGroup.getChildren().forEach((mountain) => {
      if (mountain.x < -mountain.displayWidth) {
        const rightmostMountain = this.getRightmostMountain();
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = this.game.config.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      const platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = this.game.config.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = this.game.config.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
}
