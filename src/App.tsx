import React, { useState, useEffect, lazy, Suspense } from 'react';
import SEO from './components/SEO';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const About = lazy(() => import('./components/Sections/About'));
const Experience = lazy(() => import('./components/Sections/Experience'));
const Education = lazy(() => import('./components/Sections/Education'));
const Projects = lazy(() => import('./components/Sections/Projects'));
const Instagram = lazy(() => import('./components/Sections/Instagram'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
          <AdminDashboard />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SEO />
      <div className="bg-background text-primary font-sans selection:bg-black selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <About />
            <Experience />
            <Education />
            <Projects />
            <Instagram />
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
        
        {/* Secret link to Admin */}
        <div className="fixed bottom-2 left-2 opacity-0 hover:opacity-100 transition-opacity z-50">
          <a href="#admin" className="text-[10px] text-secondary">Admin</a>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;