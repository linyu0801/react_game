import React, { useMemo } from 'react';
import styled from 'styled-components';
import { InfoSectionProps, StatusEnum } from './type';

function InfoSection({
  currentRole,
  winStatus,
  currentRound,
}: InfoSectionProps) {
  const description = useMemo(() => {
    const isSelf = currentRole === currentRound;
    const roleName = isSelf ? '您' : '對方';
    const isTie = winStatus === StatusEnum.IS_TIE;
    const isSomeoneWin =
      winStatus === StatusEnum.PLAYER_ONE_WIN ||
      winStatus === StatusEnum.PLAYER_TWO_WIN;
    if (isTie) return '遊戲結束：平手';
    if (isSomeoneWin) {
      return `遊戲結束，${isSelf ? '恭喜' : ''}${roleName}獲勝`;
    }
    return `輪到${roleName}選擇`;
  }, [currentRole, winStatus, currentRound]);

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
