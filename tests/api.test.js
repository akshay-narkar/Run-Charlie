/**
 * @jest-environment jsdom
 */

import fetchMock from 'jest-fetch-mock';
import {
  sortPlayers, getData, updatescore, getPlayers,
} from '../src/helper/fetching';

fetchMock.enableMocks();

beforeEach(() => {
  // fetch.resetMocks();
});

describe('Hitting the api to get data', () => {
  test('getting the necessary data on calling api', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ user: 'xyz', score: 20 }, { user: 'abc', score: 200 }] }));
    const data = await getData('abc.com');
    expect(data).toEqual([{ user: 'xyz', score: 20 }, { user: 'abc', score: 200 }]);
    expect(data).not.toEqual('Random');
  });

  test('getting the necessary data on calling api reject', async () => {
    fetch.mockRejectOnce(() => Promise.reject(Error('API is Down')));
    const data = await getData('abc.com');
    expect(data).toEqual(Error('API is Down'));
    expect(data).not.toEqual('Random');
  });
});

describe('Calling get players function', () => {
  test('on calling getPlayers , it fetches, sortplayers and gives back sorted data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ user: 'xyz', score: 20 }, { user: 'abc', score: 200 }] }));

    const data = await getPlayers('abc.com');
    expect(data).toEqual([{ user: 'abc', score: 200 }, { user: 'xyz', score: 20 }]);
    expect(data).not.toEqual('Random');
  });

  test('getting the necessary data on calling api reject', async () => {
    fetch.mockRejectOnce(() => Promise.reject(Error('API is Down')));
    const data = await getData('abc.com');
    expect(data).toEqual(Error('API is Down'));
    expect(data).not.toEqual('Random');
  });
});

describe('Calling updatescores function', () => {
  localStorage.setItem('highscore', 100);
  localStorage.setItem('player', 'Jeff');

  const hs = localStorage.getItem('highscore');
  const user = localStorage.getItem('player');

  test('Call updatescores to update player data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ result: [{ user: 'xyz', score: 20 }, { user: 'abc', score: 200 }, { user, score: parseInt(hs, 10) }] }));

    const data = await updatescore('abc.com');
    expect(data).toEqual([{ user: 'xyz', score: 20 }, { user: 'abc', score: 200 }, { user: 'Jeff', score: 100 }]);
    expect(data).not.toEqual('Random');
  });

  test('getting the necessary data on calling api reject', async () => {
    fetch.mockRejectOnce(() => Promise.reject(Error('API is Down')));
    const data = await updatescore('abc.com');
    expect(data).toEqual(Error('API is Down'));
    expect(data).not.toEqual('Random');
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

    expect(sortPlayers(arr)[0].score).toEqual(sortarr[0].score);
    expect(sortPlayers(arr)[0].score).not.toEqual(sortarr[3].score);
  });
});
