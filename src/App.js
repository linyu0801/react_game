import { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routerConfig from './router/index';
import './index.scss';

const Router = () => useRoutes(routerConfig);

function App() {
  return (
    <Suspense fallback={<div> loading...</div>}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
