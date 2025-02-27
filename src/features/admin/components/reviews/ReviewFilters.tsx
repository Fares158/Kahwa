import React from 'react';
import type { ReviewFilter } from '../../types';

interface ReviewFiltersProps {
  filters: ReviewFilter;
  onFilterChange: (filters: ReviewFilter) => void;
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="input w-full"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => onFilterChange({ ...filters, rating: e.target.value })}
            className="input w-full"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured
          </label>
          <select
            value={filters.featured}
            onChange={(e) => onFilterChange({ ...filters, featured: e.target.value })}
            className="input w-full"
          >
            <option value="all">All Reviews</option>
            <option value="featured">Featured Only</option>
            <option value="not-featured">Not Featured</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewFilters;