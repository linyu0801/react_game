import styled from 'styled-components';
import { ReactComponent as CircleIcon } from '@/assets/circle.svg';
import { ReactComponent as CloseIcon } from '@/assets/close.svg';

const S = {
  Container: styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 16px;
    background: white;
    border-radius: 10px;
  `,

  Checkerboard: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    width: 100%;
    margin-bottom: 20px;
  `,

  Chess: styled.div<{ $disabled: boolean }>`
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
  `,
  CircleIcon: styled(CircleIcon)`
    fill: white;
    width: 80%;
  `,

  CloseIcon: styled(CloseIcon)`
    fill: white;
    width: 80%;
  `,
  RestartButton: styled.button`
    background: ${({ theme }) => theme.button.normal};
    color: ${({ theme }) => theme.color};
    border: none;
    border-radius: 10px;
    width: 33%;
    padding: 10px 16px;
    display: block;
    margin: 10px auto;
    &:hover {
      background-color: ${({ theme }) => theme.button.hover};
    }
  `,
  ToggleModeButton: styled.button`
    background: ${({ theme }) => theme.button.normal};
    color: ${({ theme }) => theme.color};
    border: none;
    border-radius: 10px;
    width: 33%;
    padding: 10px 16px;
    display: block;
    margin: 10px auto;
    &:hover {
      background-color: ${({ theme }) => theme.button.hover};
    }
  `,
};

export default S;
