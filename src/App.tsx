import { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import routerConfig from './router/index';
import themes from './theme';

const Router = () => useRoutes(routerConfig);

function App() {
  const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    height:100dvh;
    margin: 0;
  }
`;

  return (
    <ThemeProvider theme={themes.default}>
      <Suspense fallback={<div> loading...</div>}>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>{' '}
    </ThemeProvider>
  );
}

export default App;
