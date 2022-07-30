import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
