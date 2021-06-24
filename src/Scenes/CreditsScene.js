import Phaser from 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '48px', fontFamily: 'FreeMono', color: '#000' });
    this.madeByText = this.add.text(0, 0, 'Created By- Github: @akshay-narkar', { fontSize: '48px', fontFamily: 'FreeMono', color: '#000' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -150,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => {
        this.creditsText.destroy();
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -150,
      ease: 'Power1',
      duration: 6000,
      delay: 1000,
      onComplete: function () {
        this.madeByText.destroy();
        this.scene.start('Title');
      }.bind(this),
    });

    // this.creditsTween = this.tweens.add({
    //   targets: this.creditsText,
    //   y: -100,
    //   ease: 'Power1',
    //   duration: 3000,
    //   delay: 1000,
    //   onComplete: () => {
    //     this.creditsText.destroy;
    //   },
    // });

    // this.madeByTween = this.tweens.add({
    //   targets: this.madeByText,
    //   y: -300,
    //   ease: 'Power1',
    //   duration: 8000,
    //   delay: 1000,
    //   onComplete: function () {
    //     this.madeByText.destroy;
    //     this.scene.start('Title');
    //   }.bind(this),
    // });
  }
}