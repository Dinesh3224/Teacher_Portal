import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function EngagementChart() {
  const data = [
    { name: 'Submitted', value: 340, color: '#f97316' }, // orange-500
    { name: 'Pending', value: 85, color: '#f87171' }, // red-400
    { name: 'Graded', value: 215, color: '#3b82f6' }, // blue-500
  ];

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontWeight: 600, color: '#334155' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
