import { useMemo } from 'react';
import styled from 'styled-components';
import { InfoSectionProps, StatusEnum } from './type';
import { RolesEnum } from './reducer';

function InfoSection({
  currentRole,
  winStatus,
  currentRound,
  mode,
}: InfoSectionProps) {
  const description = useMemo(() => {
    if (currentRole === RolesEnum.SPECTATORS) return '觀戰者';
    const singlePlayerName =
      currentRole === RolesEnum.PLAYER_ONE ? '玩家一' : '玩家二';
    const isSelf = currentRole === currentRound;
    const multiPlayerName = isSelf ? '您' : '對方';
    const roleName = mode === 'single' ? singlePlayerName : multiPlayerName;
    const isTie = winStatus === StatusEnum.IS_TIE;
    const isGameOver = winStatus !== StatusEnum.IS_GAME_PROCESSING;
    if (isTie) return '遊戲結束：平手';
    if (isGameOver) {
      return `遊戲結束，${roleName}獲勝`;
    }
    return `輪到${roleName}選擇`;
  }, [currentRole, winStatus, currentRound, mode]);

  return (
    <StyledInfoText>
      <StyledTitle>圈圈叉叉小遊戲</StyledTitle>
      {description}
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
