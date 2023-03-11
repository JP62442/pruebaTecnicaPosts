import React from "react";
import './styles.css'

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modalSquare">
        <button className="modalClose" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export { Modal };
