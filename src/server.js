"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
var fs = require("fs");
var SOCKET_PATH = '/tmp/example_socket';
// Ensure the socket file does not already exist
if (fs.existsSync(SOCKET_PATH)) {
    fs.unlinkSync(SOCKET_PATH);
}
// Create the server
var server = net.createServer(function (connection) {
    console.log('Client connected');
    // Handle data received from the client
    connection.on('data', function (data) {
        console.log("Received from client: ".concat(data.toString()));
        connection.write('Hello from server!');
    });
    // Handle client disconnection
    connection.on('end', function () {
        console.log('Client disconnected');
    });
});
// Start listening on the Unix socket
server.listen(SOCKET_PATH, function () {
    console.log("Server is listening on ".concat(SOCKET_PATH));
});
// Handle server errors
server.on('error', function (err) {
    console.error("Server error: ".concat(err.message));
});
