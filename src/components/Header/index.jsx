import { useState } from "react";

import { Toolbar, Box, AppBar, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { auth } from "../../firebase-config-js";
import { ConfirmationModal } from "../ConfirmationModal";

export function Header() {
  const theme = useTheme();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <img
              style={{ width: "100px" }}
              src="https://sier.com.co/wp-content/uploads/2020/01/logo2.svg"
              alt="logo"
            />
            <Button
              onClick={() => setOpenConfirmationModal(true)}
              variant="outlined"
            >
              Cerrar sesión
            </Button>

            <ConfirmationModal
              open={openConfirmationModal}
              onClose={() => setOpenConfirmationModal(false)}
              message="¿Estás seguro de que quieres cerrar sesión?"
              onConfirm={() => handleSignOut()}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
