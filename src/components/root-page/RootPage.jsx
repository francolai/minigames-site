import { Link } from 'react-router';
import tictactoeLogo from '/src/assets/tic-tac-toe/tictactoeLogo.png';
import snakeLogo from '/src/assets/snake/snake.png';

import '/src/styles/root-page/root-page.css';
import RootPageMeta from './RootPageMeta';

function RootPage() {
  return (
    <>
      <RootPageMeta />
      <header>ROOT PAGE</header>
      <section className="root_game_list">
        <Link to="/tic-tac-toe" className="root_game_list__item">
          <img src={tictactoeLogo} />
          Tic-Tac-Toe
        </Link>
        <Link to="/snake" className="root_game_list__item">
          <img src={snakeLogo} />
          Snake
        </Link>
      </section>
    </>
  );
}

export default RootPage;
