import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const Login = () => {
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
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form className="modalContent" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
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
          {errors.email && <span>Este campo es requerido</span>}
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
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
          {errors.password && <span>Este campo es requerido</span>}
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
};
