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
  if (todos.length == 0) {
    const nothingtoshow = document.createElement('label');
    nothingtoshow.innerText = "No todo items to display for this view...";
    nothingtoshow.classList.add('nothing');
    parent.appendChild(nothingtoshow);
    return;
  }

  for (const todo of todos) {
    updateTodoDom(parent, todo, onCompleted, onDeleted);
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
    label.appendChild(document.createTextNode(todo.itemText));
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


