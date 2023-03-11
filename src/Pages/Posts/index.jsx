import React from "react";

import { Header } from "../../components/Header";
import { ListOfPosts } from "./components/ListOfPost";

function Posts() {
  return (
    <>
      <Header />
      <ListOfPosts />
    </>
  );
}

export { Posts };
