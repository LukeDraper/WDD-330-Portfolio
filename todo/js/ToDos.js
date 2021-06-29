import * as utilities from "./utilities.js";
import * as ls from "./ls.js";

let todoList = null;

class Todos {
    constructor(element) {
        this.element = element;
        this.key = "Todos";
        getTodos(this.key)
        this.listTodos();
        this.addFilterListener();
    }

    
    /**
     * use the renderTodoList function to output our todo list when called.
     * It should get called when a todo is added, or removed, and when the Todos class is instantiated.
     */
     listTodos = () => {
        renderTodoList(todoList, this.element);
        this.addXListener();
        this.updateTaskNumDisplay();
        this.addCompleteListener();
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

    removeTodo = (todoId) => {
        todoList = todoList.filter(function(el) {return el.id != todoId});
        ls.writeToLS(this.key, todoList);
        this.listTodos();
        resetFilterDisplay();
    }

    
    addXListener = () => {
        console.log("addXListener")
        const xBtns = document.querySelectorAll('.xBtn')
        xBtns.forEach (el => {
            console.log(el);
            console.log(el.parentElement.getAttribute('todoid'));
            utilities.onTouch(el, () => {this.removeTodo(el.parentElement.getAttribute('todoid'))});
        })
    }

    updateTaskNumDisplay = () => {
        const taskNumDisplay = document.querySelector('#taskNumber');
        if (todoList == null) {
            taskNumDisplay.innerHTML = 0;
        }
        taskNumDisplay.innerHTML = todoList.filter(function(el) {return !el.completed}).length;
    }
        
    addCompleteListener = () => {
        console.log("addCompleteListener")
        const checkBoxes = document.querySelectorAll('.taskCheckbox')
        checkBoxes.forEach (checkBox => {
            console.log(checkBox);
            console.log(checkBox.parentElement.getAttribute('todoid'));
            utilities.onTouch(checkBox, () => {
                this.completeTodo(checkBox.parentElement.getAttribute('todoid'))
            });
        })
    }

    addFilterListener = () => {
        console.log("addFilterListener")
        const filters = document.getElementsByName('filter')
        console.log(filters);
        filters.forEach (filter => {
            filter.addEventListener('change', () => {
                console.log(filter.value);
                this.filterTodo(filter.value);
            });
        })
    }

    completeTodo = (todoId) => {
        console.log(todoId);
        const listIndex = todoList.findIndex(todo => todo.id == todoId);
        console.log(listIndex);
        if(listIndex >= 0) {
            todoList[listIndex].completed = !todoList[listIndex].completed;
            console.log(todoList[listIndex].completed);
            ls.writeToLS(this.key, todoList);
            console.log(todoList);
            this.listTodos();
         } else {
             console.log("Id not found in completeTodo in Todos.js");
         }
    }

    filterTodo = (filter) => {
        console.log(this.element);
        console.log(filter);
        if (filter == "all") {
            this.listTodos();
            return;
        } else if (filter == "active") {
            console.log(todoList.filter(function(el) {return !el.completed}))
            renderTodoList(todoList.filter(function(el) {return !el.completed}), this.element);
        } else if (filter == "complete") {
            renderTodoList(todoList.filter(function(el) {return el.completed}), this.element);
        } else {
            console.log("Filter value invalid.");
            return;
        }
        this.addXListener();
        this.addCompleteListener();
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
 * Check the filter elements of the footer and set the one that says all to checked.
 * 
 */
function resetFilterDisplay() {
    const filters = document.getElementsByName('filter')
    const default_filter = "all";
    filters.forEach(filter => {
        if (filter.value === default_filter) {
            filter.checked = true;
        } 
    });

}

/**
 * check the contents of todoList, a local variable containing a list of ToDos. 
 * If it is null then pull the list of todos from localstorage, update the local variable, and return it
 * @param  {string} key The key under which the value is stored under in LS
  * @return {array}     The value as an array of objects
 */
 function getTodos(key) {
     if (todoList === null) {
        todoList = ls.readFromLS(key);
        if (todoList === null) {
            todoList = [];
        }
     }
     console.log("todoList in getTodos: ", todoList);
     return todoList
  }

/**
 * foreach todo in list, build a li element for the todo, and append it to element
 * @param  {array} list The list of tasks to render to HTML
 * @param {element} element The DOM element to insert our list elements into. 
 */
function renderTodoList (list, element) {
    console.log('renderTodoList');
    element.innerHTML = "";
    if (list) {
        list.forEach((value, index) => {
            let listElement = document.createElement('li');
            listElement.classList.add('task');
            listElement.setAttribute('todoid', value.id);

            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.classList.add('taskCheckbox');
            checkBox.setAttribute('name', 'task' + index);
            checkBox.checked = value.completed;

            let label = document.createElement('label');
            label.setAttribute('for', 'task' + index);
            label.setAttribute('name', 'task' + index);
            label.classList.add('taskCheckbox');
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
 }



export default Todos;