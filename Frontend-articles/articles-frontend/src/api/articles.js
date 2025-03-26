import axios from 'axios'

const API_URL = 'http://127.0.0.1:8087'

export const fetchArticles = async () => {
  const response = await axios.get(`${API_URL}/articles/`)
  return response.data
}

export const createArticle = async (article) => {
  const response = await axios.post(`${API_URL}/articles/`, article)
  return response.data
}

export const updateArticle = async (id, article) => {
  if (!id || typeof id !== "string") {
    console.error("Invalid ID:", id);
    throw new Error("Article ID must be a valid string");
  }  
  const response = await axios.put(`${API_URL}/articles/${id}`, article);
  return response.data;
};


export const deleteArticle = async (id) => {
  await axios.delete(`${API_URL}/articles/${id}`)
}
