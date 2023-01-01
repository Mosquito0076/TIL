const toDoForm = document.querySelector("form#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("div#todo-list");
const TODOS_KEY = "todos";
let toDos = loadTodos();

function deleteTodo(event) {
  const div = event.target.parentElement;
  toDos = toDos.filter(todo => todo.id !== parseInt(div.id));
  saveTodos();
  div.remove();
}


function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function loadTodos() {
  const toDos = localStorage.getItem(TODOS_KEY)
  if (toDos !== null) {
    const parsedTodos = JSON.parse(toDos);
    parsedTodos.forEach(paintToDo);
    return parsedTodos;
  } else {
    return [];
  }
}



function paintToDo(newTodo) {
  const div = document.createElement("div");
  div.id = newTodo.id;
  div.setAttribute('class', 'd-flex col-12 justify-content-center')
  
  const span = document.createElement("span");
  span.innerText = `${newTodo.text}  `;
  span.setAttribute('class', 'todo-item')
  
  const button = document.createElement("button");
  button.setAttribute("class", "delete-button btn btn-danger");
  button.innerText = "X";
  button.addEventListener("click", deleteTodo);
  
  div.append(span, button);
  toDoList.appendChild(div);
}



function toDoSubmit(event) {
  event.preventDefault();
  if (toDoInput.value.trim()) {
    const newTodo = { id: Date.now(), text: toDoInput.value };
    event.target.reset();
    toDos.push(newTodo);
    saveTodos(newTodo);
    paintToDo(newTodo);
  }
}

toDoForm.addEventListener("submit", toDoSubmit);