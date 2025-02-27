import React from 'react';
import StarRating from './StarRating';
import { Review } from '../../types/review';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        {review.avatar && (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <h4 className="font-semibold">{review.name}</h4>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-gray-600">{review.comment}</p>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(review.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;