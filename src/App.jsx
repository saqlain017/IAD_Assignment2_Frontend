import { useState, useEffect } from "react";
import { ProjectForm, ProjectList } from "./components";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://project-management-production-2936.up.railway.app/api/projects");
      const data = await response.json();

      if (data.status === "success") {
        setProjects(data.projects);
      } else {
        setError("Failed to fetch projects");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (projectName) => {
    try {
      const response = await fetch("https://project-management-production-2936.up.railway.app/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setProjects([...projects, data.project]);
        setShowForm(false);
      } else {
        alert(data.message || "Failed to add project");
      }
    } catch (err) {
      alert("Error connecting to server");
      console.error(err);
    }
  };

  const handleUpdateProject = async (id, projectName) => {
    try {
      const response = await fetch(`https://project-management-production-2936.up.railway.app/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setProjects(
          projects.map((project) =>
            project.id === id ? data.project : project
          )
        );
        setEditingProject(null);
        setShowForm(false);
      } else {
        alert(data.message || "Failed to update project");
      }
    } catch (err) {
      alert("Error connecting to server");
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const response = await fetch(`https://project-management-production-2936.up.railway.app/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.status === "success") {
        setProjects(projects.filter((project) => project.id !== id));
      } else {
        alert(data.message || "Failed to delete project");
      }
    } catch (err) {
      alert("Error connecting to server");
      console.error(err);
    }
  };

  const startEditing = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Project Manager
            </h1>
            <button
              onClick={() => {
                setEditingProject(null);
                setShowForm(!showForm);
              }}
              className="btn btn-primary"
            >
              {showForm ? "Cancel" : "Add Project"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8">
            <ProjectForm
              project={editingProject}
              onSubmit={editingProject ? handleUpdateProject : handleAddProject}
            />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProjectList
            projects={projects}
            onEdit={startEditing}
            onDelete={handleDeleteProject}
          />
        )}
      </main>
    </div>
  );
}

export default App;
