import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GENDER } from "../../helper/constanta";

const FormAddStudent = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [userId, setUserId] = useState(1);
  const [msg, setMsg] = useState("");
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/student", {
        name: name,
        gender: gender,
        userId: userId,
      });
      navigate("/students");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const fetchParents = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setParents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold">Tambah Murid</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleAddStudent}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    className="w-1/2 input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rivelino"
                  />
                </div>
              </div>
              <div>
                <label className="label">Jenis Kelamin</label>
                <select
                  name="gender"
                  id="gender"
                  className="w-1/2 input input-bordered"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value={GENDER.FEMALE}>Perempuan</option>
                  <option value={GENDER.MALE}>Laki-laki</option>
                </select>
              </div>
              <div>
                <label className="label">Orang Tua</label>
                <select
                  name="parent"
                  id="parent"
                  className="w-1/2 input input-bordered"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                >
                  {parents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddStudent;
