var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index')
var users = require('./routes/users')
var posts = require('./routes/posts')
var products = require('./routes/products')
var productCategories = require('./routes/productCategories')
var productTypes = require('./routes/productTypes')
var imageUpload = require('./routes/imageUpload')
var imageUploadMultiple = require('./routes/imageUploadMulitple')
var imageFromReact = require('./routes/imageFromReact')

var app = express();

// .ENV
require('dotenv').config()

// CORS
var cors = require('cors')
app.use(cors())

// Mongoose
var mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-lxcs3.mongodb.net:27017,cluster0-shard-00-01-lxcs3.mongodb.net:27017,cluster0-shard-00-02-lxcs3.mongodb.net:27017/mongoose_admin_cms_server?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index)
app.use('/users', users)
app.use('/posts', posts)
app.use('/products', products)
app.use('/product_categories', productCategories)
app.use('/product_types', productTypes)
app.use('/image', imageUpload)
app.use('/image_multiple', imageUploadMultiple)
app.use('/getImage', imageFromReact)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
