import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import DataStudent from "./pages/student/DataStudent";
import AddStudent from "./pages/student/AddStudent";
import EditStudent from "./pages/student/EditStudent";
import DataSchedule from "./pages/schedule/DataSchedule";
import DataParent from "./pages/parents/DataParent";
import AddParent from "./pages/parents/AddParent";
import EditParent from "./pages/parents/EditParent";
import EditSchedule from "./pages/schedule/EditSchedule";
import AddSchedule from "./pages/schedule/AddSchedule";
import DetailSchedule from "./pages/schedule/DetailSchedule";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Student */}
          <Route path="/students" element={<DataStudent />} />
          <Route path="/student/add" element={<AddStudent />} />
          <Route path="/student/edit/:id" element={<EditStudent />} />
          {/* Schedule */}
          <Route path="/schedules" element={<DataSchedule />} />
          <Route path="/schedule/add" element={<AddSchedule />} />
          <Route path="/schedule/edit/:id" element={<EditSchedule />} />
          <Route path="/schedule/detail/:id" element={<DetailSchedule />} />
          {/* Parent */}
          <Route path="/parents" element={<DataParent />} />
          <Route path="/parent/add" element={<AddParent />} />
          <Route path="/parent/edit/:id" element={<EditParent />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
