import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { Link } from "react-router-dom";
import axios from "axios";

const DataParent = () => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    getParents();
  }, []);

  const getParents = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setParents(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getParents();
  };

  // Dummy data array
  const dummyData = [
    {
      id: 1,
      name: "Cy Ganderton",
      email: "harkewauran23@gmail.com",
      parent: "Blue",
    },
    {
      id: 2,
      name: "Hart Hagerty",
      email: "harkewauran23@gmail.com",
      parent: "Purple",
    },
    {
      id: 3,
      name: "Brice Swyre",
      email: "harkewauran23@gmail.com",
      parent: "Red",
    },
  ];

  return (
    <DefaultLayout>
      <div>
        <Link to="/parent/add" className="btn btn-primary">
          Tambah
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {parents.map((data, index) => (
              <tr key={data.id}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td className="flex items-center space-x-4">
                  <Link to={`/parent/edit/${data.uuid}`} className="btn">
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

export default DataParent;
