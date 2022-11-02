import React from "react";
import { Routes, Route } from "react-router-dom";
import Authors from "./components/Authors/Authors";
import Books from "./components/Books/Books";
import MovingBooks from "./components/MovingBooks/MovingBooks";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/moving" element={<MovingBooks />} />
      </Routes>
    </div>
  );
}

export default App;
