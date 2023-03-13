export const tableStyles = {
  table: {
    style: {
      color: "#333",
      backgroundColor: "#F5F5F5",
      border: "1px solid #E0E0E0",
      borderRadius: "4px",
      tableLayout: "fixed",
      width: "100%",
    },
  },
  headCells: {
    style: {
      fontSize: "18px",
      fontWeight: "bold",
      paddingLeft: "8px",
      paddingRight: "8px",
      paddingTop: "12px",
      paddingBottom: "12px",
      textAlign: "center",
      backgroundColor: "#37aade",
      color: "#FFF",
      borderRight: "1px solid #E0E0E0",
    },
  },

  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      paddingTop: "12px",
      paddingBottom: "12px",
      textAlign: "center",
      borderRight: "1px solid #E0E0E0",
      width: "50px",
    },
  },
  rows: {
    style: {
      "&:nth-of-type(even)": {
        backgroundColor: "#F5F5F5",
      },
      "&:hover": {
        backgroundColor: "#EEE",
        cursor: "pointer",
      },
    },
  },
};
