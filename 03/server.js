/* eslint no-console: 0 */
import Express from 'express';
import moment from 'moment';
import fetch from 'isomorphic-fetch';
import config from './config';

const app = new Express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(Express.static(`${__dirname}/public`));
app.get('/', (_, res) => {
  fetch(`${config.serverUrl}/messages`)
    .then(response => response.json())
    .then(data => data.map(dt => {
      const { message, user } = dt;
      const finalMessage = Object.assign({}, message, {
        createdAt: moment(message.createdAt).format('YYYY-MM-DD h:mm'),
        updatedAt: moment(message.updatedAt).format('YYYY-MM-DD h:mm'),
      });
      return { message: finalMessage, user };
    }))
    .then(json => res.render('index', { data: json, error: null }))
    .catch(error => res.render('index', { data: null, error }));
});

app.listen(port, () => console.log('Express started on port 3000'));
