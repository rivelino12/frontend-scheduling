import DefaultLayout from "../../layout/DefaultLayout";
import { useEffect, useState } from "react";
import { CLASS } from "../../helper/constanta";
import axios from "axios";
import { Accordion, AccordionItem } from "../../components/accordion/Accordion";

const AddSchedule = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState(0);
  const [class_, setClass_] = useState("");
  const [schedules, setSchedules] = useState([
    {
      meeting: 1,
      material: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  ]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data.result);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScheduleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...schedules];
    list[index][name] = value;
    setSchedules(list);
  };

  const handleScheduleRemove = (index) => {
    const list = [...schedules];
    list.splice(index, 1);
    setSchedules(list);
  };

  const handleScheduleAdd = () => {
    // Menentukan nilai meeting untuk pertemuan baru
    const newMeeting = schedules.length + 1;

    setSchedules([
      ...schedules,
      {
        meeting: newMeeting,
        material: "",
        date: "",
        startTime: "",
        endTime: "",
      },
    ]);
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    console.log(studentId);
    console.log(class_);
    console.log(schedules);
    try {
      const response = await axios.post("http://localhost:5000/schedule", {
        _class: class_,
        studentId: studentId,
        subSchedulesData: schedules,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DefaultLayout>
      <form onSubmit={handleAddSchedule} className="App" autoComplete="off">
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="name" className="label">
              Nama
            </label>
            <select
              name="name"
              id="name"
              className="input input-bordered"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="" className="label">
              Kelas
            </label>
            <select
              type="text"
              className="input input-bordered"
              value={class_}
              onChange={(e) => setClass_(e.target.value)}
            >
              <option value={CLASS.BEGINNER}>{CLASS.BEGINNER}</option>
              <option value={CLASS.ADVANCED}>{CLASS.ADVANCED}</option>
              <option value={CLASS.SMP}>{CLASS.SMP}</option>
              <option value={CLASS.SMA}>{CLASS.SMA}</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="material" className="text-lg font-bold">
              Jadwal
            </label>
            <div className="mt-4">
              {schedules.map((singleSchedule, index) => (
                <Accordion key={index}>
                  <AccordionItem title={`Pertemuan ${singleSchedule.meeting}`}>
                    <div key={index} className="mt-4 schedules">
                      <div className="grid grid-cols-4 gap-4 first-division">
                        <input
                          name="material"
                          type="text"
                          id="material"
                          value={singleSchedule.material}
                          onChange={(e) => handleScheduleChange(e, index)}
                          required
                          placeholder="Material"
                          className="input input-bordered"
                        />
                        <input
                          name="date"
                          type="date"
                          id="date"
                          value={singleSchedule.date}
                          onChange={(e) => handleScheduleChange(e, index)}
                          required
                          placeholder="Date"
                          className="input input-bordered"
                        />
                        <input
                          name="startTime"
                          type="time"
                          id="startTime"
                          value={singleSchedule.startTime}
                          onChange={(e) => handleScheduleChange(e, index)}
                          required
                          placeholder="Start"
                          className="input input-bordered"
                        />
                        <input
                          name="endTime"
                          type="time"
                          id="endTime"
                          value={singleSchedule.endTime}
                          onChange={(e) => handleScheduleChange(e, index)}
                          required
                          placeholder="End"
                          className="input input-bordered"
                        />
                      </div>
                      {schedules.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => handleScheduleRemove(index)}
                          className="mt-4 btn btn-error"
                        >
                          <span>Hapus</span>
                        </button>
                      )}
                      <div className="mt-2 second-division">
                        {schedules.length - 1 === index && (
                          <button
                            type="button"
                            onClick={handleScheduleAdd}
                            className="btn btn-primary"
                          >
                            <span>Tambah</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button className="mt-6 btn btn-primary">Simpan</button>
        </div>
        <div className="mt-8 output">
          <h2 className="text-lg font-bold">Output</h2>
          {schedules &&
            schedules.map((singleSchedule, index) => (
              <ul key={index} className="list-disc list-inside">
                {singleSchedule.material && (
                  <li>{`Material: ${singleSchedule.material}`}</li>
                )}
                {singleSchedule.date && (
                  <li>{`Date: ${singleSchedule.date}`}</li>
                )}
                {singleSchedule.start && (
                  <li>{`Start: ${singleSchedule.start}`}</li>
                )}
                {singleSchedule.end && <li>{`End: ${singleSchedule.end}`}</li>}
              </ul>
            ))}
        </div>
      </form>
    </DefaultLayout>
  );
};

export default AddSchedule;
