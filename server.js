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

io.on('connection', (socket) => {
  // 當有新玩家加入房間時
  // socket.on('joinRoom', (roomId) => {
  //   socket.join(roomId);

  //   // 在房間中廣播玩家數量
  //   io.to(roomId).emit(
  //     'playersCount',
  //     io.sockets.adapter.rooms.get(roomId)?.size,
  //   );

  //   // 檢查玩家數量是否達到遊戲開始條件
  //   if (io.sockets.adapter.rooms.get(roomId)?.size === 2) {
  //     // 開始遊戲，向房間內的所有玩家發送遊戲開始事件
  //     io.to(roomId).emit('startGame');
  //   }
  // });
  /* 只回傳給發送訊息的 client */
  socket.on('getMessage', (message) => {
    socket.emit('getMessage', message);
  });

  /* 回傳給所有連結著的 client */
  socket.on('getMessageAll', (message) => {
    io.sockets.emit('getMessageAll', message);
  });

  /* 回傳給除了發送者外所有連結著的 client */
  socket.on('getMessageLess', (message) => {
    socket.broadcast.emit('getMessageLess', message);
  });
});
