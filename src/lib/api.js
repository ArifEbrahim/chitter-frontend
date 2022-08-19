import axios from "axios";
const CHITTER_API = "https://chitter-backend-api-v2.herokuapp.com";

export async function getAllPosts() {
  const response = await axios.get(`${CHITTER_API}/peeps`);
  return response.data;
}

export async function getSinglePost(postId) {
  const response = await axios.get(`${CHITTER_API}/peeps/${postId}`);
  return response.data;
}
