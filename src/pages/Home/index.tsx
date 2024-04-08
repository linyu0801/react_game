import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { RolesEnum, reducer, ticTacToeInitState } from './reducer';
import InfoSection from '@/components/InfoSection';
import S from './style';

type JoinRoomParams = {
  isSuccess: boolean;
  playerIndex?: RolesEnum;
};
const CHESS_TOTAL = 9;
const chessNumbers = [...Array(CHESS_TOTAL)].map((_, i) => i + 1);

function Home() {
  const [state, dispatch] = useReducer(reducer, ticTacToeInitState);
  const { roomId } = useParams();
  const {
    currentRole,
    isPlayerOneWin,
    isPlayerTwoWin,
    playOneChess,
    playTwoChess,
    mode,
    ws,
  } = state;
  console.log(currentRole);
  const isMultiMode = mode === 'multi';

  const isGameEnd =
    isPlayerOneWin ||
    isPlayerTwoWin ||
    playOneChess.length + playTwoChess.length === CHESS_TOTAL;

  const winRole =
    isGameEnd && (isPlayerOneWin ? RolesEnum.PLAYER_ONE : RolesEnum.PLAYER_TWO);

  // console.log({ playOneChess, playTwoChess, currentRole });
  const handleChessClick = (chessNumber: number, disabled: boolean) => {
    if (isGameEnd || disabled) return;
    if (isMultiMode) {
      ws!.emit('chessDown', chessNumber);
    } else {
      dispatchChessAction(currentRole, chessNumber);
    }
  };

  const restartGame = () => dispatch({ type: 'RESTART_GAME' });

  const dispatchChessAction = (
    currentPeople: RolesEnum,
    chessNumber: number,
  ) => {
    if (currentPeople === RolesEnum.PLAYER_ONE) {
      dispatch({ type: 'SET_PLAYER_ONE_CHESS', payload: chessNumber });
    } else {
      dispatch({ type: 'SET_PLAYER_TWO_CHESS', payload: chessNumber });
    }
  };

  const initWebSocket = (socket: Socket) => {
    let currentPeople = 0;
    // 對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    if (socket) {
      socket.on('join', (message) => {
        const { isSuccess, playerIndex }: JoinRoomParams = message;
        if (typeof playerIndex === 'undefined' || !isSuccess) return;
        currentPeople = playerIndex;
        dispatch({ type: 'SET_ROLE', payload: playerIndex });
        console.log('join', message);
      });
      socket.on('chessDown', (chessIndex) => {
        console.log('chessDown', chessIndex);
        dispatchChessAction(currentPeople, chessIndex);
      });
    }
  };

  useEffect(() => {
    let socket: Socket;
    if (roomId) {
      dispatch({ type: 'CHANGE_MODE', payload: 'multi' });
      socket = io('http://localhost:3000');
      socket.on('connect', () => {
        socket.emit('join', roomId);
      });
      initWebSocket(socket);
      // setTimeout(() => {
      //   socket.emit('join', roomId);
      // }, 1000);

      dispatch({ type: 'SET_SOCKET', payload: socket });
    }
    return () => {
      if (socket) {
        socket.emit('disconnect', roomId);
      }
    };
  }, [roomId]);

  const handleModeChange = () => {
    const nextMode = isMultiMode ? 'multi' : 'single';
    dispatch({ type: 'CHANGE_MODE', payload: nextMode });
  };

  return (
    <S.Container>
      <InfoSection
        currentRole={currentRole}
        isGameEnd={isGameEnd}
        winRole={winRole}
      />
      <S.ToggleModeButton onClick={handleModeChange}>
        {isMultiMode ? '多人模式' : '單人模式'}
      </S.ToggleModeButton>
      <S.Checkerboard>
        {chessNumbers.map((number) => {
          const hasSelfPlayerChess = playOneChess.includes(number);
          const hasOtherPlayerChess = playTwoChess.includes(number);
          const disabled = hasSelfPlayerChess || hasOtherPlayerChess;
          return (
            <S.Chess
              key={number}
              onClick={() => handleChessClick(number, disabled)}
              $disabled={disabled}
            >
              {hasSelfPlayerChess && <S.CircleIcon />}
              {hasOtherPlayerChess && <S.CloseIcon />}
            </S.Chess>
          );
        })}
      </S.Checkerboard>
      <S.RestartButton onClick={restartGame}>Restart Game</S.RestartButton>
    </S.Container>
  );
}

export default Home;
