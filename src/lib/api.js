import axios from "axios"
const CHITTER_API = 'https://chitter-backend-api-v2.herokuapp.com'

export async function getAllPosts() {
  const response = await axios.get(`${CHITTER_API}/peeps`)
  return response.data
}