import Phaser from 'phaser';

export default class FormScene extends Phaser.Scene {
  constructor() {
    super('Form');
  }

  create() {
    this.add.text(this.game.config.width / 2 - 175, 128, 'Run Charlie!', {
      fontFamily: 'FreeMono',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      // align: 'center',
    });

    // this.title.setOrigin(0.5);

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

    // this.input = this.add.dom(400, 400).createFromCache('nameform');
    // this.newinput = this.add.dom(400,400).createElement('input');
    this.input = this.body.appendChild(document.createElement('input'));
    // this.input.setScale(2)
    this.add.dom(canvas1.clientWidth / 2, canvas1.clientHeight / 2, this.input);
    this.input.setAttribute('id', 'myText');
    this.input.setAttribute('type', 'text');

    this.nameInput = this.add.sprite(this.game.config.width / 2, 350, 'playButton');
    Phaser.Display.Align.In.Center(this.input, this.nameInput);
    this.submit = this.add.image(this.game.config.width / 2, 428, 'playButton').setInteractive();
    this.submit.scale = 0.7;
    this.text = this.add.text(0, 0, 'Submit', { fontSize: '25px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.text, this.submit);

    this.submit.on('pointerdown', () => {
      if (/[a-z]/i.test(this.input.value)) {
        this.scene.start('Title');
        // this.input.style.display = 'none';

        localStorage.setItem('player', this.input.value);
      }
    });
  }
}