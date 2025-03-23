import ProjectItem from "./ProjectItem";

function ProjectList({ projects, onEdit, onDelete }) {
  if (projects.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">
          No projects found. Create your first project!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
