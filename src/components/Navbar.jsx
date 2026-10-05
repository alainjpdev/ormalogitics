import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FlagMexico, FlagUSA } from './FlagIcons';

export default function Navbar({ onOpenQuote }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
                    <li className="menu-item menu-item-has-children">
                      <NavLink
                        to="/servicios"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {t.nav.services}
                      </NavLink>
                      <ul className="sub-menu">
                        <li>
                          <NavLink to="/transporte-de-personal">Transporte de Personal</NavLink>
                        </li>
                        <li>
                          <NavLink to="/renta-de-maquinaria-pesada">Renta de Maquinaria</NavLink>
                        </li>
                        <li>
                          <NavLink to="/pipas-de-agua">Pipas de Agua</NavLink>
                        </li>
                        <li>
                          <NavLink to="/renta-de-planas">Renta de Planas</NavLink>
                        </li>
                      </ul>
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
                <div className="header-lang-switcher ms-4">
                  <div className="lang-pill-btn" role="group" aria-label="Selector de idioma">
                    <button
                      type="button"
                      className={`lang-option ${language === 'es' ? 'active' : ''}`}
                      onClick={() => setLanguage('es')}
                      title="Español (México)"
                      aria-label="Cambiar a Español"
                    >
                      <FlagMexico size={12} />
                      <span className="lang-code">ES</span>
                    </button>
                    <span className="lang-sep">|</span>
                    <button
                      type="button"
                      className={`lang-option ${language === 'en' ? 'active' : ''}`}
                      onClick={() => setLanguage('en')}
                      title="English (USA)"
                      aria-label="Switch to English"
                    >
                      <FlagUSA size={12} />
                      <span className="lang-code">EN</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Column */}
            <div className="d-block d-lg-none col-sm-7 col-md-8 col-6">
              <div className="mobile-nav-wrap">
                {/* Language Switcher next to Hamburger */}
                <div className="lang-pill-btn mobile-header-lang-btn" role="group" aria-label="Selector de idioma">
                  <button
                    type="button"
                    className={`lang-option ${language === 'es' ? 'active' : ''}`}
                    onClick={() => setLanguage('es')}
                    title="Español"
                    aria-label="Español"
                  >
                    <FlagMexico size={11} />
                    <span className="lang-code">ES</span>
                  </button>
                  <span className="lang-sep">|</span>
                  <button
                    type="button"
                    className={`lang-option ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                    title="English"
                    aria-label="English"
                  >
                    <FlagUSA size={11} />
                    <span className="lang-code">EN</span>
                  </button>
                </div>

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
                      <div className="mobile-lang-btn" role="group" aria-label="Selector de idioma">
                        <button
                          type="button"
                          className={`mobile-lang-opt ${language === 'es' ? 'active' : ''}`}
                          onClick={() => {
                            setLanguage('es');
                            closeMobile();
                          }}
                          aria-label="Cambiar a Español"
                        >
                          <FlagMexico size={14} />
                          <span className="lang-text">Español</span>
                        </button>
                        <span className="lang-sep mx-2">|</span>
                        <button
                          type="button"
                          className={`mobile-lang-opt ${language === 'en' ? 'active' : ''}`}
                          onClick={() => {
                            setLanguage('en');
                            closeMobile();
                          }}
                          aria-label="Switch to English"
                        >
                          <FlagUSA size={14} />
                          <span className="lang-text">English</span>
                        </button>
                      </div>
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
                        <div className="mobile-services-sublinks" style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 12px' }}>
                          <NavLink to="/transporte-de-personal" onClick={closeMobile} style={{ fontSize: '13px', color: '#ff7600', fontWeight: '600' }}>
                            ↳ Transporte de Personal
                          </NavLink>
                          <NavLink to="/renta-de-maquinaria-pesada" onClick={closeMobile} style={{ fontSize: '13px', color: '#ff7600', fontWeight: '600' }}>
                            ↳ Renta de Maquinaria
                          </NavLink>
                          <NavLink to="/pipas-de-agua" onClick={closeMobile} style={{ fontSize: '13px', color: '#ff7600', fontWeight: '600' }}>
                            ↳ Pipas de Agua
                          </NavLink>
                          <NavLink to="/renta-de-planas" onClick={closeMobile} style={{ fontSize: '13px', color: '#ff7600', fontWeight: '600' }}>
                            ↳ Renta de Planas
                          </NavLink>
                        </div>
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
