import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

const CONTENT = [
  { name: 'Survey Sampling Fundamentals.pdf', type: 'PDF', competency: 'Sampling Methods', lang: 'English', questions: 12, status: 'Published' as const, size: '2.1 MB' },
  { name: 'Python for Statistics — Lecture Notes.pptx', type: 'PPT', competency: 'Python for Statistical Analysis', lang: 'English', questions: 8, status: 'Under Review' as const, size: '4.5 MB' },
  { name: 'PLFS Data Processing Guide.docx', type: 'DOCX', competency: 'Labour Statistics', lang: 'English', questions: 6, status: 'Published' as const, size: '1.8 MB' },
  { name: 'National Accounts Training.pdf', type: 'PDF', competency: 'National Accounts', lang: 'English', questions: 10, status: 'Draft' as const, size: '3.2 MB' },
  { name: 'GIS for Statistical Officers.pdf', type: 'PDF', competency: 'GIS & Spatial Analysis', lang: 'English', questions: 0, status: 'Draft' as const, size: '5.6 MB' },
];

const statusVariant: Record<string, any> = {
  Published: 'verified',
  'Under Review': 'pending',
  Draft: 'neutral',
};

export default function ContentLibrary() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Content Library"
        subtitle="Manage training documents and AI-generated assessments"
        actions={
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
          >
            + Upload Content
          </button>
        }
      />

      {showUpload && (
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm mb-5">
          <h3 className="text-sm font-semibold text-navy-900 mb-3">Upload New Content</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-md p-6 text-center mb-3">
            <p className="text-sm text-slate-500">Drag and drop files here or <button className="text-navy-800 font-medium">browse</button></p>
            <p className="text-xs text-slate-400 mt-1">PDF, PPT, DOCX, Video · Max 100 MB</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowUpload(false)} className="px-4 py-1.5 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors">Upload</button>
            <button onClick={() => setShowUpload(false)} className="px-4 py-1.5 border border-slate-200 text-slate-600 text-sm rounded hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs text-slate-500 font-medium">
              <th className="px-4 py-2.5 text-left">Content</th>
              <th className="px-4 py-2.5 text-left">Competency</th>
              <th className="px-4 py-2.5 text-center">Language</th>
              <th className="px-4 py-2.5 text-center">Questions</th>
              <th className="px-4 py-2.5 text-center">Status</th>
              <th className="px-4 py-2.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CONTENT.map((c, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 text-sm">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.type === 'PDF' ? '📄' : c.type === 'PPT' ? '📊' : '📝'}</span>
                    <div>
                      <p className="font-medium text-slate-800 text-sm leading-tight">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.type} · {c.size}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">{c.competency}</td>
                <td className="px-4 py-3 text-center text-xs text-slate-600">{c.lang}</td>
                <td className="px-4 py-3 text-center">
                  {c.questions > 0 ? (
                    <span className="text-teal-600 font-semibold">{c.questions}</span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <button className="text-navy-800 hover:text-teal-600 font-medium">Generate Quiz</button>
                    <span className="text-slate-300">|</span>
                    <button className="text-slate-500 hover:text-slate-700">Edit</button>
                    <span className="text-slate-300">|</span>
                    <button className="text-teal-600 hover:text-teal-700 font-medium">Publish</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
