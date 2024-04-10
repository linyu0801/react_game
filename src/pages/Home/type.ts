import { RolesEnum } from './reducer';

export type JoinRoomParams = {
  isSuccess: boolean;
  playerIndex?: RolesEnum;
};

export type ChessDownParams = {
  chessIndex: number;
  playerIndex: RolesEnum;
};
export type InfoSectionProps = {
  currentRole: RolesEnum;
  currentRound: RolesEnum;
  winStatus: StatusEnum;
};
export enum StatusEnum {
  IS_GAME_PROCESSING = 'IS_GAME_PROCESSING',
  PLAYER_ONE_WIN = 'PLAYER_ONE_WIN',
  PLAYER_TWO_WIN = 'PLAYER_TWO_WIN',
  IS_TIE = 'IS_TIE',
}
