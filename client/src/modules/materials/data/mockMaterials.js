/**
 * Mock data for Course Materials organized by course and week.
 * Each course has a list of weeks, and each week contains materials.
 */
export const mockCourses = [
  {
    id: "CS301",
    name: "Data Structures",
    department: "Computer Science",
    semester: "3rd Sem",
    color: "blue",
  },
  {
    id: "CS405",
    name: "Advanced Algorithms",
    department: "Computer Science",
    semester: "4th Sem",
    color: "purple",
  },
  {
    id: "CS305",
    name: "Database Systems",
    department: "Computer Science",
    semester: "3rd Sem",
    color: "green",
  },
];

export const mockMaterials = {
  CS301: [
    {
      week: 1,
      label: "Week 1 — Introduction to Data Structures",
      items: [
        { id: "m1", name: "Lecture Slides — Intro to DS", type: "slides", size: "2.4 MB", uploadedAt: "2026-01-06", downloads: 45 },
        { id: "m2", name: "Reading Material — Arrays & Linked Lists", type: "reading", size: "1.1 MB", uploadedAt: "2026-01-06", downloads: 38 },
        { id: "m3", name: "Assignment 1 — Array Operations", type: "assignment", size: "340 KB", uploadedAt: "2026-01-08", downloads: 52 },
      ],
    },
    {
      week: 2,
      label: "Week 2 — Stacks & Queues",
      items: [
        { id: "m4", name: "Lecture Slides — Stacks & Queues", type: "slides", size: "3.1 MB", uploadedAt: "2026-01-13", downloads: 41 },
        { id: "m5", name: "Lab Material — Stack Implementation", type: "lab", size: "890 KB", uploadedAt: "2026-01-14", downloads: 33 },
        { id: "m6", name: "Reference Links — Visualization Tools", type: "reference", size: "—", uploadedAt: "2026-01-15", downloads: 28 },
      ],
    },
    {
      week: 3,
      label: "Week 3 — Trees & Binary Search Trees",
      items: [
        { id: "m7", name: "Lecture Slides — Trees Overview", type: "slides", size: "4.2 MB", uploadedAt: "2026-01-20", downloads: 36 },
        { id: "m8", name: "Reading Material — BST Properties", type: "reading", size: "1.5 MB", uploadedAt: "2026-01-21", downloads: 29 },
        { id: "m9", name: "Assignment 2 — Tree Traversals", type: "assignment", size: "280 KB", uploadedAt: "2026-01-22", downloads: 44 },
        { id: "m10", name: "Lab Material — BST Implementation", type: "lab", size: "950 KB", uploadedAt: "2026-01-23", downloads: 31 },
      ],
    },
  ],
  CS405: [
    {
      week: 1,
      label: "Week 1 — Algorithm Analysis Foundations",
      items: [
        { id: "m11", name: "Lecture Slides — Big-O Notation", type: "slides", size: "2.8 MB", uploadedAt: "2026-01-06", downloads: 30 },
        { id: "m12", name: "Reading Material — Asymptotic Analysis", type: "reading", size: "1.3 MB", uploadedAt: "2026-01-07", downloads: 25 },
      ],
    },
    {
      week: 2,
      label: "Week 2 — Divide & Conquer",
      items: [
        { id: "m13", name: "Lecture Slides — Merge Sort & Quick Sort", type: "slides", size: "3.5 MB", uploadedAt: "2026-01-13", downloads: 27 },
        { id: "m14", name: "Assignment 1 — Sorting Algorithms", type: "assignment", size: "400 KB", uploadedAt: "2026-01-15", downloads: 35 },
        { id: "m15", name: "Reference Links — Sorting Visualizer", type: "reference", size: "—", uploadedAt: "2026-01-15", downloads: 22 },
      ],
    },
  ],
  CS305: [
    {
      week: 1,
      label: "Week 1 — Relational Database Fundamentals",
      items: [
        { id: "m16", name: "Lecture Slides — ER Diagrams", type: "slides", size: "3.0 MB", uploadedAt: "2026-01-06", downloads: 42 },
        { id: "m17", name: "Reading Material — Normalization", type: "reading", size: "1.7 MB", uploadedAt: "2026-01-07", downloads: 38 },
        { id: "m18", name: "Lab Material — MySQL Setup Guide", type: "lab", size: "560 KB", uploadedAt: "2026-01-08", downloads: 50 },
      ],
    },
  ],
};
