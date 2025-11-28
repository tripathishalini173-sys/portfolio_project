import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        const data = res.data.data;
        setUser({
          name: data.name,
          email: data.email,
          role: data.role,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, user);
      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={container}>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={label}>Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={input}
          required
        />

        <label style={label}>Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={input}
          required
        />

        <label style={label}>Role</label>
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          style={input}
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button type="submit" style={btn}>Update User</button>
      </form>
    </div>
  );
};

// Styles
const container = { maxWidth: "500px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "white" };
const formStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const label = { fontWeight: "bold" };
const input = { padding: "10px", border: "1px solid #ccc", borderRadius: "4px" };
const btn = { padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" };

export default EditUser;
