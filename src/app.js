// Helper functions
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Factories
const createProject = (name, dueDate, details) => ({
  id: generateId(),
  name,
  dueDate,
  details
});

// Data Controller
const DataController = (() => {
  let projects = loadFromLocalStorage('projects');
  const saveProjects = () => saveToLocalStorage('projects', projects);
  const addProject = (name, dueDate, details) => {
    const newProject = createProject(name, dueDate, details);
    projects.push(newProject);
    saveProjects();
  };
  const deleteProject = (projectId) => {
    projects = projects.filter(project => project.id !== projectId);
    saveProjects();
  };
  const getProjects = () => projects;
  return { addProject, deleteProject, getProjects };
})();

// DOM Controller
const DOMController = (() => {
  const projectsContainer = document.getElementById('projects-container');

  const renderProjects = () => {
    projectsContainer.innerHTML = '';
    const projects = DataController.getProjects();
    projects.forEach(project => {
      const projectElement = document.createElement('li');
      projectElement.innerHTML = `
        <div>Name: ${project.name}</div>
        <div>Due: ${project.dueDate}</div>
        <div>Details: ${project.details}</div>
        <button onclick="DataController.deleteProject('${project.id}'); DOMController.renderProjects();">Delete</button>
      `;
      projectsContainer.appendChild(projectElement);
    });
  };

  return { renderProjects };
})();

// App Initialization
const App = (() => {
  const init = () => {
    DOMController.renderProjects();
  };
  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);

// Event Listeners for adding project
document.getElementById('add-project-btn').addEventListener('click', () => {
  const projectName = document.getElementById('project-name').value;
  const dueDate = document.getElementById('due-date').value;
  const details = document.getElementById('details').value;
  if (projectName && dueDate && details) {
    DataController.addProject(projectName, dueDate, details);
    DOMController.renderProjects();
    // Reset the form fields
    document.getElementById('project-name').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('details').value = '';
  } else {
    alert('Please fill in all the fields.');
  }
});
