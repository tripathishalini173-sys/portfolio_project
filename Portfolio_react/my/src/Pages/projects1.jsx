import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");

        // Check API response format
        const projectData = response.data?.data || [];

        setProjects(projectData);
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  if (projects.length === 0) return <p>No projects found.</p>;

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>

          {project.startDate && (
            <p>
              <strong>Start:</strong>{" "}
              {new Date(project.startDate).toLocaleDateString()}
            </p>
          )}

          {project.endDate && (
            <p>
              <strong>End:</strong>{" "}
              {new Date(project.endDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
