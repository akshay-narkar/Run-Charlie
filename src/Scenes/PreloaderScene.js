import Phaser from 'phaser';
import player from '../../assets/bunny.png';
import coin from '../../assets/carrot.png';
import fire from '../../assets/32x32-bat-sprite.png';
import platform from '../../assets/platform.png';
import mountain from '../../assets/mountain.png';
import playButton from '../../assets/ui/blue_button.png';
import playButtongreen from '../../assets/ui/button.png';
import soundon from '../../assets/ui/sound.png';
import soundoff from '../../assets/ui/nosound.png';
import ingame from '../../assets/them1.ogg';
import highscores from '../../assets/WindRun.mp3';
import titlesong from '../../assets/titleandgamover.mp3';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('playButton', playButton);
    this.load.image('playButtongreen', playButtongreen);
    this.load.image('soundon', soundon);
    this.load.image('soundoff', soundoff);
    this.load.audio('ingame', ingame);
    this.load.audio('highscores', highscores);
    this.load.audio('titlesong', titlesong);

    this.add.image(400, 580, 'mount');

    const imageload = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 200, 'logo');

    imageload.setScale(0.7);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.4);
    progressBox.fillRect(this.game.config.width / 2 - 160, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading.....',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    const widthgame = this.game.config.width / 2 - 150;
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(widthgame, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('platform', platform);

    this.load.spritesheet('player', player, {
      frameWidth: 48,
      frameHeight: 32,
    });

    this.load.spritesheet('coin', coin, {
      frameWidth: 14.3333,
      frameHeight: 21,
    });

    this.load.spritesheet('fire', fire, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('mountain', mountain, {
      frameWidth: 512,
      frameHeight: 512,
    });
  }

  create() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 2,
      }),
      frameRate: 8,
      yoyo: true,
      repeat: -1,
    });

    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNumbers('fire', {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: -1,
    });

    if (localStorage.getItem('player')) {
      this.scene.start('Title');
    } else {
      this.scene.start('Form');
    }
  }
}
