import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function ModernLoader() {
  const location = useLocation();
  const { language } = useLanguage();

  // 1. Initial Splash / Preloader (first site visit)
  const [initialLoading, setInitialLoading] = useState(true);
  const [initialFading, setInitialFading] = useState(false);

  // 2. Top Slim Progress Bar (on route change and image loading)
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  // 3. Floating Image Loading Pill (shows when heavy images are downloading)
  const [imagesLoadingCount, setImagesLoadingCount] = useState(0);
  const [totalImagesCount, setTotalImagesCount] = useState(0);
  const [showImagePill, setShowImagePill] = useState(false);
  const [imagesLoadedDone, setImagesLoadedDone] = useState(false);

  const initialMountRef = useRef(true);

  // Initial site splash timer
  useEffect(() => {
    // Dismiss initial loader after critical assets or max 850ms
    const handleInitialLoad = () => {
      setInitialFading(true);
      setTimeout(() => {
        setInitialLoading(false);
      }, 450);
    };

    if (document.readyState === 'complete') {
      const timer = setTimeout(handleInitialLoad, 400);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', handleInitialLoad);
      const fallbackTimer = setTimeout(handleInitialLoad, 900);
      return () => {
        window.removeEventListener('load', handleInitialLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  // Route change & Image download tracking
  useEffect(() => {
    // Start Top Progress Bar
    setShowProgressBar(true);
    setProgressBarWidth(25);

    const step1 = setTimeout(() => setProgressBarWidth(65), 120);
    const step2 = setTimeout(() => setProgressBarWidth(85), 280);

    // Scan DOM for images on current page
    const checkImages = () => {
      const imgs = Array.from(document.querySelectorAll('main img'));
      if (imgs.length === 0) {
        setProgressBarWidth(100);
        setTimeout(() => {
          setShowProgressBar(false);
          setProgressBarWidth(0);
        }, 350);
        return;
      }

      setTotalImagesCount(imgs.length);
      const pendingImgs = imgs.filter((img) => !img.complete);
      setImagesLoadingCount(pendingImgs.length);

      // Only show the floating indicator if there are at least 2 heavy images still downloading
      if (pendingImgs.length >= 2 && !initialMountRef.current) {
        setShowImagePill(true);
        setImagesLoadedDone(false);
      }

      if (pendingImgs.length === 0) {
        setProgressBarWidth(100);
        setTimeout(() => {
          setShowProgressBar(false);
          setProgressBarWidth(0);
        }, 300);
      } else {
        let loaded = imgs.length - pendingImgs.length;
        const onOneLoaded = () => {
          loaded++;
          const percent = Math.min(95, Math.round((loaded / imgs.length) * 100));
          setProgressBarWidth(percent);
          setImagesLoadingCount(imgs.length - loaded);

          if (loaded >= imgs.length) {
            setProgressBarWidth(100);
            setImagesLoadedDone(true);
            setTimeout(() => {
              setShowProgressBar(false);
              setProgressBarWidth(0);
            }, 350);
            setTimeout(() => {
              setShowImagePill(false);
            }, 1200);
          }
        };

        pendingImgs.forEach((img) => {
          img.addEventListener('load', onOneLoaded, { once: true });
          img.addEventListener('error', onOneLoaded, { once: true });
        });
      }
    };

    // Small delay to let React render the route page's DOM
    const scanTimer = setTimeout(checkImages, 80);
    initialMountRef.current = false;

    // Safety timeout to ensure progress bar always finishes within 900ms
    const safetyFinish = setTimeout(() => {
      setProgressBarWidth(100);
      setTimeout(() => {
        setShowProgressBar(false);
        setProgressBarWidth(0);
      }, 300);
      setTimeout(() => {
        setShowImagePill(false);
      }, 1000);
    }, 900);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(scanTimer);
      clearTimeout(safetyFinish);
    };
  }, [location.pathname]);

  const pillText = imagesLoadedDone
    ? (language === 'en' ? 'Images ready' : 'Imágenes cargadas')
    : (language === 'en'
        ? `Loading images... (${totalImagesCount - imagesLoadingCount}/${totalImagesCount})`
        : `Cargando imágenes... (${totalImagesCount - imagesLoadingCount}/${totalImagesCount})`);

  return (
    <>
      {/* 1. Top Slim Neon Loading Bar */}
      <div
        className={`modern-top-loader ${showProgressBar ? 'visible' : ''}`}
        style={{
          width: `${progressBarWidth}%`,
          opacity: showProgressBar ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <div className="loader-glow-head"></div>
      </div>

      {/* 2. Initial Minimalist Splash Preloader */}
      {initialLoading && (
        <div
          className={`modern-preloader-overlay ${initialFading ? 'fade-out' : ''}`}
          aria-label="Cargando Orma Logistics"
        >
          <div className="preloader-inner text-center">
            <div className="preloader-logo-wrap mb-4">
              <img
                src="/assets/images/orig/xlogo-ormalogistics.png.pagespeed.ic.2NixeeXfoQ.png"
                alt="Orma Logistics"
                className="preloader-logo"
              />
            </div>
            <div className="minimal-spinner-box">
              <div className="minimal-spinner"></div>
            </div>
            <p className="minimal-loader-text">
              {language === 'en' ? 'Loading experience...' : 'Cargando experiencia...'}
            </p>
          </div>
        </div>
      )}

      {/* 3. Modern Minimalist Image Download Pill */}
      {showImagePill && (
        <aside
          className={`minimal-image-loading-pill ${imagesLoadedDone ? 'done' : ''}`}
          role="status"
          aria-live="polite"
        >
          {imagesLoadedDone ? (
            <span className="pill-check-icon">✓</span>
          ) : (
            <span className="pill-mini-spinner"></span>
          )}
          <span className="pill-text">{pillText}</span>
        </aside>
      )}
    </>
  );
}
