import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: "parent",
      });
      navigate("/parents");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold">Tambah Orang Tua</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveUser}>
              <p className="has-text-centered">{msg}</p>
              <div>
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="w-1/2 input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div>
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="w-1/2 input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <label className="label">Kata Sandi</label>
                <div className="control">
                  <input
                    type="password"
                    className="w-1/2 input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>
              <div>
                <label className="label">Konfirmasi Kata Sandi</label>
                <div className="control">
                  <input
                    type="password"
                    className="w-1/2 input input-bordered"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
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

export default FormAddUser;
