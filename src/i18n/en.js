// Versión en inglés de src/data.js: MISMA forma de datos, mismos ids/iconos/contacto.
// Traducción fiel al portafolio (no añadir datos). Si cambia data.js, actualizar aquí también.
import * as es from '../data.js';

export const brand = {
  ...es.brand,
  tagline: 'Strategic and financial consulting',
  headline: ['Strategy that transforms.', 'Finance that creates value.'],
  rotating: [
    'Finance that creates value.',
    'Clarity to decide.',
    'Discipline to execute.',
    'Information to create value.',
    'Growth with control.',
  ],
  audiences: ['business owners', 'executives', 'boards of directors'],
  summary:
    'A boutique executive consulting firm. Comprehensive solutions to strengthen the leadership, profitability and sustainability of your company.',
  city: 'Cartagena · Caribbean region',
};

export const nav = [
  { id: 'servicios', label: 'Services' },
  { id: 'metodologia', label: 'Approach' },
  { id: 'liderazgo', label: 'Leadership' },
  { id: 'diferenciales', label: 'Why us' },
  { id: 'identidad', label: 'Identity' },
  { id: 'contacto', label: 'Contact' },
];

export const firm = {
  title: 'Consulting with a leadership perspective',
  subtitle: 'A comprehensive view of the challenges your company faces, from strategy to execution.',
  who: 'IR Consulting is a boutique firm specializing in strategic management, financial management and organizational strengthening. It was founded to support business owners, executives and boards of directors in high-impact decisions.',
  value: 'We combine executive experience, financial analysis and knowledge of business processes to develop tailored solutions. We don’t stop at diagnosis: we design action plans, support their implementation and measure progress.',
  commitment: 'Clarity to decide. Discipline to execute. Information to create value.',
};

export const identity = {
  title: 'Our business philosophy',
  subtitle: 'Trust is built on technical judgment, integrity and results.',
  mission: 'To strengthen the strategic, financial and administrative management of organizations through comprehensive solutions that optimize resources, improve competitiveness and contribute to the sustainable creation of value.',
  vision: 'To become a business consulting firm recognized in Cartagena and the Caribbean region for the quality of its solutions, the trust of its clients and its contribution to business growth, with a national reach.',
  values: ['Integrity and confidentiality', 'Professional excellence', 'Strategic thinking', 'Practical innovation', 'Transparency', 'Commitment to our clients'],
};

export const leader = {
  ...es.leader,
  role: 'Founder and Lead Consultant',
  bio: 'Certified Public Accountant, Specialist in Finance and Master of Business Administration (MBA) from Universidad Tecnológica de Bolívar, with more than 25 years of professional experience.',
  stats: [
    { value: '25+', label: 'years of experience' },
    { value: '6', label: 'service lines' },
    { value: '7', label: 'industries of experience' },
  ],
  career: 'Experience in general management, administrative and financial management, financial leadership, comptrollership, treasury, strategic planning and management advisory. She has led teams and processes in reorganization, budget control, costing, management systems and financial structuring.',
  sectors: ['Healthcare', 'Energy', 'Public utilities', 'Industry and mining', 'Construction and real estate', 'Private security', 'Services and retail'],
  quote: 'A comprehensive perspective that connects finance with operations, people, strategy and results.',
};

const svc = Object.fromEntries(es.services.map((s) => [s.id, s]));
const base = (id) => ({ id, icon: svc[id].icon });

export const services = [
  {
    ...base('estrategia'), area: 'Strategic services',
    title: 'Strategy and business transformation',
    lead: 'We set the direction and strengthen your ability to execute.',
    items: ['Strategic, financial and organizational assessment.', 'Development and updating of strategic plans.', 'Design of objectives, KPIs and management dashboards.', 'Administrative and financial reorganization.', 'Organizational structures, roles and responsibilities.', 'Optimization of processes, policies and controls.', 'Executive support to management teams and boards of directors.'],
    noteTitle: 'Value for the client',
    note: 'Clear priorities, defined responsibilities, better processes and a viable roadmap for growth with control.',
  },
  {
    ...base('finanzas'), area: 'Financial services',
    title: 'Financial leadership and corporate finance',
    lead: 'Financial information turned into smart decisions.',
    items: ['Outsourced financial management (Outsourced CFO).', 'Assessment of profitability, liquidity, solvency and leverage.', 'Financial models, projections and scenario analysis.', 'Working capital management and financing needs.', 'Preparation of information for financial institutions.', 'Evaluation of investment and financing alternatives.', 'Executive financial reports for senior management.'],
    noteTitle: 'Value for the client',
    note: 'Greater financial visibility, risk control and data-driven decisions.',
  },
  {
    ...base('recursos'), area: 'Resource control',
    title: 'Budgeting, costing and treasury',
    lead: 'Planning and financial discipline to protect liquidity.',
    items: ['Master, operating and financial budgets.', 'Projected and actual cash flows.', 'Payment scheduling and treasury policies.', 'Budget monitoring and variance analysis.', 'Process-based and cost-center costing systems.', 'Profitability by product, service or business unit.', 'Break-even analysis and cash cycle optimization.', 'Assessment and clean-up of accounts payable.'],
    noteTitle: 'Value for the client',
    note: 'Better use of cash, anticipation of needs and an understanding of the true costs of the business.',
  },
  {
    ...base('contabilidad'), area: 'Specialized services',
    title: 'Accounting, IFRS and tax management',
    lead: 'Reliable information to comply, control and decide.',
    items: ['Advisory, supervision and organization of accounting processes.', 'Accounting outsourcing and support with period-end closings.', 'Preparation and analysis of financial statements.', 'IFRS implementation and application.', 'Assessment and clean-up of accounting records.', 'Tax planning and compliance.', 'Third-party information reporting (exógena) to DIAN and support with accounting requirements.'],
    noteTitle: 'Delivery model',
    note: 'Engagements will be performed or validated by professionals holding the required credentials, according to the nature of the service. The scope will be defined in each proposal.',
  },
  {
    ...base('control'), area: 'Governance and processes',
    title: 'Internal control and management systems',
    lead: 'Sound processes to reduce risk and improve results.',
    items: ['Assessment of administrative and financial internal control.', 'Risk identification and design of control matrices.', 'Documentation of policies, manuals and procedures.', 'Definition of KPIs and follow-up on action plans.', 'Process standardization and improvement.', 'Support with ISO 9001 quality management systems.', 'Organizational readiness for internal audits.'],
    noteTitle: 'Value for the client',
    note: 'Greater traceability, clear responsibilities and control mechanisms suited to your operations.',
  },
  {
    ...base('proyectos'), area: 'Investment and growth',
    title: 'Projects and business development',
    lead: 'We evaluate opportunities before resources are committed.',
    items: ['Structuring of business plans and models.', 'Financial viability and feasibility studies.', 'Projections of revenue, costs, expenses and investments.', 'Evaluation using NPV, IRR and payback period.', 'Sensitivity, scenario and risk analysis.', 'Financial models for funding applications.', 'Financial support for new ventures.'],
    noteTitle: 'Network of specialists',
    note: 'When a project requires it, we bring in partner professionals in legal, tax, engineering, technology and organizational management matters, with clearly defined technical responsibilities.',
  },
];

export const method = {
  title: 'A results-driven approach',
  subtitle: 'Every project is carried out with agreed objectives, owners and deliverables.',
  steps: [
    { n: '01', title: 'Assess', text: 'Understand the business, its needs, its data and its main risks.' },
    { n: '02', title: 'Design', text: 'Define alternatives, priorities, scope and an action plan.' },
    { n: '03', title: 'Implement', text: 'Support execution and bring in specialists when needed.' },
    { n: '04', title: 'Measure', text: 'Review KPIs, progress, findings and next decisions.' },
  ],
};

export const why = [
  'Executive experience applied to real business challenges.',
  'A comprehensive view of strategy, finance and operations.',
  'Tailored solutions and executive support.',
  'A multidisciplinary network of specialized professionals.',
  'A focus on results, confidentiality and value creation.',
];
