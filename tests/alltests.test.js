/**
 * @jest-environment jsdom
 */

import Model from '../src/Model';
import { setplayer, highscore, getscore } from '../src/helper/localstorage';
import { sortPlayers } from '../src/helper/fetching';

let model1;
let model2;
let model3;

beforeAll(() => {
  model1 = new Model();
  model3 = new Model();
});

describe('Test Sound model', () => {
  test('Test Sound', () => {
    expect(model1).toBeInstanceOf(Model);
    expect(model2).not.toBeInstanceOf(Model);
  });

  test('Test SoundOn', () => {
    expect(model1.soundOn).toBe(true);
    expect(model1.soundOn).not.toBe(false);
  });

  test('Test MusicOn', () => {
    expect(model1.musicOn).toBe(true);
    expect(model1.musicOn).not.toBe(false);
  });

  test('Test BgMusicPlaying', () => {
    expect(model1.bgMusicPlaying).toBe(false);
    expect(model1.bgMusicPlaying).not.toBe(true);
  });
});

describe('Test Sound model', () => {
  test('Set bgMusic On', () => {
    expect((model3.bgMusicPlaying = true)).toBe(true);
    expect(model3.bgMusicPlaying).not.toBe(false);
  });

  test('Set Sound On', () => {
    expect((model3.soundOn = false)).toBe(false);
    expect(model3.soundOn).not.toBe(true);
  });

  test('Set Music On', () => {
    expect((model3.musicOn = false)).toBe(false);
    expect(model3.musicOn).not.toBe(true);
  });
});

describe('Local Storage Tests', () => {
  setplayer('adam');

  test('Set the key player to a particular value', () => {
    expect(localStorage.getItem('player')).toBe('adam');

    expect(localStorage.getItem('player')).not.toBe('XYZ');
  });

  test('Set the score if the key-player is in localStorage', () => {
    getscore(100);
    expect(parseInt(localStorage.getItem('score'), 10)).toBe(100);

    expect(localStorage.getItem('score')).not.toBe('XYZ');
  });

  test('Set the score if the key-player is in localStorage', () => {
    highscore(100);
    expect(parseInt(localStorage.getItem('highscore'), 10)).toBe(100);

    expect(localStorage.getItem('highscore')).not.toBe(200);
  });
});

describe('Sorting test', () => {
  test('test for sorting array of objects in desc order', () => {
    const arr = [
      { username: 'a', score: 50 },
      { username: 'b', score: 250 },
      { username: 'c', score: 20 },
      { username: 'd', score: 120 },
    ];
    const sortarr = [
      { username: 'b', score: 250 },
      { username: 'd', score: 120 },
      { username: 'a', score: 50 },
      { username: 'c', score: 20 },
    ];
    expect(sortPlayers(arr)).toEqual(sortarr);
  });
});
