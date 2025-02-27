import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;