export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    return error;
  }
};

export const sortPlayers = (arr) => {
  arr.sort((a, b) => b.score - a.score);
  return arr;
};

export const getPlayers = async (url) => {
  const arr = await getData(url);
  if (typeof (arr) === 'object') sortPlayers(arr);
  return arr;
};

export const updatescore = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: localStorage.getItem('player'), score: localStorage.getItem('highscore') }),
      mode: 'cors',
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    return error;
  }
};
