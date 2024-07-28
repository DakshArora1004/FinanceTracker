import { useState } from "react";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/ui/NavBar";
import Transactions from "./components/Transactions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/create";
import Edit from "./components/edit";
import Delete from "./components/delete";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="transactions" element={<Transactions/>}/> 
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/delete/:id" element={<Delete/>}/>
      </Routes>
    </>
  );
}

export default App;
