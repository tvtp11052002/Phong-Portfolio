'use client';
import { useState, useRef, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  position: string;
  imageUrl?: string;
  demoUrl?: string;
  sourceUrl?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    position: '',
    imageUrl: '',
    demoUrl: '',
    sourceUrl: '',
  });

  // The password you want to use - consider moving this to environment variables in production
  const CORRECT_PASSWORD = 'Phong25251325';

  // Load projects from localStorage on initial load
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Failed to parse saved projects:', error);
      }
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
  }, [projects]);

  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setShowPasswordModal(false);
      setShowAddForm(false);
      setPassword('');
      setPasswordError('');
      setIsAdmin(true); // ✅ đánh dấu là admin
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For a real app, you'd upload to a server
      // For this demo with localStorage, we need to convert to data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setPreviewImage(imageDataUrl);
        setNewProject({ ...newProject, imageUrl: imageDataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description && newProject.position) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({
        title: '',
        description: '',
        position: '',
        imageUrl: '',
        demoUrl: '',
        sourceUrl: '',
      });
      setPreviewImage(null);
      setShowAddForm(false);
    }
  };

  const handleUpdateProject = () => {
    if (projectToEdit) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === projectToEdit.id ? projectToEdit : proj
        )
      );
      setShowEditForm(false);
      setProjectToEdit(null);
      setPreviewImage(null);
    }
  };

  const confirmDelete = (id: number) => {
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteProject = () => {
    if (projectToDelete !== null) {
      setProjects(projects.filter(project => project.id !== projectToDelete));
      setShowDeleteModal(false);
      setProjectToDelete(null);
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
            {!isAdmin && (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Admin Login
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Project
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => setIsAdmin(false)}
                className="border border-blue-600 px-4 py-2 rounded-lg ml-auto text-gray-500 transition-colors hover:text-red-600"
              >
                Log Out
              </button>
            )}
          </div>
        </div>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Enter Administrator Password</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePasswordSubmit();
                    }
                  }}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword('');
                      setPasswordError('');
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Add Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
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
                
                {/* Image Upload Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Project Image</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      Choose Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="text-sm text-gray-500">
                      {previewImage ? 'Image selected' : 'No image selected'}
                    </span>
                  </div>
                  
                  {/* Image Preview */}
                  {previewImage && (
                    <div className="mt-2">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
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
                    onClick={() => {
                      setShowAddForm(false);
                      setPreviewImage(null);
                    }}
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

        {showEditForm && projectToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Edit Project</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={projectToEdit.title}
                  onChange={(e) =>
                    setProjectToEdit({ ...projectToEdit, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Project Description"
                  value={projectToEdit.description}
                  onChange={(e) =>
                    setProjectToEdit({ ...projectToEdit, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={4}
                />
                <select
                  value={projectToEdit.position}
                  onChange={(e) =>
                    setProjectToEdit({ ...projectToEdit, position: e.target.value })
                  }
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
                  value={projectToEdit.demoUrl || ''}
                  onChange={(e) =>
                    setProjectToEdit({ ...projectToEdit, demoUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Source Code URL (optional)"
                  value={projectToEdit.sourceUrl || ''}
                  onChange={(e) =>
                    setProjectToEdit({ ...projectToEdit, sourceUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                {/* Optional: image update can reuse previewImage */}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setShowEditForm(false);
                      setProjectToEdit(null);
                      setPreviewImage(null);
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Delete Project</h3>
              <p className="mb-4">Are you sure you want to delete this project? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProject}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white/80 dark:bg-gray-800/80 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm relative">
              {/* Project Image */}
              {project.imageUrl ? (
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
              ) : (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">No image</span>
                </div>
              )}

              {isAdmin && (
                <button
                  onClick={() => confirmDelete(project.id)}
                  className="absolute top-2 right-2 bg-red-400 text-white p-1 rounded-full hover:opacity-100 transition-opacity"
                  title="Delete project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}

              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <button
                    onClick={() => {
                      setProjectToEdit(project);
                      setShowEditForm(true);
                      setPreviewImage(project.imageUrl || null);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                    title="Edit project"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(project.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    title="Delete project"
                  >
                    Delete
                  </button>
                </div>
              )}
              
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
