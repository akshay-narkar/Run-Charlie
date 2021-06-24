import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class OverGame extends Phaser.Scene {
  constructor() {
    super('Gameover');
  }

  create() {
    this.add.text(this.game.config.width / 2 - 175, 128, 'Game Over!', {
      fontFamily: 'FreeMono',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#ffffff',
      // align: 'center',
    });

    this.menuButton = new Button(this, this.game.config.width / 2, 400, 'playButtongreen', 'Menu', 'Title');
    this.playagain = new Button(this, this.game.config.width / 2, 300, 'playButtongreen', 'Play Again', 'PlayGame');
  }
}
