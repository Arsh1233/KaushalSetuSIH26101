import Shell from './Shell';
import type { NavGroup } from './Shell';

const OFFICIAL_NAV: NavGroup[] = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', labelHi: 'डैशबोर्ड', href: '/app/dashboard', icon: '⌂' },
    ],
  },
  {
    section: 'Skill Intelligence',
    items: [
      { label: 'My Competencies', labelHi: 'मेरी दक्षताएँ', href: '/app/competencies', icon: '📊' },
      { label: 'Skill Gaps', labelHi: 'कौशल अंतराल', href: '/app/skill-gaps', icon: '⚡' },
      { label: 'Learning Path', labelHi: 'सीखने का पथ', href: '/app/learning-path', icon: '🎯' },
    ],
  },
  {
    section: 'Learning',
    items: [
      { label: 'Courses', labelHi: 'पाठ्यक्रम', href: '/app/courses', icon: '📚' },
      { label: 'Assessments', labelHi: 'मूल्यांकन', href: '/app/assessment', icon: '✏' },
      { label: 'Learning Resources', labelHi: 'शिक्षण सामग्री', href: '/app/resources', icon: '📁' },
      { label: 'AI Learning Assistant', labelHi: 'AI सहायक', href: '/app/ai-assistant', icon: '🤖' },
    ],
  },
  {
    section: 'Progress',
    items: [
      { label: 'My Progress', labelHi: 'मेरी प्रगति', href: '/app/progress', icon: '📈' },
      { label: 'Achievements', labelHi: 'उपलब्धियाँ', href: '/app/achievements', icon: '🏆' },
    ],
  },
  {
    section: 'Account',
    items: [
      { label: 'Notifications', labelHi: 'सूचनाएँ', href: '/app/notifications', icon: '🔔' },
      { label: 'Profile', labelHi: 'प्रोफ़ाइल', href: '/app/profile', icon: '👤' },
      { label: 'Settings', labelHi: 'सेटिंग्स', href: '/app/settings', icon: '⚙' },
    ],
  },
];

export default function AppLayout() {
  return <Shell navGroups={OFFICIAL_NAV} role="official" />;
}
