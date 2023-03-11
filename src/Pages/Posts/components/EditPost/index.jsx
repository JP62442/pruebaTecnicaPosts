import React, { useState } from "react";
import { Modal } from "../Modal";

function EditPostBtn({ post, setData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = () => {
    const updatedPost = {
      ...post,
      title: title,
      body: body,
    };
    setData((prevData) => {
      const index = prevData.findIndex((item) => item.id === post.id);
      const newData = [...prevData];
      newData[index] = updatedPost;
      return newData;
    });
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
      <button className="btnEdit" onClick={handleModalOpen}>
        Edit
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
          <button onClick={handleSubmit}>Save</button>
        </div>
      </Modal>
    </div>
  );
}

export { EditPostBtn };
