import React, { useState } from "react";
import axios from "axios";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.startDate) {
      setMessage("⚠ Name and Start Date are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        formData
      );

      setMessage("✅ Project created successfully!");
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      setMessage("❌ Failed to create project.");
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create New Project</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} className="project-form">
        {/* Project Name */}
        <label>Project Name *</label>
        <input
          type="text"
          name="name"
          placeholder="Enter project name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        {/* Start Date */}
        <label>Start Date *</label>
        <input
          type="date"
          name="startDate"
          required
          value={formData.startDate}
          onChange={handleChange}
        />

        {/* End Date */}
        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
