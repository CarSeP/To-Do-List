const container = document.getElementById("container")
const btn = document.getElementById("button")
const labels = document.querySelectorAll(".label")
const input = document.getElementById("input")
let taskList = []
let select = ""
let message = "No tasks found"

function addTask() {
  const newTask = input.value
  if(newTask !== ''){
    const id = Math.floor(Math.random() * 1000000)
    taskList.push({ id: id, task: newTask, check: false })
    input.value = ''
    input.focus()
    showTask()
  }
}
function showTask() {

  let list = taskList
  switch (select) {
    case "inc":
      list = list.filter((element) => element.check === false)
      break
    case "com":
      list = list.filter((element) => element.check === true)
  }

  let content = ''
  if (taskList !== null) {
    localStorage.setItem("userTask", JSON.stringify(taskList))


    list.forEach((element) => {
      content += `
    <article class="card" data-id='` + element.id + `'>
          <div class="card-container">
            <input class="card-check" type="checkbox" id="` + element.id + `" ` + checked(element.check) + `>
            <label class="card-title" for="` + element.id + `">` + element.task + `</label>
          </div>          
          <img class="card-icon" src="svg/trash.svg" alt="">
        </article> 
    `
    })
    container.innerHTML = content
  }
  if (content === '') {
    container.innerHTML = '<span class="error">' + message + '</span>'
  }
}
function deleteTask(id) {
  id = Number(id)
  const index = taskList.findIndex(item => item.id === id)
  taskList.splice(index, 1)
  showTask()
}
function editTask(id) {
  id = Number(id)
  const index = taskList.findIndex(item => item.id === id)
  taskList[index].check = !taskList[index].check
  showTask()
}
function filterTask(id) {
  labels.forEach((label) => { label.className = "label" })
  const label = document.getElementById(select)
  label.className = 'label select'
  showTask()
}
function changeLanguage() {
  let language = window.navigator.language || navigator.browserLanguage;
  language = language.toLowerCase();

  if (language.indexOf('es') !== -1) {
    input.placeholder = "Titulo de la tarea"
    btn.textContent = "Agregar"
    message = "No se encontraron tareas"
    document.getElementById("all").textContent = "Todo"
    document.getElementById("inc").textContent = "Incompleto"
    document.getElementById("com").textContent = "Completo"
  }
}
function load() {
  if(JSON.parse(localStorage.getItem("userTask")) !== null){
    taskList = JSON.parse(localStorage.getItem("userTask"))
  }
  changeLanguage()
  showTask()
}

load()

btn.addEventListener("click", function () {
  addTask()
})

input.addEventListener("keydown", (event) => {
  if (event.key === 'Enter') {
    addTask()
  }
})

labels.forEach((label) =>
  label.addEventListener("click", function () {
    select = label.id
    filterTask()
  }))


document.addEventListener("click", function (event) {
  if (event.target.className === 'card-icon') {
    const id = event.target.parentNode.dataset.id
    deleteTask(id)
  }
  if (event.target.className === 'card-check') {
    const id = event.target.parentNode.parentNode.dataset.id
    editTask(id)
  }
})


function checked(check) {
  if (check === true) {
    return 'checked'
  }
  else {
    return ''
  }
}