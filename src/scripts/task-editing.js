import { isInputValid } from './utils.js';

const createEditInput = () => {
  const form = document.createElement('form');
  form.classList.add('controls__tasks-edit');

  form.innerHTML = ` <input
                        data-input-task
                        class="controls__input-edit"
                        type="text"
                        placeholder="Descreva a tarefa..."
                      />
                      `;

  return form;
};

const toggleBtnsDisplay = (btns) => {
  btns.forEach((el) => {
    if (el.style.display === 'none') {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
};

export default function handleTaskEditing(
  event,
  ToDoList,
  updateEventListeners
) {
  const TASK_ID = +event.target.parentNode.parentNode.dataset.id;
  const parent = event.target.parentNode.parentNode;
  const description = event.target.parentNode.previousElementSibling;

  const completeTaskBtn = description.previousElementSibling;
  const editTaskBtn = description.nextElementSibling.children[0];
  const trashTaskBtn = description.nextElementSibling.children[1];

  toggleBtnsDisplay([completeTaskBtn, editTaskBtn, trashTaskBtn]);

  const newForm = createEditInput();
  const editInput = newForm.children[0];

  parent.replaceChild(newForm, description);
  editInput.focus();

  const handleClickOutsideEditInput = () => {
    if (document.activeElement !== editInput) {
      if (isInputValid(editInput.value)) {
        ToDoList.editTask(TASK_ID, editInput.value);
      }

      toggleBtnsDisplay([completeTaskBtn, editTaskBtn, trashTaskBtn]);
      ToDoList.updateDom();
      updateEventListeners();
      window.removeEventListener('click', handleClickOutsideEditInput);
    }
  };

  const handleInvalidSubmit = () => {
    toggleBtnsDisplay([completeTaskBtn, editTaskBtn, trashTaskBtn]);
    ToDoList.updateDom();
    updateEventListeners();
    window.removeEventListener('click', handleClickOutsideEditInput);
  };

  window.addEventListener('click', handleClickOutsideEditInput);

  parent.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!isInputValid(editInput.value)) {
      handleInvalidSubmit();
      return;
    }

    ToDoList.editTask(TASK_ID, editInput.value);
    toggleBtnsDisplay([completeTaskBtn, editTaskBtn, trashTaskBtn]);
    updateEventListeners();
    window.removeEventListener('click', handleClickOutsideEditInput);
  });
}
