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

    if (users[roomId] && users[roomId] >= 2) {
      // 假設最大人數為10
      socket.emit('join', {
        isSuccess: false,
      });
    } else {
      const prevRoomCounts = users[roomId] || 0;
      users[roomId] = prevRoomCounts + 1;
      socket.emit('join', {
        playerIndex: prevRoomCounts,
        isSuccess: true,
      });
    }
    console.log(users, roomId);
  });
  socket.on('chessDown', (chessId) => {
    io.sockets.emit('chessDown', chessId);
  });

  socket.on('leave', (roomId) => {
    if (users[roomId]) {
      users[roomId] -= 1;
    }
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
