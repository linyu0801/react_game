import React from 'react';
import styled from 'styled-components';
import { RolesEnum } from '@/pages/Home/reducer';

type Props = {
  currentRole: RolesEnum;
  winRole: number | false;
  isGameEnd: boolean;
};

function InfoSection({ currentRole, winRole, isGameEnd }: Props) {
  const otherPlayerName = '對方';
  const roleText =
    currentRole === RolesEnum.PLAYER_ONE ? '您' : otherPlayerName;
  const isTie = isGameEnd && winRole === false;
  const winText = `遊戲結束，${winRole === RolesEnum.PLAYER_ONE ? '恭喜您' : otherPlayerName}獲勝`;
  const gameEndText = isTie ? '遊戲結束：平手' : winText;
  const title = isGameEnd ? gameEndText : `輪到${roleText}選擇`;

  return (
    <StyledInfoText>
      <StyledTitle>圈圈叉叉小遊戲</StyledTitle>
      {title}
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
