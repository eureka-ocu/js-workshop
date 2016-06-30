// module dependencies
import express from 'express';

// initialize app
const app = express();

// faux database
const users = [
  { name: 'tsuyoshi' },
  { name: 'takahiro' },
  { name: 'kentaro' },
  { name: 'yuki' },
  { name: 'daiki' },
];

// create HTTP error
function createError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// convert :to and :from to integers
app.param(['to', 'from'], (req, res, next, num, name) => {
  req.params[name] = parseInt(num, 10);
  if (isNaN(req.params[name])) {
    next(createError(400, `failed to parseInt ${num}`));
  } else {
    next();
  }
});

// load user by id
app.param('user', (req, res, next, id) => {
  if (req.user = users[id]) {
    next();
  } else {
    next(createError(404, 'failed to find user'));
  }
});

// GET index
app.get('/', (req, res) => {
  res.send('Visit /user/ or /user/0-2');
});

// GET :user
app.get('/user/:user', (req, res, next) => {
  res.send(`user ${req.user.name}`);
});

// GET users :from - :to
app.get('/users/:from-:to', (req, res, next) => {
  const from = req.params.from;
  const to = req.params.to;
  const names = users.map(user => user.name);
  res.send(`users ${names.slice(from, to).join(', ')}`);
});

// start app
app.listen(3000);
console.log('App started on port 3000');
