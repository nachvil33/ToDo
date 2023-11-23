// Helper functions
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Factories
const createProject = (name) => ({ id: generateId(), name, todos: [] });
const createTodo = (name, priority, date, details, checked = false) => ({ id: generateId(), name, priority, date, details, checked });

// Data Controller
const DataController = (() => {
  let projects = loadFromLocalStorage('projects');

  const saveProjects = () => saveToLocalStorage('projects', projects);
  const addProject = (name) => {
    const newProject = createProject(name);
    projects.push(newProject);
    saveProjects();
  };
  const addTodoToProject = (projectId, { name, priority, date, details, checked }) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newTodo = createTodo(name, priority, date, details, checked);
      project.todos.push(newTodo);
      saveProjects();
    }
  };
  const getProjects = () => projects;
  // ... Other CRUD methods

  return { addProject, addTodoToProject, getProjects };
})();

// DOM Controller
const DOMController = (() => {
  const renderProjects = () => {
    const projects = DataController.getProjects();
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear existing projects
    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.textContent = project.name;
      projectsContainer.appendChild(projectElement);
    });
  };
  const renderTodos = (projectId) => {
    const project = DataController.getProjects().find(p => p.id === projectId);
    if (project) {
      const todosContainer = document.getElementById('todos-container') || document.createElement('ul');
      todosContainer.id = 'todos-container';
      todosContainer.innerHTML = ''; // Clear existing todos
      project.todos.forEach(todo => {
        const todoElement = document.createElement('li');
        todoElement.textContent = todo.name;
        todosContainer.appendChild(todoElement);
      });
      if (!document.getElementById('todos-container')) {
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.appendChild(todosContainer);
      }
    }
  };
  // ... Other rendering methods

  return { renderProjects, renderTodos };
})();

// App Initialization
const App = (() => {
  const init = () => {
    DOMController.renderProjects();
    // ... Additional initialization logic
  };
  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
