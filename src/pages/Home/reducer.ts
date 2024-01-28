import { produce } from 'immer';
import { WIN_STATUS_LIST } from '@/constants/ticTacToe';

export enum Roles {
  SELF,
  OTHER_PLAYER,
}

type DispatchActionType =
  | { type: 'RESTART_GAME' }
  | { type: 'SET_SELF_CHESS'; payload: number }
  | { type: 'SET_OTHER_PLAYER_CHESS'; payload: number };

type TicTacToeType = {
  selfChess: number[];
  otherPlayerChess: number[];
  selfRemainSteps: number[][];
  otherPlayerRemainSteps: number[][];
  currentRole: Roles;
  isSelfPlayerWin: boolean;
  isOtherPlayerWin: boolean;
  isGameEnd: boolean;
};

export const ticTacToeInitState = {
  selfChess: [],
  otherPlayerChess: [],
  selfRemainSteps: [],
  otherPlayerRemainSteps: [],
  currentRole: Roles.SELF,
  isSelfPlayerWin: false,
  isOtherPlayerWin: false,
  isGameEnd: false,
};

const getRemainSteps = (chesses: number[]) => {
  return WIN_STATUS_LIST.map((winStatus) => {
    return winStatus.filter((chessNumber) => !chesses.includes(chessNumber));
  });
};

const isSomeoneWin = (remainSteps: number[][]) => {
  return remainSteps.some((steps) => steps.length === 0);
};

export const reducer = produce(
  (draft: TicTacToeType, action: DispatchActionType) => {
    switch (action.type) {
      case 'SET_SELF_CHESS': {
        draft.selfChess.push(action.payload);
        draft.selfRemainSteps = getRemainSteps(draft.selfChess);
        draft.isSelfPlayerWin = isSomeoneWin(draft.selfRemainSteps);
        draft.isGameEnd = draft.isSelfPlayerWin;
        draft.currentRole = Roles.OTHER_PLAYER;
        break;
      }
      case 'SET_OTHER_PLAYER_CHESS': {
        draft.otherPlayerChess.push(action.payload);
        draft.otherPlayerRemainSteps = getRemainSteps(draft.otherPlayerChess);
        draft.isOtherPlayerWin = isSomeoneWin(draft.otherPlayerRemainSteps);
        draft.isGameEnd = draft.isOtherPlayerWin;
        draft.currentRole = Roles.SELF;
        break;
      }

      case 'RESTART_GAME': {
        Object.assign(draft, ticTacToeInitState);
        break;
      }
      default:
        break;
    }
  },
);
