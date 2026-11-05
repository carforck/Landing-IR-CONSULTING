// Fuente única de contenido: transcrito de docs/IR_Consulting_Portafolio_Corporativo.pdf (2026).
// No inventar datos (teléfonos, clientes, cifras) que no estén en el portafolio (docs/, insumo de referencia; no se publica).
export const brand = {
  name: 'IR Consulting',
  owner: 'Isabel Rodríguez',
  tagline: 'Consultoría estratégica y financiera',
  headline: ['Estrategia que transforma.', 'Finanzas que generan valor.'],
  // Frases rotativas del hero: todas tomadas del portafolio (lema, compromiso y promesas de servicio).
  rotating: [
    'Finanzas que generan valor.',
    'Claridad para decidir.',
    'Disciplina para ejecutar.',
    'Información para generar valor.',
    'Crecer con control.',
  ],
  // Frases rotativas: máx. ~31 caracteres para que la reserva de altura del hero sea estable.
  // "Nace para acompañar a empresarios, gerentes y juntas directivas en decisiones de alto impacto."
  audiences: ['empresarios', 'gerentes', 'juntas directivas'],
  summary:
    'Firma boutique de consultoría ejecutiva. Soluciones integrales para fortalecer la dirección, rentabilidad y sostenibilidad de las empresas.',
  city: 'Cartagena · Región Caribe',
  // Teléfono/WhatsApp confirmado por el usuario (2026-11-04). Correo: pendiente.
  contact: { email: '', phone: '+57 301 592 8067', whatsapp: '573015928067' },
};

export const nav = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'liderazgo', label: 'Liderazgo' },
  { id: 'diferenciales', label: 'Diferenciales' },
  { id: 'identidad', label: 'Identidad' },
  { id: 'contacto', label: 'Contacto' },
];

export const firm = {
  title: 'Consultoría con visión de dirección',
  subtitle: 'Una mirada integral a los retos de la empresa, desde la estrategia hasta la ejecución.',
  who: 'IR Consulting es una propuesta de firma boutique especializada en dirección estratégica, gestión financiera y fortalecimiento organizacional. Nace para acompañar a empresarios, gerentes y juntas directivas en decisiones de alto impacto.',
  value: 'Integramos experiencia directiva, análisis financiero y conocimiento de procesos empresariales para desarrollar soluciones personalizadas. No nos limitamos a diagnosticar: diseñamos rutas de acción, acompañamos su implementación y medimos avances.',
  commitment: 'Claridad para decidir. Disciplina para ejecutar. Información para generar valor.',
};

export const identity = {
  title: 'Nuestra filosofía empresarial',
  subtitle: 'La confianza se construye con criterio técnico, integridad y resultados.',
  mission: 'Fortalecer la gestión estratégica, financiera y administrativa de las organizaciones mediante soluciones integrales que optimicen recursos, mejoren la competitividad y contribuyan a la generación sostenible de valor.',
  vision: 'Consolidarnos como una firma de consultoría empresarial reconocida en Cartagena y la región Caribe por la calidad de sus soluciones, la confianza de sus clientes y su contribución al crecimiento empresarial, con proyección nacional.',
  values: ['Integridad y confidencialidad', 'Excelencia profesional', 'Pensamiento estratégico', 'Innovación práctica', 'Transparencia', 'Compromiso con el cliente'],
};

export const leader = {
  name: 'Isabel Olivia Rodríguez González',
  role: 'Fundadora y consultora líder',
  // PENDIENTE: la cliente enviará su retrato; si no existe, el componente muestra un monograma.
  photo: import.meta.env.BASE_URL + 'img/isabel.jpg',
  bio: 'Contadora Pública, Especialista en Finanzas y Magíster en Administración y Gerencia (MBA) de la Universidad Tecnológica de Bolívar, con más de 25 años de trayectoria profesional.',
  stats: [
    { value: '25+', label: 'años de trayectoria' },
    { value: '6', label: 'líneas de servicio' },
    { value: '7', label: 'sectores de experiencia' },
  ],
  career: 'Experiencia en gerencia general, gerencia administrativa y financiera, dirección financiera, contraloría, tesorería, planeación estratégica y asesoría gerencial. Ha liderado equipos y procesos de reorganización, control presupuestal, costeo, sistemas de gestión y estructuración financiera.',
  sectors: ['Salud', 'Energía', 'Servicios públicos', 'Industria y minería', 'Construcción e inmobiliario', 'Seguridad privada', 'Servicios y comercio'],
  quote: 'Una perspectiva integral que conecta las finanzas con la operación, las personas, la estrategia y los resultados.',
};

// icon = nombre de componente en lucide-react
export const services = [
  {
    id: 'estrategia', icon: 'Compass', area: 'Servicios estratégicos',
    title: 'Estrategia y transformación empresarial',
    lead: 'Definimos el rumbo y fortalecemos la capacidad de ejecución.',
    items: ['Diagnóstico estratégico, financiero y organizacional.', 'Formulación y actualización de planes estratégicos.', 'Diseño de objetivos, indicadores y tableros de gestión.', 'Reorganización administrativa y financiera.', 'Estructuras organizacionales, funciones y responsabilidades.', 'Optimización de procesos, políticas y controles.', 'Acompañamiento ejecutivo a gerencias y juntas directivas.'],
    noteTitle: 'Valor para el cliente',
    note: 'Prioridades claras, responsabilidades definidas, mejores procesos y una hoja de ruta viable para crecer con control.',
  },
  {
    id: 'finanzas', icon: 'LineChart', area: 'Servicios financieros',
    title: 'Dirección financiera y finanzas corporativas',
    lead: 'Información financiera convertida en decisiones inteligentes.',
    items: ['Gerencia financiera externa (CFO externo).', 'Diagnóstico de rentabilidad, liquidez, solvencia y endeudamiento.', 'Modelos financieros, proyecciones y análisis de escenarios.', 'Gestión de capital de trabajo y necesidades de financiación.', 'Preparación de información para entidades financieras.', 'Evaluación de alternativas de inversión y financiación.', 'Informes financieros ejecutivos para la alta dirección.'],
    noteTitle: 'Valor para el cliente',
    note: 'Mayor visibilidad financiera, control de riesgos y decisiones sustentadas en datos.',
  },
  {
    id: 'recursos', icon: 'Wallet', area: 'Control de recursos',
    title: 'Presupuestos, costos y tesorería',
    lead: 'Planeación y disciplina financiera para proteger la liquidez.',
    items: ['Presupuestos maestros, operativos y financieros.', 'Flujos de caja proyectados y ejecutados.', 'Programación de pagos y políticas de tesorería.', 'Seguimiento presupuestal y análisis de desviaciones.', 'Sistemas de costeo por procesos y centros de costos.', 'Rentabilidad por producto, servicio o unidad de negocio.', 'Punto de equilibrio y optimización del ciclo de caja.', 'Diagnóstico y normalización de cuentas por pagar.'],
    noteTitle: 'Valor para el cliente',
    note: 'Mejor uso del efectivo, anticipación de necesidades y conocimiento de los costos reales del negocio.',
  },
  {
    id: 'contabilidad', icon: 'FileSpreadsheet', area: 'Servicios especializados',
    title: 'Contabilidad, NIIF y gestión tributaria',
    lead: 'Información confiable para cumplir, controlar y decidir.',
    items: ['Asesoría, supervisión y organización de procesos contables.', 'Outsourcing contable y acompañamiento a cierres.', 'Preparación y análisis de estados financieros.', 'Implementación y aplicación de NIIF.', 'Diagnóstico y saneamiento de registros contables.', 'Planeación y cumplimiento de obligaciones tributarias.', 'Información exógena y soporte a requerimientos contables.'],
    noteTitle: 'Modelo de prestación',
    note: 'Los encargos serán ejecutados o validados por profesionales con las habilitaciones requeridas, según la naturaleza del servicio. El alcance se definirá en cada propuesta.',
  },
  {
    id: 'control', icon: 'ShieldCheck', area: 'Gobierno y procesos',
    title: 'Control interno y sistemas de gestión',
    lead: 'Procesos sólidos para reducir riesgos y mejorar resultados.',
    items: ['Diagnóstico de control interno administrativo y financiero.', 'Identificación de riesgos y diseño de matrices de control.', 'Documentación de políticas, manuales y procedimientos.', 'Definición de indicadores y seguimiento a planes de acción.', 'Estandarización y mejora de procesos.', 'Acompañamiento en sistemas de gestión de calidad ISO 9001.', 'Preparación organizacional para auditorías internas.'],
    noteTitle: 'Valor para el cliente',
    note: 'Mayor trazabilidad, responsabilidades claras y mecanismos de control acordes con la operación.',
  },
  {
    id: 'proyectos', icon: 'TrendingUp', area: 'Inversión y crecimiento',
    title: 'Proyectos y desarrollo de negocios',
    lead: 'Evaluamos oportunidades antes de comprometer recursos.',
    items: ['Estructuración de planes y modelos de negocio.', 'Estudios de viabilidad y factibilidad financiera.', 'Proyecciones de ingresos, costos, gastos e inversiones.', 'Evaluación mediante VPN, TIR y período de recuperación.', 'Análisis de sensibilidad, escenarios y riesgos.', 'Modelos financieros para solicitudes de financiación.', 'Acompañamiento financiero a nuevos emprendimientos.'],
    noteTitle: 'Red de especialistas',
    note: 'Cuando el proyecto lo requiera, incorporamos profesionales aliados en asuntos jurídicos, tributarios, ingeniería, tecnología y gestión organizacional, con responsabilidades técnicas definidas.',
  },
];

export const method = {
  title: 'Una metodología orientada a resultados',
  subtitle: 'Cada proyecto se desarrolla con objetivos, responsables y entregables acordados.',
  steps: [
    { n: '01', title: 'Diagnosticar', text: 'Entender el negocio, sus necesidades, datos y principales riesgos.' },
    { n: '02', title: 'Diseñar', text: 'Definir alternativas, prioridades, alcance y plan de acción.' },
    { n: '03', title: 'Implementar', text: 'Acompañar la ejecución y articular especialistas cuando se requiera.' },
    { n: '04', title: 'Medir', text: 'Revisar indicadores, avances, hallazgos y siguientes decisiones.' },
  ],
};

export const why = [
  'Experiencia directiva aplicada a desafíos empresariales reales.',
  'Visión integral de estrategia, finanzas y operación.',
  'Soluciones personalizadas y acompañamiento ejecutivo.',
  'Red multidisciplinaria de profesionales especializados.',
  'Enfoque en resultados, confidencialidad y generación de valor.',
];
