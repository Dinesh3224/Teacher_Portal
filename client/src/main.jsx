import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AssignmentProvider } from './context/AssignmentContext.jsx'
import { AttendanceProvider } from './context/AttendanceContext.jsx'
import { StudentProvider } from './context/StudentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProvider>
      <AttendanceProvider>
        <AssignmentProvider>
          <App />
        </AssignmentProvider>
      </AttendanceProvider>
    </StudentProvider>
  </StrictMode>,
)
