// Nuevas funciones para editar y eliminar tareas
var selectedTask = null;

// Función para agregar tarea
function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
    var emptyTaskMessage = document.getElementById('emptyTaskMessage');
    var taskPriority = document.getElementById('taskPriority');
    var taskCategory = document.getElementById('taskCategory');

    // Check if the input is empty
    if (taskInput.value.trim() === '') {
        emptyTaskMessage.style.display = 'block';
        return;
    }

    // Create a new list item
    var listItem = document.createElement('li');

    // Obtén información adicional
    var taskInfo = {
        name: taskInput.value,
        priority: taskPriority.value || 'low', // Si no se selecciona, prioridad baja
        category: taskCategory.value || 'General' // Si no se selecciona, categoría general
    };

    // Agrega la información al elemento de lista
    listItem.appendChild(document.createTextNode(formatTaskInfo(taskInfo)));

    // Agrega la clase de prioridad
    listItem.classList.add(getPriorityClass(taskInfo.priority));

    // Asigna un evento clic a cada elemento de la lista
    listItem.addEventListener('click', function() {
        if (selectedTask === listItem) {
            // Si la tarea seleccionada ya está seleccionada de nuevo, oculta las opciones
            hideTaskOptions();
        } else {
            // Si se selecciona una nueva tarea, muestra las opciones
            selectedTask = listItem;
            showTaskOptions();
        }
    });

    // Agrega la lista de tareas
    taskList.appendChild(listItem);

    // Clear the input field and hide the empty task message
    taskInput.value = '';
    emptyTaskMessage.style.display = 'none';
}

// Función para mostrar opciones de tarea
function showTaskOptions() {
    // Muestra los elementos para editar y eliminar tareas
    document.getElementById('taskOptions').style.display = 'flex';
    document.getElementById('editTaskInput').value = getTaskName(selectedTask.textContent);
    document.getElementById('editTaskCategory').value = getTaskCategory(selectedTask.textContent);
    document.getElementById('editPriority').value = getTaskPriority(selectedTask);
}

// Función para editar tarea
function editTask() {
    // Verifica si el nombre editado no está vacío
    var editTaskInput = document.getElementById('editTaskInput');
    var editTaskCategory = document.getElementById('editTaskCategory');
    var editPriority = document.getElementById('editPriority');

    if (editTaskInput.value.trim() === '') {
        // Puedes mostrar un mensaje al usuario indicando que no puede editar con un campo vacío
        return;
    }

    // Obtén la información actual de la tarea seleccionada
    var taskInfo = parseTaskInfo(selectedTask.textContent);

    // Actualiza la información de la tarea seleccionada
    taskInfo.name = editTaskInput.value;
    taskInfo.category = editTaskCategory.value || 'General';
    taskInfo.priority = editPriority.value;

    // Actualiza el texto de la tarea seleccionada con la nueva información
    selectedTask.textContent = formatTaskInfo(taskInfo);

    // Actualiza la clase de prioridad de la tarea seleccionada
    selectedTask.classList.remove('low-priority', 'medium-priority', 'high-priority');
    selectedTask.classList.add(getPriorityClass(taskInfo.priority));

    // Limpia los campos y oculta los elementos de opciones de tarea
    hideTaskOptions();
}

// Función para eliminar tarea
function deleteTask() {
    // Elimina la tarea seleccionada
    selectedTask.parentNode.removeChild(selectedTask);

    // Limpia los campos y oculta los elementos de opciones de tarea
    hideTaskOptions();
}

// Función para ocultar opciones de tarea
function hideTaskOptions() {
    // Oculta los elementos de opciones de tarea
    document.getElementById('taskOptions').style.display = 'none';
    selectedTask = null; // Resetea la tarea seleccionada
}

// Función para formatear la información de la tarea
function formatTaskInfo(taskInfo) {
    return `${taskInfo.name} - ${taskInfo.category}`;
}

// Función para analizar la información de la tarea y devolver un objeto
function parseTaskInfo(taskText) {
    var regex = /^(.*?) - (.*?)$/;
    var match = regex.exec(taskText);
    return {
        name: match[1].trim(),
        category: match[2].trim()
    };
}

// Función para obtener la clase de prioridad según el tipo de prioridad
function getPriorityClass(priority) {
    switch (priority) {
        case 'high':
            return 'high-priority';
        case 'medium':
            return 'medium-priority';
        case 'low':
        default:
            return 'low-priority';
    }
}

// Función para obtener el nombre de la tarea
function getTaskName(taskText) {
    // Extrae el nombre de la tarea del texto formateado
    var regex = /^(.*?) - /;
    var match = regex.exec(taskText);
    return match ? match[1].trim() : '';
}

// Función para obtener la categoría de la tarea
function getTaskCategory(taskText) {
    // Extrae la categoría de la tarea del texto formateado
    var regex = / - (.*?)$/;
    var match = regex.exec(taskText);
    return match ? match[1].trim() : '';
}

// Función para obtener la prioridad de la tarea
function getTaskPriority(taskElement) {
    // Obtiene la clase de prioridad actual de la tarea
    var priorityClasses = ['low-priority', 'medium-priority', 'high-priority'];
    for (var i = 0; i < priorityClasses.length; i++) {
        if (taskElement.classList.contains(priorityClasses[i])) {
            return priorityClasses[i];
        }
    }
    return 'low-priority'; // Por defecto, baja prioridad
}
