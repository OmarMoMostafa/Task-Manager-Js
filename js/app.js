document.addEventListener("DOMContentLoaded", () => {
  // Base URL for fetching tasks
  const baseURL = "https://jsonplaceholder.typicode.com/todos";

  // Initial tasks
  let tasks = [
    { id: 1, title: "say hello", status: false, userId: 1 },
    { id: 2, title: "say hi", status: false, userId: 1 },
    { id: 3, title: "say hey", status: false, userId: 1 },
  ];

  // Function to fetch tasks from the server
  const fetchTasks = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    tasks = data;
    console.log(tasks);
    renderTasks(tasks);
  };

  // Function to create a task object
  const createTaskObj = (title) => {
    return { title, status: false, userId: 1 };
  };

  // Function to create a task item element
  const createTaskItem = (task) => {
    if (task.title === "") return;

    // Task content HTML
    const taskContent = `
      <span>${task.title}</span>
      <div class="btns">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    // Edit task content HTML
    const EditTaskContent = `
      <input class="edit-input" type="text" value="${task.title}" required>
      <button class="btn save-btn">Save</button>
    `;

    // Create a new list item for the task
    const li = document.createElement("li");
    li.classList.add("task");
    if (task.completed == true) li.classList.add("completed");
    li.id = task.id;
    li.innerHTML = taskContent;

    // Add event listener for delete button
    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      li.remove();
      tasks = tasks.filter((item) => item.id !== task.id);
    });

    // Add event listener for edit button
    const editButton = li.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
      li.innerHTML = EditTaskContent;

      const editInput = li.querySelector(".edit-input");
      const saveBtn = li.querySelector(".save-btn");

      // Add event listener for save button
      saveBtn.addEventListener("click", () => {
        const newTitle = editInput.value.trim();
        if (newTitle !== "") {
          task.title = newTitle;
          fetch(baseURL + "/" + task.id, {
            method: "PATCH",
            body: JSON.stringify({
              title: newTitle,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
          renderTasks(tasks);
        }
      });
    });

    return li;
  };

  // Function to append a task item to the task list
  const appendTask = (taskItem) => {
    if (!taskItem) return;

    taskList.appendChild(taskItem);
    taskInput.value = "";
    taskInput.focus();
  };

  // Function to render tasks
  const renderTasks = (tasks) => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      appendTask(createTaskItem(task));
    });
  };

  // Function to sort tasks based on completion status
  const sortTasks = () => {
    tasks.sort((a, b) => {
      if (sortFilter.value == "completed") {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      } else {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
    });
  };

  // Get DOM elements
  const taskForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("todo-input");
  const taskList = document.getElementById("todo-list");

  const searchForm = document.querySelector(".search");
  const searchInput = document.querySelector("#todo-search");
  const showUncompletedCheck = document.querySelector("#show-uncompleted");
  const sortFilter = document.querySelector("#sort-tasks");

  // Add event listener for task form submission
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(createTaskObj(taskInput.value.trim())),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    tasks.push(createTaskObj(taskInput.value.trim()));
    renderTasks(tasks);
  });

  // Add event listener for task list click
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

      fetch(baseURL + "/" + task.id, {
        method: "PATCH",
        body: JSON.stringify({
          completed: !task.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          tasks = [...tasks.filter((item) => item.id != clicked.id), json];
        });
      sortTasks();
      renderTasks(tasks);
    }
  });

  // Add event listener to show only uncompleted tasks
  showUncompletedCheck.addEventListener("change", (e) => {
    if (e.target.checked) {
      fetchTasks(baseURL + `?completed=${!e.target.checked}`);
    } else {
      fetchTasks(baseURL);
    }
  });
  // Add event listener to sort tasks based on completed
  sortFilter.addEventListener("change", () => {
    sortTasks();
    renderTasks(tasks);
  });

  // Add event listener for search form submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!searchInput.value) {
      renderTasks(tasks);
    } else {
      tasks = tasks.filter((task) =>
        task.title
          .toLocaleLowerCase()
          .includes(searchInput.value.toLocaleLowerCase().trim())
      );
      renderTasks(tasks);
    }
  });

  // Fetch tasks from the server
  fetchTasks(baseURL);
});
