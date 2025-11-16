import React, { useState, useContext } from "react";
import { loginUser } from "../../api/Api";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
 const { login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear previous messages

    try {
      const user = await loginUser(formData);
      login(user); // update context
      localStorage.setItem("user", JSON.stringify(user)); // persist login
      setMessage("Login successful!");
      navigate("/"); // redirect to home page
    } catch (err) {
      setMessage(err.message || "Invalid credentials. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {message && <p className="msg">{message}</p>}
      </form>

      <p>
        Didn't have an account? <a href="/signup">Create account</a>
      </p>
    </div>
  );
};

export default Login;
