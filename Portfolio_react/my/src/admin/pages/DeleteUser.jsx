import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user to confirm deletion
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!user) return <h3 style={{ textAlign: "center" }}>User not found</h3>;

  return (
    <div style={container}>
      <h2>Delete User</h2>
      <p>Are you sure you want to delete this user?</p>

      <div style={detailsBox}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div style={btnRow}>
        <button style={deleteBtn} onClick={handleDelete}>Yes, Delete</button>
        <button style={cancelBtn} onClick={() => navigate("/admin/users")}>Cancel</button>
      </div>
    </div>
  );
};

// Styles
const container = { maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "white" };
const detailsBox = { background: "#f9f9f9", padding: "15px", borderRadius: "6px", marginTop: "10px", marginBottom: "20px" };
const btnRow = { display: "flex", justifyContent: "space-between" };
const deleteBtn = { background: "#d9534f", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" };
const cancelBtn = { background: "#6c757d", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" };

export default DeleteUser;
