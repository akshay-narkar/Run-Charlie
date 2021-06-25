import Phaser from "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(1920, 1080, "mount");

    const logo = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 200, "logo");

    logo.setScale(0.7);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.4);
    progressBox.fillRect(this.game.config.width / 2 - 160, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading.....",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    const widthgame = this.game.config.width / 2 - 150;
    this.load.on("progress", (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(widthgame, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image("platform", "./assets/platform.png");

    this.load.spritesheet("player", "./assets/bunny.png", {
      frameWidth: 48,
      frameHeight: 32,
    });

    this.load.spritesheet("coin", "./assets/carrot.png", {
      frameWidth: 14.3333,
      frameHeight: 21,
    });

    this.load.spritesheet("fire", "./assets/32x32-bat-sprite.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("mountain", "./assets/mountain.png", {
      frameWidth: 512,
      frameHeight: 512,
    });

    this.load.image("playButton", "./assets/ui/blue_button.png");

    this.load.image("playButtongreen", "./assets/ui/button.png");
    this.load.image("soundon", "./assets/ui/sound.png");

    this.load.image("soundoff", "./assets/ui/nosound.png");
    this.load.image("phaserLogo", "./assets/logo.png");
    this.load.image("box", "./assets/ui/grey_box.png");
    this.load.image("checkedBox", "./assets/ui/blue_boxCheckmark.png");
    this.load.audio("ingame", ["./assets/them1.ogg"]);
    this.load.audio("highscores", ["./assets/WindRun.mp3"]);
    // this.load.audio("titlesong", ["./assets/titleandgamover.mp3"]);
  }

  create() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "rotate",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 2,
      }),
      frameRate: 8,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });
  }

  ready() {
    if (localStorage.getItem("player")) {
      this.scene.start("Title");
      this.readyCount += 1;
      if (this.readyCount === 2) {
        this.scene.start("Title");
      }
    } else {
      this.scene.start("Form");
    }
  }
}
