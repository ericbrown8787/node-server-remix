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
app.get('/', (req, res) => {
  res.render('index.njk');
});

app.get('/info', (req, res) => {
  res.render('info.njk');
});

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
  fs.writeFileSync('./local-logs/github.json', JSON.stringify(data));
  res.send(data);
});

app.get('/otherstuff', async (req, res) => {
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
  const funMessages = ['It looks like you\'ve made a wrong turn.', 'Whatever you did didn\'t work. Have you tried unplugging your computer?', 'This page doesn\'t exist. Does anything even exist?'];
  const randomIndex = Math.floor(Math.random() * funMessages.length);
  res.status(404).render('404.njk', { notFoundMessage: funMessages[randomIndex] });
});

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
