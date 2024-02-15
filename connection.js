// connection.js
const express = require('express');

const app = express();
const port = 3113;
const db = require('mysql').createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3307,
  database: 'bkk'
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных');
  }
});

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/saveData', (req, res) => {

  const query = 'INSERT INTO bkk_word (data) VALUES (?)';
  db.query(query, [req.body.data, 'newtext'], (err, result) => {
    if (err) {
      console.error('Ошибка при сохранении данных:', err);
      res.status(500).json({ error: 'Ошибка при сохранении данных' });
    } else {
      console.log('Данные успешно сохранены в базе данных');
      res.status(200).json({ message: 'Данные успешно сохранены' });
    }
  });
});

app.get('/getAllData', (req, res) => {
  const query = 'SELECT * FROM bkk_word';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Ошибка при получении данных из базы данных:', err);
      res.status(500).json({ error: 'Ошибка при получении данных' });
    } else {
      console.log('Данные успешно получены из базы данных');
      res.status(200).json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
