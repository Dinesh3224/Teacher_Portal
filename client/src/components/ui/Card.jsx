// src/components/ui/Card.jsx
export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-[20px] shadow-sm shadow-gray-200/50 border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
