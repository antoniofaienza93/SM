

/**
 * DB Module dependencies.
 */
require('dotenv').config();
const mongoose = require('mongoose');

/**
 * Database Configuration
 */
mongoose.connect(process.env.DATABASE, {  useNewUrlParser: true }); // useMongoClient: true <-- deprecated
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

/**
 * Module dependencies.
 */
require('../models/users');
var app = require('../app');
var debug = require('debug')('my-web:server');
var http = require('http');

// Define constant PORT
const PORT = normalizePort(process.env.PORT || '3000');
app.set('port', PORT);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);



// ================ ALTERNATIVE ================
// app.listen(PORT, function () {
//     console.log("=============================");
//     console.log('Listening on port ' + PORT);
//     console.log("=============================");
// });
// =============================================


server.listen(PORT, function(){
    console.log("=============================");
    console.log(`Express is running on port ${server.address().port}`); 
    console.log("=============================");
});
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('DEBUG on --> ' + bind);
  }
