const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
require('./auth')(passport);
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}

app.use(session({  
  secret: '123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 } //30min
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRouter);
/*app.use('/users', authenticationMiddleware, usersRouter);  Rotas Para Usuários*/
app.use('/', authenticationMiddleware,  indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;