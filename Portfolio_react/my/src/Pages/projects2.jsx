import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
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

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <div className="project-card" key={project._id}>
          <h3 className="project-title">{project.name}</h3>
          <p className="project-description">{project.description}</p>

          <p><strong>Start:</strong> {new Date(project.startDate).toLocaleDateString()}</p>

          {project.endDate && (
            <p><strong>End:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
          )}

          <button className="view-btn">View Details</button>
        </div>
      ))}
    </div>
  );
};

export default Projects;
