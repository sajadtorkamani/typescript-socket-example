import * as net from 'net'
import * as fs from 'fs'
import chalk from 'chalk'

const SOCKET_PATH = '/tmp/example_socket'

// Ensure the socket file does not already exist
if (fs.existsSync(SOCKET_PATH)) {
  fs.unlinkSync(SOCKET_PATH)
}

// Create the server
const server = net.createServer((connection) => {
  console.log(chalk.green('Client connected'))

  // Handle data received from the client
  connection.on('data', (data) => {
    console.log(`Received from client: ${data.toString()}`)
    connection.write('Hello from server!')
  })

  // Handle client disconnection
  connection.on('end', () => {
    console.log(chalk.red('Client disconnected'))
  })
})

// Start listening on the Unix socket
server.listen(SOCKET_PATH, () => {
  console.log(`🚀 Server is listening on ${SOCKET_PATH}`)
})

// Handle server errors
server.on('error', (err) => {
  console.error(chalk.red(`Server error: ${err.message}`))
})
