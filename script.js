document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load existing tasks from localStorage
  loadTasks();

  // Add task on button click
  addButton.addEventListener('click', () => addTask(taskInput.value));

  // Add task on "Enter" key press
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  // Function to add a task
  function addTask(taskText, save = true) {
    const trimmedText = taskText.trim();
    if (trimmedText === '') {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.textContent = trimmedText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromLocalStorage(trimmedText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = '';

    if (save) {
      saveToLocalStorage(trimmedText);
    }
  }

  // Save a task to localStorage
  function saveToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Remove a task from localStorage
  function removeFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTask(task, false));
  }
});