import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch project by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
        const data = response.data.data;

        setProject({
          name: data.name,
          description: data.description,
          startDate: data.startDate ? data.startDate.split("T")[0] : "",
          endDate: data.endDate ? data.endDate.split("T")[0] : "",
        });
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/projects/${id}`, project);
      alert("Project updated successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={container}>
      <h1>Edit Project</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={label}>Project Name</label>
        <input
          type="text"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          style={input}
          required
        />

        <label style={label}>Description</label>
        <textarea
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          style={textarea}
          required
        ></textarea>

        <label style={label}>Start Date</label>
        <input
          type="date"
          value={project.startDate}
          onChange={(e) => setProject({ ...project, startDate: e.target.value })}
          style={input}
        />

        <label style={label}>End Date</label>
        <input
          type="date"
          value={project.endDate}
          onChange={(e) => setProject({ ...project, endDate: e.target.value })}
          style={input}
        />

        <button type="submit" style={btn}>Update Project</button>
      </form>
    </div>
  );
};

// Styles
const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#fff",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const label = {
  fontWeight: "bold",
};

const input = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const textarea = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  height: "120px",
};

const btn = {
  padding: "10px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "10px",
};

export default EditProject;
