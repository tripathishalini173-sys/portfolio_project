import React, { useEffect, useState } from "react";
import axios from "axios";
import prj from '../Pages/prj.jpg'
import { Link } from "react-router-dom";

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

  if (loading) return <p className="text-center mt-5">Loading projects...</p>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        {projects.map((project) => (
          <div className="col-md-4 col-sm-6" key={project._id}>
            <div className="card shadow-sm h-100">

              {/* Image */}
              <img
                src={prj|| "/default-project.jpg"}
                className="card-img-top"
                alt={project.name}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{project.name}</h5>
         

                <p className="card-text mb-1">
                  <strong>Start:</strong>{" "}
                  {new Date(project.startDate).toLocaleDateString()}
                </p>

                {project.endDate && (
                  <p className="card-text">
                    <strong>End:</strong>{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>
                )}

                 



<button className="btn btn-primary mt-auto">
  <Link
    to={`/projects/${project._id}`}
    style={{ color: "#fff", textDecoration: "none" }}
  >
    View Details
  </Link>
</button>

               



              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
