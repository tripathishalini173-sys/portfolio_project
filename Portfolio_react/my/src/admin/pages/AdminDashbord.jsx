import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading projects...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1e1e2f",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>Admin Panel</h2>
        <a href="/admin/dashboard" style={linkStyle}>Dashboard</a>
        <a href="/admin/add-project" style={linkStyle}>Add Project</a>
        <a href="/admin/users" style={linkStyle}>Manage Users</a>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <h1 className="mb-4">Admin Dashboard</h1>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Start Date</th>
              <th style={thStyle}>End Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{project.name}</td>
                <td style={tdStyle}>{project.description}</td>
                <td style={tdStyle}>{new Date(project.startDate).toLocaleDateString()}</td>
                <td style={tdStyle}>
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}
                </td>
                <td style={tdStyle}>
                  <button style={editBtn}>Edit</button>{" "}
                  <button style={deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px 0",
  fontSize: "16px",
};

const thStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "10px",
};

const editBtn = {
  backgroundColor: "#f0ad4e",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
};

const deleteBtn = {
  backgroundColor: "#d9534f",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
};

export default AdminDashboard;
