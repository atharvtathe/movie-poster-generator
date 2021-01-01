const path = require('path');

const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

async function movieget(inputvalue) {
    const movie = await fetch(`http://www.omdbapi.com/?t=${inputvalue}&apikey=ea5502bf`);
    const hello = await movie.json();
    return hello;
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/poster', (req, res, next) => {
    const title = req.query.title;
    movieget(title).then(data => {
            res.send(data);
    }); 
})


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port);