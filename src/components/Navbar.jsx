import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
              <div className="menu-wrap">
                <div className="main-menu">
                  <ul className="menu" id="menu-cotoweb">
                    <li className="menu-item">
                      <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        end
                      >
                        Inicio
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/nosotros"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        Nosotros
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/proyectos"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        Proyectos
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/servicios"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        Servicios
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/contacto"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        Contacto
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Column */}
            <div className="d-block d-lg-none col-sm-1 col-md-8 col-6">
              <div className="mobile-nav-wrap">
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
                    <ul className="metismenu" id="mobile-menu">
                      <li>
                        <NavLink
                          to="/"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                          end
                        >
                          Inicio
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/nosotros"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          Nosotros
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/proyectos"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          Proyectos
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/servicios"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          Servicios
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/contacto"
                          onClick={closeMobile}
                          className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                          Contacto
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
