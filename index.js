const express = require('express');
const exhbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

app.engine('handlebars', exhbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, page) VALUES ('${title}', '${pageqty}')`

    conn.query(sql, function(err) {
        if(err) {
            console.log(err)
        }

        res.redirect('/')
    }) 

})

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(function(err) {
    if(err) {
        console.log(err)
    }

    console.log('Conectou ao MySQL!')

    app.listen(3000)
})