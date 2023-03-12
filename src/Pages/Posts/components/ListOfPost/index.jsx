import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./styles.css";

import { tableStyles } from "../../../../utils/tableStyles";

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import { paginationComponentOptions } from "../../../../utils/paginationOptions";

function ListOfPosts({ post, handleModalOpen, rows, setRows, setIsEdit }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = post.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === "number"
        ? value === parseInt(searchTerm)
        : typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handlerEdit = () => {
    setIsEdit(true);
    handleModalOpen();
  };

  const onSelectedRowsChange = (row) => {
    setRows(row);
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Body",
      selector: (row) => row.body,
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
    <div className="dataTable">
      <div className="navTable">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar."
          className="inputSearch"
        />
        <Button onClick={handleModalOpen} variant="contained">
          Añadir Post
        </Button>

        {rows.selectedCount === 1 && (
          <IconButton onClick={handlerEdit}>
            <EditIcon />
          </IconButton>
        )}
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        selectableRows
        pagination
        customStyles={tableStyles}
        paginationComponentOptions={paginationComponentOptions}
        onSelectedRowsChange={onSelectedRowsChange}
        noDataComponent="No se encuentra info"
      />
    </div>
  );
}

export { ListOfPosts };
