import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game

    this.add.text(this.game.config.width / 2 - 175, 128, 'Run Charlie!', {
      fontFamily: 'FreeMono',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      // align: 'center',
    });

    // title.setOrigin(0.5);

    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'playButton', 'Play', 'PlayGame');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'playButton', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'playButton', 'Credits', 'Credits');

    // highscore

    this.highscoreButton = new Button(this, config.width / 2, config.height / 2 + 200, 'playButton', 'High Scores', 'highscore');

    this.model = this.sys.game.globals.model;
    //  && this.model.bgMusicPlaying === false
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2
        - offset * 100, config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
      this.game.config.width,
    );
  }
}
