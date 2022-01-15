const TODO_MAP_KEY = "todo_map";
const section = document.querySelector("section");
const addButton = document.querySelector("form button");

loadTodoItems();

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

function createTodoItem(todoText, done = false) {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    if (done) todo.classList.add("done");

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
        let done = todo.classList.toggle("done");
        let todoText = todo.children[0].children[0].innerText;
        updateTodoItem(todoText, done);
    });

    removeButton.addEventListener("click", (e) => {
        let todo = e.target.parentElement.parentElement.parentElement;
        let todoText = todo.children[0].children[0].innerText;

        removeTodoItem(todoText)
            .then((res) => {
                console.log(res);
                todo.style.animation = "scaleDown 0.3s forwards";
                todo.addEventListener("animationend", (_) => {
                    todo.remove();
                });
            })
            .catch((err) => {
                alert(err);
            });
    });
    return todo;
}

/**
 * use promise to simulate async task
 */
function storeTodoItem(todoText) {
    return new Promise((res, rej) => {
        let todoMap = JSON.parse(localStorage.getItem(TODO_MAP_KEY)) || {};
        if (todoText in todoMap) {
            rej("Todo duplicated.");
        } else {
            todoMap[todoText] = false;
            localStorage.setItem(TODO_MAP_KEY, JSON.stringify(todoMap));
            res(todoText);
        }
    });
}

/**
 * use promise to simulate async task
 */
function removeTodoItem(todoText) {
    return new Promise((res, rej) => {
        let todoMap = JSON.parse(localStorage.getItem(TODO_MAP_KEY)) || {};

        if (todoText in todoMap) {
            // remove item from the map (dictionary)
            delete todoMap[todoText];

            localStorage.setItem(TODO_MAP_KEY, JSON.stringify(todoMap));
            res("Remove Successfully.");
        } else {
            rej("Something went wrong!");
        }
    });
}

/**
 * load todo items directly
 */
function loadTodoItems() {
    let todoMap = JSON.parse(localStorage.getItem(TODO_MAP_KEY)) || {};
    for (key in todoMap) {
        todo = createTodoItem(key, todoMap[key]);
        section.appendChild(todo);
    }
}

/**
 * update todo item state
 */
function updateTodoItem(key, done) {
    let todoMap = JSON.parse(localStorage.getItem(TODO_MAP_KEY)) || {};
    todoMap[key] = done;
    localStorage.setItem(TODO_MAP_KEY, JSON.stringify(todoMap));
}
