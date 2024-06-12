document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("todo-input");
  const taskList = document.getElementById("todo-list");

  let tasks = [
    { id: 1, title: "say hello", status: false, userId: 1 },
    { id: 2, title: "say hi", status: false, userId: 1 },
    { id: 3, title: "say hey", status: false, userId: 1 },
  ];

  function createTaskObj(title) {
    return { title, status: false, userId: 1 };
  }

  function createTaskItem(task) {
    if (task.title === "") return;

    const taskContent = `
      <span>${task.title}</span>
      <div class="btns">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    const EditTaskContent = `
      <input class="edit-input" type="text" value="${task.title}" required>
      <button class="btn save-btn">Save</button>
    `;

    const li = document.createElement("li");
    li.classList.add("task");
    if (task.status == true) li.classList.add("completed");
    li.id = task.id;
    li.innerHTML = taskContent;

    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      li.remove();
      tasks = tasks.filter((item) => item.id !== task.id);
    });

    const editButton = li.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      li.innerHTML = EditTaskContent;

      const editInput = li.querySelector(".edit-input");
      const saveBtn = li.querySelector(".save-btn");

      saveBtn.addEventListener("click", () => {
        const newTitle = editInput.value.trim();
        if (newTitle !== "") {
          task.title = newTitle;
          renderTasks();
        }
      });
    });

    return li;
  }

  function appendTask(taskItem) {
    if (!taskItem) return;

    taskList.appendChild(taskItem);
    taskInput.value = "";
    taskInput.focus();
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      appendTask(createTaskItem(task));
    });
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    tasks.push(createTaskObj(taskInput.value.trim()));
    renderTasks();
  });

  taskList.addEventListener("click", (e) => {
    const clicked = e.target;
    if (clicked.tagName === "LI") {
      const task = tasks.filter((item) => item.id == clicked.id)[0];
      if (clicked.classList.contains("completed")) {
        task.status = false;
        clicked.classList.remove("completed");
      } else {
        task.status = true;
      }
      tasks = [...tasks.filter((item) => item.id != clicked.id), task];
      renderTasks();
    }
  });

  renderTasks();
});
