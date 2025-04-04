import { Link } from 'react-router';

import homeLogo from '/src/assets/shared/home.png';

import '/src/styles/shared/homebutton.css';

function HomeButton() {
  return (
    <Link to="/" viewTransition>
      <img src={homeLogo} className="home__logo" />
    </Link>
  );
}

export default HomeButton;
