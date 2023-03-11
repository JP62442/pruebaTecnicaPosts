import React, { useState } from "react";

import "./styles.css";

import { Modal } from "../Modal";

function AddPostBtn({ data, setData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    const newPost = {
      title: title,
      body: body,
    };
    setData((prevData) => [...prevData, newPost]);
    setTitle("");
    setBody("");
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="btnAdd" onClick={handleModalOpen}>
        Add new post
      </button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="modalContent">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
          />
          <button onClick={handleSubmit}>Add</button>
        </div>
      </Modal>
    </div>
  );
}

export { AddPostBtn };
