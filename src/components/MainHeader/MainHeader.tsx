import css from "./MainHeader.module.css";
import { Link } from "react-router";

const MainHeader = () => {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link to="/" aria-label="Home">
          Nanny.Services
        </Link>
        <div className={css.headerNav}>
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
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
