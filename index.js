const express = require('express');
const exhbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exhbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('App funcionando!')
});