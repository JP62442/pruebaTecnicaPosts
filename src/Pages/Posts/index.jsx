import React, { useState } from "react";

import { Header } from "../../components/Header";
import { ListOfPosts } from "./components/ListOfPost";
import { Modal } from "./components/Modal";

function Posts() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
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

  return (
    <>
      <Header />
      <ListOfPosts handleModalOpen={handleModalOpen} />

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
    </>
  );
}

export { Posts };
