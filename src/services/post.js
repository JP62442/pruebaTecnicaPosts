import axios from "axios";

export async function getPostsAPI() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}


