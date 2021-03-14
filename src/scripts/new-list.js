import {
  newListForm,
  listOptionsContainer,
  newListInput,
  selectEl,
  inputTask,
} from './dom-elements.js';

import { isInputValid, cleanInput } from './utils.js';

const listsClass = 'controls__lists--new-task';

const createOption = (value) => {
  const option = document.createElement('option');
  option.classList.add('controls__option');
  option.value = value;
  option.setAttribute('data-option', `${value}`);
  option.innerHTML = value;

  return option;
};

const handleSubmit = (e, createList, handleListRemoval) => {
  e.preventDefault();

  if (
    e.submitter.dataset.cancelNewList === 'cancel' ||
    !isInputValid(newListInput.value)
  ) {
    listOptionsContainer.classList.remove(listsClass);
    cleanInput(newListInput);
    return;
  }

  const newOption = createOption(newListInput.value);

  selectEl.appendChild(newOption);

  createList(handleListRemoval);
  inputTask.focus();

  listOptionsContainer.classList.remove(listsClass);
  selectEl.value = newOption.value;

  cleanInput(newListInput);
};

const handleNewList = (createList, handleListRemoval) => {
  listOptionsContainer.classList.add(listsClass);
  newListForm.addEventListener('submit', (e) =>
    handleSubmit(e, createList, handleListRemoval)
  );
  newListInput.focus();
};

export { handleNewList, createOption };
