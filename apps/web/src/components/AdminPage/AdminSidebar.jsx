import {
  Shield,
  LogOut,
  BarChart3,
  Users,
  BookOpen,
  Ticket,
  Mail,
} from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "mysteries", label: "Mysteries", icon: BookOpen },
  { id: "coupons", label: "Coupons", icon: Ticket },
  { id: "emails", label: "Emails", icon: Mail },
];

export function AdminSidebar({ user, activeTab, onTabChange }) {
  return (
    <aside className="w-full md:w-64 bg-slate-800 border-b md:border-b-0 md:border-r border-slate-700 flex-shrink-0">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-400" />
          <h1 className="text-white font-bold text-lg">
            Murder Mystery Studio
          </h1>
        </div>
        <p className="text-slate-400 text-xs mt-1 truncate">{user.email}</p>
      </div>
      <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible p-2 gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-purple-600/30 text-purple-200"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-slate-700 hidden md:block">
        <a
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm"
        >
          <LogOut className="w-4 h-4" />
          Back to site
        </a>
      </div>
    </aside>
  );
}
