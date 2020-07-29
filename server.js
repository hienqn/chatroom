const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const formatMessage = require('./utils');
const { userJoin, getCurrentUser } = require('./users');

// defining a port 
const PORT = process.env.PORT || 3000;
app = express();
server = http.createServer(app);
const io = socketio(server);
// running the server
botname = 'Chatcord box';
app.use(express.static(path.join(__dirname + '/public')));

// connecting to the server
io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {
    // Broadcast when a user connects
    socket.emit('msg', formatMessage(botname, 'Welcome to Chatcord'));

    console.log('Joining Room');
    console.log(socket.id);
    const user = userJoin(socket.id, username, room);
    console.log('user.room is defined', user.room);
    socket.broadcast.to(user.room)
      .emit('msg', formatMessage(botname, `${user.username} has joined the chat`));

    // runs when client disconnects

    socket.on('disconnect', () =>
      io.emit('msg', formatMessage(botname, `${user.username} has left the chat`))
    );

    socket.on('chatMessage', (chatMessage) => {
      const currentUser = getCurrentUser(socket.id);
      console.log(currentUser);
      io.to('JavaScript').emit('msg', formatMessage('USER', chatMessage));
      // .to(currentUser.room)
    })
  })

  // socket.on('chatMessage', (chatMessage) => {
  //   const currentUser = getCurrentUser(socket.id);
  //   io.to(currentUser.room).emit('msg', formatMessage('USER', chatMessage));
  // })

})

server.listen(PORT, () => console.log(`Server running on ${PORT}`));