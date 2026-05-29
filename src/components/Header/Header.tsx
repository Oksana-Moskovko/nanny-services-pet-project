import css from "./Header.module.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className={css.header}>
      <Link to="/" aria-label="Home">
        Nanny.Services
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/nannies">Nannies</Link>
          </li>
          {/* <li>
            <Link to="/favorites">Favorites</Link>
          </li> */}
        </ul>
      </nav>

      <button className={css.logInBtn}>Log in</button>
      <button className={css.registrationBtn}>Registration</button>
    </header>
  );
};

export default Header;
