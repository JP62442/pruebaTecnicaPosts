import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { TextField } from "@mui/material";

import { Header } from "../../components/Header";
import { ListOfPosts } from "./components/ListOfPost";
import { Modal } from "./components/Modal";

import "./styles.css";

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <ListOfPosts handleModalOpen={handleModalOpen} />

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
