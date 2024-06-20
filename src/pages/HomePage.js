// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, selectArticles, selectLoading, selectError, selectCurrentPage, selectTotalPages, setCurrentPage, setCategory } from '../store/newsSlice';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';

const HomePage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchNews({ category: 'general', page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
    dispatch(fetchNews({ category, page: 1 }));
  };

  return (
    <div className="container mx-auto p-4">
      <CategoryFilter onChange={handleCategoryChange} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
