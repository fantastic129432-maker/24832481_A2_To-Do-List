document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load to-dos from local storage when the page loads
    loadTodos();

    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim(); // Get value and remove whitespace

        if (todoText === '') {
            alert('Please enter a to-do item.');
            return;
        }

        createTodoElement(todoText, false); // Create and append to list
        saveTodos(); // Save current state to local storage
        todoInput.value = ''; // Clear input field
    }

    function createTodoElement(text, completed) {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : ''; // Add 'completed' class if needed

        const span = document.createElement('span');
        span.textContent = text;
        span.addEventListener('click', () => {
            li.classList.toggle('completed'); // Toggle completed class
            saveTodos(); // Save state after toggling
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li); // Remove from DOM
            saveTodos(); // Save state after deleting
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos)); // Store as JSON string
    }

    function loadTodos() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const todos = JSON.parse(storedTodos); // Parse JSON string back to array
            todos.forEach(todo => {
                createTodoElement(todo.text, todo.completed); // Recreate elements
            });
        }
    }
});