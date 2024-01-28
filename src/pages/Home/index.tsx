import React, { useReducer } from 'react';
import styled from 'styled-components';
import { Roles, reducer, ticTacToeInitState } from './reducer';
import { ReactComponent as CircleIcon } from '@/assets/circle.svg';
import { ReactComponent as CloseIcon } from '@/assets/close.svg';
import InfoSection from '@/components/InfoSection';

const CHESS_TOTAL = 9;
const chessNumbers = [...Array(CHESS_TOTAL)].map((_, i) => i + 1);

function Home() {
  const [state, dispatch] = useReducer(reducer, ticTacToeInitState);
  const {
    currentRole,
    isSelfPlayerWin,
    isOtherPlayerWin,
    selfChess,
    otherPlayerChess,
  } = state;

  const isGameEnd =
    isSelfPlayerWin ||
    isOtherPlayerWin ||
    selfChess.length + otherPlayerChess.length === CHESS_TOTAL;
  const winRole =
    isGameEnd && (isSelfPlayerWin ? Roles.SELF : Roles.OTHER_PLAYER);

  // console.log({ selfChess, otherPlayerChess, currentRole });
  const handleChessClick = (chessNumber: number, disabled: boolean) => {
    if (isGameEnd || disabled) return;

    if (currentRole === Roles.SELF) {
      dispatch({ type: 'SET_SELF_CHESS', payload: chessNumber });
    } else {
      dispatch({ type: 'SET_OTHER_PLAYER_CHESS', payload: chessNumber });
    }
  };

  const restartGame = () => dispatch({ type: 'RESTART_GAME' });

  return (
    <StyledContainer>
      <InfoSection
        currentRole={currentRole}
        isGameEnd={isGameEnd}
        winRole={winRole}
      />
      <StyledCheckerboard>
        {chessNumbers.map((number) => {
          const isSelfPlayerChess = selfChess.includes(number);
          const isOtherPlayerChess = otherPlayerChess.includes(number);
          const disabled = isSelfPlayerChess || isOtherPlayerChess;
          return (
            <StyledChessElement
              key={number}
              onClick={() => handleChessClick(number, disabled)}
              $disabled={disabled}
            >
              {isSelfPlayerChess && <StyledCircleIcon />}
              {isOtherPlayerChess && <StyledCloseIcon />}
            </StyledChessElement>
          );
        })}
      </StyledCheckerboard>
      <StyledRestartButton onClick={restartGame}>
        Restart Game
      </StyledRestartButton>
    </StyledContainer>
  );
}

export default Home;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: white;
  border-radius: 10px;
`;

const StyledCheckerboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledChessElement = styled.div<{ $disabled: boolean }>`
  background: ${({ theme }) => theme.chess.normal};
  border-radius: 16px;
  padding: 16px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ $disabled, theme }) =>
      $disabled ? theme.chess.normal : theme.chess.hover};
  }
`;

const StyledCircleIcon = styled(CircleIcon)`
  fill: white;
  width: 80%;
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: white;
  width: 80%;
`;

const StyledRestartButton = styled.button`
  background: ${({ theme }) => theme.button.normal};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 10px;
  width: 33%;
  padding: 10px 16px;
  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
  }
`;
