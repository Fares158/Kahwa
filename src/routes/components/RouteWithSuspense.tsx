import React, { Suspense } from 'react';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface RouteWithSuspenseProps {
  children: React.ReactNode;
}

const RouteWithSuspense: React.FC<RouteWithSuspenseProps> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

export default RouteWithSuspense;