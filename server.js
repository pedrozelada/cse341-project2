const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

// middleware
// const createError = require('http-errors');
// const path = require('path');
// const cors = require('cors');




const app = express();

const port = process.env.Port || 3000;

app.use(bodyParser.json());

// app.use(cors()); // middleware


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//     );
//     res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });

app.use('/', require ('./routes'));


// errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});



mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else{
        app.listen(port, () => {console.log(`Database is listenning and node Running on port ${port}`)})
    }
});

