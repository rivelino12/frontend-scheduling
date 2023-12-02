import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DefaultLayout from "../../layout/DefaultLayout";

const DetailSchedule = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const [subSchedules, setSubSchedules] = useState([]);

  const fetchDetailSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/schedule/${id}`);
      const { schedule, subSchedules } = response.data.result;
      setSchedule(schedule);
      setSubSchedules(subSchedules);
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchDetailSchedule();
  }, [id]);

  const renderSubSchedules = () => {
    return subSchedules.map((item, index) => (
      <tr key={item.id}>
        <th>{index + 1}</th>
        <td>{item.material}</td>
        <td>{item.date}</td>
        <td>{item.startTime}</td>
        <td>{item.endTime}</td>
      </tr>
    ));
  };

  return (
    <DefaultLayout>
      <div>
        <label htmlFor="name" className="label">
          Nama
        </label>
        <input
          type="text"
          className="input input-disabled"
          value={schedule.student?.name}
        />
      </div>
      <div>
        <label htmlFor="name" className="label">
          Kelas
        </label>
        <input
          type="text"
          className="input input-disabled"
          value={schedule.class}
        />
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Materi</th>
              <th>Tanggal</th>
              <th>Mulai</th>
              <th>Berakhir</th>
            </tr>
          </thead>
          <tbody>{renderSubSchedules()}</tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default DetailSchedule;
