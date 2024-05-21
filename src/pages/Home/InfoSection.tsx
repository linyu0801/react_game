import { useMemo } from 'react';
import styled from 'styled-components';
import { RolesEnum } from './reducer';
import { InfoSectionProps, StatusEnum } from './type';

function InfoSection({
  currentRole,
  winStatus,
  currentRound,
  mode,
}: InfoSectionProps) {
  const description = useMemo(() => {
    if (currentRole === RolesEnum.SPECTATORS) return '觀戰者';
    // status
    const isTie = winStatus === StatusEnum.IS_TIE;
    const isGameOver = winStatus !== StatusEnum.IS_GAME_PROCESSING;
    if (isTie) return '遊戲結束：平手';
    if (isGameOver) {
      return `遊戲結束，玩家${winStatus === StatusEnum.PLAYER_ONE_WIN ? '一' : '二'}獲勝`;
    }
    // playerName
    const singlePlayerName =
      currentRole === RolesEnum.PLAYER_ONE ? '玩家一' : '玩家二';
    const multiPlayerName = currentRole === currentRound ? '您' : '對方';
    const playerName = mode === 'single' ? singlePlayerName : multiPlayerName;

    return `輪到${playerName}選擇`;
  }, [currentRole, winStatus, currentRound, mode]);

  return (
    <StyledInfoText>
      <StyledTitle>圈圈叉叉小遊戲</StyledTitle>
      <p>{description}</p>
    </StyledInfoText>
  );
}

export default InfoSection;

const StyledInfoText = styled.div`
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;
const StyledTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin: 10px 0;
`;
