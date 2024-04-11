const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

// 將 express 放進 http 中開啟 Server 的 3000 port ，正確開啟後會在 console 中印出訊息
const server = require('http')
  .createServer(app)
  .listen(3000, () => {
    console.log('open server!');
  });

// 將啟動的 Server 送給 socket.io 處理
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const users = {};

io.on('connection', (socket) => {
  let currentUserId = '';
  socket.on('join', (roomId, userId) => {
    if (!users[roomId]) {
      users[roomId] = [];
    }
    const currentRoom = users[roomId];
    const currentPlayerIndex = currentRoom.findIndex((id) => id === userId);
    console.log({ users, userId, currentRoom, currentPlayerIndex });

    const isInRoom = currentPlayerIndex > -1;
    // 檢查房間是否已滿
    if (currentRoom.length === 2 && !isInRoom) {
      socket.emit('join', {
        isSuccess: false,
        playerIndex: 3,
      });
    } else {
      currentUserId = userId || uuidv4();

      if (!isInRoom) {
        currentRoom.push(currentUserId);
      }
      console.log({
        playerIndex: isInRoom ? currentPlayerIndex : currentRoom.length - 1,
      });
      socket.emit('join', {
        userId: currentUserId,
        playerIndex: isInRoom ? currentPlayerIndex : currentRoom.length - 1,
        isSuccess: true,
      });
    }
  });
  socket.on('chessDown', (roomId, chessIndex) => {
    const playerIndex = users[roomId].indexOf(currentUserId);
    console.log({ playerIndex });
    io.sockets.emit('chessDown', { chessIndex, playerIndex });
  });

  socket.on('leave', (roomId) => {
    if (users[roomId]) {
      users[roomId].forEach((userId, index) => {
        if (userId === currentUserId) {
          users[roomId].splice(index, 1);
        }
      });
    }
  });
  socket.on('restart', (roomId) => {
    io.sockets.emit('restart', 'restart game!');
  });
});
//   /* 只回傳給發送訊息的 client */
//   socket.on('getMessage', (message) => {
//     socket.emit('getMessage', message);
//   });

//   /* 回傳給所有連結著的 client */
//   socket.on('getMessageAll', (message) => {
//     io.sockets.emit('getMessageAll', message);
//   });

//   /* 回傳給除了發送者外所有連結著的 client */
//   socket.on('getMessageLess', (message) => {
//     socket.broadcast.emit('getMessageLess', message);
//   });
