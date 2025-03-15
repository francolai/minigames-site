import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';

import RootPage from './components/root-page/RootPage.jsx';
import TicTacToe from './components/tic-tac-toe/TicTacToe.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
  },
  {
    path: '/tic-tac-toe',
    element: <TicTacToe />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
