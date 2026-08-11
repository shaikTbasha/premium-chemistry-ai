import { prisma } from '@/lib/prisma';

export default async function AnalyticsPage() {
  // Safely query only if pdfAnalysis model is generated
  const analyses = (prisma as any).pdfAnalysis 
    ? await (prisma as any).pdfAnalysis.findMany({
        include: { user: { select: { email: true } } },
        orderBy: { createdAt: 'desc' },
      }).catch(() => [])
    : [];

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2 text-gray-900">PDF Solver Analytics & Logs</h1>
      <p className="text-sm text-gray-500 mb-6">Track PDF uploads, user emails, and processing statuses.</p>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyses.map((analysis: any) => (
              <tr key={analysis.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{analysis.user?.email || 'Unknown'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{analysis.fileName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(analysis.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {analysis.status}
                  </span>
                </td>
              </tr>
            ))}
            {analyses.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center text-sm text-gray-500">
                  No logs found yet. Run `npx prisma db push` in your terminal to enable tracking.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}