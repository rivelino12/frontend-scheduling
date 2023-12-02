import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { GENDER } from "../../helper/constanta";

const FormEditStudent = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [userId, setUserId] = useState("");
  const [msg, setMsg] = useState("");
  const [parents, setParents] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchParents();
    getProductById();
  }, [id]);

  const fetchParents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setParents(response.data.result);
    } catch (error) {
      console.error("Error fetching parents:", error);
    }
  };

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/student/${id}`);
      const { name, gender, user } = response.data;
      setName(name);
      setGender(gender);
      setUserId(user.id);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        console.error("Error fetching student:", error);
      }
    }
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/student/${id}`,
        {
          name,
          gender,
          userId,
        }
      );
      if (response.data.lengt !== 0) {
        navigate("/students");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Edit Murid</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateStudent}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama</label>
                <div className="control">
                  <input
                    type="text"
                    className="w-1/2 input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Jenis Kelamin</label>
                <div className="control">
                  <select
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    id="gender"
                    className="w-1/2 input input-bordered"
                  >
                    <option value={GENDER.FEMALE}>Perempuan</option>
                    <option value={GENDER.MALE}>Laki-Laki</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label className="label">Orang Tua</label>
                <select
                  name="parent"
                  id="parent"
                  value={userId}
                  className="w-1/2 input input-bordered"
                  onChange={(e) => setUserId(e.target.value)}
                >
                  {parents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="mt-6 btn btn-primary">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditStudent;
