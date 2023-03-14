import { useState } from "react";
import DataTable from "react-data-table-component";

import { tableStyles } from "../../../../utils/tableStyles";

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Box } from "@mui/material";

import { deletePostAPI } from "../../../../services/post";

import { paginationComponentOptions } from "../../../../utils/paginationOptions";
import toast from "react-hot-toast";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";
import { InputSearch } from "../InputSearch";

export function ListOfPosts({
  posts,
  setPosts,
  handleDrawerOpen,
  rows,
  setRows,
  setIsEdit,
  toggledClearRows,
  setToggledClearRows,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [postId, setPostId] = useState(null);

  const notifySuccess = () => toast.success("Cambios exitosos");
  const notifyError = () => toast.error("Algo ha salido mal");

  const filteredData = posts.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === "number"
        ? value === parseInt(searchTerm)
        : typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handlerEdit = () => {
    setIsEdit(true);
    handleDrawerOpen();
  };

  const onSelectedRowsChange = (row) => {
    setRows(row);
  };

  const onDelete = async (idPost) => {
    try {
      const response = await deletePostAPI(idPost);
      const updatedPosts = posts.filter((post) => post.id !== idPost);
      setPosts(updatedPosts);
      notifySuccess();
      setToggledClearRows(!toggledClearRows);
      setRows({});
      setOpenConfirmationModal(false);
    } catch (error) {
      notifyError();
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Título",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Cuerpo",
      selector: (row) => row.body,
      sortable: true,
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row) => (
        <>
          <IconButton
            onClick={() => {
              setPostId(row.id);
              setOpenConfirmationModal(true);
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignitems: "center",
          justifycontent: "center",
          width: "800px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            marginTop: "70px",
            marginBottom: "15px",
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Button onClick={handleDrawerOpen} variant="outlined">
            Añadir Post
          </Button>
          <Box>
            {rows.selectedCount === 1 && (
              <IconButton onClick={handlerEdit}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        <DataTable
          columns={columns}
          data={filteredData}
          clearSelectedRows={toggledClearRows}
          selectableRows
          selectableRowsSingle
          pagination
          customStyles={tableStyles}
          paginationComponentOptions={paginationComponentOptions}
          onSelectedRowsChange={onSelectedRowsChange}
          noDataComponent="No se encuentra info"
        />
        <ConfirmationModal
          open={openConfirmationModal}
          onClose={() => setOpenConfirmationModal(false)}
          message="¿Estás seguro de que quieres eliminar este elemento?"
          onConfirm={() => onDelete(postId)}
          confirmationBtn="Eliminar"
        />
      </Box>
    </>
  );
}
