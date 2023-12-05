import { SiGoogleclassroom } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardTeacher = () => {
  const [scheduleCounts, setScheduleCounts] = useState({});
  useEffect(() => {
    const fetchScheduleCount = async (classType) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/schedule/count/${classType}`
        );
        setScheduleCounts((prevCounts) => ({
          ...prevCounts,
          [classType]: response.data,
        }));
      } catch (error) {
        console.error(`Error fetching schedule count for ${classType}:`, error);
      }
    };

    const classesToFetch = ["SMP", "SMA", "BEGINNER", "ADVANCED"];

    classesToFetch.forEach((classType) => {
      fetchScheduleCount(classType);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 md:grid-cols-2">
      <div className="flex items-center justify-between p-6 h-36 box-shadow rounded-xl">
        <FaUser size={40} />
        <h3 className="text-2xl font-bold">Jumlah Murid</h3>
        <p className="text-6xl font-bold">8</p>
      </div>
      {Object.entries(scheduleCounts).map(([classType, count]) => (
        <div
          key={classType}
          className="flex items-center justify-between p-6 h-36 box-shadow rounded-xl"
        >
          <SiGoogleclassroom size={40} />
          <h3 className="text-2xl font-bold"> {`${classType}`}</h3>
          <p className="text-6xl font-bold">{`${count.result}`}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardTeacher;
