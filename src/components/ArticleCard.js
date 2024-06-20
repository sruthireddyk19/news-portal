// src/components/ArticleCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const encodedUrl = encodeURIComponent(article.url);

  return (
    <div className="border p-4 rounded-lg shadow-md">
      {article.urlToImage && (
        <img className="w-full h-48 object-cover mb-4" src={article.urlToImage} alt={article.title} />
      )}
      <h2 className="text-xl font-bold mb-2">
        <Link to={`/article/${encodedUrl}`}>{article.title}</Link>
      </h2>
      <p className="text-gray-700">{article.description}</p>
    </div>
  );
};

export default ArticleCard;
