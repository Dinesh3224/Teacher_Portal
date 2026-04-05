import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeachingHoursChart() {
  const data = [
    { week: 'Week 1', hours: 14 },
    { week: 'Week 2', hours: 18 },
    { week: 'Week 3', hours: 16 },
    { week: 'Week 4', hours: 22 },
    { week: 'Week 5', hours: 20 },
  ];

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="week" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="hours" 
            stroke="#f97316" 
            strokeWidth={3} 
            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
            activeDot={{ r: 6, strokeWidth: 0, fill: '#f97316' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
