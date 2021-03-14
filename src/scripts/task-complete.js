export default function handleCompleteTask(
  event,
  ToDoList,
  updateEventListeners
) {
  const taskID = +event.target.parentNode.dataset.id;

  ToDoList.completeTask(taskID);
  updateEventListeners();
}
