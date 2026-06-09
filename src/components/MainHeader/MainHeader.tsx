import { useState } from "react";
import css from "./MainHeader.module.css";
import { Link } from "react-router";
import { LogInFormModal } from "../LogInFormModal/LogInFormModal";
import Modal from "../Modal/Modal";
import { RegistrationFormModal } from "../RegistrationFormModal/RegistrationFormModal";

const MainHeader = () => {
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);

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
          <button
            className={css.registrationBtn}
            onClick={() => setIsOpenRegistration(true)}
          >
            Registration
          </button>
        </div>
      </div>
      {isOpenLogIn && (
        <Modal onClose={() => setIsOpenLogIn(false)}>
          <LogInFormModal onClose={() => setIsOpenLogIn(false)} />
        </Modal>
      )}
      {isOpenRegistration && (
        <Modal onClose={() => setIsOpenRegistration(false)}>
          <RegistrationFormModal onClose={() => setIsOpenRegistration(false)} />
        </Modal>
      )}
    </header>
  );
};

export default MainHeader;
