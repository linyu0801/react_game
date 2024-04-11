import { useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { RolesEnum, reducer, ticTacToeInitState } from './reducer';
import InfoSection from '@/pages/Home/InfoSection';
import S from './style';
import { ChessDownParams, JoinRoomParams, StatusEnum } from './type';
// import Modal from '@/components/Modal';

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
  const isSomeoneWin = isPlayerOneWin || isPlayerTwoWin;
  const isTie = playOneChess.length + playTwoChess.length === CHESS_COUNTS;
  const isGameOver = isSomeoneWin || isTie;

  const winStatus: StatusEnum = useMemo(() => {
    if (isTie) return StatusEnum.IS_TIE;
    if (isPlayerOneWin) return StatusEnum.PLAYER_ONE_WIN;
    if (isPlayerTwoWin) return StatusEnum.PLAYER_TWO_WIN;
    return StatusEnum.IS_GAME_PROCESSING;
  }, [isPlayerOneWin, isPlayerTwoWin, isTie]);

  const handleChessClick = (chessNumber: number, disabled: boolean) => {
    if (isGameOver || disabled) return;
    if (isMultiPlayerMode) {
      ws!.emit('chessDown', roomId, chessNumber);
    } else {
      dispatchChessAction(currentRole, chessNumber);
    }
  };

  const restartGame = () => {
    if (isMultiPlayerMode) {
      ws?.emit('restart', roomId);
    }
    dispatch({ type: 'RESTART_GAME' });
  };

  const dispatchChessAction = (role: RolesEnum, chessNumber: number) => {
    if (role === RolesEnum.PLAYER_ONE) {
      dispatch({ type: 'SET_PLAYER_ONE_CHESS', payload: chessNumber });
    } else {
      dispatch({ type: 'SET_PLAYER_TWO_CHESS', payload: chessNumber });
    }
  };

  // close eslint warning
  const initWebSocket = (socket: Socket) => {
    // 對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    if (socket) {
      socket.on(
        'join',
        ({ isSuccess, playerIndex, userId }: JoinRoomParams) => {
          if (typeof playerIndex === 'undefined' || !isSuccess) return;
          dispatch({ type: 'SET_ROLE', payload: playerIndex });
          sessionStorage.setItem('userId', userId);
          console.log('join', { isSuccess, playerIndex, userId });
        },
      );
      socket.on('chessDown', ({ chessIndex, playerIndex }: ChessDownParams) => {
        dispatchChessAction(playerIndex, chessIndex);
      });
      socket.on('restart', () => {
        dispatch({ type: 'RESTART_GAME' });
      });
    }
  };

  useEffect(() => {
    let socket: Socket;
    if (roomId) {
      const userId = sessionStorage.getItem('userId');
      console.log(process.env, process.env.SERVER_URL);
      const url = `${process.env.SERVER_URL}`;
      socket = io(url);
      socket.on('connect', () => {
        socket.emit('join', roomId, userId);
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
        currentRound={currentRound}
        winStatus={winStatus}
      />
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
            isGameOver ||
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
      {/* <Modal
        isOpen
        onClose={() => {}}
        title='多人遊戲'
      >
        加入?
      </Modal> */}
      <S.RestartButton onClick={restartGame}>Restart Game</S.RestartButton>
    </S.Container>
  );
}

export default Home;
