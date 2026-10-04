import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import QuoteModal from './components/QuoteModal';

import { LanguageProvider } from './context/LanguageContext';

// Pages
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Proyectos from './pages/Proyectos';
import Contacto from './pages/Contacto';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('Renta de Maquinaria');

  const handleOpenQuote = (serviceName = '') => {
    setQuoteService(serviceName || 'Renta de Maquinaria');
    setQuoteModalOpen(true);
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app-root">
          <Navbar onOpenQuote={handleOpenQuote} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onOpenQuote={handleOpenQuote} />} />
            <Route path="/nosotros" element={<Nosotros onOpenQuote={handleOpenQuote} />} />
            <Route path="/servicios" element={<Servicios onOpenQuote={handleOpenQuote} />} />
            <Route path="/proyectos" element={<Proyectos onOpenQuote={handleOpenQuote} />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<Home onOpenQuote={handleOpenQuote} />} />
          </Routes>
        </main>

        <Footer />
        <FloatingWhatsApp />
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          initialService={quoteService}
        />
      </div>
    </BrowserRouter>
  </LanguageProvider>
  );
}
