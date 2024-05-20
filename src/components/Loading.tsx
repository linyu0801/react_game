import styled from 'styled-components';

const StyledLoader = styled.div`
  --c: ${(props) => `no-repeat linear-gradient(${props.theme.loader} 0 0)`};
  background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c),
    var(--c), var(--c), var(--c);
  background-size: 16px 16px;
  animation:
    l32-1 1s infinite,
    l32-2 1s infinite;

  @keyframes l32-1 {
    0%,
    100% {
      width: 45px;
      height: 45px;
    }
    35%,
    65% {
      width: 65px;
      height: 65px;
    }
  }

  @keyframes l32-2 {
    0%,
    40% {
      background-position:
        0 0,
        0 50%,
        0 100%,
        50% 100%,
        100% 100%,
        100% 50%,
        100% 0,
        50% 0,
        50% 50%;
    }
    60%,
    100% {
      background-position:
        0 50%,
        0 100%,
        50% 100%,
        100% 100%,
        100% 50%,
        100% 0,
        50% 0,
        0 0,
        50% 50%;
    }
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100dvh;
  background-color: ${(props) => props.theme.background};
`;

function Loading() {
  return (
    <StyledContainer>
      <StyledLoader />
    </StyledContainer>
  );
}

export default Loading;
