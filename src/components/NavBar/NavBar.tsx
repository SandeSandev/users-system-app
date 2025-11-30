import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import appLogo from "./../../assets/app-logo.png";

export const NavBar: React.FC = () => {
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
          <Link to={"/users"}>Users </Link>
        </li>
        <li className={styles["item"]}>
          <Link to="/tasks">Tasks </Link>
        </li>
      </ul>
    </nav>
  );
};
