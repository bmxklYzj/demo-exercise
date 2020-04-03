let express = require('express');
let cors = require('cors');

let app = express(); //实例化express
app.use(cors());

app.use('/post/', function(req, res) {
  // TODO: remove me
  console.log('Remove me in !dev: req', req);
  res.send('hello');
});

const port = 8001;
app.listen(port, () => {
  console.log(`mock server listen in: ${port}`);
});
