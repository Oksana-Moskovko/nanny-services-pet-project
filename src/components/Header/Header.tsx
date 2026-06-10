import { useState } from "react";
import css from "./Header.module.css";
import { Link } from "react-router";
import Modal from "../Modal/Modal";
import { LogInFormModal } from "../LogInFormModal/LogInFormModal";
import { RegistrationFormModal } from "../RegistrationFormModal/RegistrationFormModal";
import { useAuth } from "../../services/useAuth";

const Header = ({ variant = "home" }) => {
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);
  const { user } = useAuth();

  return (
    <header
      className={`${css.header} ${
        variant === "nannies" ? css.headerNannies : ""
      }`}
    >
      <div
        className={`${css.headerContainer} ${
          variant === "nannies" ? css.headerContainerNannies : ""
        }`}
      >
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
              {user && (
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
              )}
            </ul>
          </nav>

          {!user ? (
            <div>
              <button
                className={css.logInBtn}
                onClick={() => setIsOpenLogIn(true)}
              >
                Log in
              </button>
              <button
                className={css.registrationBtn}
                onClick={() => setIsOpenRegistration(true)}
              >
                Registration
              </button>
            </div>
          ) : (
            <div className={css.userDiv}>
              <p>{user.displayName}</p>
              <button>Logout</button>
            </div>
          )}
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

export default Header;
