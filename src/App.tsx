import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/shared/LoadingSpinner';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;