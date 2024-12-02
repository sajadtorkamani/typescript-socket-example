import * as net from "net";
import chalk from 'chalk'

const SOCKET_PATH = "/tmp/example_socket";

// Create the client
const client = net.createConnection(SOCKET_PATH, () => {
  console.log(chalk.green('Connected to the server'));

  // Send data to the server
  client.write("Hello from client!");
});

// Handle data received from the server
client.on("data", (data) => {
  console.log(`Received from server: ${data.toString()}`);
  client.end(); // Close the connection after receiving a response
});

// Handle connection closure
client.on("end", () => {
  console.log("Disconnected from the server");
});

// Handle client errors
client.on("error", (err) => {
  console.error(`Client error: ${err.message}`);
});