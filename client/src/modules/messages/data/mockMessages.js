export const mockConversations = [
  {
    id: "conv-1",
    type: "individual",
    courseId: "CS301",
    courseName: "Data Structures",
    participants: [
      { id: "teach-1", name: "Professor John", role: "teacher", avatar: "https://ui-avatars.com/api/?name=Professor+John&background=f97316&color=fff" },
      { id: "stu-1", name: "Rahul Sharma", role: "student", avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=e2e8f0&color=475569" }
    ],
    lastMessage: "Assignment doubt regarding question 4",
    timestamp: "2026-04-05T10:35:00",
    unreadCount: 1,
    messages: [
      { id: "m-1", senderId: "stu-1", text: "Good morning Sir.", timestamp: "2026-04-05T10:30:00", status: "read", attachments: [] },
      { id: "m-2", senderId: "stu-1", text: "I have an assignment doubt regarding question 4. Do we need to use an AVL tree specifically, or is any balanced BST fine?", timestamp: "2026-04-05T10:35:00", status: "delivered", attachments: [{ id: "att-1", name: "Q4_details.pdf", type: "document", size: "125 KB" }] }
    ]
  },
  {
    id: "conv-2",
    type: "group",
    courseId: "CS405",
    courseName: "Advanced Algorithms",
    participants: [
      { id: "teach-1", name: "Professor John", role: "teacher", avatar: "https://ui-avatars.com/api/?name=Professor+John&background=f97316&color=fff" },
      { id: "group-1", name: "CS405 Class", role: "class", size: 65, avatar: "https://ui-avatars.com/api/?name=Advanced+Algorithms&background=DBEAFE&color=1D4ED8" }
    ],
    lastMessage: "Don't forget the guest lecture tomorrow.",
    timestamp: "2026-04-04T16:00:00",
    unreadCount: 0,
    messages: [
      { id: "m-3", senderId: "teach-1", text: "Don't forget the guest lecture tomorrow. Attendance will be taken digitally via the app.", timestamp: "2026-04-04T16:00:00", status: "read", attachments: [] }
    ]
  },
  {
    id: "conv-3",
    type: "individual",
    courseId: null,
    courseName: "Department Staff",
    participants: [
      { id: "teach-1", name: "Professor John", role: "teacher", avatar: "https://ui-avatars.com/api/?name=Professor+John&background=f97316&color=fff" },
      { id: "staff-1", name: "Admin Setup", role: "staff", avatar: "https://ui-avatars.com/api/?name=Admin+Setup&background=D1FAE5&color=065F46" }
    ],
    lastMessage: "Can you confirm the grades upload?",
    timestamp: "2026-04-02T09:15:00",
    unreadCount: 0,
    messages: [
      { id: "m-4", senderId: "staff-1", text: "Can you confirm the grades upload for CS301?", timestamp: "2026-04-02T09:15:00", status: "read", attachments: [] },
      { id: "m-5", senderId: "teach-1", text: "Yes, I uploaded them yesterday evening.", timestamp: "2026-04-02T09:45:00", status: "read", attachments: [] }
    ]
  }
];

export const mockStudents = [
  { id: "stu-1", name: "Rahul Sharma", course: "Data Structures", role: "student" },
  { id: "stu-2", name: "Priya Menon", course: "Advanced Algorithms", role: "student" },
  { id: "stu-3", name: "Amit Kumar", course: "Database Systems", role: "student" }
];

export const mockCourses = [
  { id: "CS301", name: "Data Structures - Section A" },
  { id: "CS405", name: "Advanced Algorithms" }
];
