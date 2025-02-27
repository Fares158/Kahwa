import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import ReviewsList from './ReviewsList';
import ReviewFilters from './ReviewFilters';
import PageHeader from '../../../../components/shared/PageHeader';
import Card from '../../../../components/shared/Card';
import type { ReviewFilter } from '../../types';

const ReviewsEditor = () => {
  const [filters, setFilters] = useState<ReviewFilter>({
    status: 'all',
    rating: 'all',
    featured: 'all'
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Reviews Management">
        <button
          onClick={() => setFilters({ status: 'all', rating: 'all', featured: 'all' })}
          className="btn-secondary flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Reset Filters
        </button>
      </PageHeader>

      <Card>
        <ReviewFilters filters={filters} onFilterChange={setFilters} />
      </Card>
      
      <ReviewsList filters={filters} />
    </div>
  );
};

export default ReviewsEditor;