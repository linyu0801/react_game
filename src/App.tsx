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
  min-height: 100dvh;
`;
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
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
          </BrowserRouter>
        </StyledContainer>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
