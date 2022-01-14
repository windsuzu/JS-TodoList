const TODO_LIST_KEY = "todo_list";
const section = document.querySelector("section");
const addButton = document.querySelector("form button");

loadTodoItemList();

addButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let [todoText] = e.target.parentElement.children;
    if (!todoText.value) return;

    // Add a new todo item to HTML
    storeTodoItem(todoText.value)
        .then((res) => {
            todo = createTodoItem(res);
            section.appendChild(todo);
        })
        .catch((err) => {
            alert(err);
        });
    todoText.value = "";
});

// use promise to simulate async task
function storeTodoItem(todoText) {
    return new Promise((res, rej) => {
        let todo_list = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];
        if (todo_list.includes(todoText)) {
            rej("todo duplicated.");
        } else {
            todo_list.push(todoText);
            localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todo_list));
            res(todoText);
        }
    });
}

function loadTodoItemList() {
    let todo_list = JSON.parse(localStorage.getItem(TODO_LIST_KEY)) || [];
    for (todoText of todo_list) {
        todo = createTodoItem(todoText);
        section.appendChild(todo);
    }
}

function createTodoItem(todoText) {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let container = document.createElement("div");
    container.classList.add("container");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerHTML = todoText;
    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    let completeButton = document.createElement("i");
    completeButton.classList.add("complete", "fas", "fa-check");
    let removeButton = document.createElement("i");
    removeButton.classList.add("remove", "fas", "fa-trash");
    buttons.appendChild(completeButton);
    buttons.appendChild(removeButton);
    container.appendChild(text);
    container.appendChild(buttons);
    todo.appendChild(container);

    completeButton.addEventListener("click", (e) => {
        let todo = e.target.parentElement.parentElement.parentElement;
        todo.classList.toggle("done");
    });

    removeButton.addEventListener("click", (e) => {
        let todo = e.target.parentElement.parentElement.parentElement;
        todo.style.animation = "scaleDown 0.3s forwards";
        todo.addEventListener("animationend", (e) => {
            todo.remove();
        });
    });
    return todo;
}
