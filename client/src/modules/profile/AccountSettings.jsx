import { Settings, Bell, Globe, Key } from "lucide-react";

export default function AccountSettings({ data, onUpdate }) {
  const toggleNotification = () => {
    onUpdate({ ...data, notifications: !data.notifications });
  };

  const handleLanguageChange = (e) => {
    onUpdate({ ...data, language: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Settings className="text-orange-500" size={20} />
          Account Settings
        </h3>
      </div>

      <div className="space-y-4">
        {/* Change Password Placeholder */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Key size={16} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Password</p>
              <p className="text-xs text-gray-500 mt-0.5">Change your password</p>
            </div>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            Change
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Bell size={16} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Notifications</p>
              <p className="text-xs text-gray-500 mt-0.5">Email and portal alerts</p>
            </div>
          </div>
          <button 
            onClick={toggleNotification}
            className={`w-10 h-5 flex items-center rounded-full transition-colors ${data.notifications ? 'bg-orange-500' : 'bg-gray-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${data.notifications ? 'translate-x-5' : 'translate-x-1'}`}></div>
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Globe size={16} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Language</p>
              <p className="text-xs text-gray-500 mt-0.5">Portal interface language</p>
            </div>
          </div>
          <select 
            value={data.language}
            onChange={handleLanguageChange}
            className="text-sm font-medium text-gray-700 bg-transparent border-none focus:ring-0 cursor-pointer outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Kannada">Kannada</option>
          </select>
        </div>
      </div>
    </div>
  );
}
