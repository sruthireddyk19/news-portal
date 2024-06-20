import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '16e6ed58afb04bbc8eff3c63d0912f8a';  // Replace with your actual API key

export const fetchNews = createAsyncThunk('news/fetchNews', async ({ category, page = 1 }) => {
  try {
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
  } catch (error) {
    throw new Error('Failed to fetch news');
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    category: 'general',
    currentPage: 1,
    totalPages: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1; // Reset current page when category changes
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectArticles = (state) => state.news.articles;
export const selectLoading = (state) => state.news.status === 'loading';
export const selectError = (state) => state.news.error;
export const selectCurrentPage = (state) => state.news.currentPage;
export const selectTotalPages = (state) => state.news.totalPages;

export const { setCategory, setCurrentPage } = newsSlice.actions;

export default newsSlice.reducer;
