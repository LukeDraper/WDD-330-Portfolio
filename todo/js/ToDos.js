import * as utilities from "./utilities.js";
import * as ls from "./ls.js";

let todoList = null;

class Todos {
    constructor(element) {
        this.element = element;
        this.key = "Todos";
        getTodos(this.key)
        this.listTodos();
    }

    
    /**
     * use the renderTodoList function to output our todo list when called.
     * It should get called when a todo is added, or removed, and when the Todos class is instantiated.
     */
     listTodos() {
        renderTodoList(todoList, this.element);
    }


    /**
     * grab the input in the html where users enter the text of the task, then send that along with the key 
     * to a SaveTodo() function.  Then update the display with the current list of tasks
     */
    addTodo() {
        let addTask = utilities.qs("#add-task input[type=text]");
        const input = addTask.value;
        addTask.value = "";
        console.log('addTodo input:', input );
        console.log('key: ', this.key);
        if (input) {
            saveTodo(input, this.key);
            this.listTodos();
        }
    }

    static removeTodo(todoId) {
        todoList = todoList.filter(function(el) {return el.id != todoId});
        ls.writeToLS(this.key, todoList);
        this.listTodos();
    }
    
}

/**
 * build a todo object, add it to the todoList, and save the new list to local storage.
 * @param  {string} key The key under which the value is stored under in LS
* @param {string} task The text of the task to be saved. 

 */
function saveTodo(task, key) { 
    console.log('saveTodo: (', task, ',', key, ')' )
    let todo = {id : + new Date(), content: task, completed: false}
    if (todoList === null) {
        todoList = [];
    }
    todoList.push(todo);
    console.log("saveTodo: todoList =", todoList);
    ls.writeToLS(key, todoList);
}

/**
 * check the contents of todoList, a local variable containing a list of ToDos. 
 * If it is null then pull the list of todos from localstorage, update the local variable, and return it
 * @param  {string} key The key under which the value is stored under in LS
  * @return {array}     The value as an array of objects
 */
 function getTodos(key) {
     console.log("getTodos")
     if (todoList === null) {
        todoList = ls.readFromLS(key);
     }
     console.log(todoList);
     return todoList
  }

/**
 * foreach todo in list, build a li element for the todo, and append it to element
 * @param  {array} list The list of tasks to render to HTML
 * @param {element} element The DOM element to insert our list elements into. 
 */
function renderTodoList(list, element) {
    console.log('renderTodoList');
    element.innerHTML = "";
    list.forEach((value, index) => {
        let listElement = document.createElement('li');
        listElement.classList.add('task');
        listElement.setAttribute('todoId', value.id);

        let checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.classList.add('taskCheckbox');
        checkBox.setAttribute('name', 'task' + index);

        let label = document.createElement('label');
        label.setAttribute('for', 'task' + index);
        label.setAttribute('name', 'task' + index);
        label.innerHTML = value.content;

        let button = document.createElement('button');
        button.classList.add('xBtn');
        button.innerHTML = 'X';
        listElement.appendChild(checkBox);
        listElement.appendChild(label);
        listElement.appendChild(button);

        element.appendChild(listElement);
    });
 }

export default Todos;