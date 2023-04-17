require('dotenv').config();

const app = require('./app');
require('./database');

//Socket.Io
const http = require('http');
const { Server } = require('socket.io');
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*', //trebuie sa fie '*' nu dar accesul la http//:localhost:3000 ca bloqueaza conexiunea
    METHODS: ['GET', 'POST', 'PATH'],
  },
});

//Socket.Io initialization
io.on('connection', (socket) => {
  console.log(`A new user connected: ${socket.id}`);

  socket.on('start', (data) => {
    socket.broadcast.emit('recieved_message', data);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

async function main() {
  // await app.listen(app.get('port'));//schimbat pt ca acum vine din socket.io conexiounea
  await httpServer.listen(app.get('port'));

  console.log('Server run on port', app.get('port'));
}

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💣 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); ///asa inchizi servar-ul dupa ce a terminat toate procesele ce avea de facut
  });
});

main();
