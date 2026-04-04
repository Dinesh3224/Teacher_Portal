import { createContext, useState, useContext } from 'react';

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
  // Read-only mock student roster
  const students = [
    { id: 'ST-001', name: 'Alice Johnson', rollNumber: 'CS2023001' },
    { id: 'ST-002', name: 'Bob Smith', rollNumber: 'CS2023002' },
    { id: 'ST-003', name: 'Charlie Davis', rollNumber: 'CS2023003' },
    { id: 'ST-004', name: 'Diana Prince', rollNumber: 'CS2023004' },
    { id: 'ST-005', name: 'Evan Wright', rollNumber: 'CS2023005' }
  ];

  // Schedule to show "Today's Classes" on the dashboard
  const todayClasses = [
    { id: 'c1', course: 'B.Tech Computer Science', section: 'A', time: '10:00 AM - 11:00 AM', room: 'Room 304' },
    { id: 'c2', course: 'B.Tech Computer Science', section: 'B', time: '11:30 AM - 12:30 PM', room: 'Lab 2' },
    { id: 'c3', course: 'B.Tech Mechanical', section: 'A', time: '02:00 PM - 03:00 PM', room: 'Room 102' }
  ];

  /* 
    Attendance Records Structure:
    {
      course: 'B.Tech CS',
      section: 'A',
      date: '2026-04-04',
      hour: '10:00 AM',
      records: [
        { studentId: 'ST-001', status: 'Present' }, ...
      ]
    }
  */
  const [attendanceLogs, setAttendanceLogs] = useState([
    {
      id: 'log-1',
      course: 'B.Tech Computer Science',
      section: 'A',
      date: new Date().toISOString().split('T')[0], // Today's date mock
      hour: '10:00 AM - 11:00 AM',
      records: [
        { studentId: 'ST-001', status: 'Present' },
        { studentId: 'ST-002', status: 'Present' },
        { studentId: 'ST-003', status: 'Absent' },
        { studentId: 'ST-004', status: 'Late' },
        { studentId: 'ST-005', status: 'Present' }
      ]
    }
  ]);

  const saveAttendance = (course, section, date, hour, newRecords) => {
    // Check if it already exists
    const existingIndex = attendanceLogs.findIndex(
      log => log.course === course && log.section === section && log.date === date && log.hour === hour
    );

    if (existingIndex >= 0) {
      // Update
      const updatedLogs = [...attendanceLogs];
      updatedLogs[existingIndex].records = newRecords;
      setAttendanceLogs(updatedLogs);
    } else {
      // Add new
      setAttendanceLogs([...attendanceLogs, {
        id: `log-${Date.now()}`,
        course, section, date, hour, records: newRecords
      }]);
    }
  };

  const getAttendanceForClass = (course, section, date, hour) => {
    return attendanceLogs.find(
      log => log.course === course && log.section === section && log.date === date && log.hour === hour
    );
  };

  return (
    <AttendanceContext.Provider value={{
      students,
      todayClasses,
      attendanceLogs,
      saveAttendance,
      getAttendanceForClass
    }}>
      {children}
    </AttendanceContext.Provider>
  );
};
