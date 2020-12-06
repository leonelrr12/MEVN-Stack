const express = require('express');
const morgan = require('morgan');

// Initializations
const app = express();
require('./config/database')

// Settings
app.set('port', process.env.PORT || 3001);

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks'));

// Static files
app.use(express.static(__dirname + '/public'))

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});