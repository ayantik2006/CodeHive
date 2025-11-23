import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
