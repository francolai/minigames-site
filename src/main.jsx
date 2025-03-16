import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router';

import RootPage from './components/root-page/RootPage.jsx';
import TicTacToe from './components/tic-tac-toe/TicTacToe.jsx';
import Snake from './components/snake/Snake.jsx';

const router = createHashRouter([
  {
    path: '/',
    element: <RootPage />,
  },
  {
    path: '/tic-tac-toe',
    element: <TicTacToe />,
  },
  {
    path: '/snake',
    element: <Snake />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
