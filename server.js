// import { createServer } from 'http';
// import { Server, Socket } from 'socket.io';

const express = require('express');

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
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

const users = {};

io.on('connection', (socket) => {
  socket.on('join', (roomId) => {
    // 檢查房間是否已滿

    if (users[roomId] && users[roomId].length >= 2) {
      // 假設最大人數為10
      socket.emit('join', {
        isSuccess: false,
      });
    } else {
      if (!users[roomId]) {
        users[roomId] = [];
      }
      const playerIndex = users[roomId].length || 0;
      users[roomId].push(socket.id);
      socket.emit('join', { playerIndex, isSuccess: true });
    }
    console.log(users, roomId);
  });
  socket.on('chessDown', (roomId, chessIndex) => {
    const playerIndex = users[roomId].indexOf(socket.id);
    io.sockets.emit('chessDown', { chessIndex, playerIndex });
  });

  socket.on('leave', (roomId) => {
    if (users[roomId]) {
      users[roomId].forEach((userId, index) => {
        if (userId === socket.id) {
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
