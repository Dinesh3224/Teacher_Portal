import { useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import ContactInfo from "../components/profile/ContactInfo";
import ProfessionalInfo from "../components/profile/ProfessionalInfo";
import Qualifications from "../components/profile/Qualifications";
import TeachingInfo from "../components/profile/TeachingInfo";
import Documents from "../components/profile/Documents";
import AccountSettings from "../components/profile/AccountSettings";

const initialMockData = {
  name: "Professor John",
  designation: "Assistant Professor",
  department: "Computer Science",
  employeeId: "EMP-2023-CS01",
  experience: "8 Years",
  gender: "Male",
  dob: "1985-05-15",
  nationality: "Indian",
  maritalStatus: "Married",
  email: "john.doe@university.edu",
  phone: "+91 9876543210",
  alternatePhone: "+91 8765432109",
  officeLocation: "Block A, Room 304",
  address: "123 Faculty Quarters, University Campus, City",
  dateJoined: "2015-08-01",
  employmentType: "Full Time",
  qualifications: [
    {
      id: 1,
      degree: "PhD",
      specialization: "Computer Science",
      university: "IIT Madras",
      year: "2018",
    },
    {
      id: 2,
      degree: "M.Tech",
      specialization: "Software Engineering",
      university: "NIT Trichy",
      year: "2010",
    },
  ],
  courses: [
    {
      id: 1,
      subjectName: "Data Structures",
      assignedCourse: "B.Tech CS",
      semester: "3rd Sem",
      teachingHours: "4",
    },
    {
      id: 2,
      subjectName: "Operating Systems",
      assignedCourse: "B.Tech CS",
      semester: "4th Sem",
      teachingHours: "3",
    },
  ],
  documents: [
    { id: 1, name: "CV_John_Doe.pdf", type: "CV / Resume" },
    { id: 2, name: "PhD_Certificate.pdf", type: "Certificate" },
  ],
  settings: {
    notifications: true,
    language: "English",
  },
  avatarUrl: "https://ui-avatars.com/api/?name=Professor+John&background=f97316&color=fff",
};

export default function TeacherProfile() {
  const [profileData, setProfileData] = useState(initialMockData);

  const handleUpdate = (section, data) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleUpdateField = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let completed = 0;
    const fieldsToTrack = [
      'name', 'designation', 'department', 'employeeId', 'gender', 'dob',
      'nationality', 'maritalStatus', 'email', 'phone', 'address', 'dateJoined'
    ];
    
    fieldsToTrack.forEach(field => {
      if (profileData[field]) completed++;
    });

    if (profileData.qualifications && profileData.qualifications.length > 0) completed += 2;
    if (profileData.documents && profileData.documents.length > 0) completed += 2;

    const totalScore = fieldsToTrack.length + 4; // Adding weights for arrays
    return Math.round((completed / totalScore) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate__animated animate__fadeIn">
      {/* Profile Header & Completion */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Profile</h1>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-500">Profile Completion</span>
            <div className="flex items-center space-x-3 mt-1">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-orange-600">{completionPercentage}%</span>
            </div>
          </div>
        </div>

        <ProfileHeader 
          data={profileData} 
          onUpdate={handleUpdateField} 
        />
      </div>

      {/* Grid Layout for Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PersonalInfo data={profileData} onUpdate={handleUpdate} />
          <ContactInfo data={profileData} onUpdate={handleUpdate} />
        </div>
        
        <div className="space-y-6">
          <ProfessionalInfo data={profileData} onUpdate={handleUpdate} />
          <AccountSettings data={profileData.settings} onUpdate={(settings) => handleUpdate('settings', settings)} />
        </div>
      </div>

      <div className="space-y-6">
        <Qualifications data={profileData.qualifications} onUpdate={(qualifications) => handleUpdate('qualifications', qualifications)} />
        <TeachingInfo data={profileData.courses} onUpdate={(courses) => handleUpdate('courses', courses)} />
        <Documents data={profileData.documents} onUpdate={(documents) => handleUpdate('documents', documents)} />
      </div>
    </div>
  );
}
