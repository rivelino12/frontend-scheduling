import { SiGoogleclassroom } from "react-icons/si";
import { FaUser } from "react-icons/fa";

const DashboardTeacher = () => {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 md:grid-cols-2">
      <div className="flex items-center justify-between p-6 h-36 box-shadow rounded-xl">
        <FaUser size={40} />
        <h3 className="text-2xl font-bold">Jumlah Murid</h3>
        <p className="text-6xl font-bold">8</p>
      </div>
      <div className="flex items-center justify-between p-6 h-36 box-shadow rounded-xl">
        <FaUser size={40} />
        <h3 className="text-2xl font-bold">Jumlah Murid</h3>
        <p className="text-6xl font-bold">8</p>
      </div>
      <div className="flex items-center justify-between p-6 h-36 box-shadow rounded-xl">
        <FaUser size={40} />
        <h3 className="text-2xl font-bold">Jumlah Murid</h3>
        <p className="text-6xl font-bold">8</p>
      </div>
      <div className="flex items-center justify-between p-6 h-36 box-shadow rounded-xl">
        <FaUser size={40} />
        <h3 className="text-2xl font-bold">Jumlah Murid</h3>
        <p className="text-6xl font-bold">8</p>
      </div>
    </div>
  );
};

export default DashboardTeacher;
