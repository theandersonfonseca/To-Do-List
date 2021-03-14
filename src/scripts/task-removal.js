export default function handleTaskRemoval(
  event,
  ToDoList,
  updateEventListeners
) {
  const TASK_ID = +event.target.parentNode.parentNode.dataset.id;

  ToDoList.removeTask(TASK_ID);
  updateEventListeners();
}
