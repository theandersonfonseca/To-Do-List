export default function createTask({ TASK_ID, description, status }) {
  return `
                    <div class=" ${
                      status === 'complete'
                        ? 'tasks__task tasks__task--complete'
                        : 'tasks__task'
                    }" data-id="${TASK_ID}">
                      <div class="tasks__check" data-complete-task>
                        <i class="tasks__check-icon far fa-check" ></i>
                      </div>
                      <p class="tasks__description">${description}</p>
                      <div class="tasks__controls">
                        <i class="tasks__edit fas fa-edit" data-edit-task></i>
                        <i class="tasks__trash fas fa-trash" data-remove-task></i>
                      </div>
                    </div>
                   `;
}
