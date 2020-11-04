const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');


const mysql = require('mysql');
const pool = require('./core/db/pool');

const indexRouter = require('./routes/index');
const stockRouter = require('./routes/stock');
const addPartsRouter = require('./routes/add');
const expensePartsRouter = require('./routes/expense');
const addNewPartsRouter = require('./routes/parts/addNewPart');
const showStockAddRouter = require('./routes/stock-add');
const showStockExpenseRouter = require('./routes/stock-expense');
const showPrintersPartsRouter = require('./routes/parts/printers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 360000 }
}));

app.use(flash());

app.use('/', indexRouter);
app.use('/stock', stockRouter);
app.use('/add', addPartsRouter);
app.use('/expense', expensePartsRouter);
app.use('/parts/add-new-parts', addNewPartsRouter);
app.use('/stock-add', showStockAddRouter);
app.use('/stock-expense', showStockExpenseRouter);
app.use('/parts/printers', showPrintersPartsRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
