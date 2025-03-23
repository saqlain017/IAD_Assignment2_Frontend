function ProjectItem({ project, onEdit, onDelete }) {
  return (
    <li className="p-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-500">ID: {project.id}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(project)} className="btn btn-secondary">
            Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default ProjectItem;
