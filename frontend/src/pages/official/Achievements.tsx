import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

type AchievementCategory = 'Learning' | 'Assessment' | 'Competency' | 'Milestone';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
}

const achievements: Achievement[] = [
  { id: 'a1', title: 'Python Foundation', description: 'Completed the Python for Statistical Analysis foundation module on iGOT.', icon: '📘', category: 'Learning', earned: true, earnedDate: 'Sep 2024' },
  { id: 'a2', title: 'First Assessment Passed', description: 'Passed your first KaushalSetu competency assessment with a score above 75%.', icon: '✅', category: 'Assessment', earned: true, earnedDate: 'Jul 2024' },
  { id: 'a3', title: '10 Learning Hours', description: 'Accumulated 10 hours of structured learning through iGOT and NSSTA courses.', icon: '⏱️', category: 'Milestone', earned: true, earnedDate: 'Aug 2024' },
  { id: 'a4', title: 'Evidence Portfolio Started', description: 'Uploaded and verified your first three pieces of competency evidence.', icon: '📁', category: 'Competency', earned: true, earnedDate: 'Jun 2024' },
  { id: 'a5', title: '5 Assessments Completed', description: 'Completed five diagnostic assessments across different competency areas.', icon: '🏅', category: 'Assessment', earned: true, earnedDate: 'Oct 2024' },
  { id: 'a6', title: 'Survey Design Star', description: 'Achieved Level 4 or above in the Survey Design competency with verified evidence.', icon: '🌟', category: 'Competency', earned: true, earnedDate: 'Oct 2024' },
  { id: 'a7', title: 'Advanced Statistics Learner', description: 'Complete three Advanced-level statistics courses on any approved platform.', icon: '📈', category: 'Learning', earned: false, progress: 60 },
  { id: 'a8', title: 'Gap Closer', description: 'Reduce your CRITICAL and HIGH skill gaps to zero through targeted learning.', icon: '🎯', category: 'Competency', earned: false, progress: 40 },
  { id: 'a9', title: 'iGOT Champion', description: 'Complete 10 or more courses on the iGOT Karmayogi platform.', icon: '🏆', category: 'Learning', earned: false, progress: 25 },
  { id: 'a10', title: '25 Learning Hours', description: 'Accumulate 25 hours of tracked learning activity across all platforms.', icon: '🕐', category: 'Milestone', earned: false, progress: 72 },
  { id: 'a11', title: 'Role Ready', description: 'Achieve 90%+ Role Readiness score with no CRITICAL gaps remaining.', icon: '🎯', category: 'Milestone', earned: false },
  { id: 'a12', title: 'Expert Competency', description: 'Reach Level 5 (Expert) in any one statistical or technical competency.', icon: '⭐', category: 'Competency', earned: false },
  { id: 'a13', title: 'Assessment Ace', description: 'Score above 90% in five consecutive assessments without failing any.', icon: '💯', category: 'Assessment', earned: false },
  { id: 'a14', title: 'All-Round Learner', description: 'Complete at least one course from every provider: iGOT, NSSTA, and Department.', icon: '🌐', category: 'Learning', earned: false },
  { id: 'a15', title: 'Data Governance Certified', description: 'Complete all Data Privacy, Cybersecurity and Cloud Computing modules.', icon: '🔒', category: 'Competency', earned: false },
  { id: 'a16', title: 'Peer Mentor', description: 'Receive Supervisor Validation for mentoring or leading a team project.', icon: '👥', category: 'Milestone', earned: false },
];

type Tab = 'all' | 'earned' | 'progress' | 'locked';

const categoryVariant: Record<AchievementCategory, string> = {
  Learning: 'teal',
  Assessment: 'HIGH',
  Competency: 'MEDIUM',
  Milestone: 'neutral',
};

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const earnedCount = achievements.filter(a => a.earned).length;
  const inProgressCount = achievements.filter(a => !a.earned && a.progress !== undefined).length;
  const lockedCount = achievements.filter(a => !a.earned && a.progress === undefined).length;

  const filtered = achievements.filter(a => {
    if (activeTab === 'earned') return a.earned;
    if (activeTab === 'progress') return !a.earned && a.progress !== undefined;
    if (activeTab === 'locked') return !a.earned && a.progress === undefined;
    return true;
  });

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: achievements.length },
    { key: 'earned', label: 'Earned', count: earnedCount },
    { key: 'progress', label: 'In Progress', count: inProgressCount },
    { key: 'locked', label: 'Locked', count: lockedCount },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Achievements"
        subtitle="Milestones earned on your KaushalSetu learning journey"
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Achievements' }]}
      />

      <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-xl p-5 flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-white">{earnedCount}</div>
          <div className="text-sm text-navy-50 mt-0.5">Achievements Earned</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-navy-50">Out of {achievements.length} total</div>
          <div className="text-xs text-teal-500 mt-1 font-medium">
            {Math.round((earnedCount / achievements.length) * 100)}% complete
          </div>
        </div>
      </div>

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
            <span className="ml-1 text-slate-400">({tab.count})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(a => {
          const isLocked = !a.earned && a.progress === undefined;
          const isInProgress = !a.earned && a.progress !== undefined;

          return (
            <div
              key={a.id}
              className={`rounded-xl border p-4 flex gap-4 transition-all ${
                a.earned
                  ? 'bg-white border-teal-200 shadow-sm'
                  : isInProgress
                  ? 'bg-white border-amber-200'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`text-3xl w-12 h-12 flex items-center justify-center rounded-xl shrink-0 ${
                  a.earned
                    ? 'bg-teal-50'
                    : isInProgress
                    ? 'bg-amber-50'
                    : 'bg-slate-100 grayscale'
                }`}
              >
                {a.icon}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-semibold ${a.earned ? 'text-navy-900' : isInProgress ? 'text-navy-800' : 'text-slate-500'}`}>
                    {a.title}
                  </span>
                  <Badge variant={categoryVariant[a.category] as any}>{a.category}</Badge>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{a.description}</p>

                {a.earned && a.earnedDate && (
                  <div className="flex items-center gap-1.5">
                    <Badge variant="verified">Earned</Badge>
                    <span className="text-xs text-slate-400">{a.earnedDate}</span>
                  </div>
                )}

                {isInProgress && a.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span className="font-medium text-amber-600">{a.progress}%</span>
                    </div>
                    <ProgressBar value={a.progress} />
                  </div>
                )}

                {isLocked && (
                  <span className="text-xs text-slate-400 font-medium">🔒 Not yet unlocked</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
