const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

// middleware
const createError = require('http-errors');



// const path = require('path');
// const cors = require('cors');




const app = express();

const port = process.env.Port || 3000;

app.use(bodyParser.json());

// app.use(cors()); // middleware


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require ('./routes'));


// errors
app.use((req, res,next) => {
    next(createError(404, 'Not found'))
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});



mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
        app.listen(port, () => {console.log(`Database is listenning and node Running on port ${port}`)})
    }
});

