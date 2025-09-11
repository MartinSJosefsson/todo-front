import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/api/auth/login", {
        username,
        password,
      });

      login({
        username,
        token: response.data.token,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1 className="brand-title">Task Manager</h1>
        <p className="brand-subtitle">
          Organize. Collaborate. Achieve more together.
        </p>
        <div className="illustration"></div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">Please log in to your account</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
