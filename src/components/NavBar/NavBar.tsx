import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import appLogo from "./../../assets/app-logo.png";
import cn from "classnames";

export const NavBar = () => {
  return (
    <nav className={styles["navbar"]}>
      <img
        className={styles["logo"]}
        height={60}
        width={60}
        alt="logo"
        src={appLogo}
      />
      <ul className={styles["nav-menu"]}>
        <li className={styles["item"]}>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              cn(styles["link"], { [styles["active"]]: isActive })
            }
          >
            Users
          </NavLink>
        </li>
        <li className={styles["item"]}>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              cn(styles["link"], { [styles["active"]]: isActive })
            }
          >
            Tasks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
