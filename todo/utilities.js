import { ToDoManager } from './ToDos.js';

function removeAllChildNodes(parent) {
  if (parent.firstChild) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

export function createAllTodosDom(parent, todos, onCompleted, onDeleted) {
  //Removing child nodes this way because I read that
  //setting innerHTML can lead to memory leaks as it doesn't
  //remove listeners...
  removeAllChildNodes(parent);

  for (const todo of todos) {
    let todoContainer = document.createElement('li');
    todoContainer.id = `todo-${todo.id}`;
    updateTodoDom(todoContainer, todo, onCompleted, onDeleted);
    parent.appendChild(todoContainer);
  }
}

export function updateTodoDom(parent, todo, onCompleted, onDeleted) {
    const inputid = `input-${todo.id}`;
    let label = document.createElement('label');
    label.htmlFor = inputid;
    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.id = inputid;
    check.checked = todo.isComplete;
    check.addEventListener('change', function (ev) {
      onCompleted(todo, ev.target.checked);
    });
    label.appendChild(check);
    label.appendChild(document.createTextNode(`${todo.itemText}-${todo.id}`));
    if (todo.isComplete) {
      label.classList.add('completed');
    }
    parent.appendChild(label);
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', function (ev) {
      onDeleted(todo);
    });

    parent.appendChild(deleteButton);
}


