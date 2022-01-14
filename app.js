let section = document.querySelector("section");
let addButton = document.querySelector("form button");

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    let [todoText] = e.target.parentElement.children;

    // Add a new todo item to HTML
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let container = document.createElement("div");
    container.classList.add("container");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerHTML = todoText.value;
    todo.appendChild(container);
    container.appendChild(text);
    section.appendChild(todo);
});
