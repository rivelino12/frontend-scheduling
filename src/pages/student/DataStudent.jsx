import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { Link } from "react-router-dom";
import axios from "axios";

const DataStudent = () => {
  const [students, setStudents] = useState([]);
  // Dummy data array

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dummyData = [
    { id: 1, name: "Cy Ganderton", gender: "Male", parent: "Blue" },
    { id: 2, name: "Hart Hagerty", gender: "Male", parent: "Purple" },
    { id: 3, name: "Brice Swyre", gender: "Male", parent: "Red" },
  ];

  return (
    <DefaultLayout>
      <div>
        <Link to="/student/add" className="btn btn-primary">
          Tambah
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Orang Tua</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {students.map((data, index) => (
              <tr key={data.uuid}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.gender === "MALE" ? "Laki-laki" : "Perempuan"}</td>
                <td>{data.user.name}</td>
                <td className="flex items-center space-x-4">
                  <Link to={`/student/edit/${data.uuid}`} className="btn">
                    Edit
                  </Link>
                  <button className="btn btn-error">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default DataStudent;
