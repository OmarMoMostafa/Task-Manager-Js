document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("todo-input");
  const taskList = document.getElementById("todo-list");

  const tasks = [
    { id: 1, title: "say hello", status: false, userId: 1 },
    { id: 2, title: "say hi", status: false, userId: 1 },
    { id: 3, title: "say hey", status: false, userId: 1 },
  ];

  function createTaskObj() {
    return { title: taskInput.value.trim(), status: false, userId: 1 };
  }

  function createTaskItem(task) {
    if (task.title === "") return;

    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = task.title + '<div class="btns"></div>';

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      li.remove();
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", (e) => {
      const listItem = e.target.parentElement.parentElement.parentElement;
      console.log(listItem);
      listItem.innerHTML = `<input type="text" value="${task.title}" required />`;
    });

    li.querySelector(".btns").appendChild(editButton);
    li.querySelector(".btns").appendChild(deleteButton);

    return li;
  }

  function appendTask(taskItem) {
    if (!taskItem) return;

    taskList.appendChild(taskItem);
    taskInput.value = "";
    taskInput.focus();
  }

  tasks.forEach((task) => {
    appendTask(createTaskItem(task));
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    appendTask(createTaskItem(createTaskObj()));
  });

  taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("completed");
    }
  });
});

/*

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("todo-input");
  const taskList = document.getElementById("todo-list");

  const tasks = [
    { id: 1, title: "say hello", status: false, userId: 1 },
    { id: 2, title: "say hi", status: false, userId: 1 },
    { id: 3, title: "say hey", status: false, userId: 1 },
  ];

  function createTaskObj(title) {
    return { id: Date.now(), title, status: false, userId: 1 };
  }

  function createTaskItem(task) {
    if (task.title === "") return;

    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
      <span>${task.title}</span>
      <div class="btns">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      li.remove();
    });

    const editButton = li.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.title;
      input.required = true;

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";

      saveButton.addEventListener("click", () => {
        if (input.value.trim() !== "") {
          task.title = input.value.trim();
          li.querySelector("span").textContent = task.title;
          li.querySelector(".btns").appendChild(editButton);
          li.querySelector(".btns").appendChild(deleteButton);
          li.removeChild(input);
          li.removeChild(saveButton);
        }
      });

      li.replaceChild(input, li.querySelector("span"));
      li.appendChild(saveButton);
      li.querySelector(".btns").removeChild(editButton);
      li.querySelector(".btns").removeChild(deleteButton);
    });

    return li;
  }

  function appendTask(taskItem) {
    if (!taskItem) return;

    taskList.appendChild(taskItem);
    taskInput.value = "";
    taskInput.focus();
  }

  tasks.forEach((task) => {
    appendTask(createTaskItem(task));
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = createTaskObj(taskInput.value.trim());
    appendTask(createTaskItem(task));
  });

  taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("completed");
    }
  });
});


*/
