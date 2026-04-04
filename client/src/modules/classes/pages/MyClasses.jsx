import { mockClasses } from "../data/mockClasses";
import ClassCard from "../components/ClassCard";

export default function MyClasses() {
  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Classes</h1>
        <p className="text-gray-500 mt-1">Manage all your currently assigned courses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {mockClasses.map(cls => (
            <ClassCard key={cls.id} classData={cls} />
         ))}
      </div>
    </div>
  );
}
