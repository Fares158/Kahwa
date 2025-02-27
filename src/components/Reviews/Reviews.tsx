import React from 'react';
import ReviewCard from './ReviewCard';
import { reviewsData } from '../../data/reviewsData';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageCarousel from '../Gallery/ImageCarousel';

const Reviews = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#F5F5DC]" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#8B4513] mb-12">
          {t('reviews.title')}
        </h2>
        <div className="relative">
          <ImageCarousel
            items={reviewsData}
            renderItem={(review) => (
              <ReviewCard key={review.id} review={review} />
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;