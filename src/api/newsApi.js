import axios from 'axios';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '16e6ed58afb04bbc8eff3c63d0912f8a';

export const fetchNews = async (category, page = 1) => {
  const response = await axios.get(NEWS_API_URL, {
    params: {
      category,
      apiKey: API_KEY,
      country: 'us',
      page,
    },
  });
  return {
    articles: response.data.articles,
    totalPages: Math.ceil(response.data.totalResults / 20), // Assuming 20 articles per page
  };
};
