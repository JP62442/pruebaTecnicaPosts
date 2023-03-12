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

export async function createPostAPI(data) {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      { ...data, userId: 1 }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
