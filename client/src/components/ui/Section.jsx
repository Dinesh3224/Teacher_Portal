// src/components/ui/Section.jsx
export default function Section({ title, children, action }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
