import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function PayrollChart() {
  const data = [
    { month: 'Jan', base: 45000, allowances: 8000, deductions: 2500 },
    { month: 'Feb', base: 45000, allowances: 8000, deductions: 2500 },
    { month: 'Mar', base: 45000, allowances: 8500, deductions: 2800 },
    { month: 'Apr', base: 47000, allowances: 8500, deductions: 2800 },
    { month: 'May', base: 47000, allowances: 9000, deductions: 3000 },
  ];

  const formatCurrency = (value) => `₹${(value/1000).toFixed(0)}k`;

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={formatCurrency}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}
          />
          <Bar dataKey="base" name="Base Salary" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
          <Bar dataKey="allowances" name="Allowances" stackId="a" fill="#f97316" />
          <Bar dataKey="deductions" name="Deductions" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
