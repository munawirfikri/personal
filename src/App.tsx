import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Experience from './components/Sections/Experience';
import Education from './components/Sections/Education';
import Projects from './components/Sections/Projects';
import Instagram from './components/Sections/Instagram';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './components/Admin/AdminDashboard';

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
    return <AdminDashboard />;
  }

  return (
    <div className="bg-background text-primary font-sans selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Instagram />
      </main>
      <Footer />
      <ChatWidget />
      
      {/* Secret link to Admin */}
      <div className="fixed bottom-2 left-2 opacity-0 hover:opacity-100 transition-opacity z-50">
        <a href="#admin" className="text-[10px] text-secondary">Admin</a>
      </div>
    </div>
  );
};

export default App;