import { inputTask } from './dom-elements.js';
import { cleanInput, isInputValid } from './utils.js';

export default function handleTaskAddition(event, list, updateEventListeners) {
  event.preventDefault();

  const taskDescription = inputTask.value;

  if (!isInputValid(taskDescription)) return;

  list.addTask(taskDescription);
  inputTask.focus();
  updateEventListeners();

  cleanInput();
}
