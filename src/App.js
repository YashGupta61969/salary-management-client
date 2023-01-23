import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignUp from "./pages/admin/AdminSignUp";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<AdminLogin/>}/>
      <Route path="/signup" element={<AdminSignUp/>}/>
    </Routes>

    </div>
  );
}

export default App;
