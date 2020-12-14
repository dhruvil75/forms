const app = require("../app");
const http = require("http");
let { port } = require('../config/index');
const log = require('npmlog');

port = normalizePort(port);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);



function normalizePort (val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
}


function onError (error) {
    if (error.syscall !== "listen") {
      throw error;
    }
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            log.error('FATAL', bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            log.error('FATAL',bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    log.info('FYI',`Server listening on port ${port}`);
}
