import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
