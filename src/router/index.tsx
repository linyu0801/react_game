import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const PageA = lazy(() => import('@/pages/PageA'));

const router = [
  {
    path: '/',
    element: <Home />,
  },
  { path: '/page-a', element: <PageA /> },
];
export default router;
