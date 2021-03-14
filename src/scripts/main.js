import ToDoList from './class-toDoList.js';

import handleTaskEditing from './task-editing.js';
import handleTaskAddition from './task-addition.js';
import handleTaskRemoval from './task-removal.js';
import handleRemovalOfCompleteTasks from './removal-complete-tasks.js';
import handleCompleteTask from './task-complete.js';
import { handleNewList, createOption } from './new-list.js';

import { getElements, addClickEvent } from './utils.js';

import {
  inputTask,
  addTaskBtn,
  removeCompleteTasksBtn,
  tasksContainer,
  newListBtn,
  selectEl,
  removeControlsContainer,
  removeListBtn,
  newListInput,
} from './dom-elements.js';

let lists = [];
let currentToDoList;
let LIST_ID = 1;

const instantiateMainList = () => {
  const mainList = new ToDoList(tasksContainer, inputTask, LIST_ID);
  mainList.listName = 'main';
  lists.push(mainList);
  currentToDoList = mainList;

  return mainList;
};

instantiateMainList();

const goToMainList = () => {
  [currentToDoList] = [...lists];

  selectEl.value = 'main';
  currentToDoList.updateDom();
};

const updateListsArray = () => {
  const index = lists.findIndex((el) => el.LIST_ID === currentToDoList.LIST_ID);

  lists[index] = currentToDoList;
};

const saveInLocalStorage = () => {
  localStorage.setItem('lists', JSON.stringify(lists));
};

const handleRemoveListClass = (el, addOrRemove) => {
  const className = 'remove-controls--default-list';

  return addOrRemove === 'add'
    ? el.classList.add(className)
    : el.classList.remove(className);
};

const createList = (handleListRemoval) => {
  LIST_ID += 1;

  const newList = new ToDoList(tasksContainer, inputTask, LIST_ID);
  currentToDoList = newList;
  newList.listName = newListInput.value;

  lists.push(newList);
  newList.updateDom();

  updateListsArray();
  saveInLocalStorage();

  handleListRemoval(newList);

  return newList;
};

const instantiateAllListsAgain = (el, oldListName, oldTasksList, oldTaskID) => {
  el.listName = oldListName;
  el.tasksList = oldTasksList;
  el.TASK_ID = oldTaskID;

  if (el.listName !== 'main') selectEl.appendChild(createOption(el.listName));
};

const GetDataFromLocalStorage = (updateEventListeners) => {
  if (!localStorage.lists) return;

  lists = JSON.parse(localStorage.getItem('lists'));

  lists = lists.map((el) => {
    const oldListName = el.listName;
    const oldTasksList = el.tasksList;
    const oldTaskID = el.TASK_ID;

    el = new ToDoList(tasksContainer, inputTask, LIST_ID);

    instantiateAllListsAgain(el, oldListName, oldTasksList, oldTaskID);

    LIST_ID += 1;
    return el;
  });

  goToMainList();
  updateEventListeners();
};

export default (function init() {
  const updateEventListeners = () => {
    getElements('[data-remove-task]').forEach((btn) =>
      addClickEvent(btn, (e) => {
        handleTaskRemoval(e, currentToDoList, updateEventListeners);
      })
    );

    getElements('[data-complete-task]').forEach((btn) =>
      addClickEvent(btn, (e) =>
        handleCompleteTask(e, currentToDoList, updateEventListeners)
      )
    );

    getElements('[data-edit-task]').forEach((btn) =>
      addClickEvent(btn, (e) => {
        handleTaskEditing(e, currentToDoList, updateEventListeners);
      })
    );

    updateListsArray();
    saveInLocalStorage();
  };

  const removeList = () => {
    lists = lists.filter((el) => el.LIST_ID !== currentToDoList.LIST_ID);

    document
      .querySelector(`[data-option="${currentToDoList.listName}"]`)
      .remove();

    handleRemoveListClass(removeControlsContainer, 'add');

    saveInLocalStorage();
    goToMainList();
  };

  const handleListRemoval = (list) => {
    if (list.listName === 'main') {
      handleRemoveListClass(removeControlsContainer, 'add');
    } else {
      handleRemoveListClass(removeControlsContainer, 'remove');
    }

    removeListBtn.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      removeList();
      updateEventListeners();
    });
  };

  addClickEvent(addTaskBtn, (e) => {
    handleTaskAddition(e, currentToDoList, updateEventListeners);
  });

  addClickEvent(removeCompleteTasksBtn, () => {
    handleRemovalOfCompleteTasks(currentToDoList, updateEventListeners);
  });

  addClickEvent(newListBtn, () => {
    handleNewList(createList, handleListRemoval);
  });

  const updateDisplayedList = (e) => {
    const list = lists.find((el) => el.listName === e.target.value);

    list.updateDom();
    currentToDoList = list;

    handleListRemoval(list);
    updateEventListeners();
  };

  selectEl.addEventListener('change', updateDisplayedList);
  GetDataFromLocalStorage(updateEventListeners);
})();
