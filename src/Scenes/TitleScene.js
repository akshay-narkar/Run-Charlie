import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(1920, 1080, 'mount');

    this.add.text(this.game.config.width / 2 - 175, 128, 'Run Charlie!', {
      fontFamily: 'FreeMono',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
    });

    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'playButton', 'Play', 'PlayGame');

    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'playButton', 'Options', 'Options');

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'playButton', 'Credits', 'Credits');

    this.highscoreButton = new Button(this, config.width / 2, config.height / 2 + 200, 'playButton', 'High Scores', 'highscore');

    this.model = this.sys.game.globals.model;
    if (this.model.bgMusicPlaying) {
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    }

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('highscores', { volume: 0.3, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  /* eslint max-len: 0 */

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(gameObject, this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height));
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton, this.game.config.width);
  }
}
