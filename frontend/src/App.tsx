import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Hero from "./components/Hero.tsx";
import Auth from "./components/Auth.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { useEffect } from "react";
import axios from "axios";
import Editor from "./components/Editor.tsx";
import SharedWithMe from "./components/SharedWithMe.tsx";
import AccessManagement from "./components/AccessManagement.tsx";

function App() {  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/editor/:projectId" element={<Editor />}></Route>
          <Route path="/shared-with-me" element={<SharedWithMe />}></Route>
          <Route path="/access-management" element={<AccessManagement />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
