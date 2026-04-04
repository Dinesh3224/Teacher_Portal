import { createContext, useState, useContext } from 'react';

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  // Read-only mock student roster joining identity with aggregate academic metadata
  const [students] = useState([
    {
      id: 'ST-001',
      name: 'Alice Johnson',
      rollNumber: 'CS2023001',
      course: 'B.Tech Computer Science',
      gender: 'Female',
      dob: '2004-05-14',
      email: 'alice.j@university.edu',
      phone: '+1 234 567 8900',
      department: 'Computer Science',
      section: 'A',
      semester: '4th Sem',
      enrollmentYear: 2023,
      attendancePercentage: 88,
      avatarUrl: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=f97316&color=fff',
      enrolledCourses: [
        { name: 'Data Structures', instructor: 'Prof. John', credits: 4 },
        { name: 'Operating Systems', instructor: 'Dr. Smith', credits: 3 }
      ]
    },
    {
      id: 'ST-002',
      name: 'Bob Smith',
      rollNumber: 'CS2023002',
      course: 'B.Tech Computer Science',
      gender: 'Male',
      dob: '2003-11-22',
      email: 'bob.s@university.edu',
      phone: '+1 234 567 8901',
      department: 'Computer Science',
      section: 'A',
      semester: '4th Sem',
      enrollmentYear: 2023,
      attendancePercentage: 72, // low risk flag
      avatarUrl: 'https://ui-avatars.com/api/?name=Bob+Smith&background=3b82f6&color=fff',
      enrolledCourses: [
        { name: 'Data Structures', instructor: 'Prof. John', credits: 4 }
      ]
    },
    {
       id: 'ST-003',
       name: 'Charlie Davis',
       rollNumber: 'ME2023005',
       course: 'B.Tech Mechanical',
       gender: 'Male',
       dob: '2004-01-30',
       email: 'charlie.d@university.edu',
       phone: '+1 987 654 3210',
       department: 'Mechanical Engineering',
       section: 'B',
       semester: '4th Sem',
       enrollmentYear: 2023,
       attendancePercentage: 95,
       avatarUrl: 'https://ui-avatars.com/api/?name=Charlie+Davis&background=purple&color=fff',
       enrolledCourses: [
         { name: 'Thermodynamics', instructor: 'Dr. Banner', credits: 3 }
       ]
     }
  ]);

  const [studentAttendance] = useState([
     { studentId: 'ST-001', date: '2026-04-01', course: 'Data Structures', status: 'Present' },
     { studentId: 'ST-001', date: '2026-04-02', course: 'Operating Systems', status: 'Present' },
     { studentId: 'ST-001', date: '2026-04-03', course: 'Data Structures', status: 'Late' },
     { studentId: 'ST-002', date: '2026-04-01', course: 'Data Structures', status: 'Absent' },
     { studentId: 'ST-002', date: '2026-04-03', course: 'Data Structures', status: 'Absent' }
  ]);

  const [studentAssignments] = useState([
     { studentId: 'ST-001', assignmentTitle: 'BST Implementation', course: 'Data Structures', submissionDate: '2026-04-10', marks: '90/100', status: 'Graded' },
     { studentId: 'ST-001', assignmentTitle: 'Kernel Dev', course: 'Operating Systems', submissionDate: '2026-04-15', marks: '-', status: 'Submitted' },
     { studentId: 'ST-002', assignmentTitle: 'BST Implementation', course: 'Data Structures', submissionDate: '-', marks: '-', status: 'Missing' }
  ]);

  const [messages, setMessages] = useState([]);

  // Mock action triggering
  const sendStudentMessage = (studentId, subject, body) => {
    setMessages([...messages, { id: Date.now(), studentId, subject, body, sentAt: new Date().toISOString() }]);
  };

  const getStudentById = (id) => students.find(s => s.id === id);
  const getAttendanceById = (id) => studentAttendance.filter(a => a.studentId === id);
  const getAssignmentsById = (id) => studentAssignments.filter(a => a.studentId === id);

  return (
    <StudentContext.Provider value={{
      students,
      getStudentById,
      getAttendanceById,
      getAssignmentsById,
      sendStudentMessage,
      messages
    }}>
      {children}
    </StudentContext.Provider>
  );
};
