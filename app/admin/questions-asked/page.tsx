import AdminSidebar from "@/components/AdminSidebar";
import BackButton from "@/components/BackButton";

export default function QuestionsAskedPage() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6"><BackButton /></div>
        <h1 className="text-2xl font-bold">Questions Asked</h1>
        <p className="text-slate-400 mt-2">Manage and review student questions here.</p>
      </div>
    </div>
  );
}