import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar";
import { Header } from "../Header/Header";
import { ScrollRestoration } from "react-router-dom";
import styles from "./Layout.module.css";
import { Suspense } from "react";
import { Spinner } from "../Spinner/Spinner";

export const Layout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className={styles["container"]}>
        <ScrollRestoration />
        <Suspense fallback={<Spinner size="md" />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
