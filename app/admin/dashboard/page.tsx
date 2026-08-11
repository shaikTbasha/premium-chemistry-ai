import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="text-slate-400 mt-2">Select an option from the sidebar on the left.</p>
      </div>
    </div>
  );
}