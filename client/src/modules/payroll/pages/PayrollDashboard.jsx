import { useState } from "react";
import { Download, Wallet, ArrowDownToLine, ArrowUpToLine, FileText, X } from "lucide-react";
import PayrollChart from "../../../components/charts/PayrollChart";
import { useAuth } from "../../../context/AuthContext";

export default function PayrollDashboard() {
  const { user } = useAuth();
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const salaryData = [
    { id: 1, month: "May 2026", base: 47000, allowances: 9000, deductions: 3000, net: 53000, status: "Paid" },
    { id: 2, month: "Apr 2026", base: 47000, allowances: 8500, deductions: 2800, net: 52700, status: "Paid" },
    { id: 3, month: "Mar 2026", base: 45000, allowances: 8500, deductions: 2800, net: 50700, status: "Paid" },
    { id: 4, month: "Feb 2026", base: 45000, allowances: 8000, deductions: 2500, net: 50500, status: "Paid" },
    { id: 5, month: "Jan 2026", base: 45000, allowances: 8000, deductions: 2500, net: 50500, status: "Paid" },
  ];

  const currentMonth = salaryData[0];

  return (
    <div className="flex flex-col gap-6 w-full max-w-full">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your salary details and access monthly payslips securely.</p>
         </div>
         <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm shadow-orange-500/20 active:scale-[0.98] shrink-0 self-start md:self-auto">
            <Download size={18} /> Download YTD Statement
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Monthly Snapshot Cards */}
         <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 shadow-sm shadow-green-200/50 text-white relative overflow-hidden">
               <h2 className="text-sm font-semibold text-green-100 uppercase tracking-wider mb-2">Net Salary ({currentMonth.month})</h2>
               <div className="flex items-center gap-2">
                  <span className="text-4xl font-extrabold">₹{currentMonth.net.toLocaleString()}</span>
               </div>
               <Wallet size={120} className="absolute -right-6 -bottom-6 text-white/10 transform rotate-12" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                     <ArrowUpToLine size={16} />
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Allowances</p>
                  <p className="text-lg font-extrabold text-gray-900">₹{currentMonth.allowances.toLocaleString()}</p>
               </div>
               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                     <ArrowDownToLine size={16} />
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Deductions</p>
                  <p className="text-lg font-extrabold text-gray-900">₹{currentMonth.deductions.toLocaleString()}</p>
               </div>
               <div className="col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-500 uppercase">Base Salary</p>
                  <p className="text-xl font-extrabold text-gray-900">₹{currentMonth.base.toLocaleString()}</p>
               </div>
            </div>
         </div>

         {/* Yearly Chart */}
         <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Wallet size={16} className="text-blue-500" /> Yearly Salary Graph
            </h2>
            <div className="flex-1 min-h-[250px]">
               <PayrollChart />
            </div>
         </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800">Salary Breakdown</h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50/50">
                     <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Month</th>
                     <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Base Salary</th>
                     <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Allowances</th>
                     <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Deductions</th>
                     <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Net Salary</th>
                     <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {salaryData.map((row) => (
                     <tr key={row.id} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-5 py-4 text-sm font-bold text-gray-900">{row.month}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">₹{row.base.toLocaleString()}</td>
                        <td className="px-5 py-4 text-sm text-green-600 font-medium">+₹{row.allowances.toLocaleString()}</td>
                        <td className="px-5 py-4 text-sm text-red-500 font-medium">-₹{row.deductions.toLocaleString()}</td>
                        <td className="px-5 py-4 text-sm font-extrabold text-gray-900 text-right">₹{row.net.toLocaleString()}</td>
                        <td className="px-5 py-4 text-center">
                           <button 
                             onClick={() => setSelectedPayslip(row)}
                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 hover:bg-orange-200 text-xs font-bold rounded-lg transition-colors"
                           >
                             <FileText size={14} /> View Slip
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal View */}
      {selectedPayslip && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate__animated animate__fadeInUp animate__faster flex flex-col max-h-screen">
               <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                     <FileText size={18} className="text-orange-500" /> Payslip - {selectedPayslip.month}
                  </h3>
                  <button onClick={() => setSelectedPayslip(null)} className="p-1 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer">
                     <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 overflow-y-auto">
                  <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100">
                     <div>
                        <h4 className="font-extrabold text-xl text-gray-900">S-VYASA University</h4>
                        <p className="text-xs text-gray-500">Jigani, Bengaluru, Karnataka</p>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Employee Details</p>
                        <p className="text-sm font-bold text-gray-900">{user?.name || "Professor John"}</p>
                        <p className="text-xs text-gray-600">ID: {user?.id || "T-001"}</p>
                        <p className="text-xs text-gray-600">{user?.department || "Computer Science"}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
                     <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 border-b border-gray-100 pb-1">Earnings</div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Base Salary</span>
                        <span className="font-bold text-gray-900">₹{selectedPayslip.base.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">HRA / Allowances</span>
                        <span className="font-bold text-gray-900">₹{selectedPayslip.allowances.toLocaleString()}</span>
                     </div>

                     <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 border-b border-gray-100 pb-1 mt-4">Deductions</div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Tax Breakdown</span>
                        <span className="font-bold text-gray-900">₹{selectedPayslip.deductions.toLocaleString()}</span>
                     </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 flex justify-between items-center mt-8 border border-orange-100">
                     <span className="font-bold text-orange-900">Net Salary</span>
                     <span className="text-xl font-extrabold text-orange-600">₹{selectedPayslip.net.toLocaleString()}</span>
                  </div>
               </div>
               
               <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                  <button onClick={() => setSelectedPayslip(null)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer">
                     Close
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer">
                     <Download size={16} /> Download PDF
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
