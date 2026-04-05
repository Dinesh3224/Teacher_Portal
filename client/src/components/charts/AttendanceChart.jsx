import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AttendanceChart() {
  const data = [
    { day: 'Mon', marked: 85, total: 100 },
    { day: 'Tue', marked: 92, total: 100 },
    { day: 'Wed', marked: 78, total: 100 },
    { day: 'Thu', marked: 95, total: 100 },
    { day: 'Fri', marked: 88, total: 100 },
  ];

  const getBarColor = (value) => {
    if (value > 90) return '#22c55e'; // green-500
    if (value > 80) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="day" 
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
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="marked" radius={[4, 4, 4, 4]} barSize={32}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.marked)} />
             ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
