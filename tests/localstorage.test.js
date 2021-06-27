/**
 * @jest-environment jsdom
 */

import { setplayer, highscore, getscore } from '../src/helper/localstorage';

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
