import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import VehicleRegister from "./pages/VehicleRegister/VehicleRegister";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";
import MyBookings from "./pages/MyBookings/MyBookings";

import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/vehicleregister" element={<VehicleRegister />} />
              <Route path="/vehicle/:id" element={<VehicleDetails />} />
              <Route path="/mybookings" element={<MyBookings />} />
               
            </Routes>
          </div>
         <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
