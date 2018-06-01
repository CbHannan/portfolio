const express = require('express');
const bodyParser = require('body-parser');
var message = require('./routes/message');
var logger = require('morgan');
var path = require('path');
var message = require('./routes/message');

const app = express(); 
app.listen(process.env.PORT || 5000);
var cors = require('cors');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('*', express.static(path.join(__dirname, 'dist')));
app.use('/api/message', message);
app.use(cors({
  origin: true,
  credentials: true
}));

