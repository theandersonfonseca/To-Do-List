import { getElement } from './utils.js';

const inputTask = getElement('[data-input-task]');
const addTaskBtn = getElement('[data-add-task]');
const removeCompleteTasksBtn = getElement('[data-remove-complete]');
const tasksContainer = getElement('[data-tasks-container]');
const newListBtn = getElement('[data-new-list]');
const newListForm = getElement('[data-new-list-form]');
const listOptionsContainer = getElement('[data-list-options]');
const newListInput = getElement('[data-new-list-input]');
const selectEl = getElement('[data-select]');
const removeControlsContainer = getElement('[data-remove-controls]');
const removeListBtn = getElement('[data-remove-list]');

export {
  inputTask,
  addTaskBtn,
  removeCompleteTasksBtn,
  tasksContainer,
  newListBtn,
  newListForm,
  listOptionsContainer,
  newListInput,
  selectEl,
  removeControlsContainer,
  removeListBtn,
};
