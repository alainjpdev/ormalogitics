import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Mail, Navigation, ExternalLink, Building2, Check } from 'lucide-react';

export const BRANCHES_DATA = [
  {
    id: 'merida',
    name: { es: 'Sucursal Mérida (Matriz)', en: 'Mérida Branch (Headquarters)' },
    tag: { es: 'Sucursal Matriz', en: 'Headquarters' },
    address: 'Av. Maquiladoras #501 CP.97203 Industrias No Contaminantes, Mérida, Yucatán, México.',
    phone: '(+52) 442 799 9440',
    phoneRaw: '524427999440',
    email: 'merida@ormalogistics.com',
    lat: 21.056133,
    lng: -89.642226,
    isHQ: true,
  },
  {
    id: 'queretaro',
    name: { es: 'Sucursal Bajío Querétaro', en: 'Bajío Querétaro Branch' },
    tag: { es: 'Oficina Regional', en: 'Regional Office' },
    address: 'Loma de Pinal de Amoles 324, Vista Dorada, 76060 Santiago de Querétaro, Qro., México.',
    phone: '(+52) 442 799 9440',
    phoneRaw: '524427999440',
    email: 'merida@ormalogistics.com',
    lat: 20.590145,
    lng: -100.363036,
    isHQ: false,
  },
  {
    id: 'valladolid',
    name: { es: 'Sucursal Valladolid', en: 'Valladolid Branch' },
    tag: { es: 'Oficina Regional', en: 'Regional Office' },
    address: 'Calle 22b, no. 91e. Entre 21 y 23. San Isidro II, Valladolid, Yucatán, México.',
    phone: '(+52) 442 799 9440',
    phoneRaw: '524427999440',
    email: 'merida@ormalogistics.com',
    lat: 20.705903,
    lng: -88.191730,
    isHQ: false,
  },
  {
    id: 'playa',
    name: { es: 'Sucursal Playa del Carmen', en: 'Playa del Carmen Branch' },
    tag: { es: 'Oficina Regional', en: 'Regional Office' },
    address: 'Playa del Carmen, Solidaridad, Quintana Roo, México.',
    phone: '(+52) 442 799 9440',
    phoneRaw: '524427999440',
    email: 'merida@ormalogistics.com',
    lat: 20.630864,
    lng: -87.077950,
    isHQ: false,
  },
];

export default function BranchesMap({ language = 'es', selectedBranch, onSelectBranch }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on central/southeast Mexico overview
    const map = L.map(mapContainerRef.current, {
      center: [20.889595, -93.384030],
      zoom: 6,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Custom SVG Marker Icon function
    const createCustomIcon = (isHQ = false) => {
      const bgColor = isHQ ? '#c32637' : '#00235a';
      return L.divIcon({
        className: 'custom-orma-pin',
        html: `
          <div style="
            position: relative;
            width: 34px;
            height: 34px;
            background: ${bgColor};
            border: 2.5px solid #ffffff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <span style="
              transform: rotate(45deg);
              color: #ffffff;
              font-size: 13px;
              font-weight: 700;
              line-height: 1;
            ">${isHQ ? '★' : '●'}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34],
      });
    };

    // Add markers for each branch
    BRANCHES_DATA.forEach((b) => {
      const marker = L.marker([b.lat, b.lng], {
        icon: createCustomIcon(b.isHQ),
      }).addTo(map);

      const title = b.name[language] || b.name.es;
      const tag = b.tag[language] || b.tag.es;
      const dirText = language === 'en' ? 'Get Directions' : 'Cómo llegar';

      marker.bindPopup(`
        <div style="font-family: 'Poppins', sans-serif; padding: 6px 4px; min-width: 230px;">
          <div style="display: inline-block; background: ${b.isHQ ? '#c32637' : '#00235a'}; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; text-transform: uppercase; margin-bottom: 6px;">
            ${tag}
          </div>
          <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: #1e293b; line-height: 1.3;">
            ${title}
          </h4>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b; line-height: 1.4;">
            ${b.address}
          </p>
          <div style="margin-bottom: 8px; font-size: 12px;">
            <a href="tel:${b.phoneRaw}" style="color: #c32637; font-weight: 600; text-decoration: none;">📞 ${b.phone}</a>
          </div>
          <a href="https://maps.google.com/?q=${encodeURIComponent(b.address)}" target="_blank" rel="noreferrer" style="
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #c32637;
            color: #ffffff;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 0 2px 6px rgba(195,38,55,0.3);
          ">
            ${dirText} →
          </a>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectBranch) onSelectBranch(b.id);
      });

      markersRef.current[b.id] = marker;
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [language]);

  // Respond to selected branch change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!selectedBranch || selectedBranch === 'all') {
      map.flyTo([20.889595, -93.384030], 6, { duration: 1 });
    } else {
      const b = BRANCHES_DATA.find((item) => item.id === selectedBranch);
      if (b) {
        map.flyTo([b.lat, b.lng], 14, { duration: 1.2 });
        if (markersRef.current[b.id]) {
          markersRef.current[b.id].openPopup();
        }
      }
    }
  }, [selectedBranch]);

  return (
    <div className="branches-map-section">
      {/* Interactive Branch Filters */}
      <div className="branch-filter-pills d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          type="button"
          className={`branch-pill ${!selectedBranch || selectedBranch === 'all' ? 'active' : ''}`}
          onClick={() => onSelectBranch && onSelectBranch('all')}
        >
          {language === 'en' ? 'All Branches (Overview)' : 'Todas las Sucursales'}
        </button>
        {BRANCHES_DATA.map((b) => {
          const isActive = selectedBranch === b.id;
          const label = b.id === 'merida'
            ? (language === 'en' ? 'Mérida (HQ)' : 'Mérida (Matriz)')
            : (b.id === 'queretaro' ? 'Bajío Querétaro' : (b.id === 'valladolid' ? 'Valladolid' : 'Playa del Carmen'));
          return (
            <button
              key={b.id}
              type="button"
              className={`branch-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectBranch && onSelectBranch(b.id)}
            >
              {b.isHQ && <span className="hq-dot">★</span>}
              {label}
            </button>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="branch-map-wrapper">
        <div ref={mapContainerRef} className="branch-map-canvas" />
      </div>

      {/* 4 Branch Detail Cards */}
      <div className="row g-4 mt-4">
        {BRANCHES_DATA.map((b) => {
          const isSelected = selectedBranch === b.id;
          const title = b.name[language] || b.name.es;
          const tag = b.tag[language] || b.tag.es;

          return (
            <div key={b.id} className="col-12 col-md-6 col-xl-3">
              <div
                className={`branch-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectBranch && onSelectBranch(b.id)}
              >
                <div className="branch-card-header d-flex justify-content-between align-items-start mb-2">
                  <span className={`branch-badge ${b.isHQ ? 'badge-hq' : 'badge-reg'}`}>
                    {tag}
                  </span>
                  <button
                    type="button"
                    className="branch-focus-btn"
                    title={language === 'en' ? 'Show on Map' : 'Ver en mapa'}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectBranch) onSelectBranch(b.id);
                    }}
                  >
                    <MapPin size={16} />
                  </button>
                </div>

                <h4 className="branch-card-title">{title}</h4>

                <div className="branch-card-info">
                  <div className="info-line d-flex align-items-start gap-2">
                    <MapPin size={15} className="info-icon flex-shrink-0" />
                    <span>{b.address}</span>
                  </div>

                  <div className="info-line d-flex align-items-center gap-2">
                    <Phone size={15} className="info-icon flex-shrink-0" />
                    <a href={`tel:${b.phoneRaw}`} onClick={(e) => e.stopPropagation()}>
                      {b.phone}
                    </a>
                  </div>

                  <div className="info-line d-flex align-items-center gap-2">
                    <Mail size={15} className="info-icon flex-shrink-0" />
                    <a href={`mailto:${b.email}`} onClick={(e) => e.stopPropagation()}>
                      {b.email}
                    </a>
                  </div>
                </div>

                <div className="branch-card-actions mt-3 pt-3 d-flex gap-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="branch-action-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Navigation size={13} />
                    <span>{language === 'en' ? 'Directions' : 'Cómo llegar'}</span>
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${b.phoneRaw}&text=${encodeURIComponent(
                      language === 'en'
                        ? `Hello Orma Logistics, I am contacting you regarding ${title}.`
                        : `Hola Orma Logistics, me comunico sobre la ${title}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="branch-action-wa"
                    onClick={(e) => e.stopPropagation()}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
