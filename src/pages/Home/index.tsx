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
const CHESS_COUNTS = 9;
const chessNumbers = [...Array(CHESS_COUNTS)].map((_, i) => i + 1);

function Home() {
  const [state, dispatch] = useReducer(reducer, ticTacToeInitState);
  const { roomId } = useParams();
  const {
    currentRole,
    currentRound,
    isPlayerOneWin,
    isPlayerTwoWin,
    playOneChess,
    playTwoChess,
    mode,
    ws,
  } = state;

  const isMultiPlayerMode = mode === 'multi';

  const isGameOver =
    isPlayerOneWin ||
    isPlayerTwoWin ||
    playOneChess.length + playTwoChess.length === CHESS_COUNTS;

  const winRole =
    isGameOver &&
    (isPlayerOneWin ? RolesEnum.PLAYER_ONE : RolesEnum.PLAYER_TWO);

  const handleChessClick = (chessNumber: number, disabled: boolean) => {
    if (isGameOver || disabled) return;
    if (isMultiPlayerMode) {
      ws!.emit('chessDown', roomId, chessNumber);
    } else {
      dispatchChessAction(currentRole, chessNumber);
    }
  };

  const restartGame = () => dispatch({ type: 'RESTART_GAME' });

  const dispatchChessAction = (role: RolesEnum, chessNumber: number) => {
    if (role === RolesEnum.PLAYER_ONE) {
      dispatch({ type: 'SET_PLAYER_ONE_CHESS', payload: chessNumber });
    } else {
      dispatch({ type: 'SET_PLAYER_TWO_CHESS', payload: chessNumber });
    }
  };

  const initWebSocket = (socket: Socket) => {
    // 對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    if (socket) {
      socket.on('join', ({ isSuccess, playerIndex }: JoinRoomParams) => {
        if (typeof playerIndex === 'undefined' || !isSuccess) return;
        dispatch({ type: 'SET_ROLE', payload: playerIndex });
        console.log('join', { isSuccess, playerIndex });
      });
      socket.on(
        'chessDown',
        ({
          chessIndex,
          playerIndex,
        }: {
          chessIndex: number;
          playerIndex: RolesEnum;
        }) => {
          dispatchChessAction(playerIndex, chessIndex);
        },
      );
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

  const handleModeChange = () => {
    const nextMode = isMultiPlayerMode ? 'multi' : 'single';
    dispatch({ type: 'CHANGE_MODE', payload: nextMode });
  };

  return (
    <S.Container>
      <InfoSection
        currentRole={currentRole}
        isGameOver={isGameOver}
        winRole={winRole}
      />
      <button
        type='button'
        onClick={() => ws!.emit('join', roomId)}
      >
        加入
      </button>
      <button
        type='button'
        onClick={() => ws!.emit('leave', roomId)}
      >
        離開
      </button>
      <S.ToggleModeButton onClick={handleModeChange}>
        {isMultiPlayerMode ? '多人模式' : '單人模式'}
      </S.ToggleModeButton>
      <S.Checkerboard>
        {chessNumbers.map((number) => {
          const hasSelfPlayerChess = playOneChess.includes(number);
          const hasOtherPlayerChess = playTwoChess.includes(number);
          const disabled =
            hasSelfPlayerChess ||
            hasOtherPlayerChess ||
            currentRole !== currentRound;

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
