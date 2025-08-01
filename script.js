// Run after DOM is fully loaded
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

  // Load tasks from local storage
  loadTasks();

  // Define the addTask function
  function addTask(taskText = null, save = true) {
    // Retrieve value from input if not passed directly
    if (taskText === null) {
      taskText = taskInput.value.trim();
    }

    // Check if the task is empty
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create new list item (li)
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Onclick event to remove the task
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromLocalStorage(taskText);
    };

    // Append button to li, then li to list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';

    // Save to localStorage
    if (save) {
      saveToLocalStorage(taskText);
    }
  }

  // Load tasks from localStorage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(task => addTask(task, false));
  }

  // Save to localStorage
  function saveToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Remove from localStorage
  function removeFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
