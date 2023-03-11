import React from "react";
import { MenuButton } from "../MenuBtn";
import "./styles.css";

function Header() {
  return (
    <>
      <header>
          <MenuButton />
        <nav>
          <a href="#" className="logo">
            PostView
          </a>
        </nav>
      </header>
    </>
  );
}

export { Header };
