import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import LogoKodeKiddo from "../assets/logo_kodekiddo.png";
import ToastError from "./toast/ToastError";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-screen bg-gray-100 sm:py-12">
        {isError && <ToastError message={message} />}
        <div className="p-10 mx-auto xs:p-0 md:w-full md:max-w-md">
          <form
            onSubmit={Auth}
            className="w-full bg-white divide-y divide-gray-200 rounded-lg shadow"
          >
            <div className="flex items-center justify-center">
              <img src={LogoKodeKiddo} alt="Logo" />
            </div>
            <div className="px-5 py-7">
              <label className="label">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full input input-bordered"
              />
              <label className="label">Kata Sandi</label>
              <input
                type="text"
                className="w-full input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
              />
              <button type="submit" className="w-full mt-6 btn btn-primary">
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
