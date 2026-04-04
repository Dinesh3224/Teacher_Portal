import { useState } from "react";
import { User, KeyRound, Bell, ShieldCheck, Palette, Cog } from "lucide-react";
import ProfileSettings from "../components/ProfileSettings";
import AccountSettings from "../components/AccountSettings";
import NotificationSettings from "../components/NotificationSettings";
import SecuritySettings from "../components/SecuritySettings";
import AppearanceSettings from "../components/AppearanceSettings";
import SystemPreferences from "../components/SystemPreferences";

const tabs = [
  { id: "profile",       label: "Profile",        icon: User,        component: ProfileSettings },
  { id: "account",       label: "Account",        icon: KeyRound,    component: AccountSettings },
  { id: "notifications", label: "Notifications",  icon: Bell,        component: NotificationSettings },
  { id: "security",      label: "Security",       icon: ShieldCheck, component: SecuritySettings },
  { id: "appearance",    label: "Appearance",     icon: Palette,     component: AppearanceSettings },
  { id: "preferences",   label: "Preferences",   icon: Cog,         component: SystemPreferences },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

  return (
    <div className="min-h-full flex flex-col pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-gray-800 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account, preferences, and privacy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 items-start flex-1">
        {/* Left Tab Navigation */}
        <nav className="bg-white rounded-2xl shadow-sm shadow-gray-200/50 border border-gray-100 p-3 space-y-1 lg:sticky lg:top-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                  isActive
                    ? "bg-orange-50 text-orange-600 font-bold shadow-sm shadow-orange-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <tab.icon size={18} className={`shrink-0 ${isActive ? "text-orange-500" : "text-gray-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Content Panel */}
        <div className="bg-white rounded-2xl shadow-sm shadow-gray-200/50 border border-gray-100 p-6 md:p-8 min-h-[500px]">
          {/* Tab Title */}
          <div className="mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              {(() => {
                const tab = tabs.find((t) => t.id === activeTab);
                return tab ? <><tab.icon size={20} className="text-orange-500" /> {tab.label} Settings</> : null;
              })()}
            </h2>
          </div>

          {/* Active Section */}
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
}
