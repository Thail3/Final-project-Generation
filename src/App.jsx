import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/register/Register";

function App() {
  const user = localStorage.getItem("token");
  
  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" element={<Home />} />}
        {user && <Route path="/form" element={<Form />} />}
        {user && <Route path="/form/:id" element={<Form />} />}
        {user && <Route path="/profile" element={<Profile />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/profile" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
