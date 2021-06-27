import { sortPlayers } from '../src/helper/fetching';

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
