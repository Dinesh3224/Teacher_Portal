export const mockClasses = [
  {
    id: "CS301",
    name: "Data Structures",
    department: "Computer Science",
    studentsCount: 42,
    nextClass: "Monday 10:00 AM",
    attendanceRate: 85,
    assignmentsCreated: 4,
    students: [
      { id: "S101", name: "Alice Johnson", email: "alice.j@student.com", attendance: 90, assignmentCompletion: 80, presentToday: false },
      { id: "S102", name: "Bob Smith", email: "bob.s@student.com", attendance: 75, assignmentCompletion: 60, presentToday: false },
      { id: "S103", name: "Charlie Brown", email: "charlie.b@student.com", attendance: 95, assignmentCompletion: 100, presentToday: false },
    ],
    announcements: [
      { id: "A1", title: "Midterm Reminder", date: "2 days ago", content: "Midterm is scheduled for next Friday." }
    ],
    materials: [
      { id: "M1", title: "Syllabus", type: "PDF", size: "1.2 MB", date: "Jan 10" },
      { id: "M2", title: "Lecture 1 Slides", type: "PPT", size: "3.5 MB", date: "Jan 12" }
    ],
    assignments: [
      { id: "AS1", title: "Array Operations", dueDate: "Jan 20", maxMarks: 100, submittedCount: 38 },
      { id: "AS2", title: "Linked List Implementation", dueDate: "Feb 05", maxMarks: 100, submittedCount: 0 }
    ]
  },
  {
    id: "CS405",
    name: "Advanced Algorithms",
    department: "Computer Science",
    studentsCount: 35,
    nextClass: "Tuesday 1:00 PM",
    attendanceRate: 92,
    assignmentsCreated: 2,
    students: [
       { id: "S201", name: "Eve Davis", email: "eve.d@student.com", attendance: 98, assignmentCompletion: 100, presentToday: false },
    ],
    announcements: [],
    materials: [],
    assignments: []
  }
];
