import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  parent: 'game',
  linker: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XI3EIyH9LTNGDjvXNvf5/scores/',

  physics: {
    default: 'arcade',
  },
};
