import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./admin/Dashboard";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

       
        <Route path="/" element={<Home />} />

       
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

       
        <Route path="/dashboard" element={<Dashboard />} />

       

      </Routes>
    </BrowserRouter>
  );
};

export default App;