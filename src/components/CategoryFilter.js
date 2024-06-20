// src/components/CategoryFilter.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory, fetchNews } from '../store/newsSlice';

const categories = ['general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(setCategory(category));
    dispatch(fetchNews({ category, page: 1 }));
  };

  return (
    <select onChange={handleCategoryChange} className="p-2 border mb-4">
      {categories.map((category) => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
