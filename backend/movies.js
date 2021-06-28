const csv = require('csv-parser');
const fs = require('fs');

module.exports = new Promise( (resolve, reject) => {
    var rows = [];

    fs.createReadStream(`${__dirname}/data/movies_metadata.csv`)
        .pipe(csv())
        .on('data', (row) => {
            rows.push({
                id: row.id,
                genres: JSON.parse(row.genres).map(g => g.name),
                release_date: row.release_date,
                title: row.title == "" ? row.original_title : row.title,
                tagline: row.tagline,
                overview: row.overview,
                url: `https://www.imdb.com/title/${row.imdb_id}/`
            });
        })
        .on('end', () => {
            rows.sort((a, b) => a.title > b.title ? 1 : (a.title < b.title ? -1 : 0));

            resolve(rows)
        });

})

