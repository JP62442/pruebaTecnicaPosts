import React from "react";
import { Header } from "../Header";
import { ListOfPosts } from "../Resources/Posts/ListOfPost";

function Index () {
    return(
        <>
            <Header />
            <ListOfPosts />
        </>
    )
}

export { Index };