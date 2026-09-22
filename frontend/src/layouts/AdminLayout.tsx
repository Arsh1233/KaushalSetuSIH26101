import Shell from './Shell';
import type { NavGroup } from './Shell';

const ADMIN_NAV: NavGroup[] = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', labelHi: 'डैशबोर्ड', href: '/admin/overview', icon: '⊞' },
      { label: 'Workforce Intelligence', labelHi: 'कार्यबल', href: '/admin/workforce', icon: '👥' },
    ],
  },
  {
    section: 'Organization',
    items: [
      { label: 'Users', labelHi: 'उपयोगकर्ता', href: '/admin/users', icon: '👤' },
      { label: 'Departments', labelHi: 'विभाग', href: '/admin/departments', icon: '🏢' },
      { label: 'Roles & Designations', labelHi: 'भूमिकाएँ', href: '/admin/roles', icon: '🏷' },
    ],
  },
  {
    section: 'Competency',
    items: [
      { label: 'Competency Framework', labelHi: 'दक्षता ढाँचा', href: '/admin/competencies', icon: '📊' },
      { label: 'Skill Gap Analytics', labelHi: 'कौशल अंतराल', href: '/admin/skill-gaps', icon: '⚡' },
    ],
  },
  {
    section: 'Learning',
    items: [
      { label: 'Course Management', labelHi: 'पाठ्यक्रम प्रबंधन', href: '/admin/courses', icon: '📚' },
      { label: 'Learning Paths', labelHi: 'शिक्षण पथ', href: '/admin/learning-paths', icon: '🎯' },
      { label: 'Learning Materials', labelHi: 'सामग्री', href: '/admin/content', icon: '📄' },
    ],
  },
  {
    section: 'Assessments',
    items: [
      { label: 'Assessments', labelHi: 'मूल्यांकन', href: '/admin/assessments', icon: '✏' },
      { label: 'AI Quiz Generator', labelHi: 'AI प्रश्नोत्तरी', href: '/admin/ai-quiz', icon: '🤖' },
    ],
  },
  {
    section: 'Analytics',
    items: [
      { label: 'Training Analytics', labelHi: 'प्रशिक्षण विश्लेषण', href: '/admin/training', icon: '📈' },
      { label: 'Predictive Analytics', labelHi: 'भविष्यवाणी', href: '/admin/emerging-skills', icon: '🔭' },
      { label: 'AI Insights', labelHi: 'AI अंतर्दृष्टि', href: '/admin/ai-insights', icon: '✨' },
      { label: 'Reports', labelHi: 'रिपोर्ट', href: '/admin/reports', icon: '📋' },
    ],
  },
  {
    section: 'Integrations',
    items: [
      { label: 'iGOT Karmayogi', labelHi: 'iGOT कर्मयोगी', href: '/admin/igot', icon: '🔗' },
      { label: 'NSSTA / TPAC', labelHi: 'NSSTA / TPAC', href: '/admin/nssta', icon: '🔗' },
    ],
  },
  {
    section: 'System',
    items: [
      { label: 'Notifications', labelHi: 'सूचनाएँ', href: '/admin/notifications', icon: '🔔' },
      { label: 'Audit Logs', labelHi: 'ऑडिट लॉग', href: '/admin/audit', icon: '📝' },
      { label: 'System Settings', labelHi: 'सेटिंग्स', href: '/admin/settings', icon: '⚙' },
    ],
  },
];

export default function AdminLayout() {
  return <Shell navGroups={ADMIN_NAV} role="admin" />;
}
