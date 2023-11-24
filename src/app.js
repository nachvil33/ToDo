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
  const addTodoToProject = (projectId, todoData) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newTodo = createTodo(todoData.name, todoData.priority, todoData.date, todoData.details, todoData.checked);
      project.todos.push(newTodo);
      saveProjects();
    }
  };
  const getProjects = () => projects;
  return { addProject, addTodoToProject, getProjects };
})();

// DOM Controller
const DOMController = (() => {
  const projectsContainer = document.getElementById('projects-container');
  const todosContainer = document.getElementById('todos-container');
  const renderProjects = () => {
    projectsContainer.innerHTML = '';
    const projects = DataController.getProjects();
    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.textContent = project.name;
      projectElement.addEventListener('click', () => {
        DOMController.renderTodos(project.id);
      });
      projectsContainer.appendChild(projectElement);
    });
  };
  const renderTodos = (projectId) => {
    todosContainer.innerHTML = '';
    const project = DataController.getProjects().find(p => p.id === projectId);
    if (project) {
      project.todos.forEach(todo => {
        const todoElement = document.createElement('li');
        todoElement.textContent = todo.name;
        todosContainer.appendChild(todoElement);
      });
    }
  };
  return { renderProjects, renderTodos };
})();

// App Initialization
const App = (() => {
  const init = () => {
    DOMController.renderProjects();
  };
  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);

// Event Listeners for adding project and todo
document.getElementById('add-project-btn').addEventListener('click', function () {
  const projectName = document.getElementById('project-name').value;
  DataController.addProject(projectName);
  DOMController.renderProjects();
});

document.getElementById('add-todo-btn').addEventListener('click', function () {
  const projectName = document.getElementById('project-name').value;
  const todoName = document.getElementById('todo-name').value;
  const priority = document.getElementById('priority').value;
  const dueDate = document.getElementById('due-date').value;
  const details = document.getElementById('details').value;
  const projectId = DataController.getProjects().find(p => p.name === projectName)?.id;
  if (projectId) {
    DataController.addTodoToProject(projectId, { name: todoName, priority, date: dueDate, details });
    DOMController.renderTodos(projectId);
  }
});
