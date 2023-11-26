import DefaultLayout from "../../layout/DefaultLayout";
import { Link } from "react-router-dom";

const DataSchedule = () => {
  // Dummy data array
  const dummyData = [
    { id: 1, name: "Cy Ganderton", gender: "Male", parent: "Blue" },
    { id: 2, name: "Hart Hagerty", gender: "Male", parent: "Purple" },
    { id: 3, name: "Brice Swyre", gender: "Male", parent: "Red" },
  ];

  return (
    <DefaultLayout>
      <div>
        <Link to="/schedule/add" className="btn btn-primary">
          Tambah
        </Link>
      </div>
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
            {dummyData.map((data, index) => (
              <tr key={data.id}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.parent}</td>
                <td>
                  <Link to="/schedule/detail/1" className="btn">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default DataSchedule;
