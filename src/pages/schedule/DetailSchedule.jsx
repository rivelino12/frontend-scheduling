import DefaultLayout from "../../layout/DefaultLayout";
import { Link } from "react-router-dom";

const DetailSchedule = () => {
  // Dummy data array
  const dummyData = [
    {
      id: 1,
      materi: "Subject A",
      tanggal: "2023-11-25",
      mulai: "08:00",
      berakhir: "10:00",
    },
    {
      id: 2,
      materi: "Subject B",
      tanggal: "2023-11-26",
      mulai: "09:30",
      berakhir: "11:30",
    },
    {
      id: 3,
      materi: "Subject C",
      tanggal: "2023-11-27",
      mulai: "13:00",
      berakhir: "15:00",
    },
    {
      id: 4,
      materi: "Subject D",
      tanggal: "2023-11-28",
      mulai: "10:00",
      berakhir: "12:00",
    },
    {
      id: 5,
      materi: "Subject E",
      tanggal: "2023-11-29",
      mulai: "14:30",
      berakhir: "16:30",
    },
    {
      id: 6,
      materi: "Subject F",
      tanggal: "2023-11-30",
      mulai: "11:00",
      berakhir: "13:00",
    },
    {
      id: 7,
      materi: "Subject G",
      tanggal: "2023-12-01",
      mulai: "08:30",
      berakhir: "10:30",
    },
    {
      id: 8,
      materi: "Subject H",
      tanggal: "2023-12-02",
      mulai: "12:30",
      berakhir: "14:30",
    },
    {
      id: 9,
      materi: "Subject I",
      tanggal: "2023-12-03",
      mulai: "09:00",
      berakhir: "11:00",
    },
    {
      id: 10,
      materi: "Subject J",
      tanggal: "2023-12-04",
      mulai: "15:00",
      berakhir: "17:00",
    },
    {
      id: 11,
      materi: "Subject K",
      tanggal: "2023-12-05",
      mulai: "10:30",
      berakhir: "12:30",
    },
    {
      id: 12,
      materi: "Subject L",
      tanggal: "2023-12-06",
      mulai: "13:30",
      berakhir: "15:30",
    },
  ];

  return (
    <DefaultLayout>
      <div>
        <label htmlFor="name" className="label">
          Nama
        </label>
        <input type="text" className="input input-disabled" value="Lino" />
      </div>
      <div>
        <label htmlFor="name" className="label">
          Kelas
        </label>
        <input type="text" className="input input-disabled" value="SMP" />
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
          <tbody>
            {dummyData.map((data, index) => (
              <tr key={data.id}>
                <th>{index + 1}</th>
                <td>{data.materi}</td>
                <td>{data.tanggal}</td>
                <td>{data.mulai}</td>
                <td>{data.berakhir}</td>
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

export default DetailSchedule;
