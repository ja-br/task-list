const form = document.querySelector('#task-form')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')


const loadEventListeners = () => {
  form.addEventListener('submit', addTask)
  taskList.addEventListener('click', removeTask)
}

const addTask = (e) => {

  if (taskInput.value === '') {
    alert('Add a task')
  }

  const li = document.createElement('li')
  li.classList.add('collection-item')
  li.appendChild(document.createTextNode(taskInput.value))

  const link = document.createElement('a')
  link.classList.add('delete-item', 'secondary-content')
  link.innerHTML = `<i class='fa fa-remove'></i>`
  li.appendChild(link)

  taskList.appendChild(li)

  taskInput.value = ''

  e.preventDefault()
}

const removeTask = (e) => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?'))
      e.target.parentElement.parentElement.remove()
  }
}

loadEventListeners()