import { useState } from "react";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/ui/NavBar";
import Transactions from "./components/Transactions";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="transactions" element={<Transactions/>}/> 
      </Routes>
    </>
  );
}

export default App;
