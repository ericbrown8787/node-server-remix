const express = require('express');
const nunjucks = require('nunjucks');
const axios = require('axios');
const fs = require('fs');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// app.use(express.static('roll-a-ball'));
app.set('view engine', 'nunjucks');

// ======Render correct pages======
app.get('/', async (req, res) => {
  res.render('index.njk');
});

app.get('/info', async (req, res) => {
  res.render('info.njk');
});

// app.get('/game', async (req, res) => {
//   res.send('/roll-a-ball/index.html');
// });

// app.get('/404', async (req, res) => {
//   res.render('index.njk');
// });

// ======Get my public github info======
app.get('/whoami', async (req, res) => {
  let data = {};

  try {
    const response = await axios.get('https://api.github.com/users/ericbrown8787');
    data = response.data;
  } catch (e) {
    data = { message: 'User not found' };
  } finally {
    data = {
      ...data,
      docs: 'https://docs.github.com/rest/reference/users#get-a-user',
    };
  }
  fs.writeFileSync('./local-logs/githubplaintext.txt', JSON.stringify(data));
  fs.writeFileSync('./local-logs/githubjson.json', JSON.stringify(data));
  res.send(data);
});

app.get('/fsc', async (req, res) => {
  let data = {};

  try {
    const response = await axios.get('https://api.github.com/users/ericbrown8787');
    data = response.data;
  } catch (e) {
    data = { message: 'User not found' };
  } finally {
    data = {
      ...data,
      docs: 'https://docs.github.com/rest/reference/users#get-a-user',
    };
  }

  res.send(data);
});

app.use((req, res) => {
  res.status(404).render(
    '404.njk',
  );
});

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
