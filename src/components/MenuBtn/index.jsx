import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

function MenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prevState) => !prevState);
  }

  return (
    <div className="menu-button-container">
      <button className="menu-button" onClick={toggleMenu}>
        <i className="fas fa-bars">Menu</i>
      </button>
      {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
    </div>
  );
}

function Menu({ onClose }) {
  const menuRef = useRef(null);

  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu" ref={menuRef}>
      <button className="close-button" onClick={onClose}>
        <svg viewBox="0 0 24 24">
          <path d="M 7,7 L 17,17 M 17,7 L 7,17" />
        </svg>
      </button>
      <ul>
        <li>Users</li>
      </ul>
    </div>
  );
}

export { MenuButton };
