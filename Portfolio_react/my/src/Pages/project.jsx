import React, { useEffect, useState } from "react";
import axios from "axios";
//import "./Projects.css"; // we'll add CSS next

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects/");
        setProjects(response.data.data); // assuming your API returns { data: [...] }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>
            <strong>Start:</strong> {new Date(project.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End:</strong> {new Date(project.endDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Project;
