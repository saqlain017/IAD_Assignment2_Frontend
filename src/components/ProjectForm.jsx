import { useState, useEffect } from "react";

function ProjectForm({ project, onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name || "");
    } else {
      setName("");
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      setError("Project name must be at least 3 characters");
      return;
    }

    if (project) {
      onSubmit(project.id, name);
    } else {
      onSubmit(name);
    }

    setName("");
    setError("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">
        {project ? "Edit Project" : "Add New Project"}
      </h2>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Enter project name"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            {project ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
