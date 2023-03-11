import React from "react";
import { Header } from "../../components/Header";
import { ListOfUsers } from "./components/ListOfUsers";

function Users() {
  return (
    <>
      <Header />
      <ListOfUsers />
    </>
  );
}

export { Users };
