import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./styles.css";

import { tableStyles } from "../../../../utils/tableStyles";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ListOfUsers() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === "number"
        ? value === parseInt(searchTerm)
        : typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  };
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Delete",
      button: true,
      cell: (row) => (
        <>
          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="dataTable">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar."
          className="inputSearch"
        />
        <DataTable
          columns={columns}
          data={filteredData}
          selectableRows
          pagination
          customStyles={tableStyles}
        />
      </div>
    </>
  );
}

export { ListOfUsers };
