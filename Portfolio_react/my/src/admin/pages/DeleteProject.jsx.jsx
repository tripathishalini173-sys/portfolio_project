import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch project to show confirmation info
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(res.data.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Project not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      alert("Project deleted successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete project.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (!project) return <h3 style={{ textAlign: "center" }}>Project not found</h3>;

  return (
    <div style={container}>
      <h2>Delete Project</h2>
      <p>Are you sure you want to delete this project?</p>

      <div style={detailsBox}>
        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
        <p>
          <strong>End Date:</strong>{" "}
          {project.endDate ? new Date(project.endDate).toLocaleDateString() : "—"}
        </p>
      </div>

      <div style={btnRow}>
        <button style={deleteBtn} onClick={handleDelete}>Yes, Delete</button>
        <button style={cancelBtn} onClick={() => navigate("/admin/dashboard")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const container = {
  maxWidth: "500px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "white",
};

const detailsBox = {
  background: "#f9f9f9",
  padding: "15px",
  borderRadius: "6px",
  marginTop: "10px",
  marginBottom: "20px",
};

const btnRow = {
  display: "flex",
  justifyContent: "space-between",
};

const deleteBtn = {
  background: "#d9534f",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#6c757d",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

export default DeleteProject;
