import Phaser from 'phaser';
import { setplayer } from '../helper/localstorage';
import Button from '../Objects/Button';

export default class FormScene extends Phaser.Scene {
  constructor() {
    super('Form');
  }

  create() {
    this.add.image(400, 300, 'mount');

    this.add.text(this.game.config.width / 2 - 175, 128, 'Run Charlie!', {
      fontFamily: 'FreeMono',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
    });

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('titlesong', { volume: 0.3, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }

    this.message = this.add.text(this.game.config.width * 0.5, 228, 'Input Player Name', {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.message.setOrigin(0.5);

    this.body = document.querySelector('body');

    const canvas1 = document.querySelector('canvas');

    this.input = this.body.appendChild(document.createElement('input'));
    this.add.dom(canvas1.clientWidth / 2, canvas1.clientHeight / 2, this.input);
    this.input.setAttribute('id', 'myText');
    this.input.setAttribute('type', 'text');

    this.nameInput = this.add.sprite(this.game.config.width / 2, 350, 'playButton');
    Phaser.Display.Align.In.Center(this.input, this.nameInput);
    
    this.submit = this.add.image(this.game.config.width / 2, 428, 'playButton').setInteractive();
    this.submit.scale = 0.7;
    this.text = this.add.text(0, 0, 'Submit', { fontSize: '25px', fill: '#fff',fontFamily: 'monospace' });
    Phaser.Display.Align.In.Center(this.text, this.submit);

    if (localStorage.getItem('player')) {
      this.cancel = new Button(this, this.game.config.width / 2, 650, 'playButtongreen', 'Cancel', 'Options');
    }

    this.submit.on('pointerdown', () => {
      if (/[a-z]/i.test(this.input.value)) {
        this.scene.start('Title');

        setplayer(this.input.value);
      }
    });
  }
}
