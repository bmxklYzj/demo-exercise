const EventEmitter = require('events');

const event = new EventEmitter();

setInterval(() => {
  const price = Math.random() * 100;
  event.emit('newLesson', price);
}, 3000);

module.exports = event;