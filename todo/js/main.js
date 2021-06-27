import Todos from './ToDos.js';
import * as utilities from './utilities.js';

const todoElement = document.querySelector("#todoList");
let todos = new Todos(todoElement);

let addBtn = utilities.qs('#add-task');
addBtn.addEventListener('submit', (event) =>{
    console.log(event);
    event.preventDefault();
    todos.addTodo();
});

