import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MyClasses from "./modules/classes/pages/MyClasses";
import ClassDashboard from "./modules/classes/pages/ClassDashboard";
import Students from "./modules/classes/pages/Students";
import Assignments from "./modules/classes/pages/Assignments";
import Materials from "./modules/classes/pages/Materials";
// Global Attendance Pages
import AttendanceDashboard from "./pages/attendance/AttendanceDashboard";
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceHistory from "./pages/attendance/AttendanceHistory";
import AttendanceReport from "./pages/attendance/AttendanceReport";

import TeacherProfile from "./pages/TeacherProfile";

// Global Assignments Module Pages
import AssignmentsDashboard from "./pages/assignments/AssignmentsDashboard";
import CreateAssignment from "./pages/assignments/CreateAssignment";
import AssignmentDetails from "./pages/assignments/AssignmentDetails";
import AssignmentSubmissions from "./pages/assignments/AssignmentSubmissions";
import GradeAssignment from "./pages/assignments/GradeAssignment";

// Global Students Module Pages
import StudentsDashboard from "./pages/students/StudentsDashboard";
import StudentList from "./pages/students/StudentList";
import StudentProfile from "./pages/students/StudentProfile";
import StudentAttendance from "./pages/students/StudentAttendance";
import StudentAssignments from "./pages/students/StudentAssignments";

import "animate.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="classes">
            <Route index element={<MyClasses />} />
            <Route path=":classId" element={<ClassDashboard />} />
            <Route path=":classId/assignments" element={<Assignments />} />
            <Route path=":classId/materials" element={<Materials />} />
          </Route>

          <Route path="students">
            <Route index element={<StudentsDashboard />} />
            <Route path="list" element={<StudentList />} />
            <Route path=":id" element={<StudentProfile />} />
            <Route path=":id/attendance" element={<StudentAttendance />} />
            <Route path=":id/assignments" element={<StudentAssignments />} />
          </Route>
          
          <Route path="assignments">
            <Route index element={<AssignmentsDashboard />} />
            <Route path="create" element={<CreateAssignment />} />
            <Route path=":id" element={<AssignmentDetails />} />
            <Route path=":id/submissions" element={<AssignmentSubmissions />} />
            <Route path=":id/grade/:studentId" element={<GradeAssignment />} />
          </Route>

          <Route path="attendance">
            <Route index element={<AttendanceDashboard />} />
            <Route path="mark" element={<MarkAttendance />} />
            <Route path="history" element={<AttendanceHistory />} />
            <Route path="report" element={<AttendanceReport />} />
          </Route>
          
          <Route path="profile" element={<TeacherProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
