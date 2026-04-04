import { useState } from "react";
import { ShieldCheck, Smartphone, Monitor, Globe, Download, LogOut, CheckCircle } from "lucide-react";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 ${checked ? "bg-orange-500" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

const mockSessions = [
  { id: 1, device: "Chrome — Windows 11", ip: "192.168.1.42", lastActive: "Active now", icon: Monitor, current: true },
  { id: 2, device: "Safari — iPhone 14", ip: "192.168.1.55", lastActive: "2 hours ago", icon: Smartphone, current: false },
  { id: 3, device: "Firefox — Ubuntu", ip: "10.0.0.18", lastActive: "1 day ago", icon: Globe, current: false },
];

export default function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState(mockSessions);

  const handleToggle2FA = (val) => {
    setTwoFactor(val);
    // TODO: API call — POST /api/auth/toggle-2fa { enabled: val }
  };

  const handleLogoutOthers = () => {
    // TODO: API call — POST /api/auth/logout-other-sessions
    setSessions((prev) => prev.filter((s) => s.current));
  };

  const handleDownloadData = () => {
    // TODO: API call — GET /api/faculty/download-data (returns ZIP/JSON)
    alert("Your account data export has been requested. You will receive it via email.");
  };

  return (
    <div className="space-y-8">
      {/* Two-Factor Authentication */}
      <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <ShieldCheck size={20} className="text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
            </div>
          </div>
          <Toggle checked={twoFactor} onChange={handleToggle2FA} />
        </div>
        {twoFactor && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Two-factor authentication is enabled. You will receive a verification code on your registered phone
              each time you sign in from a new device.
            </p>
            {/* TODO: Show QR code setup flow for authenticator apps */}
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700">Active Sessions</h3>
          {sessions.length > 1 && (
            <button onClick={handleLogoutOthers} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors">
              <LogOut size={14} /> Logout Other Sessions
            </button>
          )}
        </div>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-sm transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${session.current ? "bg-green-100" : "bg-gray-100"}`}>
                <session.icon size={18} className={session.current ? "text-green-600" : "text-gray-500"} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  {session.device}
                  {session.current && (
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> Current
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">IP: {session.ip} • {session.lastActive}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Privacy */}
      <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 space-y-4">
        <h3 className="text-sm font-bold text-gray-700">Data & Privacy</h3>
        <p className="text-xs text-gray-500">Request a copy of all data associated with your account. The exported file includes your profile, classes, and activity logs.</p>
        <button onClick={handleDownloadData} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm px-5 py-3 rounded-xl transition-colors flex items-center gap-2">
          <Download size={16} /> Download My Data
        </button>
      </div>
    </div>
  );
}
