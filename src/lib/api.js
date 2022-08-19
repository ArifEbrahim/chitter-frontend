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

export async function addPost(postData) {
const {peepData, token} = postData;
  await axios({
    url: `${CHITTER_API}/peeps`,
    method: "post",
    headers: {
      Authorization: `Token token=${token}`,
      "Content-Type": "application/json",
    },
    data: peepData,
  });
}
