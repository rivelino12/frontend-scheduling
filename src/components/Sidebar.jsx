import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="h-screen">
      <aside className="p-4 bg-gray-200 shadow-md">
        <p className="mb-2 text-lg font-bold">General</p>
        <ul className="pl-4 mb-4 list-disc">
          <li>
            <NavLink
              to="/dashboard"
              activeClassName="text-blue-500"
              className="hover:text-blue-500"
            >
              <IoHome className="inline-block mr-2" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              activeClassName="text-blue-500"
              className="hover:text-blue-500"
            >
              <IoPricetag className="inline-block mr-2" /> Products
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="mb-2 text-lg font-bold">Admin</p>
            <ul className="pl-4 mb-4 list-disc">
              <li>
                <NavLink
                  to="/users"
                  activeClassName="text-blue-500"
                  className="hover:text-blue-500"
                >
                  <IoPerson className="inline-block mr-2" /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="mb-2 text-lg font-bold">Settings</p>
        <ul className="pl-4 list-disc">
          <li>
            <button
              onClick={logout}
              className="px-4 py-2 text-white bg-red-500 rounded"
            >
              <IoLogOut className="inline-block mr-2" /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
