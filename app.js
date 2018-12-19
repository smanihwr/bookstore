const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//connect to mongoose
mongoose.connect('mongodb+srv://username:password@cluster0-gofqg.mongodb.net/bookstore?retryWrites=true', { useNewUrlParser: true });
const db = mongoose.connection;

app.get('/', function (req, res) {
   res.send('Please use /api/books or /api/genre endpoints');
});

app.get('/api/genres', function (req, res) {
    Genre.getGenres( (err, genres) => {
        if(err) {
            throw err;
        }
        res.json(genres);
    });
});

app.post('/api/genres', function (req, res) {
    var genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.put('/api/genres/:_id', function (req, res) {

    var id = req.params._id;
    var genre = req.body;

    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.delete('/api/genres/:_id', function (req, res) {

    var id = req.params._id;
    Genre.deleteGenre(id, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.get('/api/books', function (req, res) {
    Book.getBooks( (err, books) => {
        if(err) {
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.post('/api/books', function (req, res) {
    var book = req.body;
    Book.addBook(book, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.put('/api/books/:_id', function (req, res) {

    var id = req.params._id;
    var book = req.body;

    Book.updateBook(id, book, {}, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.delete('/api/books/:_id', function (req, res) {

    var id = req.params._id;
    Book.deleteBook(id, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

