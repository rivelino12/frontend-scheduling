import React, { useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import DashboardParent from "./dashboard/DashboardParent";
import DashboardTeacher from "./dashboard/DashboardTeacher";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <DefaultLayout>
      {user && user.role === "admin" && <DashboardTeacher />}
      {user && user.role === "parent" && <DashboardParent />}
    </DefaultLayout>
  );
};

export default Dashboard;
