export default function handleRemovalOfCompleteTasks(
  myTask,
  updateEventListeners
) {
  myTask.removeCompleteTasks();
  updateEventListeners();
}
