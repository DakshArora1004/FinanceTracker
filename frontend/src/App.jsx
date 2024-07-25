import { useState } from "react";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/ui/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
