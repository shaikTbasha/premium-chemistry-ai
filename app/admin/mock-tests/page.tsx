import { prisma } from '@/lib/prisma';

export default async function AdminMockTestsPage() {
  // Safe fetch if you have a mock test model, or returns empty array safely
  const tests = await prisma.molecule.findMany().catch(() => []); // Placeholder safe query or custom model if added later

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mock Tests Management</h1>
          <p className="text-sm text-gray-500">Create, edit, and publish chemistry practice exams.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Create New Test
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 text-center text-gray-500">
        <p>No mock tests created yet. Click the button above to add your first exam.</p>
      </div>
    </div>
  );
}