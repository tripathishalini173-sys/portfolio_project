import React, { useState, useContext } from "react";
import { loginUser } from "../../api/userApi.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);

      // If backend supports admin validation
      if (data.user?.role !== "admin") {
        setError("Access denied! You are not an admin.");
        return;
      }

      login(data); 
      navigate("/admin/dashboard"); // Redirect admin

    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            name="password"
            type="password"
            placeholder="Admin Password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login as Admin
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Back to User Login?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Click here
        </Link>
      </p>
    </div>
  );
};

export default AdminLogin;
