export const setplayer = (name) => {
  localStorage.setItem('player', name);
};

function highscore(points) {
  if (localStorage.getItem('highscore')) {
    if (localStorage.getItem('highscore') < points) localStorage.setItem('highscore', points);
  } else {
    localStorage.setItem('highscore', points);
  }
}

export const getscore = (points) => {
  if (localStorage.getItem('player')) {
    localStorage.setItem('score', points);
    highscore(points);
  }
};
