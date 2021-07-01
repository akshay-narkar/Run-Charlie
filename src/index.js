import Phaser from 'phaser';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';
import gameConfig from './Config/config';
import playGame from './Scenes/GameScene2';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import OverGame from './Scenes/Gamover';
import FormScene from './Scenes/formscene';
import highscore from './Scenes/highscorescene';

import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(gameConfig);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('PlayGame', playGame);
    this.scene.add('Gameover', OverGame);
    this.scene.add('Form', FormScene);
    this.scene.add('highscore', highscore);

    this.scene.start('Boot');
  }
}

window.game = new Game();
