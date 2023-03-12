import React from "react";
import LogOutButton from "../LogOut";
import { MenuButton } from "../MenuBtn";
import "./styles.css";

function Header() {
  return (
    <>
      <header>
        <MenuButton />
        <LogOutButton />
      </header>
    </>
  );
}

export { Header };
