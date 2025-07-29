const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', () => {
    if (completed) {
      completedTasks = completedTasks.filter(t => t !== text);
    } else {
      tasks = tasks.filter(t => t !== text);
    }
    saveTasks();
    render();
  });

  if (!completed) {
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completada';
    completeBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t !== text);
      completedTasks.push(text);
      saveTasks();
      render();
    });
    actionsDiv.appendChild(completeBtn);
  }

  actionsDiv.appendChild(deleteBtn);
  li.appendChild(actionsDiv);

  if (completed) {
    li.classList.add('completed');
  }

  return li;
}

function render() {
  taskList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task, false));
  });

  completedTasks.forEach(task => {
    completedList.appendChild(createTaskElement(task, true));
  });
}

addButton.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push(text);
    taskInput.value = '';
    saveTasks();
    render();
  }
});

render();
