import AdminSidebar from "@/components/AdminSidebar";
import BackButton from "@/components/BackButton";

export default function CouponsPage() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6"><BackButton /></div>
        <h1 className="text-2xl font-bold">Coupons Management</h1>
        <p className="text-slate-400 mt-2">Create and manage discount coupons for subscriptions.</p>
      </div>
    </div>
  );
}