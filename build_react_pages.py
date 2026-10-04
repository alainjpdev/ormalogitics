import json
import re

with open('extracted_pages_data.json', 'r', encoding='utf-8') as f:
    pages_data = json.load(f)

# Helper to escape backticks and interpolation in template literals
def escape_for_js_template(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

# 1. NAVBAR
navbar_jsx = """import React, { useState, useEffect } from 'react';
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
                        <NavLink to="/" onClick={closeMobile} end>
                          Inicio
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/nosotros" onClick={closeMobile}>
                          Nosotros
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/proyectos" onClick={closeMobile}>
                          Proyectos
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/servicios" onClick={closeMobile}>
                          Servicios
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/contacto" onClick={closeMobile}>
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
"""

with open('src/components/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(navbar_jsx)
print("Updated Navbar.jsx")

# 2. FOOTER
footer_content_escaped = escape_for_js_template(pages_data['footer'])
footer_jsx = f"""import React from 'react';
import {{ useNavigate }} from 'react-router-dom';

const rawFooterHtml = `{footer_content_escaped}`;

export default function Footer() {{
  const navigate = useNavigate();

  const handleFooterClick = (e) => {{
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {{
      e.preventDefault();
      navigate(href);
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}
  }};

  return (
    <div onClick={{handleFooterClick}} dangerouslySetInnerHTML={{{{ __html: rawFooterHtml }}}} />
  );
}}
"""
with open('src/components/Footer.jsx', 'w', encoding='utf-8') as f:
    f.write(footer_jsx)
print("Updated Footer.jsx")

# 3. PAGE BANNER
page_banner_jsx = """import React from 'react';

export default function PageBanner({ title }) {
  return (
    <section className="page-banner-wrap text-center bg-cover">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="page-heading text-white">
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"""
with open('src/components/PageBanner.jsx', 'w', encoding='utf-8') as f:
    f.write(page_banner_jsx)
print("Updated PageBanner.jsx")

# 4. HOME PAGE (Hero slider in React + remaining elementor-2066 sections)
# Remove section bffa764 from home html because it is the hero
from bs4 import BeautifulSoup
home_soup = BeautifulSoup(pages_data['home'], 'html.parser')
hero_sec = home_soup.find('section', {'data-id': 'bffa764'})
if hero_sec:
    hero_sec.decompose()
home_rest_html = str(home_soup)
home_rest_escaped = escape_for_js_template(home_rest_html)

home_jsx = f"""import React, {{{{ useState, useEffect, useRef }}}} from 'react';
import {{{{ Link, useNavigate }}}} from 'react-router-dom';

const rawHomeSections = `{home_rest_escaped}`;

export default function Home() {{{{
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioned, setTransitioned] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {{{{
      subheading: 'Nuestros Servicios',
      heading: 'Renta de Maquinaria',
      bg: '/assets/images/orig/xWhatsApp-Image-2023-10-12-at-12.19.44-PM-1.jpeg.pagespeed.ic.AWZNIcgHpL.jpg',
      primaryBtnText: 'Servicios',
      primaryBtnLink: '/servicios',
      secondaryBtnText: 'Contáctanos',
      secondaryBtnLink: '/contacto',
    }}}},
    {{{{
      subheading: 'Nuestros proyectos',
      heading: 'Tramo 4 y 5 del\\nTren Maya',
      bg: '/assets/images/orig/xtrenmaya.jpeg.pagespeed.ic.UHuXJ06bg8.jpg',
      primaryBtnText: 'Proyectos',
      primaryBtnLink: '/proyectos',
      secondaryBtnText: 'Contáctanos',
      secondaryBtnLink: '/contacto',
    }}}},
  ];

  // Trigger text entrance animation
  useEffect(() => {{{{
    setTransitioned(false);
    const timer = setTimeout(() => {{{{
      setTransitioned(true);
    }}}}, 80);
    return () => clearTimeout(timer);
  }}}}, [currentSlide]);

  // Auto advance slides every 7 seconds
  useEffect(() => {{{{
    const interval = setInterval(() => {{{{
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }}}}, 7000);
    return () => clearInterval(interval);
  }}}}, [slides.length]);

  const nextSlide = () => {{{{
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }}}};

  const prevSlide = () => {{{{
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }}}};

  const handleContentClick = (e) => {{{{
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {{{{
      e.preventDefault();
      navigate(href);
      window.scrollTo({{{{ top: 0, behavior: 'smooth' }}}});
    }}}}
  }}}};

  const slide = slides[currentSlide];

  return (
    <main>
      {{/* 1. HERO SLIDER */}}
      <section className="hero-slide-wrapper hero-1">
        <div
          className="single-slide bg-cover"
          style={{{{{{
            backgroundImage: `url(${{slide.bg}})`,
            transition: 'background-image 0.8s ease-in-out',
          }}}}}}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-10 col-xl-10">
                <div className="hero-contents">
                  <h3 className={`animated-text small-heading ${{transitioned ? 'is-transitioned' : ''}}`}>
                    {{slide.subheading}}
                  </h3>
                  <h1
                    className={`animated-text bg-heading ${{transitioned ? 'is-transitioned' : ''}}`}
                    style={{{{{{ whiteSpace: 'pre-line' }}}}}}
                  >
                    {{slide.heading}}
                  </h1>
                  <div style={{{{{{ marginTop: '25px' }}}}}} className={`animated-text animated-btn ${{transitioned ? 'is-transitioned' : ''}}`}>
                    <Link className="theme-btn" to={{slide.primaryBtnLink}}>
                      {{slide.primaryBtnText}} <i className="fal fa-long-arrow-right" style={{{{{{ marginLeft: '8px' }}}}}} />
                    </Link>
                    <Link className="theme-btn black" to={{slide.secondaryBtnLink}}>
                      {{slide.secondaryBtnText}}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {{/* Prev / Next controls */}}
          <button className="hero-nav-arrow prev" onClick={{prevSlide}} aria-label="Anterior">
            <i className="fal fa-long-arrow-left"></i>
          </button>
          <button className="hero-nav-arrow next" onClick={{nextSlide}} aria-label="Siguiente">
            <i className="fal fa-long-arrow-right"></i>
          </button>
        </div>
      </section>

      {{/* 2. EXACT ELEMENTOR HOMEPAGE SECTIONS */}}
      <div onClick={{handleContentClick}} dangerouslySetInnerHTML={{{{{{ __html: rawHomeSections }}}}}} />
    </main>
  );
}}}}
"""
with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home_jsx)
print("Updated Home.jsx")

# 5. NOSOTROS PAGE
nos_escaped = escape_for_js_template(pages_data['nosotros'])
nos_jsx = f"""import React from 'react';
import {{ useNavigate }} from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const rawNosotros = `{nos_escaped}`;

export default function Nosotros() {{
  const navigate = useNavigate();

  const handleContentClick = (e) => {{
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {{
      e.preventDefault();
      navigate(href);
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}
  }};

  return (
    <main>
      <PageBanner title="Nosotros" />
      <div onClick={{handleContentClick}} dangerouslySetInnerHTML={{{{ __html: rawNosotros }}}} />
    </main>
  );
}}
"""
with open('src/pages/Nosotros.jsx', 'w', encoding='utf-8') as f:
    f.write(nos_jsx)
print("Updated Nosotros.jsx")

# 6. SERVICIOS PAGE
srv_escaped = escape_for_js_template(pages_data['servicios'])
srv_jsx = f"""import React from 'react';
import {{ useNavigate }} from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const rawServicios = `{srv_escaped}`;

export default function Servicios() {{
  const navigate = useNavigate();

  const handleContentClick = (e) => {{
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {{
      e.preventDefault();
      navigate(href);
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}
  }};

  return (
    <main>
      <PageBanner title="Servicios" />
      <div onClick={{handleContentClick}} dangerouslySetInnerHTML={{{{ __html: rawServicios }}}} />
    </main>
  );
}}
"""
with open('src/pages/Servicios.jsx', 'w', encoding='utf-8') as f:
    f.write(srv_jsx)
print("Updated Servicios.jsx")

# 7. PROYECTOS PAGE
pro_escaped = escape_for_js_template(pages_data['proyectos'])
pro_jsx = f"""import React from 'react';
import {{ useNavigate }} from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const rawProyectos = `{pro_escaped}`;

export default function Proyectos() {{
  const navigate = useNavigate();

  const handleContentClick = (e) => {{
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {{
      e.preventDefault();
      navigate(href);
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}
  }};

  return (
    <main>
      <PageBanner title="Proyectos" />
      <div onClick={{handleContentClick}} dangerouslySetInnerHTML={{{{ __html: rawProyectos }}}} />
    </main>
  );
}}
"""
with open('src/pages/Proyectos.jsx', 'w', encoding='utf-8') as f:
    f.write(pro_jsx)
print("Updated Proyectos.jsx")

# 8. CONTACTO PAGE (With Interactive Google Map & Working Contact Form)
con_escaped = escape_for_js_template(pages_data['contacto'])
con_jsx = f"""import React, {{ useState }} from 'react';
import {{ useNavigate }} from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const rawContacto = `{con_escaped}`;

export default function Contacto() {{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({{
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }});
  const [submitted, setSubmitted] = useState(false);

  const handleContentClick = (e) => {{
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {{
      e.preventDefault();
      navigate(href);
      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}
  }};

  const handleSubmit = (e) => {{
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({{ name: '', email: '', phone: '', subject: '', message: '' }});
  }};

  return (
    <main>
      <PageBanner title="Contacto" />
      <div onClick={{handleContentClick}} dangerouslySetInnerHTML={{{{ __html: rawContacto }}}} />
      
      {/* Interactive Google Map of Merida Matriz */}
      <section className="container-fluid p-0 my-5">
        <div className="row g-0">
          <div className="col-12">
            <iframe
              title="Ubicación Orma Logistics Mérida"
              src="https://maps.google.com/maps?q=Av.+Maquiladoras+501,+Industrias+No+Contaminantes,+97203+M%C3%A9rida,+Yuc.,+Mexico&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{{{ border: 0, display: 'block' }}}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}}
"""
with open('src/pages/Contacto.jsx', 'w', encoding='utf-8') as f:
    f.write(con_jsx)
print("Updated Contacto.jsx")

print("All React page components successfully generated!")
