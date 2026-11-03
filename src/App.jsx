import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Dedicated multi-page views
import HomePage from './pages/HomePage';
import ProblemPage from './pages/ProblemPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import DPConceptPage from './pages/DPConceptPage';
import LabPage from './pages/LabPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-paper-bg text-ink-primary font-sans antialiased selection:bg-accent/20">
          <ScrollToTop />
          
          {/* Top Multi-Page Navigation */}
          <Navbar />

          {/* Main Routed Page Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/problem" element={<ProblemPage />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              <Route path="/dp" element={<DPConceptPage />} />
              <Route path="/lab" element={<LabPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Academic Footer */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
