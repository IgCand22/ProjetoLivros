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

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'page', title, pageqty]

    conn.query(sql, data, function(err) {
        if(err) {
            console.log(err)
        }

        res.redirect('/')
    }) 

})

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, function(err, data) {
        if(err) {
            console.log(err)
            return
        }
        const books = data

        res.render('books', { books })
    })

})

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    conn.query(sql, data, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book })
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    conn.query(sql, data, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render('editbook', { book })
    })
})

app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'page', pageqty, 'id', id]

    conn.query(sql, data, function(err) {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.post('/books/remove/:id', (req, res) => {

    const id = req.params.id

    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    conn.query(sql, data, function(err) {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/books')
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