import React from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Experience from './components/Sections/Experience';
import Education from './components/Sections/Education';
import Projects from './components/Sections/Projects';
import Instagram from './components/Sections/Instagram';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
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
    </div>
  );
};

export default App;