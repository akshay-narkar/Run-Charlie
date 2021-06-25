import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/mario.png');
    this.load.image('mount', 'assets/mount2.jpg');
  }

  create() {
    this.scene.start('Preloader');
  }
}