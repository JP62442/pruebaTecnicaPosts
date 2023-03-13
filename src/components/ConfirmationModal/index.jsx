import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export function ConfirmationModal({ open, onClose, message, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar acción.</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="outlined"
          onClick={onConfirm}
          style={{ borderColor: "red", color: "red" }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
