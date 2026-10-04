import React, { useEffect, useRef } from 'react';
import { Swiper } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ClientCarousel() {
  const swiperContainerRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const clientLogos = [
    { id: 1, src: '/assets/images/orig/xclientes02.png.pagespeed.ic.TEUbRtZFPb.png', alt: 'clientes02' },
    { id: 2, src: '/assets/images/orig/xclientes01.png.pagespeed.ic.Oqr0iXtFnR.png', alt: 'clientes01' },
    { id: 3, src: '/assets/images/orig/xclientes02.png.pagespeed.ic.TEUbRtZFPb.png', alt: 'clientes02' },
    { id: 4, src: '/assets/images/orig/xclientes01.png.pagespeed.ic.Oqr0iXtFnR.png', alt: 'clientes01' },
    { id: 5, src: '/assets/images/orig/xclientes02.png.pagespeed.ic.TEUbRtZFPb.png', alt: 'clientes02' },
    { id: 6, src: '/assets/images/orig/xclientes01.png.pagespeed.ic.Oqr0iXtFnR.png', alt: 'clientes01' },
    { id: 7, src: '/assets/images/orig/xclientes02.png.pagespeed.ic.TEUbRtZFPb.png', alt: 'clientes02' },
    { id: 8, src: '/assets/images/orig/xclientes01.png.pagespeed.ic.Oqr0iXtFnR.png', alt: 'clientes01' },
  ];

  useEffect(() => {
    if (!swiperContainerRef.current) return;

    swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
      modules: [Autoplay, Navigation],
      loop: true,
      speed: 600,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      },
      slidesPerView: 2,
      spaceBetween: 30,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 60,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 60,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, []);

  return (
    <div className="elementor elementor-2066">
      <section
        className="elementor-section elementor-top-section elementor-element elementor-element-792a8e3 elementor-section-boxed elementor-section-height-default"
        data-element_type="section"
        data-id="792a8e3"
      >
        <div className="elementor-container elementor-column-gap-default">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-f2436b1"
            data-element_type="column"
            data-id="f2436b1"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              <div
                className="elementor-element elementor-element-d9cd37a elementor-arrows-position-inside elementor-widget elementor-widget-image-carousel"
                data-element_type="widget"
                data-id="d9cd37a"
              >
                <div className="elementor-widget-container">
                  <div className="client-carousel-outer">
                    <div
                      ref={swiperContainerRef}
                      className="elementor-image-carousel-wrapper swiper client-swiper-container"
                      dir="ltr"
                    >
                      <div className="elementor-image-carousel swiper-wrapper">
                        {clientLogos.map((logo, index) => (
                          <div
                            key={`${logo.id}-${index}`}
                            className="swiper-slide client-logo-slide"
                            role="group"
                            aria-label={`${index + 1} de ${clientLogos.length}`}
                          >
                            <Link to="/nosotros" className="client-logo-link" title={logo.alt}>
                              <figure className="swiper-slide-inner">
                                <img
                                  alt={logo.alt}
                                  className="swiper-slide-image client-carousel-img"
                                  decoding="async"
                                  src={logo.src}
                                />
                              </figure>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      ref={prevRef}
                      className="elementor-swiper-button elementor-swiper-button-prev"
                      type="button"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      ref={nextRef}
                      className="elementor-swiper-button elementor-swiper-button-next"
                      type="button"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
