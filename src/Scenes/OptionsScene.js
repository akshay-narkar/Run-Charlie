import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.add.image(780, 1080, 'mount');

    this.text = this.add.text(this.game.config.width / 2 - 125, 100, 'Options', {
      fontSize: 60,
      fontFamily: 'FreeMono',
      fontStyle: 'bold',
      color: '#000',
    });
    this.musicButton = this.add.image(this.game.config.width / 2 - 150, 300, 'soundon');
    this.musicButton.setScale(0.8);
    this.musicText = this.add.text(this.game.config.width / 2 - 60, 280, 'Music Enabled', {
      fontSize: 40,
      fontFamily: 'FreeMono',
      fontStyle: 'bold',
      color: '#000',
    });

    this.soundButton = this.add.image(this.game.config.width / 2 - 150, 400, 'soundon');
    this.soundText = this.add.text(this.game.config.width / 2 - 60, 380, 'Sound Enabled', {
      fontSize: 40,
      fontFamily: 'FreeMono',
      fontStyle: 'bold',
      color: '#000',
    });
    this.soundButton.setScale(0.8);

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();
    this.model = this.sys.game.globals.model;

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, this.game.config.width / 2, 550, 'playButton', 'Change Name', 'Form');

    this.menuButton = new Button(this, this.game.config.width / 2, 650, 'playButtongreen', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('soundoff');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('soundon');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('soundoff');
    } else {
      this.soundButton.setTexture('soundon');
    }
  }
}
