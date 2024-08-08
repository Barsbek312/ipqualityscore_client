import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header__wrapper}>
      <NavLink to="/main" className={styles.main__item}>
        Main
      </NavLink>
      <NavLink to="/blacklist" className={styles.blacklist__item}>
        Blacklist
      </NavLink>
    </div>
  );
};

export default Header;
