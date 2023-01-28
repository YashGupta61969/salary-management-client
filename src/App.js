import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminSignUp from "./pages/auth/AdminSignUp";
import Home from "./pages/home/Home";
import { login } from "./store/slices/adminSlice";
import Salary from "./pages/salary/Salary";
import Employee from "./pages/employee/Employee";
import SalaryForm from "./pages/salary/SalaryForm";
import EmployeeForm from "./pages/employee/EmployeeForm";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (data) {
      dispatch(login(data));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/salaries" element={<Salary />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/salary-form" element={<SalaryForm />} />
        </Route>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
