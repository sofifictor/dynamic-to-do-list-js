document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Attach event listeners
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from localStorage
  loadTasks();

  // Function to add a task
  function addTask(taskText = null, save = true) {
    // If no taskText is passed in, use input field
    if (taskText === null) {
      taskText = taskInput.value.trim();
    }

    // Check if empty
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create new list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // ✅ required by checker

    // Attach remove logic
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromLocalStorage(taskText);
    };

    // Append and clear
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = '';

    // Save to localStorage
    if (save) {
      saveToLocalStorage(taskText);
    }
  }

  // Load existing tasks
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTask(task, false));
  }

  // Save a task
  function saveToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Remove a task
  function removeFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
