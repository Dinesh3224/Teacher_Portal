import { createContext, useState, useContext } from 'react';

const AssignmentContext = createContext();

export const useAssignments = () => useContext(AssignmentContext);

export const AssignmentProvider = ({ children }) => {
  // Mock Data arrays
  const [assignments, setAssignments] = useState([
    {
      id: '1',
      title: 'Data Structures Implementation',
      course: 'B.Tech Computer Science',
      subject: 'Data Structures',
      description: 'Implement a complete binary search tree with self-balancing logic.',
      instructions: 'Use Java or C++. Must submit source code and explanation PDF.',
      totalMarks: 100,
      dueDate: '2026-04-15',
      submissionType: 'Both',
      status: 'Active',
      allowLate: false,
    },
    {
      id: '2',
      title: 'Algorithm Analysis Paper',
      course: 'B.Tech Computer Science',
      subject: 'Algorithms',
      description: 'Write a comparative analysis of Kruskal’s vs Prim’s algorithms.',
      instructions: 'Submit a PDF report. Minimum 5 pages.',
      totalMarks: 50,
      dueDate: '2026-03-01',
      submissionType: 'File Upload',
      status: 'Closed',
      allowLate: false,
    }
  ]);

  // Mock Submissions (tied to Assignment ID and Student ID)
  const [submissions, setSubmissions] = useState([
    {
      id: 's1',
      assignmentId: '1',
      studentName: 'Alice Johnson',
      studentId: 'ST-2023-01',
      submissionTime: '2026-04-10T14:30:00Z',
      fileSubmitted: 'BST_Implementation.zip',
      textAnswer: 'Attached the zip file as requested.',
      status: 'Submitted',
      marks: null,
      feedback: ''
    },
    {
      id: 's2',
      assignmentId: '1',
      studentName: 'Bob Smith',
      studentId: 'ST-2023-02',
      submissionTime: '2026-04-12T09:15:00Z',
      fileSubmitted: 'Bob_BST.cpp',
      textAnswer: '',
      status: 'Graded',
      marks: 85,
      feedback: 'Good implementation, but lacks self-balancing features.'
    },
    {
      id: 's3',
      assignmentId: '2',
      studentName: 'Alice Johnson',
      studentId: 'ST-2023-01',
      submissionTime: '2026-03-01T10:00:00Z',
      fileSubmitted: 'AlgoAnalysis.pdf',
      textAnswer: '',
      status: 'Graded',
      marks: 45,
      feedback: 'Excellent comparison and graphs.'
    }
  ]);

  // Context Actions
  const addAssignment = (assignment) => {
    setAssignments([...assignments, { ...assignment, id: Date.now().toString() }]);
  };

  const updateAssignment = (id, updatedData) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
    // Optionally clean up dependent submissions
    setSubmissions(submissions.filter(s => s.assignmentId !== id));
  };

  const getSubmissionsByAssignmentId = (id) => {
    return submissions.filter(s => s.assignmentId === id);
  };

  const gradeSubmission = (submissionId, marks, feedback) => {
    setSubmissions(submissions.map(s => 
      s.id === submissionId 
        ? { ...s, marks: Number(marks), feedback, status: 'Graded' }
        : s
    ));
  };

  return (
    <AssignmentContext.Provider value={{
      assignments,
      addAssignment,
      updateAssignment,
      deleteAssignment,
      submissions,
      getSubmissionsByAssignmentId,
      gradeSubmission
    }}>
      {children}
    </AssignmentContext.Provider>
  );
};
