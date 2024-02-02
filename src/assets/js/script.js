function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
    var emptyTaskMessage = document.getElementById('emptyTaskMessage');

    // Check if the input is empty
    if (taskInput.value.trim() === '') {
        emptyTaskMessage.style.display = 'block';
        return;
    }

    // Create a new list item
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(taskInput.value));

    // Add the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field and hide the empty task message
    taskInput.value = '';
    emptyTaskMessage.style.display = 'none';
}
