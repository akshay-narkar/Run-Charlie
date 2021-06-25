import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class OverGame extends Phaser.Scene {
  constructor() {
    super('Gameover');
  }

  create() {

                this.add.image(1920,1080,'mount');

    this.add.text(this.game.config.width / 2 - 175, 128, 'Game Over!', {
      fontFamily: 'FreeMono',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#ffffff',
      // align: 'center',
    });

     this.model = this.sys.game.globals.model;
    if(this.model.bgMusicPlaying){
           this.sys.game.globals.bgMusic.stop()
          this.model.bgMusicPlaying = false}
    
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('highscores', { volume: 0.3, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }



    this.menuButton = new Button(this, this.game.config.width / 2, 400, 'playButtongreen', 'Menu', 'Title');
    this.playagain = new Button(this, this.game.config.width / 2, 300, 'playButtongreen', 'Play Again', 'PlayGame');
  }
}
