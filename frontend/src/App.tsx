import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.tsx";
import Auth from "./components/Auth.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
