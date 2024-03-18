document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('todoForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoInput = document.getElementById('todoInput').value.trim();

    if (todoInput !== '') {

      const newTodoItem = document.createElement('li');
      newTodoItem.innerText = todoInput;


      const todoList = document.querySelector('#todoList');
      todoList.appendChild(newTodoItem);


      saveTasksToLocalStorage();

      document.getElementById('todoInput').value = '';
    } else {
      console.log('Todo input is empty.');
    }
  });

  const todoList = document.querySelector('#todoList');
  todoList.addEventListener('click', (e) => {
    if (e.target.tagName === "LI") {
      if (e.target.style.textDecoration !== "line-through") {
        let text = e.target.textContent;
        e.target.innerHTML = text + " <b>Completed!</b>";
        e.target.style.textDecoration = "line-through";
        saveTasksToLocalStorage(); 
      }
    }
  });

  todoList.addEventListener('dblclick', (e) => {
    if (e.target.tagName === "LI") {
      e.target.remove();
      saveTasksToLocalStorage(); 
    }
  });

  const saveTasksToLocalStorage = () => {
    const tasks = [];
    todoList.querySelectorAll('li').forEach(taskItem => {
      const taskText = taskItem.innerText;
      const isCompleted = window.getComputedStyle(taskItem).textDecoration === 'line-through';
      tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };



  const displayItemsOnPageReload = () => {
    const taskJson = localStorage.getItem('tasks');
    if (taskJson) {
      const tasks = JSON.parse(taskJson);
      todoList.innerHTML = '';
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerText = task.text;
        if (task.completed) {
          taskItem.style.textDecoration = "line-through";
        }
        todoList.appendChild(taskItem);
      });
    }
  };


  displayItemsOnPageReload();
});