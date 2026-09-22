import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface NavItem {
  label: string;
  labelHi: string;
  href: string;
  icon: string;
}

export interface NavGroup {
  section?: string;
  items: NavItem[];
}

interface ShellProps {
  navGroups: NavGroup[];
  role: 'official' | 'admin';
}

export default function Shell({ navGroups, role }: ShellProps) {
  const { language, setLanguage, currentOfficialId, setRole } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const userName = role === 'admin' ? 'Dr. Vikram Menon' : 'Ananya Sharma';
  const userInitials = role === 'admin' ? 'VM' : 'AS';
  const userRoleLabel = role === 'admin' ? 'Dept. Training Administrator' : 'Statistical Officer';

  function switchRole() {
    if (role === 'official') {
      setRole('admin');
      navigate('/admin/overview');
    } else {
      setRole('official');
      navigate('/app/dashboard');
    }
  }

  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-navy-900 flex flex-col shrink-0 h-screen sticky top-0">
        {/* Logo */}
        <div className="px-5 py-4 border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center text-white font-bold text-sm">KS</div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">KaushalSetu</div>
              <div className="text-navy-100 text-xs opacity-70">MoSPI</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.section && (
                <p className="px-3 mb-1 text-xs font-semibold text-navy-400 uppercase tracking-widest">
                  {group.section}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map(item => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                          isActive
                            ? 'bg-white/15 text-white font-medium'
                            : 'text-navy-100 hover:bg-white/8 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{language === 'hi' ? item.labelHi : item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Role switcher */}
        <div className="px-3 py-3 border-t border-navy-800">
          <button
            onClick={switchRole}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-navy-100 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span>⇄</span>
            <span>{role === 'official' ? 'Switch to Admin View' : 'Switch to Official View'}</span>
          </button>
        </div>

        {/* User */}
        <button
          onClick={() => role === 'official' ? navigate('/app/profile') : undefined}
          className={`px-4 py-3 border-t border-navy-800 w-full text-left transition-colors ${role === 'official' ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'}`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0">{userInitials}</div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">{userName}</div>
              <div className="text-navy-100 text-xs opacity-70 truncate">
                {role === 'official' ? 'View Profile →' : userRoleLabel}
              </div>
            </div>
          </div>
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-4 shrink-0 sticky top-0 z-10">
          <div className="flex-1">
            <div className="relative max-w-xs">
              <input
                type="search"
                placeholder="Search officials, competencies..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded bg-slate-50 focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
              />
              <svg className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex border border-slate-200 rounded overflow-hidden text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 font-medium transition-colors ${language === 'en' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 font-medium transition-colors ${language === 'hi' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                हिन्दी
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600"
                title="Notifications"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-9 w-80 bg-white border border-slate-200 rounded-md shadow-lg z-50 py-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex gap-2 text-sm mb-3">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mt-1 shrink-0" />
                      <div>
                        <p className="text-slate-800 font-medium">Python gap flagged</p>
                        <p className="text-slate-500 text-xs">Your Python confidence dropped below threshold</p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-1 shrink-0" />
                      <div>
                        <p className="text-slate-800 font-medium">Assessment due</p>
                        <p className="text-slate-500 text-xs">Sampling Methods validation expires in 7 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600" title="Help">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

        {/* Demo footer */}
        <footer className="px-6 py-2 bg-amber-50 border-t border-amber-200 text-xs text-amber-700 text-center shrink-0">
          ⚠ Prototype / Demo Data — Smart India Hackathon 2024 — All data is fictional and for demonstration purposes only
        </footer>
      </div>
    </div>
  );
}
