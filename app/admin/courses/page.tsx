import { prisma } from '@/lib/prisma';

export default async function AdminCoursesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses & Syllabus Management</h1>
          <p className="text-sm text-gray-500">Manage chemistry modules, video lectures, and chapters.</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Add Course Module
        </button>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 text-center text-gray-500">
        <p>No course chapters uploaded yet. Start building your chemistry curriculum!</p>
      </div>
    </div>
  );
}