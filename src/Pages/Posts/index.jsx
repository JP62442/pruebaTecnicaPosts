import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { createPostAPI } from "../../services/post";
import { getPostsAPI } from "../../services/post";

import { TextField } from "@mui/material";

import { Header } from "../../components/Header";
import { ListOfPosts } from "./components/ListOfPost";
import { Modal } from "./components/Modal";

import "./styles.css";

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [post, setPost] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = (data) =>
    createPostAPI(data).then((response) => {
      setPost([...post, response.data]);
      setIsModalOpen(false);
      reset();
    });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getPostsAPI().then((response) => {
      setPost(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <ListOfPosts post={post} handleModalOpen={handleModalOpen} />
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form className="modalContent" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                label="Título"
                variant="outlined"
                error={errors.title ? true : false}
                {...field}
              />
            )}
          />
          {errors.title && <span>Este campo es requerido</span>}

          <Controller
            name="body"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                multiline
                label="Cuerpo"
                variant="outlined"
                error={errors.body ? true : false}
                {...field}
              />
            )}
          />
          {errors.body && <span>Este campo es requerido</span>}
          <button onClick={handleSubmit}>Add</button>
        </form>
      </Modal>
    </>
  );
}

export { Posts };
