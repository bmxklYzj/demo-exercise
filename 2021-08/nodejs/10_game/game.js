module.exports = function (userAction) {
  const random = Math.random() * 3;
  let computerAction;
  if (random < 1) {
    computerAction = 'rock';
  } else if (random > 2) {
    computerAction = 'scissor';
  } else {
    computerAction = 'paper';
  }
  console.log('computer: ', computerAction);

  if (userAction === computerAction) {
    console.log('平局');
    return 0;
  } else if (
    (userAction === 'rock' && computerAction === 'scissor') ||
    (userAction === 'scissor' && computerAction === 'paper') ||
    (userAction === 'paper' && computerAction === 'rock')
  ) {
    console.log('You win');
    return 1;
  } else {
    console.log('Computer win');
    return -1;
  }
};
