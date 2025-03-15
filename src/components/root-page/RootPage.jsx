import { Link } from 'react-router';
import tictactoeLogo from '/src/assets/tic-tac-toe/tictactoeLogo.png';

import '/src/styles/root-page/root-page.css';
import RootPageMeta from './RootPageMeta';

function RootPage() {
  return (
    <>
      <RootPageMeta />
      <header>ROOT PAGE</header>
      <section className="root_game_list">
        <Link to="/tic-tac-toe" className="root_game_list__tic-tac-toe">
          <img src={tictactoeLogo} />
          Tic-Tac-Toe
        </Link>
      </section>
    </>
  );
}

export default RootPage;
