import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

type NotificationType = 'info' | 'warning' | 'success' | 'reminder';
type Tab = 'all' | 'unread' | 'read';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  date: string;
  actionLabel?: string;
  actionHref?: string;
}

const initialNotifications: Notification[] = [
  { id: 'n1', title: 'New Python course recommended', message: 'Based on your CRITICAL gap in Python for Statistical Analysis, we recommend the iGOT module "Python for Statistical Data Processing" (50 min).', type: 'info', read: false, date: '2 hours ago', actionLabel: 'View Course', actionHref: '/app/learning/igot-python-stats' },
  { id: 'n2', title: 'Assessment due in 7 days — Sampling Methods', message: 'Your Sampling Methods diagnostic is scheduled. Complete it to update your competency score and unlock personalised recommendations.', type: 'warning', read: false, date: '5 hours ago', actionLabel: 'Take Assessment', actionHref: '/app/assessment' },
  { id: 'n3', title: 'New mandatory training assigned — Cybersecurity Awareness', message: 'NIC has assigned Cybersecurity Awareness 2024 as a mandatory training. Please complete it within 30 days.', type: 'warning', read: false, date: '1 day ago', actionLabel: 'Start Training', actionHref: '/app/courses' },
  { id: 'n4', title: 'Skill gap alert — AI/ML competency below threshold', message: 'Your emerging competency score in AI/ML fundamentals has been flagged as below the recommended threshold for your role level.', type: 'warning', read: false, date: '2 days ago' },
  { id: 'n5', title: 'Competency score updated — Data Visualisation +8%', message: 'Your practical task submission for the Data Visualisation exercise has been reviewed. Your evidence confidence increased from 71% to 79%.', type: 'success', read: true, date: '3 days ago' },
  { id: 'n6', title: 'Certificate available — Python Fundamentals', message: 'Congratulations! Your certificate for "Python Basics — iGOT Karmayogi" is now available for download in your portfolio.', type: 'success', read: true, date: '5 days ago', actionLabel: 'Download Certificate' },
  { id: 'n7', title: 'Evidence verified by supervisor', message: 'Sh. V. Menon has verified your "Quarterly Review Presentation" evidence. Your Communication competency score has been updated.', type: 'success', read: true, date: '6 days ago' },
  { id: 'n8', title: 'Weekly learning digest', message: "You completed 2 hrs 15 min of learning this week. You're on track to meet your monthly goal. 3 new courses have been added that match your learning path.", type: 'info', read: true, date: '1 week ago', actionLabel: 'View Learning Path', actionHref: '/app/learning-path' },
  { id: 'n9', title: 'Role Readiness score improved', message: 'Your Role Readiness has increased from 71% to 74% following your recent course completions. Keep going — 3 CRITICAL gaps remain.', type: 'success', read: true, date: '1 week ago' },
  { id: 'n10', title: 'NSSTA programme registration open', message: 'Registration for the NSSTA "Advanced Data Science for Official Statistics" programme (Q1 2025) is now open. Deadline: 30 November 2024.', type: 'reminder', read: true, date: '2 weeks ago', actionLabel: 'Register Now' },
];

const typeColor: Record<NotificationType, string> = {
  info: 'bg-teal-500',
  warning: 'bg-amber-500',
  success: 'bg-green-500',
  reminder: 'bg-navy-700',
};

const typeBorder: Record<NotificationType, string> = {
  info: 'border-teal-400',
  warning: 'border-amber-400',
  success: 'border-green-400',
  reminder: 'border-navy-600',
};

const typeVariant: Record<NotificationType, string> = {
  info: 'teal',
  warning: 'HIGH',
  success: 'verified',
  reminder: 'neutral',
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  const filtered = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: notifications.length },
    { key: 'unread', label: 'Unread', count: unreadCount },
    { key: 'read', label: 'Read', count: readCount },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="Stay up to date with your learning activities and alerts"
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Notifications' }]}
        actions={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="text-xs px-3 py-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Mark all read
            </button>
          ) : undefined
        }
      />

      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-slate-600 hover:text-navy-800'
            }`}
          >
            {tab.label}
            {tab.key === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-sm">No notifications in this category.</div>
        )}
        {filtered.map(n => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`bg-white rounded-xl border px-4 py-4 flex gap-3 cursor-pointer hover:shadow-sm transition-all ${
              !n.read ? `border-l-4 ${typeBorder[n.type]} border-t-slate-200 border-r-slate-200 border-b-slate-200` : 'border-slate-200'
            }`}
          >
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-slate-200' : typeColor[n.type]}`} />

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <span className={`text-sm leading-snug ${!n.read ? 'font-semibold text-navy-900' : 'font-medium text-slate-700'}`}>
                  {n.title}
                </span>
                <div className="shrink-0 flex items-center gap-2">
                  <Badge variant={typeVariant[n.type] as any}>{n.type}</Badge>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{n.date}</span>
                {n.actionLabel && (
                  <button
                    onClick={e => { e.stopPropagation(); markRead(n.id); }}
                    className="text-xs px-3 py-1 rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                  >
                    {n.actionLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
