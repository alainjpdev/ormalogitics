import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { homeSectionsHtml } from '../data/pagesData';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioned, setTransitioned] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      subheading: 'Nuestros Servicios',
      heading: 'Renta de Maquinaria',
      bg: '/assets/images/orig/xWhatsApp-Image-2023-10-12-at-12.19.44-PM-1.jpeg.pagespeed.ic.AWZNIcgHpL.jpg',
      primaryBtnText: 'Servicios',
      primaryBtnLink: '/servicios',
      secondaryBtnText: 'Contáctanos',
      secondaryBtnLink: '/contacto',
    },
    {
      subheading: 'Nuestros proyectos',
      heading: (
        <>
          Tramo 4 y 5 del<br />Tren Maya
        </>
      ),
      bg: '/assets/images/orig/xtrenmaya.jpeg.pagespeed.ic.UHuXJ06bg8.jpg',
      primaryBtnText: 'Proyectos',
      primaryBtnLink: '/proyectos',
      secondaryBtnText: 'Contáctanos',
      secondaryBtnLink: '/contacto',
    },
  ];

  // Staggered text entrance animation
  useEffect(() => {
    setTransitioned(false);
    const timer = setTimeout(() => {
      setTransitioned(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Auto advance slides every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleContentClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const slide = slides[currentSlide];

  return (
    <main>
      {/* 1. HERO SLIDER */}
      <section className="hero-slide-wrapper hero-1">
        <div
          className="single-slide bg-cover"
          style={{
            backgroundImage: `url(${slide.bg})`,
            transition: 'background-image 0.8s ease-in-out',
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-10 col-xl-10">
                <div className="hero-contents">
                  <h3 className={`animated-text small-heading ${transitioned ? 'is-transitioned' : ''}`}>
                    {slide.subheading}
                  </h3>
                  <h1
                    className={`animated-text bg-heading ${transitioned ? 'is-transitioned' : ''}`}
                  >
                    {slide.heading}
                  </h1>
                  <Link
                    className={`theme-btn animated-text animated-btn ${transitioned ? 'is-transitioned' : ''}`}
                    to={slide.primaryBtnLink}
                  >
                    {slide.primaryBtnText} <i className="fal fa-long-arrow-right" />
                  </Link>
                  <Link
                    className={`theme-btn animated-text animated-btn black ${transitioned ? 'is-transitioned' : ''}`}
                    to={slide.secondaryBtnLink}
                  >
                    {slide.secondaryBtnText}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next controls */}
          <button className="hero-nav-arrow prev" onClick={prevSlide} aria-label="Anterior">
            <i className="fal fa-long-arrow-left"></i>
          </button>
          <button className="hero-nav-arrow next" onClick={nextSlide} aria-label="Siguiente">
            <i className="fal fa-long-arrow-right"></i>
          </button>
        </div>
      </section>

      {/* 2. EXACT ELEMENTOR HOMEPAGE SECTIONS */}
      <div onClick={handleContentClick} dangerouslySetInnerHTML={{ __html: homeSectionsHtml }} />
    </main>
  );
}
