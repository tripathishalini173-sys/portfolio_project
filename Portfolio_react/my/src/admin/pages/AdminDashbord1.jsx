import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5; // projects per page

  const navigate = useNavigate();

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

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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

        {/* Search */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page when search changes
          }}
          style={{
            width: "300px",
            padding: "8px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Projects Table */}
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
            {currentProjects.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>
                  No projects found
                </td>
              </tr>
            ) : (
              currentProjects.map((project, index) => (
                <tr key={project._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={tdStyle}>{indexOfFirst + index + 1}</td>
                  <td style={tdStyle}>{project.name}</td>
                  <td style={tdStyle}>{project.description}</td>
                  <td style={tdStyle}>{new Date(project.startDate).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    {project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}
                  </td>
                  {/*<td style={tdStyle}>
                    <button style={editBtn}>Edit</button>{" "}
                    <button style={deleteBtn}>Delete</button>

                    

                  </td>*/}




                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-project/${project._id}`)
                      }
                      style={editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/admin/delete-project/${project._id}`)
                      }
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={handlePrev} disabled={currentPage === 1} style={paginationBtn}>
              Prev
            </button>
            <span style={{ alignSelf: "center" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} style={paginationBtn}>
              Next
            </button>
          {/*<button onClick={() => handleDelete(project._id)} style={deleteBtn}></button>
       <button onClick={() => navigate(`/admin/delete-project/${project._id}`)} style={deleteBtn}>
           Delete
             </button> 
             <button 
          onClick={() => navigate(`/admin/edit-project/${project._id}`)} 
        style={editBtn}>
          Edit
       </button>*/}


          </div>
        )}
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

const paginationBtn = {
  padding: "5px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
};

export default AdminDashboard;
