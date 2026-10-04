import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onOpenQuote }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileNavOpen]);

  const closeMobile = () => setMobileNavOpen(false);

  return (
    <>
      <header className={`header-1 ${isSticky ? 'sticky' : ''}`}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* Logo Column */}
            <div className="col-lg-2 col-sm-5 col-md-4 col-6 pe-0">
              <div className="logo">
                <Link to="/" onClick={closeMobile}>
                  <img
                    alt="orma logistics"
                    src="/assets/images/orig/xlogo-ormalogistics.png.pagespeed.ic.2NixeeXfoQ.png"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Column */}
            <div className="col-lg-10 justify-content-end text-end p-lg-0 d-none d-lg-flex align-items-center">
              <div className="menu-wrap d-flex align-items-center justify-content-end">
                <div className="main-menu">
                  <ul className="menu" id="menu-cotoweb">
                    <li className="menu-item">
                      <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        end
                      >
                        {t.nav.home}
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/nosotros"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {t.nav.about}
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/proyectos"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {t.nav.projects}
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/servicios"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {t.nav.services}
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/contacto"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {t.nav.contact}
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Language Switcher */}
                <div className="header-lang-switcher ms-3">
                  <button
                    type="button"
                    className="lang-pill-btn"
                    onClick={toggleLanguage}
                    title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                    aria-label="Cambiar idioma"
                  >
                    <i className="fal fa-globe me-1"></i>
                    <span className={`lang-badge ${language === 'es' ? 'active' : ''}`}>ES</span>
                    <span className="lang-sep">|</span>
                    <span className={`lang-badge ${language === 'en' ? 'active' : ''}`}>EN</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Column */}
            <div className="d-block d-lg-none col-sm-7 col-md-8 col-6">
              <div className="mobile-nav-wrap">
                {/* Language Switcher next to Hamburger */}
                <button
                  type="button"
                  className="lang-pill-btn mobile-header-lang-btn"
                  onClick={toggleLanguage}
                  title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                  aria-label="Cambiar idioma"
                >
                  <i className="fal fa-globe me-1"></i>
                  <span className={`lang-badge ${language === 'es' ? 'active' : ''}`}>ES</span>
                  <span className="lang-sep">|</span>
                  <span className={`lang-badge ${language === 'en' ? 'active' : ''}`}>EN</span>
                </button>

                <div
                  id="hamburger"
                  onClick={() => setMobileNavOpen(true)}
                  aria-label="Abrir Menu"
                >
                  <i className="fal fa-bars"></i>
                </div>

                {/* Mobile Slide-in Drawer */}
                <div className={`mobile-nav ${mobileNavOpen ? 'show' : ''}`}>
                  <button
                    className="close-nav"
                    type="button"
                    onClick={closeMobile}
                    aria-label="Cerrar Menu"
                  >
                    <i className="fal fa-times-circle"></i>
                  </button>
                  <nav className="sidebar-nav">
                    {/* Mobile Language Switcher */}
                    <div className="mobile-lang-wrap mb-3">
                      <button
                        type="button"
                        className="mobile-lang-btn"
                        onClick={toggleLanguage}
                        aria-label="Cambiar idioma"
                      >
                        <i className="fal fa-globe me-2"></i>
                        <span className={`lang-text ${language === 'es' ? 'active' : ''}`}>Español</span>
                        <span className="lang-sep mx-2">|</span>
                        <span className={`lang-text ${language === 'en' ? 'active' : ''}`}>English</span>
                      </button>
                    </div>

                    <ul className="metismenu" id="mobile-menu">
                      <li>
                        <NavLink
                          to="/"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                          end
                        >
                          {t.nav.home}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/nosotros"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          {t.nav.about}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/proyectos"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          {t.nav.projects}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/servicios"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          {t.nav.services}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/contacto"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          {t.nav.contact}
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div
                className={`overlay ${mobileNavOpen ? 'show' : ''}`}
                onClick={closeMobile}
              ></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
