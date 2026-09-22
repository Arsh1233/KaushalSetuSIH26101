import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth
import Login from './pages/Login';

// Official pages
import Dashboard from './pages/official/Dashboard';
import MyCompetencies from './pages/official/MyCompetencies';
import CompetencyDetail from './pages/official/CompetencyDetail';
import SkillGaps from './pages/official/SkillGaps';
import MinimumLearningPath from './pages/official/MinimumLearningPath';
import LearningDetail from './pages/official/LearningDetail';
import Assessment from './pages/official/Assessment';
import AssessmentHome from './pages/official/AssessmentHome';
import Profile from './pages/official/Profile';
import PracticalTask from './pages/official/PracticalTask';
import Evidence from './pages/official/Evidence';
import RoleReadiness from './pages/official/RoleReadiness';
import CompetencyUpdate from './pages/official/CompetencyUpdate';
import AIQuizGenerator from './pages/official/AIQuizGenerator';
import AIQuizReview from './pages/official/AIQuizReview';
import CapabilityPassport from './pages/official/CapabilityPassport';
import Courses from './pages/official/Courses';
import LearningResources from './pages/official/LearningResources';
import AIAssistant from './pages/official/AIAssistant';
import MyProgress from './pages/official/MyProgress';
import Achievements from './pages/official/Achievements';
import Notifications from './pages/official/Notifications';
import Settings from './pages/official/Settings';

// Admin pages
import AdminOverview from './pages/admin/AdminOverview';
import WorkforceCapability from './pages/admin/WorkforceCapability';
import OfficialDetailAdmin from './pages/admin/OfficialDetailAdmin';
import TrainingEffectiveness from './pages/admin/TrainingEffectiveness';
import EmergingSkills from './pages/admin/EmergingSkills';
import TrainingPlanner from './pages/admin/TrainingPlanner';
import ContentLibrary from './pages/admin/ContentLibrary';
import Reports from './pages/admin/Reports';
import AdminCompetencies from './pages/admin/AdminCompetencies';
import AdminSkillGaps from './pages/admin/AdminSkillGaps';
import Users from './pages/admin/Users';
import Departments from './pages/admin/Departments';
import RolesDesignations from './pages/admin/RolesDesignations';
import CourseManagement from './pages/admin/CourseManagement';
import LearningPaths from './pages/admin/LearningPaths';
import AssessmentManagement from './pages/admin/AssessmentManagement';
import AdminAIQuiz from './pages/admin/AdminAIQuiz';
import AIInsights from './pages/admin/AIInsights';
import IGOTIntegration from './pages/admin/IGOTIntegration';
import NSSTAIntegration from './pages/admin/NSSTAIntegration';
import AuditLogs from './pages/admin/AuditLogs';
import NotificationsAdmin from './pages/admin/NotificationsAdmin';
import SystemSettings from './pages/admin/SystemSettings';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* Official shell */}
      <Route element={<AppLayout />}>
        <Route path="/app/dashboard" element={<Dashboard />} />
        {/* Capability Passport kept for deep links */}
        <Route path="/app/passport" element={<CapabilityPassport />} />
        <Route path="/app/competencies" element={<MyCompetencies />} />
        <Route path="/app/competencies/:id" element={<CompetencyDetail />} />
        <Route path="/app/skill-gaps" element={<SkillGaps />} />
        <Route path="/app/learning-path" element={<MinimumLearningPath />} />
        <Route path="/app/learning/:courseId" element={<LearningDetail />} />
        <Route path="/app/courses" element={<Courses />} />
        <Route path="/app/assessment" element={<AssessmentHome />} />
        <Route path="/app/assessment/:compId" element={<Assessment />} />
        <Route path="/app/resources" element={<LearningResources />} />
        <Route path="/app/ai-assistant" element={<AIAssistant />} />
        <Route path="/app/progress" element={<MyProgress />} />
        <Route path="/app/achievements" element={<Achievements />} />
        <Route path="/app/notifications" element={<Notifications />} />
        <Route path="/app/profile" element={<Profile />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/app/practical/:taskId" element={<PracticalTask />} />
        <Route path="/app/evidence" element={<Evidence />} />
        <Route path="/app/role-readiness" element={<RoleReadiness />} />
        <Route path="/app/competency-update" element={<CompetencyUpdate />} />
        <Route path="/app/ai-quiz" element={<AIQuizGenerator />} />
        <Route path="/app/ai-quiz/review" element={<AIQuizReview />} />
      </Route>

      {/* Admin shell */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/overview" element={<AdminOverview />} />
        <Route path="/admin/workforce" element={<WorkforceCapability />} />
        <Route path="/admin/workforce/:id" element={<OfficialDetailAdmin />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/roles" element={<RolesDesignations />} />
        <Route path="/admin/competencies" element={<AdminCompetencies />} />
        <Route path="/admin/skill-gaps" element={<AdminSkillGaps />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/learning-paths" element={<LearningPaths />} />
        <Route path="/admin/assessments" element={<AssessmentManagement />} />
        <Route path="/admin/ai-quiz" element={<AdminAIQuiz />} />
        <Route path="/admin/training" element={<TrainingEffectiveness />} />
        <Route path="/admin/emerging-skills" element={<EmergingSkills />} />
        <Route path="/admin/ai-insights" element={<AIInsights />} />
        <Route path="/admin/planner" element={<TrainingPlanner />} />
        <Route path="/admin/content" element={<ContentLibrary />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/igot" element={<IGOTIntegration />} />
        <Route path="/admin/nssta" element={<NSSTAIntegration />} />
        <Route path="/admin/audit" element={<AuditLogs />} />
        <Route path="/admin/notifications" element={<NotificationsAdmin />} />
        <Route path="/admin/settings" element={<SystemSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
