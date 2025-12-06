const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log("MongoDB підключено"))
  .catch(err => console.error("Помилка MongoDB:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userController = require('./controllers/userController');

app.get('/', (req, res) => {
    res.render('index', { title: 'Головна сторінка' });
});

app.get('/users', userController.getUsers);
app.post('/users', userController.createUser);

app.get('/about', (req, res) => {
    res.render('about', { title: 'Про нас' });
});

app.get('/profile', (req, res) => {
    res.render('profile', { title: 'Профіль користувача' });
});



app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
