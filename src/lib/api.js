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
  const { peepData, token } = postData;
  await axios({
    url: `${CHITTER_API}/peeps`,
    method: "post",
    headers: {
      Authorization: `Token token=${token}`,
    },
    data: peepData,
  });
}

export async function deletePost(postData) {
  const { token, postId } = postData;
  await axios({
    url: `${CHITTER_API}/peeps/${postId}`,
    method: "delete",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });
}

export async function likePost(postData) {
  const { token, postId, userId } = postData;
  await axios({
    url: `${CHITTER_API}/peeps/${postId}/likes/${userId}`,
    method: "put",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });
}

export async function unlikePost(postData) {
  const { token, postId, userId } = postData;
  await axios({
    url: `${CHITTER_API}/peeps/${postId}/likes/${userId}`,
    method: "delete",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });
}

export async function loginUser(userData) {
  const response = await axios({
    url: `${CHITTER_API}/sessions`,
    method: "post",
    data: {
      session: userData,
    },
  });
  return response.data;
}

export async function signUpUser(userData) {
  const response = await axios({
    url: `${CHITTER_API}/users`,
    method: "post",
    data: {
      user: userData,
    },
  });
  return response.data;
}
