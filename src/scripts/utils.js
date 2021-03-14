const getElement = (element) => document.querySelector(element);

const getElements = (elements) => document.querySelectorAll(elements);

const addClickEvent = (el, callback) => el.addEventListener('click', callback);

const isInputValid = (value) => !(value.trim().length < 1);

const cleanInput = (input = document.querySelector('[data-input-task]')) => {
  input.value = '';
};

export { getElement, getElements, addClickEvent, isInputValid, cleanInput };
