import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAssignments } from '../../context/AssignmentContext';
import { Plus, Search, Filter } from 'lucide-react';
import AssignmentTable from '../../components/assignments/AssignmentTable';

export default function AssignmentsDashboard() {
  const { assignments } = useAssignments();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter logic
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'All' ? true : assignment.course === filterCourse;
    const matchesStatus = filterStatus === 'All' ? true : assignment.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate__animated animate__fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track your distributed assignments.</p>
        </div>
        <Link 
          to="/assignments/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-xl hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
        >
          <Plus size={18} />
          Create Assignment
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center z-10 relative">
        <div className="relative w-full sm:max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search assignments..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
          />
        </div>
        
        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 w-full sm:w-auto">
            <Filter size={16} className="text-gray-500" />
            <select 
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
            >
              <option value="All">All Courses</option>
              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
              <option value="B.Tech Mechanical">B.Tech Mechanical</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 w-full sm:w-auto">
             <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignment Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <AssignmentTable assignments={filteredAssignments} />
      </div>
    </div>
  );
}
