import express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';

const app = express();

const httpServer = http.createServer(app);

type JoinEmit = {
  isSuccess: boolean;
  playerIndex: number;
};

type ChessDownEmit = {
  chessIndex: number;
  playerIndex: number;
};
type ServerToClientEvents = {
  join: ({ isSuccess, playerIndex }: JoinEmit) => void;
  chessDown: ({ chessIndex, playerIndex }: ChessDownEmit) => void;
  restart: (message: string) => void;
};
type ClientToServerEvents = {
  join: (roomId: string) => void;
  chessDown: (roomId: string, chessIndex: number) => void;
  leave: (roomId: string) => void;
  restart: () => void;
};

// 將啟動的 Server 送給 socket.io 處理
const io = new socketio.Server<ClientToServerEvents, ServerToClientEvents>(
  httpServer,
  {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  },
);

type User = {
  [key: string]: string[];
};

const users: User = {};

io.on('connection', (socket) => {
  socket.on('join', (roomId: string) => {
    if (!users[roomId]) {
      users[roomId] = [];
    }
    const currentRoom = users[roomId];
    const currentPlayerIndex = currentRoom.findIndex((id) => id === socket.id);
    const isInRoom = currentPlayerIndex > -1;

    // 檢查房間是否已滿
    if (currentRoom.length === 2 && !isInRoom) {
      socket.emit('join', {
        isSuccess: false,
        playerIndex: -1,
      });
    } else {
      if (!isInRoom) {
        currentRoom.push(socket.id);
      }

      socket.emit('join', {
        playerIndex: isInRoom ? currentPlayerIndex : currentRoom.length - 1,
        isSuccess: true,
      });
    }
    console.log({ users, currentRoom });
  });
  socket.on('chessDown', (roomId: string, chessIndex: number) => {
    const playerIndex = users[roomId].indexOf(socket.id);
    io.sockets.emit('chessDown', { chessIndex, playerIndex });
  });

  socket.on('leave', (roomId: string) => {
    if (users[roomId]) {
      users[roomId].forEach((userId, index) => {
        if (userId === socket.id) {
          users[roomId].splice(index, 1);
        }
      });
    }
  });
  socket.on('restart', () => {
    io.sockets.emit('restart', 'restart game!');
  });
  socket.on('disconnect', () => {
    const currentRoomId = Object.keys(users).find((key) => {
      return users[key].includes(socket.id);
    });
    if (currentRoomId) {
      users[currentRoomId].splice(users[currentRoomId].indexOf(socket.id), 1);
      io.emit('restart', 'restart game!');
    }
    console.log('disconnect', socket.id, users);
  });
});

httpServer.listen(3000, () => console.log('open server!'));
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
