const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'nunjucks');

app.get('/', async (req, res) => {
  res.render('index.njk');
});

app.get('/info', async (req, res) => {
  res.render('info.njk');
});

app.get('/404', async (req, res) => {
  res.render('index.njk');
});

app.use((req, res) => {
  res.status(404).render(
    '404.njk',
  );
});

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
