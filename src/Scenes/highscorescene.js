import Phaser from 'phaser';
import Button from '../Objects/Button';
import gameConfig from '../Config/config';
import { getPlayers } from '../helper/fetching';

export default class highscore extends Phaser.Scene {
  constructor() {
    super('highscore');
  }

  create() {
    this.add.image(780, 1080, 'mount');

    this.add.text(this.game.config.width / 2 - 175, 25, 'LeaderBoard', {
      fontFamily: 'FreeMono',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#ffffff',
    });

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

    this.menuButton = new Button(this, this.game.config.width / 2, 750, 'playButtongreen', 'Menu', 'Title');

    this.fetchintext = this.add.text(this.game.config.width / 2 - 200, 250, 'Fetching Data....', {
      fontFamily: 'FreeMono',
      fontSize: 45,
      fontStyle: 'bold',
      color: '#ffffff',
    });

    const topplayers = async (url) => {
      try {
        const players = await getPlayers(url);
        let y = 60;
        this.fetchintext.setText('');
        for (let i = 0; i < 12; i += 1) {
          const text = this.add.text(this.game.config.width * 0.5, (y += 50), `${players[i].user}: ${players[i].score}`, {
            fontFamily: 'monospace',
            fontSize: 30,
            fontStyle: 'bold',
            color: '#000',
            align: 'center',
          });
          text.setOrigin(0.5, 0.5);
        }
        return players;
      } catch (error) {
        return error;
      }
    };

    topplayers(gameConfig.linker);
  }
}
