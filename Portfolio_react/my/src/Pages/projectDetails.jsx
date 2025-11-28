import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import prj from "../Pages/prj.jpg";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(response.data.data);
      } catch (err) {
        setError("Failed to fetch project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!project) return <p>No project found.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>{project.name}</h2>
      <img
        src={project.image || prj}
        alt={project.name}
        style={{ width: "100%", height: "300px", objectFit: "cover", marginBottom: "20px" }}
      />
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
      {project.endDate && <p><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</p>}
    </div>
  );
};

export default ProjectDetails;
