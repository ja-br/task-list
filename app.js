const form = document.querySelector('#task-form')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')

loadEventListeners()

const loadEventListeners = () => {
  form.addEventListener('submit', addTask)
}

const addTask = (e) => {
  if (taskInput.value === '') {
    alert('Add a task')
  }



  e.preventDefault()
}