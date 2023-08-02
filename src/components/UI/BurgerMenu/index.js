import React from "react";

import { NavLink } from "react-router-dom";

import "./BurgerMenu.scss";

export default function BurgerMenu({
  menuHeader,
  navLinks,
  activeMobileMenu,
  setActiveMobileMenu,
  logger,
  openConfirm,
}) {
  const activeStyles = {
    color: "rgb(0, 172, 238)",
  };

  function mobileLogger() {
    !logger.href && openConfirm();
    setActiveMobileMenu(false);
  }

  return (
    <div
      className={
        activeMobileMenu ? "burger-menu  burger-menu--active" : "burger-menu"
      }
    >
      <div className="burger-menu-content">
        <div className="burger-menu__header">{menuHeader}</div>
        <ul>
          {navLinks?.map((item) => (
            <li key={item.href} onClick={() => setActiveMobileMenu(false)}>
              <NavLink
                className="burger-menu__link"
                to={item.href}
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                {item.value}
              </NavLink>
            </li>
          ))}
          <NavLink
            className="burger-menu__link"
            to={logger.href}
            onClick={mobileLogger}
          >
            {logger.value}
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
