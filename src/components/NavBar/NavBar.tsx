import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export const NavBar: React.FC = () => {
  return (
    <nav className={styles["navbar"]}>
      <img className={styles["logo"]} alt="logo" src="" />
      <ul className={styles["nav-menu"]}>
        <li className={styles["item"]}>
          <Link to={"/users"}>Users </Link>
        </li>
        <li className={styles["item"]}>
          <Link to="/posts"> Posts</Link>
        </li>
        <li className={styles["item"]}>
          <Link to="/tasks">Tasks </Link>
        </li>
      </ul>
    </nav>
  );
};
