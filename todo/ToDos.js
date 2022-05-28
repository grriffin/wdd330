import ToDoRepository from './repo.js';

export class ToDoManager {
  #todos = [];

  constructor() {
    this.load();
  }

  load() {
    this.#todos = [];
    const todoObjects = ToDoRepository.getAll();

    for (const t of todoObjects) {
      this.#todos.push(new ToDo(t.id, t.content, t.completed));
    }

  }

  save() {
    let todoObjects = [];
    for(const t of this.#todos) {
      todoObjects.push({id:t.id, content: t.itemText, completed: t.isComplete});
    }
    ToDoRepository.saveAll(todoObjects);
  }

  add(text) {
    this.#todos.push(this.#createTodo(text));
    this.save();
  }

  remove(id) {
    this.#todos = this.#todos.filter(element => element.id !== id);
    this.save();
  }

  get all() {
    return this.#todos;
  }

  get completed() {
    return this.#todos.filter(element => element.isComplete);
  }

  get active() {
    return this.#todos.filter(element => !element.isComplete);
  }

  #createTodo(text, completed = false) {
    return new ToDo(new Date().valueOf(), text, completed);
  }
}

export class ToDo {
  #id = 0;
  #content = '';
  #completed = false;
  constructor(todoid, text, completed) {
    this.#content = text;
    this.#completed = completed;
    this.#id = todoid;
  }

  get id() {
    return this.#id;
  }

  get itemText() {
    return this.#content;
  }

  set itemText(text) {
    this.#content = text;
  }

  get isComplete() {
    return this.#completed;
  }

  set isComplete(completed) {
    this.#completed = completed;
  }
}
