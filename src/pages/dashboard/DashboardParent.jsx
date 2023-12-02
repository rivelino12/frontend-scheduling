import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardParent = () => {
  const [schedules, setSchedules] = useState([]);
  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/schedules");
      console.log(response.data);
      setSchedules(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((item, index) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.student.name}</td>
                <td>{item.class}</td>
                <td>
                  <Link to={`/schedule/detail/${item.uuid}`} className="btn">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardParent;
