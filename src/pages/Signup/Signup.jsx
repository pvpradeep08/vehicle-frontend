import React, { useState } from "react";
import { registerUser } from "../../api/Api";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Signup successful!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder=" Enter Your Name" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Enter Your Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Enter Your Password" required onChange={handleChange} />
        <input   name="phone"  type="tel" placeholder="Enter Your Phone number" required onChange={handleChange}  />
        <button type="submit">Signup</button>
      </form>
         <p>Register as a Vehicle provider?<a href="./vehicleregister">Register vehicle</a></p>

      <p>Already have an account ? <a href="./login">Login</a></p>

    </div>
  );
};

export default Signup;
