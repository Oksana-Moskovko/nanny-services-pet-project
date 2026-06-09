import { useState } from "react";
import css from "./Header.module.css";
import { Link } from "react-router";
import Modal from "../Modal/Modal";
import { LogInFormModal } from "../LogInFormModal/LogInFormModal";

const Header = () => {
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);

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

          <button className={css.logInBtn} onClick={() => setIsOpenLogIn(true)}>
            Log in
          </button>
          <button className={css.registrationBtn}>Registration</button>
        </div>
      </div>
      {isOpenLogIn && (
        <Modal onClose={() => setIsOpenLogIn(false)}>
          <LogInFormModal onClose={() => setIsOpenLogIn(false)} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
