import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 100vh;
`;

const StyledCheckerboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  background: white;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
`;

const Box = styled.div`
  background: ${({ theme }) => theme.chess.normal};
  border-radius: 16px;
  padding: 16px;
  aspect-ratio: 1;
  &:hover {
    background-color: ${({ theme }) => theme.chess.hover};
  }
`;

function Home() {
  return (
    <StyledContainer>
      <StyledCheckerboard>
        {[...Array(9)].map((_, i) => (
          <Box key={i} />
        ))}
      </StyledCheckerboard>
    </StyledContainer>
  );
}

export default Home;
