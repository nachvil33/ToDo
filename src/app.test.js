// app.test.js
import { jest } from '@jest/globals';
import { DataController, DOMController } from './app';

// Mocking localStorage
global.localStorage = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
};

describe('DataController', () => {
  beforeEach(() => {
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
  });

  // ... (existing tests for addProject and getProjects)

  test('adds a todo to a project', () => {
    DataController.addProject('Test Project');
    const projectId = DataController.getProjects()[0].id;
    const testTodo = { name: 'Test Todo', priority: 'High', date: '2023-01-01', details: 'Details', checked: false };
    DataController.addTodoToProject(projectId, testTodo);
    const project = DataController.getProjects().find(p => p.id === projectId);
    expect(project.todos).toHaveLength(1);
    expect(project.todos[0]).toMatchObject(testTodo);
  });

  // ... (other tests)
});

describe('DOMController', () => {
  // ... (existing beforeEach and afterEach)

  // ... (existing tests for renderProjects)

  test('renders todos for a project', () => {
    document.body.innerHTML = '<div id="projects-container"></div>'; // Mock the projects container
    DataController.addProject('Test Project');
    const projectId = DataController.getProjects()[0].id;
    DataController.addTodoToProject(projectId, { name: 'Test Todo', priority: 'High', date: '2023-01-01', details: 'Details', checked: false });
    DOMController.renderTodos(projectId);
    const todosContainer = document.getElementById('todos-container');
    expect(todosContainer.children).toHaveLength(1);
    expect(todosContainer.firstChild.textContent).toBe('Test Todo');
  });

  // ... (other tests)
});
