import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Capitalize and format path segments
  const formatText = (text) => {
    if (text.length > 25) return "Details"; // Handle IDs
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, ' ');
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm font-medium text-gray-500 mb-6 bg-white shrink-0 px-4 py-2 border border-gray-100 rounded-xl w-fit shadow-sm">
      <Link to="/dashboard" className="hover:text-orange-600 transition-colors flex items-center">
        <Home size={16} />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return (
          <div key={to} className="flex items-center">
            <span className="mx-1 text-gray-300"><ChevronRight size={16} /></span>
            {last ? (
              <span className="text-gray-800 font-bold" aria-current="page">
                {formatText(value)}
              </span>
            ) : (
              <Link to={to} className="hover:text-orange-600 transition-colors">
                {formatText(value)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
