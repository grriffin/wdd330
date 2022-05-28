import { ToDoManager } from './ToDos.js';
import { createAllTodosDom } from './utilities.js';

let todoManager;
let currentFilter = 'all';

window.onload = function(event) {
  console.log('Loading');
  
  todoManager = new ToDoManager();
  console.log("Todo manager created");
  updateDom();
  console.log("Todos loaded");
  const textInput = document.getElementById('todo-input');
  const addButton = document.getElementById('btn-add-todo');
  wireUpFilterButtons();
  addButton.addEventListener('click', (event) =>{
    todoManager.add(textInput.value);
    textInput.value = '';
    updateDom();
  });
  console.log("ready for more todos");
}

function updateDom() {
  let rootElement = document.getElementById('todolist');
  let message = document.getElementById('todos-remaining');
  const activeTasks = todoManager.active;
  const plural = activeTasks.length == 1 ? '' : 's';
  message.innerText = `${activeTasks.length} task${plural} remaining`;
  let todos = [];
  switch(currentFilter) {
    case 'all': todos = todoManager.all;break;
    case 'active': todos = todoManager.active;break;
    case 'completed': todos = todoManager.completed;break;
  }
  createAllTodosDom(rootElement, todos, onCompleted, onDeleted);
}

function onCompleted(todo, completed) {
  todo.isComplete = completed;
  todoManager.save();
  updateDom();
}

function onDeleted(todo) {
  todoManager.remove(todo.id);
  todoManager.save();
  updateDom();
}

function wireUpFilterButtons() {
  const allButton = document.getElementById('btn-all');
  const activeButton = document.getElementById('btn-active');
  const completedButton = document.getElementById('btn-complete');

  allButton.addEventListener('change', function(ev){
    if (ev.target.checked) {
      currentFilter = 'all';
      updateDom();
    }
  });

  activeButton.addEventListener('change', function (ev) {
    if (ev.target.checked) {
      currentFilter = 'active';
      updateDom();
    }
  });

  completedButton.addEventListener('change', function (ev) {
    if (ev.target.checked) {
      currentFilter = 'completed';
      updateDom();
    }
  });
}