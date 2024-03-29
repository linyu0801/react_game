import { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import routerConfig from './router/index';
import themes from './theme';

const Router = () => useRoutes(routerConfig);

const StyledContainer = styled.main`
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 100vh;
`;
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans TC', sans-serif;
    background-color: ${(props) => props.theme.background};
    height:100dvh;
    margin: 0;
  }
`;
function App() {
  return (
    <ThemeProvider theme={themes.default}>
      <Suspense fallback={<div> loading...</div>}>
        <GlobalStyle />
        <StyledContainer>
          <BrowserRouter>
            <Router />
            <p>test Github Action</p>
          </BrowserRouter>
        </StyledContainer>
      </Suspense>{' '}
    </ThemeProvider>
  );
}

export default App;
