document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    // Add task on ENTER
    taskInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && taskInput.value.trim() !== '') {
            e.preventDefault();
            const newTask = {
                name: taskInput.value.trim(),
                completed: false
            };
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = ''; // Clear the textarea
        }
    });

    // Function to render tasks from local storage
    function renderTasks() {
        taskList.innerHTML = ''; // Clear existing tasks before re-rendering
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';

            // Checkbox for marking as completed
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function () {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            // Task name span
            const span = document.createElement('span');
            span.textContent = task.name;

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', function () {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            // Edit button (pencil icon)
            const editButton = document.createElement('button');
            editButton.textContent = '✎';
            editButton.classList.add('edit');
            editButton.addEventListener('click', function () {
                const updatedTask = prompt('Update task:', task.name);
                if (updatedTask !== null && updatedTask.trim() !== '') {
                    task.name = updatedTask.trim();
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks();
                }
            });

            // Append elements to list item
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(editButton);
            li.appendChild(deleteButton);

            // Append list item to the task list
            taskList.appendChild(li);
        });
    }
});
