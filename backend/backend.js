const express = require('express')
const cors = require('cors')
const app = express()

const movies = require('./movies')

app.use(cors())
app.use(express.static('../frontend/build'));

app.get('/api/genres', async (req, res) => {
    let obj = {};
    let genres = null;

    const _movies = await movies;

    genres = [...new Set((_movies).flatMap(movie => movie.genres))];
    genres.sort();

    for (let i = 0; i < genres.length; i++) {
        let count = _movies.filter(movie => movie.genres.includes(genres[i])).length;
        obj[genres[i]] = count;
    }

    res.json(obj);
});

app.get('/api/movies', async (req, res) => {
    let { limit = 500, from = 0, genre = null } = req.query

    if (typeof limit == "string") limit = Number(limit);
    if (typeof from == "string") from = Number(from);

    if (limit > 500) return res.status(400).send("Limit must be <= 500");

    var _movies = await movies;
    if (genre !== null) {
        _movies = _movies.filter(movie => movie.genres.includes(genre))
    }
    const lastPageCount = Math.ceil(_movies.length / limit);
    _movies = _movies.slice(from, from + limit);

    res.json({movies: _movies, lastPageCount })
});

app.use((req, res) => {
    res.sendFile('frontend/build/index.html');
});

module.exports = app;

