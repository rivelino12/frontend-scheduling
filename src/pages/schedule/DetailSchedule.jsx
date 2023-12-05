import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DefaultLayout from "../../layout/DefaultLayout";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportScheduleStudent from "../../components/pdf/ReportScheduleStudent";

const DetailSchedule = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const [subSchedules, setSubSchedules] = useState([]);
  const [imageState, setImageState] = useState({ id: "", file: null });

  const fetchDetailSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/schedule/${id}`);
      const { schedule, subSchedules } = response.data.result;
      setSchedule(schedule);
      setSubSchedules(subSchedules);
    } catch (error) {
      console.error(error);
    }
  };

  const addImageToSubSchedule = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imageState.file);
      await axios.patch(
        `http://localhost:5000/schedule/sub-schedule/add-image/${imageState.id}`,
        formData
      );

      await fetchDetailSchedule();

      setImageState({ id: "", file: null });

      console.log("Image added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event, id) => {
    const file = event.target.files[0];
    setImageState({ id, file });
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
        <td>{renderImageSection(item)}</td>
        <td>{item.startTime}</td>
        <td>{item.endTime}</td>
      </tr>
    ));
  };

  const renderImageSection = (item) => {
    if (item.image === null) {
      return (
        <div className="flex flex-col items-center justify-center w-full bg-grey-lighter">
          <label className="flex flex-col items-center w-48 px-4 py-6 tracking-wide uppercase bg-white border rounded-lg shadow-lg cursor-pointer text-blue border-blue hover:bg-blue hover:text-gray-400">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-xs leading-normal">Tambah Gambar</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, item.uuid)}
            />
          </label>
          {imageState.file && (
            <button
              className="mt-4 btn"
              onClick={() => addImageToSubSchedule()}
            >
              Simpan
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <img src={item.url} alt="" className="w-20 h-20 " />
        </div>
      );
    }
  };

  const handleRenderButtonContent = ({ loading, error }) => {
    if (loading) {
      return "Generating PDF...";
    } else if (error) {
      return "Error while generating PDF!";
    } else {
      return (
        <button className="btn" disabled={loading}>
          Download PDF
        </button>
      );
    }
  };

  return (
    <DefaultLayout>
      <div className="flex justify-end">
        <PDFDownloadLink
          document={
            <ReportScheduleStudent
              _class={schedule.class}
              name={schedule.student?.name}
              subSchedules={subSchedules}
            />
          }
          fileName="table.pdf"
          className="btn"
        >
          {handleRenderButtonContent}
        </PDFDownloadLink>
      </div>
      <div>
        <label htmlFor="name" className="label">
          Nama
        </label>
        <input
          type="text"
          className="input input-disabled"
          value={schedule.student?.name}
          readOnly
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
          readOnly
        />
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Materi</th>
              <th>Tanggal</th>
              <th className="text-center">Gambar</th>
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
