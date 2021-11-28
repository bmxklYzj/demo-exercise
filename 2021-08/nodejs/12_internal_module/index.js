const event = require('./lib');

event.on('newLesson', (price) => {
  console.log('new lesson: ', price);
});
