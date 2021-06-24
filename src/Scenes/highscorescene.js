import Phaser from 'phaser';
import Button from '../Objects/Button';
import { getPlayers } from '../helper/fetching';

export default class highscore extends Phaser.Scene {
  constructor() {
    super('highscore');
  }

  create() {
    this.add.text(this.game.config.width / 2 - 175, 25, 'LeaderBoard', {
      fontFamily: 'FreeMono',
      fontSize: 60,
      fontStyle: 'bold',
      color: '#ffffff',
      // align: 'center',
    });

    this.menuButton = new Button(this, this.game.config.width / 2, 750, 'playButtongreen', 'Menu', 'Title');

    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/i6OiNUavZ2OszfY3wkNT/scores/';

    this.fetchintext = this.add.text(this.game.config.width / 2 - 200, 250, 'Fetching Data....', {
      fontFamily: 'FreeMono',
      fontSize: 45,
      fontStyle: 'bold',
      color: '#ffffff',
      // align: 'center',
    });

    const topplayers = async (url) => {
      try {
        const players = await getPlayers(url);
        let y = 60;
        this.fetchintext.setText('');
        for (let i = 0; i < 12; i += 1) {
          const text = this.add.text(
            this.game.config.width * 0.5, y += 50, `${players[i].user}: ${players[i].score}`,
            {
              fontFamily: 'monospace',
              fontSize: 30,
              fontStyle: 'bold',
              color: '#ffffff',
              align: 'center',
            },
          );
          text.setOrigin(0.5, 0.5);
        }
        return players;
      } catch (error) {
        return error;
      }
    };

    topplayers(url);
  }
}
