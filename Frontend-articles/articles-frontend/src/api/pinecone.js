import axios from "axios";

const API_URL = "http://127.0.0.1:8087";

export const embedArticle = async (articleId) => {
  const response = await axios.post(`${API_URL}/articles/${articleId}/embed`);
  return response.data;
};

export const searchArticles = async (query) => {
  const response = await axios.get(`${API_URL}/articles/search`, {
    params: { query },
  });
  return response.data;
};
