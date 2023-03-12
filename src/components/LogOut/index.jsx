import React from "react";
import { auth } from "../../firebase-config-js";

import Button from "@mui/material/Button";

const LogOutButton = () => {
  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log("Usuario desconectado");
    });
  };

  return (
    <Button
      sx={{ margin: "0 auto" }}
      onClick={handleSignOut}
      variant="contained"
    >
      Cerrar sesión
    </Button>
  );
};

export default LogOutButton;
