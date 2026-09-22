import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { setIsLoggedIn, setRole, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleDemoLogin() {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setRole('official');
      navigate('/app/dashboard');
    }, 800);
  }

  function handleAdminLogin() {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setRole('admin');
      navigate('/admin/overview');
    }, 800);
  }

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col">
      {/* Top gov bar */}
      <div className="bg-navy-900 text-white text-xs py-1.5 px-6 flex items-center justify-between">
        <span>Government of India — Ministry of Statistics &amp; Programme Implementation</span>
        <div className="flex border border-navy-700 rounded overflow-hidden">
          <button onClick={() => setLanguage('en')} className={`px-2 py-0.5 text-xs ${language === 'en' ? 'bg-white text-navy-900' : 'hover:bg-navy-800'}`}>EN</button>
          <button onClick={() => setLanguage('hi')} className={`px-2 py-0.5 text-xs ${language === 'hi' ? 'bg-white text-navy-900' : 'hover:bg-navy-800'}`}>हिन्दी</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-900 rounded-xl mb-4">
              <span className="text-white text-2xl font-bold">KS</span>
            </div>
            <h1 className="text-3xl font-bold text-navy-900">KaushalSetu</h1>
            <p className="text-slate-500 mt-1 text-sm italic">"Bridging Skill Gaps, Building Capability"</p>
            <p className="text-slate-400 text-xs mt-2">Competency Intelligence Platform for the Official Statistical System</p>
          </div>

          {/* Login card */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8">
            <h2 className="text-lg font-semibold text-navy-900 mb-1">Official Login</h2>
            <p className="text-sm text-slate-500 mb-6">Sign in with your government credentials to access your competency profile.</p>

            {/* SSO button */}
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-navy-900 text-navy-900 font-semibold rounded hover:bg-navy-50 transition-colors mb-3">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
              Sign in with SSO (iGOT / NIC)
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-xs text-slate-400"><span className="bg-white px-2">or use demo access</span></div>
            </div>

            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mb-2"
            >
              {loading ? 'Signing in...' : '▶ Demo Login — Official View (Ananya Sharma)'}
            </button>

            <button
              onClick={handleAdminLogin}
              disabled={loading}
              className="w-full py-2.5 bg-navy-800 text-white font-semibold rounded hover:bg-navy-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : '⊞ Demo Login — Admin View (Dr. Vikram Menon)'}
            </button>
          </div>

          {/* Security note */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
            <p className="font-medium mb-1">Security Notice</p>
            <p>This is a secure government system. Unauthorised access is prohibited. All activities are monitored and logged under the Information Technology Act, 2000.</p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            ⚠ Prototype / Demo Data — Smart India Hackathon 2024
          </p>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        KaushalSetu v1.0 · Ministry of Statistics &amp; Programme Implementation, Government of India
      </footer>
    </div>
  );
}
