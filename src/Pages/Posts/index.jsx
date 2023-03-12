import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";

import { getPostsAPI, createPostAPI, updatePostAPI } from "../../services/post";

import { TextField } from "@mui/material";

import { Header } from "../../components/Header";
import { ListOfPosts } from "./components/ListOfPost";
import { Modal } from "./components/Modal";

import "./styles.css";

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [posts, setPosts] = useState([]);

  const [rows, setRows] = useState({});

  const notifyError = () => toast.error("Algo ha salido mal");
  const notifySuccess = () => toast.success("Cambios exitosos");

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

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        const response = await updatePostAPI(data);
        const updatedPosts = posts.map((post) =>
          post.id === response.data.id ? response.data : post
        );
        setPosts(updatedPosts);
      } else {
        const response = await createPostAPI(data);
        setPosts([...posts, response.data]);
      }
      handleModalClose();
      reset();
      notifySuccess();
    } catch (error) {
      console.error(error);
      notifyError(error.message);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  useEffect(() => {
    getPostsAPI().then((response) => {
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    if (isEdit) {
      reset(rows.selectedRows[0]);
    }
  }, [isEdit]);

  return (
    <>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <ListOfPosts
        posts={posts}
        setPosts={setPosts}
        handleModalOpen={handleModalOpen}
        rows={rows}
        setRows={setRows}
        setIsEdit={setIsEdit}
      />
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

          <button>{isEdit ? "Editar" : "Agregar"}</button>
        </form>
      </Modal>
    </>
  );
}

export { Posts };
