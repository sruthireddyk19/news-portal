// src/pages/ArticlePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams();
  const decodedUrl = decodeURIComponent(id);
  const article = useSelector((state) => 
    state.news.articles.find((article) => article.url === decodedUrl)
  );

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      {article.urlToImage && (
        <img className="w-full h-64 object-cover mb-4" src={article.urlToImage} alt={article.title} />
      )}
      <p>{article.content ? article.content.replace(/\[\+\d+ chars\]$/, '') : article.description}</p>
      {article.content && article.content.includes('[+')}
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Read more
        </a>
    </div>
  );
};

export default ArticlePage;
