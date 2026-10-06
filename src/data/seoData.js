/**
 * SEO metadata and Schema.org structured data configuration for Orma Logistics.
 * Supports bilingual switching (Spanish primary, English alternate) with BreadcrumbList,
 * Service, AboutPage, ContactPage, and ItemList schemas.
 */

const BASE_URL = 'https://ormalogistics.com';

const createBreadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.path}`,
  })),
});


const createFaqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
});

const faqsEs = [
  {
    q: '¿Qué servicios de maquinaria y logística ofrece Orma Logistics en México?',
    a: 'Orma Logistics ofrece renta de maquinaria pesada (excavadoras, retroexcavadoras, motoconformadoras, tractores), pipas de agua de 10,000 y 20,000 litros para terracerías, transporte de personal en autobuses y vans, fletes industriales, cimentaciones y mecánica de suelos.',
  },
  {
    q: '¿En qué ciudades de México cuenta Orma Logistics con cobertura?',
    a: 'Contamos con bases y sucursales en Querétaro (Bajío), Mérida (Yucatán), Playa del Carmen (Quintana Roo) y Valladolid (Yucatán), con cobertura en todo el Sureste y Centro del país.',
  },
  {
    q: '¿Cómo solicitar una cotización para renta de maquinaria o pipas?',
    a: 'Puedes solicitar tu cotización inmediata en línea a través de nuestro sitio web, por WhatsApp o llamando al +52 442 799 9440.',
  },
  {
    q: '¿La maquinaria incluye operador y mantenimiento en sitio?',
    a: 'Sí, ofrecemos opciones de renta con operador capacitado y soporte mecánico y de refacciones en sitio para garantizar máxima disponibilidad operativa.',
  },
  {
    q: '¿Tienen experiencia en grandes proyectos como el Tren Maya?',
    a: 'Sí, participamos activamente en los Tramos 4 y 5 del Tren Maya suministrando maquinaria pesada, transporte de brigadas y pipas de agua para terracerías.',
  },
];

const faqsEn = [
  {
    q: 'What heavy equipment and logistics services does Orma Logistics provide in Mexico?',
    a: 'Orma Logistics provides heavy machinery rental (excavators, backhoes, motor graders, bulldozers), 10,000 & 20,000-liter water tanker trucks, worker transportation buses and vans, freight logistics, deep foundations, and certified soil studies.',
  },
  {
    q: 'Where does Orma Logistics operate in Mexico?',
    a: 'We operate with branches in Querétaro, Mérida, Playa del Carmen, and Valladolid, serving projects across Southeastern and Central Mexico.',
  },
  {
    q: 'How do I request a quote for machinery or water tankers?',
    a: 'You can request an instant quote through our online form, via WhatsApp, or by calling our team at +52 442 799 9440.',
  },
  {
    q: 'Does equipment rental include operators and on-site support?',
    a: 'Yes, we provide rental plans with certified operators and on-site diesel mechanical assistance to ensure uninterrupted uptime.',
  },
  {
    q: 'Does Orma Logistics participate in federal infrastructure like the Maya Train?',
    a: 'Yes, we contributed extensively to Sections 4 & 5 of the Maya Train with heavy machinery, worker shuttles, and water tankers.',
  },
];

export const seoConfig = {
  home: {
    es: {
      title: 'Orma Logistics | Maquinaria Pesada, Transporte y Logística en México',
      description: 'Líderes en renta de maquinaria pesada, transporte de personal en obra, pipas de agua de 10k y 20k litros y logística integral en México. Cotiza en línea.',
      keywords: 'renta de maquinaria pesada, pipas de agua construccion, transporte de personal obras, logistica industrial mexico, proveedores tren maya, orma logistics, cancun, playa del carmen, merida, queretaro, valladolid',
      path: '/',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([{ name: 'Inicio', path: '/' }]),
          createFaqSchema(faqsEs),
          {
            '@type': 'WebSite',
            '@id': `${BASE_URL}/#website`,
            url: BASE_URL,
            name: 'Orma Logistics',
            description: 'Soluciones integrales de maquinaria pesada, transporte y logística en México.',
            publisher: { '@id': `${BASE_URL}/#organization` },
            inLanguage: ['es-MX', 'en-US'],
          },
        ],
      },
    },
    en: {
      title: 'Orma Logistics | Heavy Machinery Rental, Personnel Transport & Logistics Mexico',
      description: 'Leading providers of heavy machinery rental, personnel transportation, 10k & 20k liter water tankers, and industrial logistics across Mexico. Get a quote.',
      keywords: 'heavy machinery rental mexico, construction equipment rental, worker transportation, water tank truck, maya train contractors, industrial logistics',
      path: '/',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([{ name: 'Home', path: '/' }]),
          createFaqSchema(faqsEn),
          {
            '@type': 'WebSite',
            '@id': `${BASE_URL}/#website`,
            url: BASE_URL,
            name: 'Orma Logistics',
            description: 'Turnkey heavy machinery rental, worker transportation, and industrial logistics in Mexico.',
            publisher: { '@id': `${BASE_URL}/#organization` },
            inLanguage: ['en-US', 'es-MX'],
          },
        ],
      },
    },
  },

  servicios: {
    es: {
      title: 'Servicios de Logística, Renta de Maquinaria y Pipas | Orma Logistics',
      description: 'Catálogo completo de servicios industriales: Excavadoras, pipas de 10,000 y 20,000 litros, transporte de personal en autobuses y vans, y logística especializada.',
      keywords: 'servicios maquinaria pesada, renta de excavadoras, pipas de agua tratada, pipas agua potable construccion, transporte de obreros, fletes industriales, cimentaciones profundas',
      path: '/servicios',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/servicios' },
          ]),
          {
            '@type': 'ItemList',
            name: 'Catálogo de Servicios Industriales y de Construcción',
            description: 'Servicios especializados ofrecidos por Orma Logistics en México.',
            itemListElement: [
              {
                '@type': 'Service',
                position: 1,
                name: 'Renta de Maquinaria Pesada',
                serviceType: 'Alquiler de maquinaria para construcción',
                description: 'Renta de excavadoras de oruga, retroexcavadoras, motoconformadoras y tractores con operadores certificados.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'México' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 2,
                name: 'Pipas de Agua de 10,000 y 20,000 Litros',
                serviceType: 'Suministro de agua para construcción',
                description: 'Pipas cisterna para terracerías, compactación de suelos y suministro de agua potable y tratada en obra.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'México' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 3,
                name: 'Transporte de Personal en Obra',
                serviceType: 'Transporte corporativo y de cuadrillas',
                description: 'Flota de autobuses y vans ejecutivas con chofer profesional y aire acondicionado para cuadrillas y personal técnico.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'México' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 4,
                name: 'Logística y Fletes Industriales',
                serviceType: 'Transporte de carga pesada',
                description: 'Transporte de materiales a granel, plataformas lowboy para traslado de maquinaria y distribución en ruta.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'México' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 5,
                name: 'Equipos Especializados para la Construcción',
                serviceType: 'Renta de equipo auxiliar',
                description: 'Torres de iluminación, plantas de luz diésel, rodillos compactadores y compresores industriales.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'México' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 6,
                name: 'Ingeniería en Estructuras, Cimentación y Pilotaje',
                serviceType: 'Servicios geotécnicos y cimentaciones profundas',
                description: 'Perforación de pilas cortas, pilotaje profundo y estudios certificados de mecánica de suelos.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'México' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 7,
                name: 'Refacciones Diésel y Mantenimiento de Maquinaria',
                serviceType: 'Soporte mecánico en sitio',
                description: 'Venta de refacciones diésel, mantenimiento preventivo y correctivo de tractocamiones y maquinaria pesada.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'México' },
                url: `${BASE_URL}/servicios`,
              },
            ],
          },
        ],
      },
    },
    en: {
      title: 'Industrial Logistics & Heavy Machinery Services | Orma Logistics',
      description: 'Comprehensive industrial services: Excavators, 10,000 & 20,000L water tank trucks, personnel bus & van transportation, and specialized project logistics.',
      keywords: 'heavy equipment rental, industrial logistics services, construction water tankers, personnel transportation bus, machinery fleet mexico',
      path: '/servicios',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/servicios' },
          ]),
          {
            '@type': 'ItemList',
            name: 'Industrial & Construction Services Catalogue',
            description: 'Turnkey industrial and construction services provided by Orma Logistics across Mexico.',
            itemListElement: [
              {
                '@type': 'Service',
                position: 1,
                name: 'Heavy Machinery Rental',
                serviceType: 'Construction equipment rental',
                description: 'Crawler excavators, backhoes, motor graders, and bulldozers with certified operators.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Mexico' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 2,
                name: 'Water Tank Trucks (10k & 20k Liters)',
                serviceType: 'Construction water supply',
                description: 'Tank trucks for earthwork compaction, dust control, and certified potable and non-potable water supply.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Mexico' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 3,
                name: 'Jobsite Personnel Transportation',
                serviceType: 'Workforce commuting and shuttle services',
                description: 'Modern passenger buses and executive vans with certified drivers and AC for construction crews.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Mexico' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 4,
                name: 'Industrial Logistics & Freight',
                serviceType: 'Heavy haul and freight logistics',
                description: 'Lowboy heavy transport trailers, bulk materials hauling, and dedicated route distribution.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Mexico' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 5,
                name: 'Specialized Construction Equipment',
                serviceType: 'Auxiliary jobsite equipment',
                description: 'Mobile lighting towers, diesel power generators, soil compactors, and industrial compressors.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Mexico' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 6,
                name: 'Deep Foundations, Piling & Soil Mechanics',
                serviceType: 'Geotechnical and foundation engineering',
                description: 'Drilled short pile foundations, deep piling, and certified soil mechanics laboratory testing.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Mexico' },
                url: `${BASE_URL}/servicios`,
              },
              {
                '@type': 'Service',
                position: 7,
                name: 'Diesel Spare Parts & Equipment Maintenance',
                serviceType: 'On-site maintenance and parts supply',
                description: 'Heavy diesel engine replacement parts, preventive and corrective maintenance on-site.',
                provider: { '@id': `${BASE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Mexico' },
                url: `${BASE_URL}/servicios`,
              },
            ],
          },
        ],
      },
    },
  },

  proyectos: {
    es: {
      title: 'Proyectos y Obras de Infraestructura | Tren Maya | Orma Logistics',
      description: 'Descubre nuestra participación en obras de infraestructura clave: Tramos 4 y 5 del Tren Maya, cimentaciones profundas, mecánica de suelos y transporte en el sureste.',
      keywords: 'proyectos orma logistics, tren maya contratistas, tramo 4 tren maya, tramo 5 tren maya, cimentaciones profundas pilas, mecanica de suelos',
      path: '/proyectos',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Proyectos', path: '/proyectos' },
          ]),
          {
            '@type': 'ItemList',
            name: 'Proyectos y Casos de Éxito en Infraestructura',
            description: 'Participación destacada de Orma Logistics en obras de envergadura nacional.',
            itemListElement: [
              {
                '@type': 'CreativeWork',
                position: 1,
                name: 'Tren Maya - Tramos 4 y 5',
                description: 'Despliegue integral de maquinaria pesada, suministro continuo de agua con pipas y transporte diario de cuadrillas de obreros para el proyecto ferroviario más relevante del sureste de México.',
                locationCreated: {
                  '@type': 'Place',
                  name: 'Yucatán y Quintana Roo, México',
                },
              },
              {
                '@type': 'CreativeWork',
                position: 2,
                name: 'Cimentaciones a base de Pilas Cortas',
                description: 'Perforación de pilotes profundos, colocación de acero de refuerzo y colado de concreto en suelos kársticos y estratos rocosos de la península.',
                locationCreated: {
                  '@type': 'Place',
                  name: 'Península de Yucatán, México',
                },
              },
              {
                '@type': 'CreativeWork',
                position: 3,
                name: 'Estudios Certificados de Mecánica de Suelos',
                description: 'Sondeos geotécnicos, muestreos inalterados y cálculo de capacidad de carga para edificaciones e infraestructura vial e industrial.',
                locationCreated: {
                  '@type': 'Place',
                  name: 'Sureste y Centro de México',
                },
              },
            ],
          },
        ],
      },
    },
    en: {
      title: 'Major Infrastructure Projects | Maya Train | Orma Logistics',
      description: 'Explore our track record in landmark projects: Maya Train Sections 4 & 5, deep pile foundation works, certified soil studies, and heavy machinery support.',
      keywords: 'infrastructure projects mexico, maya train sections 4 5, deep foundation contractors, soil studies, orma logistics projects',
      path: '/proyectos',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/proyectos' },
          ]),
          {
            '@type': 'ItemList',
            name: 'Major Infrastructure Projects Portfolio',
            description: 'Flagship infrastructure works and engineering executed by Orma Logistics in Mexico.',
            itemListElement: [
              {
                '@type': 'CreativeWork',
                position: 1,
                name: 'Maya Train Project - Sections 4 & 5',
                description: 'Comprehensive heavy machinery deployment, continuous water supply tankers, and daily workforce transport for Mexico’s premier railway infrastructure venture.',
                locationCreated: {
                  '@type': 'Place',
                  name: 'Yucatan & Quintana Roo, Mexico',
                },
              },
              {
                '@type': 'CreativeWork',
                position: 2,
                name: 'Short Drilled Pile Foundation Systems',
                description: 'Deep bored pile drilling, steel cage positioning, and concrete pouring in challenging karst and limestone terrain.',
                locationCreated: {
                  '@type': 'Place',
                  name: 'Yucatan Peninsula, Mexico',
                },
              },
              {
                '@type': 'CreativeWork',
                position: 3,
                name: 'Certified Geotechnical Soil Studies',
                description: 'Geotechnical boring, undisturbed sampling, and structural bearing capacity calculations for commercial and industrial developments.',
                locationCreated: {
                  '@type': 'Place',
                  name: 'Central and Southeastern Mexico',
                },
              },
            ],
          },
        ],
      },
    },
  },

  nosotros: {
    es: {
      title: 'Sobre Nosotros | Más de 30 Años de Trayectoria | Orma Logistics',
      description: 'Fundada en 1992, Orma Logistics combina innovación, excelencia y seguridad brindando maquinaria pesada, transporte y logística en Quintana Roo, Yucatán y Querétaro.',
      keywords: 'sobre orma logistics, historia orma logistics, empresa logistica queretaro quintana roo yucatan, valores empresariales maquinaria',
      path: '/nosotros',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Nosotros', path: '/nosotros' },
          ]),
          {
            '@type': 'AboutPage',
            '@id': `${BASE_URL}/nosotros#webpage`,
            url: `${BASE_URL}/nosotros`,
            name: 'Sobre Orma Logistics - Historia, Valores y Misión',
            mainEntity: {
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              name: 'Orma Logistics',
              foundingDate: '1992',
              description: 'Empresa mexicana líder con más de 30 años de experiencia brindando servicios integrales de maquinaria pesada, transporte de personal, pipas de agua y logística.',
            },
          },
        ],
      },
    },
    en: {
      title: 'About Us | Over 30 Years of Industry Excellence | Orma Logistics',
      description: 'Founded in 1992, Orma Logistics delivers reliability, efficiency, and excellence in heavy machinery, logistics, and personnel transport across Mexico.',
      keywords: 'about orma logistics, heavy machinery history mexico, industrial logistics company, logistics contractors',
      path: '/nosotros',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/nosotros' },
          ]),
          {
            '@type': 'AboutPage',
            '@id': `${BASE_URL}/nosotros#webpage`,
            url: `${BASE_URL}/nosotros`,
            name: 'About Orma Logistics - History, Values and Mission',
            mainEntity: {
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              name: 'Orma Logistics',
              foundingDate: '1992',
              description: 'Mexican logistics leader with over 30 years of excellence providing heavy equipment rentals, workforce transportation, and industrial support.',
            },
          },
        ],
      },
    },
  },

  contacto: {
    es: {
      title: 'Contacto y Cotizaciones de Maquinaria y Transporte | Orma Logistics',
      description: 'Solicita tu cotización inmediata para renta de maquinaria, pipas o transporte. Atención por WhatsApp y teléfono (+52 442 799 9440). Oficinas en 4 ciudades.',
      keywords: 'contacto orma logistics, cotizar renta maquinaria, telefono orma logistics, whatsapp orma logistics, oficinas queretaro playa del carmen valladolid merida',
      path: '/contacto',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Contacto', path: '/contacto' },
          ]),
          {
            '@type': 'ContactPage',
            '@id': `${BASE_URL}/contacto#webpage`,
            url: `${BASE_URL}/contacto`,
            name: 'Contacto y Cotizaciones de Orma Logistics',
            mainEntity: {
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              name: 'Orma Logistics',
              telephone: '+524427999440',
              email: 'contacto@ormalogistics.com',
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+524427999440',
                  contactType: 'sales',
                  areaServed: 'MX-QUE',
                  availableLanguage: ['es', 'en'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+529848040244',
                  contactType: 'sales',
                  areaServed: 'MX-ROO',
                  availableLanguage: ['es', 'en'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+529999009778',
                  contactType: 'sales',
                  areaServed: 'MX-YUC',
                  availableLanguage: ['es', 'en'],
                },
              ],
            },
          },
        ],
      },
    },
    en: {
      title: 'Contact & Quote Requests | Machinery & Logistics | Orma Logistics',
      description: 'Request an immediate quote for machinery rental, water tankers, or personnel transport. Direct phone & WhatsApp (+52 442 799 9440). 4 branches in Mexico.',
      keywords: 'contact orma logistics, machinery rental quote, whatsapp orma logistics, orma branches mexico',
      path: '/contacto',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Contact Us', path: '/contacto' },
          ]),
          {
            '@type': 'ContactPage',
            '@id': `${BASE_URL}/contacto#webpage`,
            url: `${BASE_URL}/contacto`,
            name: 'Contact & Quotes - Orma Logistics',
            mainEntity: {
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              name: 'Orma Logistics',
              telephone: '+524427999440',
              email: 'contacto@ormalogistics.com',
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+524427999440',
                  contactType: 'sales',
                  areaServed: 'MX-QUE',
                  availableLanguage: ['en', 'es'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+529848040244',
                  contactType: 'sales',
                  areaServed: 'MX-ROO',
                  availableLanguage: ['en', 'es'],
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+529999009778',
                  contactType: 'sales',
                  areaServed: 'MX-YUC',
                  availableLanguage: ['en', 'es'],
                },
              ],
            },
          },
        ],
      },
    },
  },

  transportePersonal: {
    es: {
      title: 'Transporte de Personal para Empresas y Obras en México | Orma Logistics',
      description: 'Servicio puntual de transporte de personal en autobuses y vans con chofer certificado. Cobertura en Querétaro, Mérida, Cancún, Playa del Carmen y Valladolid.',
      keywords: 'transporte de personal para empresas, vans con chofer queretaro, transporte de personal cancun, transporte de personal playa del carmen, transporte de obreros obra, renta de autobuses con chofer',
      path: '/transporte-de-personal',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Transporte de Personal', path: '/transporte-de-personal' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/transporte-de-personal#service`,
            name: 'Transporte de Personal para Empresas y Obras',
            serviceType: 'Transporte corporativo y de personal',
            provider: { '@id': `${BASE_URL}/#organization` },
            areaServed: ['Querétaro', 'Yucatán', 'Quintana Roo'],
            description: 'Flota moderna de autobuses y vans climatizadas con choferes certificados para traslado de trabajadores y cuadrillas.',
          },
        ],
      },
    },
    en: {
      title: 'Worker Transportation Services for Companies & Construction in Mexico | Orma',
      description: 'Reliable worker and corporate bus & van transportation with certified drivers. Operating in Queretaro, Merida, Cancun, and Playa del Carmen.',
      keywords: 'worker transportation mexico, employee shuttle service, construction crew bus rental, van with driver cancun, corporate transport queretaro',
      path: '/transporte-de-personal',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Worker Transportation', path: '/transporte-de-personal' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/transporte-de-personal#service`,
            name: 'Worker & Corporate Transportation',
            serviceType: 'Employee Shuttle Service',
            provider: { '@id': `${BASE_URL}/#organization` },
            description: 'Modern vans and buses with certified drivers for industrial, hotel, and construction crews.',
          },
        ],
      },
    },
  },

  maquinariaPesada: {
    es: {
      title: 'Renta de Maquinaria Pesada para Construcción en México | Orma Logistics',
      description: 'Excavadoras de oruga, retroexcavadoras, motoconformadoras, bulldozers y rodillos compactadores con soporte técnico en sitio en Sureste y Bajío.',
      keywords: 'renta de maquinaria pesada, renta de excavadoras queretaro, motoconformadoras merida, retroexcavadoras playa del carmen, flete de maquinaria lowboy, maquinaria para terracerias',
      path: '/renta-de-maquinaria-pesada',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Renta de Maquinaria Pesada', path: '/renta-de-maquinaria-pesada' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/renta-de-maquinaria-pesada#service`,
            name: 'Renta de Maquinaria Pesada',
            serviceType: 'Alquiler de maquinaria pesada para construcción',
            provider: { '@id': `${BASE_URL}/#organization` },
            areaServed: ['Querétaro', 'Yucatán', 'Quintana Roo'],
            description: 'Arrendamiento de excavadoras, retroexcavadoras, motoconformadoras y tractores con operadores certificados DC-3.',
          },
        ],
      },
    },
    en: {
      title: 'Heavy Equipment & Machinery Rental in Mexico | Orma Logistics',
      description: 'Excavators, backhoes, motor graders, bulldozers, and compactors available for rent with certified operators and on-site support.',
      keywords: 'heavy equipment rental mexico, excavator rental cancun, backhoe rental queretaro, bulldozer lease merida',
      path: '/renta-de-maquinaria-pesada',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Heavy Machinery Rental', path: '/renta-de-maquinaria-pesada' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/renta-de-maquinaria-pesada#service`,
            name: 'Heavy Equipment Rental',
            serviceType: 'Construction Machinery Rental',
            provider: { '@id': `${BASE_URL}/#organization` },
            description: 'Top-tier heavy construction equipment rental with certified operators.',
          },
        ],
      },
    },
  },

  pipasAgua: {
    es: {
      title: 'Renta de Pipas de Agua 10,000 y 20,000 Litros para Obra | Orma Logistics',
      description: 'Suministro puntual de agua tratada y potable con barra de aspersión y motobomba para terracerías y obra civil en Playa del Carmen, Cancún, Mérida y Querétaro.',
      keywords: 'pipas de agua playa del carmen, pipas de agua cancun, pipas de agua 20000 litros terracerias, agua para construccion merida, pipas agua tratada queretaro',
      path: '/pipas-de-agua',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Pipas de Agua', path: '/pipas-de-agua' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/pipas-de-agua#service`,
            name: 'Suministro y Renta de Pipas de Agua',
            serviceType: 'Suministro de agua para construcción y terracerías',
            provider: { '@id': `${BASE_URL}/#organization` },
            areaServed: ['Quintana Roo', 'Yucatán', 'Querétaro'],
            description: 'Pipas cisterna de 10,000 y 20,000 litros con barra de aspersión para compactación y control de polvo en obra.',
          },
        ],
      },
    },
    en: {
      title: 'Water Tanker Truck Rental (10k & 20k Liters) for Construction | Orma Logistics',
      description: 'Treated and potable water delivery with spray bars and pumps for earthworks and construction in Playa del Carmen, Cancun, and Merida.',
      keywords: 'water truck rental mexico, 20000 liter water tanker cancun, compaction water truck playa del carmen',
      path: '/pipas-de-agua',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Water Tanker Trucks', path: '/pipas-de-agua' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/pipas-de-agua#service`,
            name: 'Water Tanker Truck Rental',
            serviceType: 'Construction Water Supply',
            provider: { '@id': `${BASE_URL}/#organization` },
            description: '10,000 & 20,000-liter water tanker trucks with spray bars for soil compaction and dust control.',
          },
        ],
      },
    },
  },

  rentaPlanas: {
    es: {
      title: 'Renta de Planas y Fletes en Chetumal, Bacalar y Península | Orma Logistics',
      description: 'Semirremolques de plataforma plana de 40 y 48 pies para fletes de acero, varilla y carga pesada hacia Chetumal, Bacalar, Mahahual, Tulum y toda la Península.',
      keywords: 'fletes en plana chetumal, renta de planas chetumal, fletes plana bacalar, fletes plataforma quintana roo, fletes plataforma chetumal merida, transporte de varilla y acero',
      path: '/renta-de-planas',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Inicio', path: '/' },
            { name: 'Renta de Planas', path: '/renta-de-planas' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/renta-de-planas#service`,
            name: 'Renta de Planas y Fletes en Chetumal y Península',
            serviceType: 'Transporte de carga pesada en plataforma plana',
            provider: { '@id': `${BASE_URL}/#organization` },
            areaServed: ['Chetumal', 'Bacalar', 'Quintana Roo', 'Yucatán', 'Campeche'],
            description: 'Fletes y renta de semirremolques de plataforma plana de 40 y 48 pies con tractocamión especializados en Chetumal, Bacalar y toda la Península de Yucatán.',
          },
        ],
      },
    },
    en: {
      title: 'Flatbed Trailer Rental (Planas) in Chetumal, Bacalar & Yucatan Peninsula | Orma',
      description: '40ft & 48ft flatbed trailers for structural steel, rebar, and heavy freight in Chetumal, Bacalar, Tulum, and across the Yucatan Peninsula.',
      keywords: 'flatbed trailer rental chetumal, heavy haul trucking bacalar, plana trailer rental quintana roo, yucatan peninsula flatbed freight',
      path: '/renta-de-planas',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          createBreadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Flatbed Trailers', path: '/renta-de-planas' },
          ]),
          {
            '@type': 'Service',
            '@id': `${BASE_URL}/renta-de-planas#service`,
            name: 'Flatbed Freight Transport in Chetumal & Southern Peninsula',
            serviceType: 'Heavy Flatbed Trucking',
            provider: { '@id': `${BASE_URL}/#organization` },
            areaServed: ['Chetumal', 'Bacalar', 'Quintana Roo', 'Yucatan', 'Campeche'],
            description: '40 & 48-foot flatbed trailer rentals for structural steel and heavy cargo specialized in Chetumal, Bacalar, and the Yucatan Peninsula.',
          },
        ],
      },
    },
  },
};
