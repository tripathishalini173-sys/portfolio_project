import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.endDate && formData.startDate > formData.endDate) {
      setError("Start date cannot be after end date.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        formData
      );

      setSuccess("Project created successfully!");
      setFormData({ name: "", description: "", startDate: "", endDate: "" });

      // Redirect after short delay
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Project</h2>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Project Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextAreaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <InputField
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <InputField
          label="End Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

// Reusable input component
const InputField = ({ label, type = "text", ...props }) => (
  <div style={{ marginBottom: "15px" }}>
    <label>{label}:</label>
    <input
      type={type}
      {...props}
      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
    />
  </div>
);

// Reusable textarea component
const TextAreaField = ({ label, ...props }) => (
  <div style={{ marginBottom: "15px" }}>
    <label>{label}:</label>
    <textarea
      {...props}
      style={{ width: "100%", padding: "8px", marginTop: "5px" }}
    />
  </div>
);

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  error: { color: "red", marginBottom: "15px" },
  success: { color: "green", marginBottom: "15px" },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AddProject;
