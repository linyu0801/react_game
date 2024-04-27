import express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';

const app = express();

const httpServer = http.createServer(app);

type JoinEmit = {
  playerIndex: number;
  userId: string;
  roomData: string[];
};

type ChessDownEmit = {
  chessIndex: number;
  playerIndex: number;
};
type ServerToClientEvents = {
  join: ({ playerIndex, userId, roomData }: JoinEmit) => void;
  chessDown: ({ chessIndex, playerIndex }: ChessDownEmit) => void;
  restart: (roomData: string[]) => void;
};
type ClientToServerEvents = {
  join: (roomId: string) => void;
  chessDown: (roomId: string, chessIndex: number) => void;
  leave: (roomId: string) => void;
  restart: (roomId: string) => void;
};

type User = {
  [key: string]: string[];
};

const users: User = {};

const getCurrentRoomId = (userData: User, id: string) => {
  return Object.keys(userData).find((key) => {
    return userData[key].includes(id);
  });
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

io.on('connection', (socket) => {
  socket.on('join', (roomId) => {
    if (!users[roomId]) {
      users[roomId] = [];
    }
    const currentRoom = users[roomId];
    const currentPlayerIndex = currentRoom.findIndex((id) => id === socket.id);
    const isInRoom = currentPlayerIndex > -1;

    if (!isInRoom && currentRoom.length < 2) {
      currentRoom.push(socket.id);
    }

    socket.emit('join', {
      playerIndex: isInRoom ? currentPlayerIndex : currentRoom.length - 1,
      userId: socket.id,
      roomData: currentRoom,
    });

    console.log({ users, currentRoom });
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
  socket.on('restart', () => {
    const currentRoomId = getCurrentRoomId(users, socket.id);
    const roomData = currentRoomId ? users[currentRoomId] : [];
    io.sockets.emit('restart', roomData);
  });
  socket.on('disconnect', () => {
    const currentRoomId = getCurrentRoomId(users, socket.id);
    if (currentRoomId) {
      users[currentRoomId].splice(users[currentRoomId].indexOf(socket.id), 1);
      io.emit('restart', users[currentRoomId]);
    }
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
