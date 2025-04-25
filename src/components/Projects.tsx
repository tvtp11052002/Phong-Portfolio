'use client';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  position: string;
  demoUrl?: string;
  sourceUrl?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    position: '',
    demoUrl: '',
    sourceUrl: '',
  });

  const handleAddProject = () => {
    if (newProject.title && newProject.description && newProject.position) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({
        title: '',
        description: '',
        position: '',
        demoUrl: '',
        sourceUrl: '',
      });
      setShowAddForm(false);
    }
  };

  const filteredProjects = selectedPosition === 'all' 
    ? projects 
    : projects.filter(project => project.position === selectedPosition);

  return (
    <section id="projects" className="w-full py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">My Projects</h2>
          <div className="flex gap-4">
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="all">All Positions</option>
              <option value="backend">Backend Developer</option>
              <option value="ai">AI Developer</option>
              <option value="fullstack">Full Stack Developer</option>
            </select>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors relative z-20"
            >
              Add Project
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add New Project</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={4}
                />
                <select
                  value={newProject.position}
                  onChange={(e) => setNewProject({ ...newProject, position: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Position</option>
                  <option value="backend">Backend Developer</option>
                  <option value="ai">AI Developer</option>
                  <option value="fullstack">Full Stack Developer</option>
                </select>
                <input
                  type="text"
                  placeholder="Demo URL (optional)"
                  value={newProject.demoUrl}
                  onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Source Code URL (optional)"
                  value={newProject.sourceUrl}
                  onChange={(e) => setNewProject({ ...newProject, sourceUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white/80 dark:bg-gray-800/80 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      View Demo
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 