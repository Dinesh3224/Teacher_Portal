// src/components/ui/Card.jsx
export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
}
