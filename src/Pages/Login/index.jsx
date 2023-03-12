import React, { useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import LockOpenIcon from "@mui/icons-material/LockOpen";

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  maxWidth: "400px",
  margin: "0 auto",
});

const StyledInputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const StyledLabel = styled("label")({
  marginBottom: "5px",
  fontSize: "16px",
  fontWeight: "bold",
});

const StyledError = styled("span")({
  color: "red",
  fontSize: "14px",
});

const StyledSubmitButton = styled(Button)({
  background: "#2196f3",
  color: "#fff",
  "&:hover": {
    background: "#0d8bf2",
  },
});

export const Login = () => {
  const notifyError = () => toast.error("Cuenta invalida, intenta otra vez.");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
      notifyError();
    }
  };

  return (
    <Box height="100vh" textAlign="center">
      <Box padding="20vh">
        <LockOpenIcon fontSize="large" />
        <Typography variant="h5" gutterBottom marginBottom="50px">
          Iniciar sesión
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledInputWrapper>
            <StyledLabel htmlFor="email">Email:</StyledLabel>
            <Controller
              name="email"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  {...field}
                />
              )}
            />
            {errors.email && <StyledError>Este campo es requerido</StyledError>}
          </StyledInputWrapper>

          <StyledInputWrapper>
            <StyledLabel htmlFor="password">Contraseña:</StyledLabel>
            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <TextField
                  id="password"
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <StyledError>Este campo es requerido</StyledError>
            )}
          </StyledInputWrapper>

          <StyledSubmitButton type="submit">Iniciar sesión</StyledSubmitButton>
        </StyledForm>

        {error && <div>{"Cuenta invalida, intenta otra vez."}</div>}
        <Toaster position="bottom-center" reverseOrder={false} />
      </Box>
    </Box>
  );
};
