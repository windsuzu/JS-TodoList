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
    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    let completeButton = document.createElement("i");
    completeButton.classList.add("complete", "fas", "fa-check");
    let removeButton = document.createElement("i");
    removeButton.classList.add("remove", "fas", "fa-trash");
    buttons.appendChild(completeButton);
    buttons.appendChild(removeButton);
    todo.appendChild(container);
    container.appendChild(text);
    container.appendChild(buttons);
    section.appendChild(todo);

    completeButton.addEventListener("click", (e) => {
        let todo = e.target.parentElement.parentElement;
        todo.style.transition = "all 0.3s";
        todo.classList.toggle("done");
    });

    removeButton.addEventListener("click", (e) => {
        let todo = e.target.parentElement.parentElement.parentElement;
        todo.style.animation = "scaleDown 0.3s forwards";
        todo.addEventListener("animationend", (e) => {
            todo.remove();
        });
    });
});
