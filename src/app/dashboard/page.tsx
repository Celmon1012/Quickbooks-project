import { Sidebar } from "@/components/layout/Sidebar";
import { HubAssistant } from "@/components/layout/HubAssistant";
import { Header } from "@/components/layout/Header";
import { DashboardGrid } from "@/components/layout/DashboardGrid";

export default function DashboardPage() {
  // TODO: Get from auth/context
  const companyId = "035f1c08-79e6-4559-8377-81e9ac5f8d77"; // Hustle Gear

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-[#1a1f2e] transition-colors duration-300 overflow-hidden">
      {/* Sidebar - 15% */}
      <div className="w-[15%] h-full shrink-0 border-r border-gray-200 dark:border-white/10">
        <Sidebar />
      </div>

      {/* Hub Assistant - 25% */}
      <div className="w-[25%] h-full shrink-0 border-r border-gray-200 dark:border-white/10">
        <HubAssistant />
      </div>

      {/* Main Content - 60% */}
      <div className="w-[60%] h-full flex flex-col shrink-0 bg-gray-50 dark:bg-[#1a1f2e]">
        <Header title="Finance Hub" />
        <DashboardGrid companyId={companyId} />
      </div>
    </div>
  );
}