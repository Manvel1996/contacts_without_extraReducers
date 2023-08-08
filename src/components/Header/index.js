import React, { useState } from "react";

import { ConfirmModal, BurgerMenu, Navbar } from "../UI";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getLoggedIn } from "../../redux/slices/AppSlice/appSelector";
import { setToken, setIsLoading, setStatus } from "../../redux/slices/AppSlice";
import { setUser } from "../../redux/slices/AuthSlice";
import { setContacts } from "../../redux/slices/ContactsSlice";
import { setGroups } from "../../redux/slices/GroupsSlice";

import { ROUTE, AUTH_TOKEN, ROUTE_PAGES } from "../../constants";

import "./index.scss";

export default function Header() {
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  const isAuth = useSelector(getLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = isAuth
    ? [
        { value: ROUTE_PAGES.HOME, href: ROUTE.HOME },
        { value: ROUTE_PAGES.PROFILE, href: ROUTE.PROFILE },
        { value: ROUTE_PAGES.GROUPS, href: ROUTE.GROUPS },
        { value: ROUTE_PAGES.ALL_CONTACTS, href: ROUTE.ALL_CONTACTS },
      ]
    : [];

  const logger = {
    value: isAuth ? "Logout" : "Login",
    href: isAuth ? null : ROUTE.LOGIN,
  };

  function confirmFunc() {
    dispatch(setToken(null));
    dispatch(setIsLoading(false));
    dispatch(setStatus(null));
    dispatch(setContacts([]));
    dispatch(setGroups([]));
    dispatch(setUser(null));

    localStorage.removeItem(AUTH_TOKEN);
    toast("Уou are logged out");
    navigate(ROUTE.LOGIN);
  }

  function openConfirm() {
    setVisibleConfirm(true);
  }

  return (
    <header className="header">
      <NavLink to="/" className="header-link">
        <img
          className="header__logo"
          src="https://aparg.com/wp-content/uploads/2023/07/logo-black.png"
          alt="aparg"
        />
      </NavLink>

      <Navbar navLinks={navLinks} logger={logger} openConfirm={openConfirm} />

      <div
        className={
          activeMobileMenu ? "mobile-menu mobile-menu--close" : "mobile-menu"
        }
        onClick={() => setActiveMobileMenu(!activeMobileMenu)}
      >
        <span />
      </div>

      <BurgerMenu
        navLinks={navLinks}
        menuHeader="Contacts list"
        activeMobileMenu={activeMobileMenu}
        setActiveMobileMenu={setActiveMobileMenu}
        logger={logger}
        openConfirm={openConfirm}
      />

      <ConfirmModal
        title="Are you sure you want to log out?"
        visibleConfirm={visibleConfirm}
        setVisibleConfirm={setVisibleConfirm}
        confirmFunc={confirmFunc}
      />
    </header>
  );
}
