import { RolesEnum } from './reducer';

export type JoinRoomParams = {
  isSuccess: boolean;
  playerIndex?: RolesEnum;
  userId: string;
  roomData: string[];
};

export type ChessDownParams = {
  chessIndex: number;
  playerIndex: RolesEnum;
};
export type InfoSectionProps = {
  currentRole: RolesEnum;
  currentRound: RolesEnum;
  winStatus: StatusEnum;
  mode: 'single' | 'multi';
};
export enum StatusEnum {
  IS_GAME_PROCESSING = 'IS_GAME_PROCESSING',
  PLAYER_ONE_WIN = 'PLAYER_ONE_WIN',
  PLAYER_TWO_WIN = 'PLAYER_TWO_WIN',
  IS_TIE = 'IS_TIE',
}
