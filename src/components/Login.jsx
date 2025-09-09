import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:9090/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // 🔑 Try to find token in multiple common places
      const token =
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.jwt ||
        response.data?.authorization;

      if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Token saved:", token);
        navigate("/tasks"); // redirect to Tasks page
      } else {
        console.warn("⚠️ No token found in response:", response.data);
        setError("Login succeeded, but no token returned from server.");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
