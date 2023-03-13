import { TextField } from "@mui/material";

export const InputSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      variant="outlined"
      size="medium"
      placeholder="Buscar."
      InputProps={{
        style: {
          height: "2rem",
          borderRadius: "8px",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          color: "#333",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 0 0 1px #ddd",
          transition: "box-shadow 0.2s ease-in-out",
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px #aaaaaa",
          },
        },
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
      }}
    />
  );
};
