import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from '@/components/ui/layouts/header.layout';
import Footer from '@/components/ui/layouts/footer.layout';
import { SignInPage, SignUpPage } from '@/aouth';
import HomePage from './home';
import SearchPage from './search';
import HotelDetailsPage from './hotel-details';
import ProfilePage from './profile';
import PaymentStatusPage from './payments/status';
import { useAuth } from '@/context/AuthContext';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/signin?next=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  return children;
};

// Main layout with header and footer
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

// Auth layout without header/footer
const AuthLayout = ({ children }) => (
  <div className="min-h-screen">{children}</div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
        <Route path="/search" element={
          <MainLayout>
            <SearchPage />
          </MainLayout>
        } />
        <Route path="/hotels/:hotelId" element={
          <MainLayout>
            <HotelDetailsPage />
          </MainLayout>
        } />

        {/* Payment confirmation route */}
        <Route path="/payments/:bookingId/status" element={
          <MainLayout>
            <PaymentStatusPage />
          </MainLayout>
        } />

        {/* Protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        } />

        {/* Auth routes */}
        <Route path="/signin" element={
          <AuthLayout>
            <SignInPage />
          </AuthLayout>
        } />
        <Route path="/signup" element={
          <AuthLayout>
            <SignUpPage />
          </AuthLayout>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
