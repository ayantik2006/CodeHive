import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Hero from "./components/Hero.tsx";
import Auth from "./components/Auth.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .post(BACKEND_URL + "/auth/user", {}, { withCredentials: true })
  //     .then(() => {
  //       navigate("/dashboard");
  //     })
  //     .catch(() => {
  //       navigate("/");
  //     });
  // }, [BACKEND_URL, navigate]);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
