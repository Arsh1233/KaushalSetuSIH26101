import type { CompetencyDefinition } from './types';

export const competencies: CompetencyDefinition[] = [
  // Statistical
  { id: 'survey-design', name: 'Survey Design', category: 'Statistical', description: 'Designing statistically sound household and enterprise surveys' },
  { id: 'sampling', name: 'Sampling Methods', category: 'Statistical', description: 'Probability and non-probability sampling techniques for large-scale surveys' },
  { id: 'data-quality', name: 'Data Quality & Validation', category: 'Statistical', description: 'Ensuring accuracy, completeness and consistency of statistical data' },
  { id: 'labour-statistics', name: 'Labour Statistics', category: 'Statistical', description: 'Employment, unemployment and labour force measurement methodologies' },
  { id: 'national-accounts', name: 'National Accounts', category: 'Statistical', description: 'GDP estimation, input-output analysis and national income accounting' },
  // Technical
  { id: 'python', name: 'Python for Statistical Analysis', category: 'Technical', description: 'Data processing, analysis and visualisation using Python and statistical libraries' },
  { id: 'r-lang', name: 'R Statistical Computing', category: 'Technical', description: 'Statistical modelling, data wrangling and visualisation in R' },
  { id: 'sql', name: 'SQL & Database Management', category: 'Technical', description: 'Querying, managing and optimising relational databases' },
  { id: 'data-viz', name: 'Data Visualisation', category: 'Technical', description: 'Communicating statistical insights through effective charts and dashboards' },
  { id: 'gis', name: 'GIS & Spatial Analysis', category: 'Technical', description: 'Geographic information systems for spatial data analysis and mapping' },
  // Digital Governance
  { id: 'cybersecurity', name: 'Cybersecurity Fundamentals', category: 'Digital Governance', description: 'Data security, privacy protection and cyber threat awareness' },
  { id: 'data-privacy', name: 'Data Privacy & Ethics', category: 'Digital Governance', description: 'Legal frameworks, anonymisation and ethical use of statistical data' },
  { id: 'cloud-computing', name: 'Cloud Computing', category: 'Digital Governance', description: 'Cloud infrastructure, data storage and government cloud platforms' },
  // Behavioural
  { id: 'leadership', name: 'Leadership & Management', category: 'Behavioural', description: 'Leading teams, driving performance and managing government projects' },
  { id: 'communication', name: 'Communication & Presentation', category: 'Behavioural', description: 'Communicating statistical findings to policy makers and the public' },
  { id: 'project-mgmt', name: 'Project Management', category: 'Behavioural', description: 'Planning, executing and monitoring statistical projects and programmes' },
];

export const getCompetencyById = (id: string) => competencies.find(c => c.id === id);
