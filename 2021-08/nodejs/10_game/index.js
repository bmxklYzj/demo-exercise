const game = require('./game');

let count = 0;
process.stdin.on('data', (e) => {
  const userAction = e.toString().trim();

  console.log('玩家：', userAction);
  const result = game(userAction);
  if (result === 1) {
    count++;
  }
  if (count === 3) {
    console.log('你太厉害了，我不玩了');
    process.exit();
  }
});
