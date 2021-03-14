import createTask from './create-task.js';

export default class ToDoList {
  constructor(container, inputTask, LIST_ID) {
    this.LIST_ID = LIST_ID;
    this.listName = '';
    this.TASK_ID = 1;
    this.status = 'incomplete';
    this.container = container;
    this.inputTask = inputTask;
    this.tasksList = [];
  }

  saveInLocalStorage() {
    localStorage.setItem(`${this.LIST_ID}`, JSON.stringify(this));
  }

  updateDom() {
    this.container.innerHTML = '';

    const taskElements = this.tasksList.reduce((accumulator, task) => {
      accumulator += `${createTask(task)}`;

      return accumulator;
    }, '');

    this.container.innerHTML = taskElements;
  }

  addTask(description) {
    this.tasksList.push({
      TASK_ID: this.TASK_ID,
      description,
      status: this.status,
    });

    this.updateDom();
    this.incrementID();
  }

  incrementID() {
    this.TASK_ID += 1;
  }

  removeTask(ID) {
    this.tasksList = this.tasksList.filter((task) => task.TASK_ID !== ID);

    this.updateDom();
  }

  completeTask(ID) {
    const index = this.tasksList.findIndex((el) => el.TASK_ID === ID);

    this.tasksList[index].status =
      this.tasksList[index].status === 'incomplete' ? 'complete' : 'incomplete';

    this.updateDom();
  }

  editTask(ID, newDescription) {
    const index = this.tasksList.findIndex((el) => el.TASK_ID === ID);

    this.tasksList[index].description = newDescription;

    this.updateDom();
  }

  removeCompleteTasks() {
    this.tasksList = this.tasksList.filter((el) => el.status === 'incomplete');

    this.updateDom();
  }
}
