import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MyClasses from "./modules/classes/pages/MyClasses";
import ClassDashboard from "./modules/classes/pages/ClassDashboard";
import Students from "./modules/classes/pages/Students";
import Assignments from "./modules/classes/pages/Assignments";
import Materials from "./modules/classes/pages/Materials";
import Attendance from "./modules/classes/pages/Attendance";
import Timetable from "./modules/timetable/pages/Timetable";
import SettingsPage from "./modules/settings/pages/SettingsPage";
import CourseMaterials from "./modules/materials/pages/CourseMaterials";
import AnnouncementsPage from "./modules/announcements/pages/AnnouncementsPage";
import MessagesPage from "./modules/messages/pages/MessagesPage";

import AttendanceDashboard from "./pages/attendance/AttendanceDashboard";
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceHistory from "./pages/attendance/AttendanceHistory";
import AttendanceReport from "./pages/attendance/AttendanceReport";

import TeacherProfile from "./pages/TeacherProfile";

import AssignmentsDashboard from "./pages/assignments/AssignmentsDashboard";
import CreateAssignment from "./pages/assignments/CreateAssignment";
import AssignmentDetails from "./pages/assignments/AssignmentDetails";
import AssignmentSubmissions from "./pages/assignments/AssignmentSubmissions";
import GradeAssignment from "./pages/assignments/GradeAssignment";

import StudentsDashboard from "./pages/students/StudentsDashboard";
import StudentList from "./pages/students/StudentList";
import StudentProfile from "./pages/students/StudentProfile";
import StudentAttendance from "./pages/students/StudentAttendance";
import StudentAssignments from "./pages/students/StudentAssignments";

import { MessageProvider } from "./context/MessageContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";

import "animate.css";
import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MessageProvider>
          <Routes>
            {/* Public route - checking active session inside component */}
            <Route path="/login" element={<Login />} />

            {/* Restricted root handles fallback to login securely */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected internal application routes mapped under Layout shell */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="materials" element={<CourseMaterials />} />
              <Route path="announcements" element={<AnnouncementsPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="classes">
                <Route index element={<MyClasses />} />
                <Route path=":classId" element={<ClassDashboard />} />
                <Route path=":classId/attendance" element={<Attendance />} />
                <Route path=":classId/students" element={<Students />} />
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

            {/* Fallback all unmatched routes cleanly relative to auth */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MessageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
