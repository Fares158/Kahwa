import React from 'react';
import { Check, X, Star, Flag } from 'lucide-react';
import { reviewsData } from '../../../../data/reviewsData';
import type { ReviewFilter } from '../../types';

interface ReviewsListProps {
  filters: ReviewFilter;
}

const ReviewsList = ({ filters }: ReviewsListProps) => {
  const filteredReviews = reviewsData.filter(review => {
    if (filters.rating !== 'all' && review.rating !== parseInt(filters.rating)) {
      return false;
    }
    if (filters.featured !== 'all') {
      const isFeatured = filters.featured === 'featured';
      if (Boolean(review.featured) !== isFeatured) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y">
      {filteredReviews.map((review) => (
        <div key={review.id} className="p-6 hover:bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{review.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-gray-600 hover:text-yellow-600 rounded-lg hover:bg-yellow-50"
                aria-label="Toggle featured status"
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
                aria-label="Flag review"
              >
                <Flag className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-50"
                aria-label="Approve review"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                aria-label="Reject review"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="mt-4 text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;