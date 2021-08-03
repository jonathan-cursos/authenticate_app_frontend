const express = require('express')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const session = require("express-session");
// const session = require("cookie-session");
const cookieParser = require("cookie-parser");
const routes = require('./routes')
const config = require('./config')
const app = express()

app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(
  session({
    // cookie: {
    //   secure: true,
    //   maxAge: 60000,
    // },
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', config.port)
app.use('/auth', routes)
app.use('/', express.static(path.join(__dirname, 'dist')))

app.listen(app.get('port'), () => console.log(`Listen on port ${config.port}`))