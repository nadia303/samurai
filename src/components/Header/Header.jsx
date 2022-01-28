import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img src="https://ravenandmacaw.com/wp-content/uploads/2021/07/company-logo.png"></img>
      <div className={styles.loginBlock}>
        {props.isAuth ? (
          <div>
            {" "}
            {props.login} - <button onClick={props.logout}>Logout</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
