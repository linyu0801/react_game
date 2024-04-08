import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

function Main() {
  const [ws, setWs] = useState<Socket>();

  const connectWebSocket = () => {
    // 開啟
    setWs(io('http://localhost:3000'));
  };

  useEffect(() => {
    if (ws) {
      // 連線成功在 console 中打印訊息
      console.log('success connect!');
      // 設定監聽
      initWebSocket();
    }
  }, [ws]);

  const initWebSocket = () => {
    // 對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    if (ws) {
      ws.on('getMessage', (message) => {
        console.log(message);
      });
      ws.on('getMessageAll', (message) => {
        console.log(message);
      });
      ws.on('getMessageLess', (message) => {
        console.log(message);
      });
      ws.on('join', (message) => {
        console.log(message);
      });
    }
  };

  const sendMessage = (name: string) => {
    if (ws) {
      ws.emit(name, '收到訊息囉！');
    }
  };
  return (
    <div>
      <input
        type='button'
        value='連線'
        onClick={connectWebSocket}
      />
      <input
        type='button'
        value='送出訊息，只有自己收到回傳'
        onClick={() => {
          sendMessage('getMessage');
        }}
      />
      <input
        type='button'
        value='送出訊息，讓所有人收到回傳'
        onClick={() => {
          sendMessage('getMessageAll');
        }}
      />
      <input
        type='button'
        value='送出訊息，除了自己外所有人收到回傳'
        onClick={() => {
          sendMessage('getMessageLess');
        }}
      />
      <input
        type='button'
        value='加入房間'
        onClick={() => {
          sendMessage('join');
        }}
      />
    </div>
  );
}

export default Main;
