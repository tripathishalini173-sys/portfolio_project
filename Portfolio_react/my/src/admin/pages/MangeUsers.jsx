import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();

  // Fetch users
 const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/users"); // now this works
    setUsers(res.data.data || []);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // Filter by search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading users...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Manage Users</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{ padding: "8px", width: "300px", marginBottom: "20px", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      {/* Users Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "15px" }}>No users found</td>
            </tr>
          ) : (
            currentUsers.map((user, index) => (
              <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{indexOfFirst + index + 1}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>
                  <button
                    style={editBtn}
                    onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={handlePrev} disabled={currentPage === 1} style={paginationBtn}>Prev</button>
          <span style={{ alignSelf: "center" }}>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages} style={paginationBtn}>Next</button>
        </div>
      )}
    </div>
  );
};

// Styles
const thStyle = { textAlign: "left", padding: "10px", borderBottom: "2px solid #ccc" };
const tdStyle = { padding: "10px" };
const editBtn = { backgroundColor: "#f0ad4e", border: "none", padding: "5px 10px", borderRadius: "4px", color: "#fff", cursor: "pointer", marginRight: "5px" };
const deleteBtn = { backgroundColor: "#d9534f", border: "none", padding: "5px 10px", borderRadius: "4px", color: "#fff", cursor: "pointer" };
const paginationBtn = { padding: "5px 12px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#f5f5f5", cursor: "pointer" };

export default ManageUsers;
