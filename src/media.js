// Medios de stock con licencia libre (Unsplash License / Pexels License):
// uso comercial permitido, atribución no obligatoria. Créditos abajo y en public/media/CREDITOS.md.

// Rutas con la base del sitio (en GitHub Pages vive bajo /Landing-IR-CONSULTING/).
const u = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '');

export const media = {
  hero: {
    video: u('/media/hero.mp4'),
    poster: u('/media/hero-poster.webp'),
    alt: 'Amanecer sobre la bahía de Cartagena con la silueta de los edificios de Bocagrande y Castillogrande',
  },
  services: {
    estrategia: {
      src: u('/media/svc-estrategia-800.webp'),
      srcSet: `${u('/media/svc-estrategia-800.webp')} 800w, ${u('/media/svc-estrategia.webp')} 1600w`,
      alt: 'Junta directiva en una sala de reuniones mientras una ejecutiva presenta frente al tablero',
    },
    finanzas: {
      src: u('/media/svc-finanzas-800.webp'),
      srcSet: `${u('/media/svc-finanzas-800.webp')} 800w, ${u('/media/svc-finanzas.webp')} 1600w`,
      alt: 'Profesional analizando un tablero de indicadores financieros en su portátil',
    },
    recursos: {
      src: u('/media/svc-recursos-800.webp'),
      srcSet: `${u('/media/svc-recursos-800.webp')} 800w, ${u('/media/svc-recursos.webp')} 1600w`,
      alt: 'Calculadora sobre un informe con gráficas de presupuesto en un escritorio de oficina',
    },
    contabilidad: {
      src: u('/media/svc-contabilidad-800.webp'),
      srcSet: `${u('/media/svc-contabilidad-800.webp')} 800w, ${u('/media/svc-contabilidad.webp')} 1600w`,
      alt: 'Manos de un contador trabajando con calculadora y teclado en su escritorio',
    },
    control: {
      src: u('/media/svc-control-800.webp'),
      srcSet: `${u('/media/svc-control-800.webp')} 800w, ${u('/media/svc-control.webp')} 1600w`,
      alt: 'Mano marcando una lista de verificación en una tableta, símbolo de control y auditoría',
    },
    proyectos: {
      src: u('/media/svc-proyectos-800.webp'),
      srcSet: `${u('/media/svc-proyectos-800.webp')} 800w, ${u('/media/svc-proyectos.webp')} 1600w`,
      alt: 'Dos empresarios evaluando una propuesta de negocio en una tableta',
    },
  },
  contacto: {
    src: u('/media/contacto-800.webp'),
    srcSet: `${u('/media/contacto-800.webp')} 800w, ${u('/media/contacto.webp')} 1600w`,
    alt: 'Calle colonial de Cartagena con casas de colores y los edificios de Bocagrande al fondo',
  },
}

// Hero rotativo: lugares de Cartagena de Indias (orden recomendado). Máximo 4 clips (peso):
// hero-cartagena-2 (Centro histórico, 1,6 MB) quedó fuera del carrusel; sus archivos siguen en public/media.
export const heroReel = [
  {
    video: u('/media/hero.mp4'),
    poster: u('/media/hero-poster.webp'),
    alt: 'Amanecer sobre la bahía de Cartagena con la silueta de los edificios de Bocagrande y Castillogrande',
    place: 'Bahía de Cartagena',
  },
  {
    video: u('/media/hero-cartagena-1.mp4'),
    poster: u('/media/hero-cartagena-1-poster.webp'),
    alt: 'Calle colonial del centro histórico de Cartagena con balcones de madera, casas de colores y enredaderas',
    place: 'Ciudad amurallada',
  },
  {
    video: u('/media/hero-cartagena-3.mp4'),
    poster: u('/media/hero-cartagena-3-poster.webp'),
    alt: 'Vista aérea de las cúpulas de la iglesia de San Pedro Claver con la bahía y el skyline de Bocagrande al fondo',
    place: 'San Pedro Claver',
  },
  {
    video: u('/media/hero-cartagena-4.mp4'),
    poster: u('/media/hero-cartagena-4-poster.webp'),
    alt: 'Atardecer dorado sobre la bahía de Cartagena con el skyline de Bocagrande',
    place: 'Bocagrande al atardecer',
  },
]

export const credits = [
  { file: 'hero.mp4 / hero-poster.webp', author: 'José Andrés Gutiérrez García', source: 'Pexels', url: 'https://www.pexels.com/video/amanecer-cartagena-de-indias-colombia-15618305/', license: 'Pexels License' },
  { file: 'svc-estrategia.webp', author: 'Christina @ wocintechchat.com', source: 'Unsplash', url: 'https://unsplash.com/photos/people-on-conference-table-looking-at-talking-woman-Q80LYxv_Tbs', license: 'Unsplash License' },
  { file: 'svc-finanzas.webp', author: 'Campaign Creators', source: 'Unsplash', url: 'https://unsplash.com/photos/pypeCEaJeZY', license: 'Unsplash License' },
  { file: 'svc-recursos.webp', author: 'Jakub Żerdzicki', source: 'Unsplash', url: 'https://unsplash.com/photos/a-calculator-sitting-on-top-of-a-table-next-to-a-laptop-8wLZi9OhsWU', license: 'Unsplash License' },
  { file: 'svc-contabilidad.webp', author: 'Towfiqu barbhuiya', source: 'Unsplash', url: 'https://unsplash.com/photos/person-using-calculator-at-desk-with-coffee-mug-JhevWHCbVyw', license: 'Unsplash License' },
  { file: 'svc-control.webp', author: 'Jakub Żerdzicki', source: 'Unsplash', url: 'https://unsplash.com/photos/a-hand-marks-off-items-on-a-checklist-yKnIbJV0RbY', license: 'Unsplash License' },
  { file: 'svc-proyectos.webp', author: 'Docusign', source: 'Unsplash', url: 'https://unsplash.com/photos/man-in-blue-dress-shirt-beside-man-in-white-dress-shirt-7RWBSYA9Rro', license: 'Unsplash License' },
  { file: 'contacto.webp', author: 'Leandro Loureiro', source: 'Unsplash', url: 'https://unsplash.com/photos/cars-parked-in-front-of-green-and-white-concrete-building-during-daytime-J0suKy48jfk', license: 'Unsplash License' },
  { file: 'hero-cartagena-1.mp4 / hero-cartagena-1-poster.webp', author: 'Enrique', source: 'Pexels', url: 'https://www.pexels.com/video/aerial-historic-drone-colombia-3940070/', license: 'Pexels License' },
  { file: 'hero-cartagena-2.mp4 / hero-cartagena-2-poster.webp', author: 'Enrique', source: 'Pexels', url: 'https://www.pexels.com/video/drone-footage-of-cartagena-city-3940064/', license: 'Pexels License' },
  { file: 'hero-cartagena-3.mp4 / hero-cartagena-3-poster.webp', author: 'Enrique', source: 'Pexels', url: 'https://www.pexels.com/video/aerial-historic-drone-colombia-3940061/', license: 'Pexels License' },
  { file: 'hero-cartagena-4.mp4 / hero-cartagena-4-poster.webp', author: 'Luis Adolfo Burgos', source: 'Pexels', url: 'https://www.pexels.com/video/colombia-atardecer-botes-centrohistorico-4299532/', license: 'Pexels License' },
]
