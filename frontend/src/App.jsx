import { useState } from "react";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/ui/NavBar";
import Transactions from "./components/Transactions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/create";
import Edit from "./components/edit";
import Delete from "./components/delete";
import { TransactionProvider } from "./context/TransactionContext";
function App() {
  const [count, setCount] = useState(0);

  return (
    <TransactionProvider>
    <NavBar/>
    <div style={{ marginLeft: '250px', padding: '20px' }}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="transactions" element={<Transactions/>}/> 
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="/delete/:id" element={<Delete/>}/>
      </Routes>
      </div>
    </TransactionProvider>
  );
}

export default App;
