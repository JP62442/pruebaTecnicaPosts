import toast, { Toaster } from "react-hot-toast";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import LockOpenIcon from "@mui/icons-material/LockOpen";

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

  const onSubmit = async (data) => {
    const { email, password } = data;
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
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
            <Controller
              name="email"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="Email*"
                  error={errors.email ? true : false}
                  variant="outlined"
                  {...field}
                />
              )}
            />
            {errors.email && <StyledError>Este campo es requerido</StyledError>}
          </StyledInputWrapper>

          <StyledInputWrapper>
            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <TextField
                  id="password"
                  label="Contraseña*"
                  variant="outlined"
                  error={errors.password ? true : false}
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

        <Toaster position="bottom-center" reverseOrder={false} />
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © Prueba Técnica Juan Pablo "}

        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

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
