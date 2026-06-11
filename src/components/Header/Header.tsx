import { useState } from "react";
import css from "./Header.module.css";
import { Link, NavLink } from "react-router";
import Modal from "../Modal/Modal";
import { LogInFormModal } from "../LogInFormModal/LogInFormModal";
import { RegistrationFormModal } from "../RegistrationFormModal/RegistrationFormModal";
import { useAuth } from "../../services/useAuth";
import { FaCircle, FaUserLarge } from "react-icons/fa6";
import { logout } from "../../services/nannyService";

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
        {/* <div className={css.headerNavDiv}> */}
        <nav
          aria-label="Main Navigation"
          className={`${css.headerNav} ${
            variant === "nannies" ? css.headerNavNannies : ""
          }`}
        >
          <ul
            className={`${css.navigation} ${
              variant === "nannies" ? css.navigationNannies : ""
            }`}
          >
            <li>
              <NavLink to="/" end className={css.link}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/nannies" className={css.link}>
                {({ isActive }) => (
                  <>
                    <span>Nannies</span>
                    {isActive && <FaCircle className={css.circle} size={8} />}
                  </>
                )}
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/favorites" className={css.link}>
                  {({ isActive }) => (
                    <>
                      <span>Favorites</span>
                      {isActive && <FaCircle className={css.circle} size={8} />}
                    </>
                  )}
                </NavLink>
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
            <div className={css.iconUserDiv}>
              <FaUserLarge className={css.iconUser} size={24} />
            </div>
            <p className={css.name}>{user.displayName}</p>
            <button className={css.LogOut} onClick={logout}>
              Log out
            </button>
          </div>
        )}
      </div>
      {/* </div> */}
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
