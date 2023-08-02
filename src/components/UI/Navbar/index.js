import React from "react";

import { NavLink } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar({ navLinks, logger, openConfirm }) {
  const activeStyles = {
    color: "white",
  };

  return (
    <div className="navbar">
      <ul className="navbar-list">
        {navLinks?.map((el) => {
          return (
            <li className={"navbar-item"} key={el.value}>
              <NavLink
                to={el.href}
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
                className="header-link"
              >
                {el.value}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <NavLink
        to={logger.href}
        onClick={!logger.href && openConfirm}
        className="header-link"
      >
        {logger.value}
      </NavLink>
    </div>
  );
}
