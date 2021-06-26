import Phaser from 'phaser';
import logo from '../../assets/mario.png';
import mount from '../../assets/mount2.jpg';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }
  
  preload() {
    this.load.image('mount', mount);
    this.load.image('logo', logo);
  }

  create() {
    this.scene.start('Preloader');
  }
}