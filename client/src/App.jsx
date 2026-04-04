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
import "animate.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="classes">
            <Route index element={<MyClasses />} />
            <Route path=":classId" element={<ClassDashboard />} />
            <Route path=":classId/students" element={<Students />} />
            <Route path=":classId/assignments" element={<Assignments />} />
            <Route path=":classId/materials" element={<Materials />} />
            <Route path=":classId/attendance" element={<Attendance />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
