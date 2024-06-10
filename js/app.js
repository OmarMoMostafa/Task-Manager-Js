document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
  });

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const li = document.createElement("li");
    li.classList.add("task");
    li.textContent = todoText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);

    todoInput.value = "";
    todoInput.focus();
  }

  todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("completed");
    }
  });
});
