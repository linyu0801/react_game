import React, { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { ChessDownParams, JoinRoomParams } from './type';
import { DispatchActionType, RolesEnum } from './reducer';

type Props = {
  dispatch: React.Dispatch<DispatchActionType>;
  currentRole: RolesEnum;
  isMultiPlayerMode: boolean;
};

const useMultiPlayer = ({
  dispatch,
  currentRole,
  isMultiPlayerMode,
}: Props) => {
  const { roomId } = useParams();
  const initWebSocket = (socket: Socket) => {
    //  設定監聽
    if (socket) {
      socket.on('join', ({ isSuccess, playerIndex }: JoinRoomParams) => {
        if (typeof playerIndex === 'undefined' || !isSuccess) return;
        dispatch({ type: 'SET_ROLE', payload: playerIndex });
      });
      socket.on('chessDown', ({ chessIndex, playerIndex }: ChessDownParams) => {
        if (playerIndex === RolesEnum.PLAYER_ONE) {
          dispatch({ type: 'SET_PLAYER_ONE_CHESS', payload: chessIndex });
        } else {
          dispatch({ type: 'SET_PLAYER_TWO_CHESS', payload: chessIndex });
        }
      });
      socket.on('restart', () => {
        dispatch({ type: 'RESTART_GAME' });
      });
    }
  };

  useEffect(() => {
    let socket: Socket;
    if (roomId) {
      socket = io('http://localhost:3000');
      socket.on('connect', () => {
        socket.emit('join', roomId);
      });
      initWebSocket(socket);
      dispatch({ type: 'SET_SOCKET', payload: socket });
      dispatch({ type: 'CHANGE_MODE', payload: 'multi' });
    }
    return () => {
      if (socket) {
        socket.emit('disconnect', roomId);
      }
    };
  }, [roomId]);
};

export default useMultiPlayer;
