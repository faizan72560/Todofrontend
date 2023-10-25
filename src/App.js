import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Routes }
  from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import './App.css';
import AddTask from './Components/AddTask';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<AddTask />} />

        </Routes>
      </Router>
    </div >
  );
}

export default App
