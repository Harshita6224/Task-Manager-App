let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(level) {
  renderTasks(level);
}
/*function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";

  */

function renderTasks(filter = "All") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter !== "All" && task.priority !== filter) return;
    
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    const row = document.createElement("div");
    row.className = "task-row";

    const left = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    };

    const span = document.createElement("span");
    span.className = "task-text";
    span.innerHTML = `${task.text} 
      <small>⏰ ${task.dueDate || "No due date"} | 
      <span class="priority-${task.priority}">Priority: ${task.priority}</span></small>`;

    left.appendChild(checkbox);
    left.appendChild(span);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    row.appendChild(left);
    row.appendChild(actions);

    li.appendChild(row);
    taskList.appendChild(li);
  });
}


function addTask(){
    const input=document.getElementById('taskInput');
    const date=document.getElementById('dueDate').value;
    const priority=document.getElementById('priority').value;
    const taskText=input.value.trim();
    if (!taskText) return;

    const newTask = {
    text: taskText,
    dueDate: date,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  input.value = "";
  document.getElementById("dueDate").value = "";
}

function editTask(index) {
  const task = tasks[index];
  const newText = prompt("Edit task text:", task.text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}


window.onload = renderTasks;