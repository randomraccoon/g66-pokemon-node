var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

var routes = require('./controllers/index');
var trainers = require('./controllers/trainers');
var pokemon = require('./controllers/pokemon');

var app = express();
var expressLayouts = require('express-ejs-layouts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', routes);
app.use('/trainers', trainers);
app.use('/pokemon', pokemon);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, () => console.log(`It's port ${port} and ALLLLL'S WELLLLL!`));

module.exports = app;
