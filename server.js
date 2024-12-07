const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport'); //  authentication
const session = require('express-session'); //  authentication
const GitHubStrategy = require('passport-github2').Strategy;


// middleware
const createError = require('http-errors');

// const path = require('path');
const cors = require('cors');

const app = express();

const port = process.env.Port || 3000;

app.use(bodyParser.json());

// app.use(cors()); // middleware

//  authentication
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE','PATCH']}));
app.use(cors({ origin: '*'}));

app.use('/', require ('./routes'));


//passport
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessTOken, refreshToken, profile, done) {
    return done(null, profile);
}))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Loggen in as ${req.session.user.displayName}` : "Logged Out" )} );

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

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

