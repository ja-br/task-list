const form = document.querySelector('#task-form')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')

const loadEventListeners = () => {
  document.addEventListener('DOMContentLoaded', getTasks)

  form.addEventListener('submit', addTask)
  taskList.addEventListener('click', removeTask)
  clearBtn.addEventListener('click', clearAll)
  filter.addEventListener('keyup', filterTasks)
}

const getTasks = () => {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach((task) => {
    const li = document.createElement('li')
    li.classList.add('collection-item')
    li.appendChild(document.createTextNode(task))
    const link = document.createElement('a')
    link.classList.add('delete-item', 'secondary-content')
    link.innerHTML = `<i class='fa fa-remove'></i>`
    li.appendChild(link)

    taskList.appendChild(li)
  })
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

  storeTaskInLocalStorage(taskInput.value)

  taskInput.value = ''

  e.preventDefault()
}

const storeTaskInLocalStorage = (taskToStore) => {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(taskToStore)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const removeTask = (e) => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?'))
      e.target.parentElement.parentElement.remove()

      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
  }
}

const removeTaskFromLocalStorage = (taskToRemove) => {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task, index)=>{
    if(taskToRemove.textContent === task)
      tasks.splice(index, 1);
  })

  localStorage.setItem('tasks',JSON.stringify(tasks))
}

const clearAll = (e) => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  clearLocalStorage()
}

const clearLocalStorage = ()=>{
  localStorage.clear()
}

const filterTasks = (e) => {
  const textInput = e.target.value.toLowerCase()
  const taskItems = document.querySelectorAll('.collection-item')
  console.log(textInput)
  taskItems.forEach((taskItem) => {
    const itemText = taskItem.firstChild.textContent
    console.log(taskItem.innerText)
    console.log("Index: " + itemText.toLowerCase().indexOf(textInput))
    if (itemText.toLowerCase().indexOf(textInput) != -1) {
      taskItem.style.display = 'block'
    } else {
      taskItem.style.display = 'none'

    }
  })
}

loadEventListeners()