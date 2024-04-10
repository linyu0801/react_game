import { produce } from 'immer';
import { Socket } from 'socket.io-client';
import { WIN_STATUS_LIST } from '@/constants/ticTacToe';

export enum RolesEnum {
  PLAYER_ONE,
  PLAYER_TWO,
}

export type DispatchActionType =
  | { type: 'RESTART_GAME' }
  | { type: 'SET_PLAYER_ONE_CHESS'; payload: number }
  | { type: 'SET_PLAYER_TWO_CHESS'; payload: number }
  | { type: 'SET_ROLE'; payload: RolesEnum }
  | { type: 'CHANGE_MODE'; payload: ModeType }
  | { type: 'SET_SOCKET'; payload: Socket };

type ModeType = 'single' | 'multi';

type TicTacToeType = {
  playOneChess: number[];
  playTwoChess: number[];
  playOneRemainSteps: number[][];
  playTwoRemainSteps: number[][];
  currentRole: RolesEnum;
  currentRound: RolesEnum;
  isPlayerOneWin: boolean;
  isPlayerTwoWin: boolean;
  isGameEnd: boolean;
  mode: ModeType;
  ws: Socket | null;
};

export const ticTacToeInitState: TicTacToeType = {
  currentRole: RolesEnum.PLAYER_ONE,
  currentRound: RolesEnum.PLAYER_ONE,
  playOneChess: [],
  playTwoChess: [],
  playOneRemainSteps: [],
  playTwoRemainSteps: [],
  isPlayerOneWin: false,
  isPlayerTwoWin: false,
  isGameEnd: false,
  mode: 'single',
  ws: null,
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
      case 'SET_PLAYER_ONE_CHESS': {
        draft.playOneChess.push(action.payload);
        draft.playOneRemainSteps = getRemainSteps(draft.playOneChess);
        draft.isPlayerOneWin = isSomeoneWin(draft.playOneRemainSteps);
        draft.isGameEnd = draft.isPlayerOneWin;
        if (!draft.isGameEnd) {
          draft.currentRound = RolesEnum.PLAYER_TWO;
        }
        if (draft.mode !== 'multi') {
          draft.currentRole = RolesEnum.PLAYER_TWO;
        }
        break;
      }
      case 'SET_PLAYER_TWO_CHESS': {
        draft.playTwoChess.push(action.payload);
        draft.playTwoRemainSteps = getRemainSteps(draft.playTwoChess);
        draft.isPlayerTwoWin = isSomeoneWin(draft.playTwoRemainSteps);
        draft.isGameEnd = draft.isPlayerTwoWin;
        if (!draft.isGameEnd) {
          draft.currentRound = RolesEnum.PLAYER_ONE;
        }
        if (draft.mode !== 'multi') {
          draft.currentRole = RolesEnum.PLAYER_ONE;
        }
        break;
      }
      case 'SET_ROLE': {
        draft.currentRole = action.payload;
        break;
      }
      case 'CHANGE_MODE': {
        draft.mode = action.payload;
        break;
      }
      case 'RESTART_GAME': {
        draft.playOneChess = [];
        draft.playTwoChess = [];
        draft.playOneRemainSteps = [];
        draft.playTwoRemainSteps = [];
        draft.isPlayerOneWin = false;
        draft.isPlayerTwoWin = false;
        draft.isGameEnd = false;
        // draft.currentRound =
        //   draft.currentRound === RolesEnum.PLAYER_ONE
        //     ? RolesEnum.PLAYER_TWO
        //     : RolesEnum.PLAYER_ONE;
        // Object.assign(draft, {
        //   ...ticTacToeInitState,
        //   mode: draft.mode,
        //   ws: draft.ws,
        // });
        break;
      }
      case 'SET_SOCKET': {
        draft.ws = action.payload;
        break;
      }
      default:
        break;
    }
  },
);
