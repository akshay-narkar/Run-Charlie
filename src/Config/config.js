import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  parent: 'game',
  //     mode: Phaser.Scale.NONE,
  // autoCenter: Phaser.Scale.CENTER_BOTH,
  // scene: playGame,
  // backgroundColor: 0x87CEEB,
  // antialias: false,
  // physics settings
  physics: {
    default: 'arcade',
  },
};
