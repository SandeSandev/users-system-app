import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
import { Header } from "../Header/Header";
import { ScrollRestoration } from "react-router-dom";

import styles from "./Layout.module.css";
export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className={styles["container"]}>
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  );
};
