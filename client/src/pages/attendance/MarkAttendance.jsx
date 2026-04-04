import { useState, useEffect } from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { Search, Save, AlertCircle, RefreshCw } from 'lucide-react';

export default function MarkAttendance() {
  const { students, saveAttendance, getAttendanceForClass } = useAttendance();

  const [course, setCourse] = useState('B.Tech Computer Science');
  const [section, setSection] = useState('A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hour, setHour] = useState('10:00 AM - 11:00 AM');
  
  const [attendanceState, setAttendanceState] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Auto-load if attendance exists
  useEffect(() => {
    const existingLog = getAttendanceForClass(course, section, date, hour);
    if (existingLog) {
      const stateMap = {};
      existingLog.records.forEach(r => stateMap[r.studentId] = r.status);
      setAttendanceState(stateMap);
      setIsEditing(true);
    } else {
      // Default to Present
      const defaultState = {};
      students.forEach(s => defaultState[s.id] = 'Present');
      setAttendanceState(defaultState);
      setIsEditing(false);
    }
  }, [course, section, date, hour, getAttendanceForClass, students]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    const newState = {};
    students.forEach(s => newState[s.id] = status);
    setAttendanceState(newState);
  };

  const submitAttendance = () => {
    const payload = students.map(s => ({
      studentId: s.id,
      status: attendanceState[s.id] || 'Present'
    }));
    saveAttendance(course, section, date, hour, payload);
    setIsEditing(true);
    setSaveMessage('Attendance saved successfully.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'bg-green-500 text-white border-green-600 shadow-green-500/20 shadow-sm';
      case 'Absent': return 'bg-red-500 text-white border-red-600 shadow-red-500/20 shadow-sm';
      case 'Late': return 'bg-yellow-500 text-white border-yellow-600 shadow-yellow-500/20 shadow-sm';
      default: return 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50';
    }
  };

  const getUnselectedColor = () => 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50';

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn pb-12">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
           <p className="text-gray-500 text-sm mt-1">Configure slot and log roster presence.</p>
        </div>
      </div>

      {/* Configuration Selectors */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-4 items-end">
         <div className="space-y-1.5 w-full md:flex-1">
            <label className="text-sm font-semibold text-gray-700">Course</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-orange-500 focus:border-orange-500">
               <option value="B.Tech Computer Science">B.Tech Computer Science</option>
               <option value="B.Tech Mechanical">B.Tech Mechanical</option>
            </select>
         </div>
         <div className="space-y-1.5 w-full md:w-32">
            <label className="text-sm font-semibold text-gray-700">Section</label>
            <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-orange-500 focus:border-orange-500">
               <option value="A">A</option>
               <option value="B">B</option>
               <option value="C">C</option>
            </select>
         </div>
         <div className="space-y-1.5 w-full md:flex-1">
            <label className="text-sm font-semibold text-gray-700">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-orange-500 focus:border-orange-500" />
         </div>
         <div className="space-y-1.5 w-full md:flex-1">
            <label className="text-sm font-semibold text-gray-700">Class Hour</label>
            <select value={hour} onChange={(e) => setHour(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-orange-500 focus:border-orange-500">
               <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
               <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
            </select>
         </div>
      </div>

      {isEditing && (
         <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100">
            <AlertCircle size={16} />
            Attendance already recorded. You are in Edit mode.
         </div>
      )}

      {/* Student List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
         <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2 text-sm">
               <button onClick={() => handleMarkAll('Present')} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium transition-colors">Mark All Present</button>
               <button onClick={() => handleMarkAll('Absent')} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium transition-colors">Mark All Absent</button>
            </div>
            <button onClick={() => handleMarkAll('Present')} className="px-3 py-1.5 text-gray-500 hover:text-gray-900 flex items-center gap-1.5 text-sm font-medium transition-colors">
               <RefreshCw size={14} /> Reset
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                  <tr>
                     <th className="px-6 py-4 w-24">Roll No</th>
                     <th className="px-6 py-4">Student Name</th>
                     <th className="px-6 py-4 text-right">Attendance Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {students.map((student) => {
                     const status = attendanceState[student.id] || 'Present';
                     return (
                        <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4 font-mono text-gray-600">{student.rollNumber}</td>
                           <td className="px-6 py-4 font-bold text-gray-900">{student.name}</td>
                           <td className="px-6 py-4 text-right">
                              <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden p-0.5 bg-gray-50">
                                 <button 
                                   onClick={() => handleStatusChange(student.id, 'Present')}
                                   className={`px-4 py-1.5 text-xs font-bold rounded-md border ${status === 'Present' ? getStatusColor('Present') : getUnselectedColor()} transition-colors`}
                                 >Present</button>
                                 <button 
                                   onClick={() => handleStatusChange(student.id, 'Late')}
                                   className={`px-4 py-1.5 text-xs font-bold rounded-md border  ${status === 'Late' ? getStatusColor('Late') : getUnselectedColor()} transition-colors ml-0.5`}
                                 >Late</button>
                                 <button 
                                   onClick={() => handleStatusChange(student.id, 'Absent')}
                                   className={`px-4 py-1.5 text-xs font-bold rounded-md border ${status === 'Absent' ? getStatusColor('Absent') : getUnselectedColor()} transition-colors ml-0.5`}
                                 >Absent</button>
                              </div>
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>

         <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-b-2xl">
            <div className="flex gap-4 text-sm font-medium">
               <span className="text-green-600">Present: {Object.values(attendanceState).filter(s => s === 'Present').length}</span>
               <span className="text-red-600">Absent: {Object.values(attendanceState).filter(s => s === 'Absent').length}</span>
               <span className="text-yellow-600">Late: {Object.values(attendanceState).filter(s => s === 'Late').length}</span>
            </div>
            <div className="flex items-center gap-4">
              {saveMessage && <span className="text-green-600 text-sm font-medium animate__animated animate__fadeIn">{saveMessage}</span>}
              <button 
                onClick={submitAttendance}
                className="px-6 py-2.5 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Save size={16} /> Save Attendance
              </button>
            </div>
         </div>
      </div>

    </div>
  );
}
