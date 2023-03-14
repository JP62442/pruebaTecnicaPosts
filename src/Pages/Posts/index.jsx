import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import toast from "react-hot-toast";

import { getPostsAPI, createPostAPI, updatePostAPI } from "../../services/post";

import { TextField } from "@mui/material";

import { Header } from "../../components/Header";
import { ListOfPosts } from "./components/ListOfPost";
import { Drawer, Button } from "@mui/material";

export function Posts() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [posts, setPosts] = useState([]);

  const [rows, setRows] = useState({});

  const [toggledClearRows, setToggledClearRows] = useState(false);

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
        setToggledClearRows(!toggledClearRows);
      } else {
        const response = await createPostAPI(data);
        setPosts([...posts, response.data]);
      }
      handleDrawerClose();
      notifySuccess();
    } catch (error) {
      notifyError(error.message);
    }
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setIsEdit(false);
    reset({ title: "", body: "" });
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
      <ListOfPosts
        posts={posts}
        setPosts={setPosts}
        handleDrawerOpen={handleDrawerOpen}
        rows={rows}
        setRows={setRows}
        setIsEdit={setIsEdit}
        toggledClearRows={toggledClearRows}
        setToggledClearRows={setToggledClearRows}
      />
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            minWidth: "300px",
            padding: "80px",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Controller
              name="title"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  rows={3}
                  label="Título"
                  variant="outlined"
                  error={errors.title ? true : false}
                  style={{ width: "100%" }}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <span style={{ color: "red" }}>Este campo es requerido</span>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Controller
              name="body"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  rows={13}
                  label="Cuerpo"
                  variant="outlined"
                  error={errors.body ? true : false}
                  style={{ width: "100%" }}
                  {...field}
                />
              )}
            />
            {errors.body && (
              <span style={{ color: "red" }}>Este campo es requerido</span>
            )}
          </div>

          <Button type="submit" variant="outlined" color="primary">
            {isEdit ? "Editar" : "Agregar"}
          </Button>
        </form>
      </Drawer>
    </>
  );
}
