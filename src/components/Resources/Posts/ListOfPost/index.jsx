import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import "./styles.css";

import { AddPostBtn } from "../CreatePost";
import { tableStyles } from "../../tableStyles";

function ListOfPosts() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
        setId(response.data.length + 1);
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
        <button onClick={() => handleDelete(row.id)}>Delete</button>
      ),
    },
  ];

  return (
    <>
      <div className="dataTable">
        <div className="navTable">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar."
            className="inputSearch"
          />
          <AddPostBtn data={data} setData={setData} />
        </div>
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

export { ListOfPosts };
