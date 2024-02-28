// ------------------------------------------------ Selcet Elements ----------------------------------------------
let input = document.querySelector(".input");
let sumbit = document.querySelector(".add");
let TasksDiv = document.querySelector(".tasks");
let removeAll = document.querySelector(".remove-all");
// ------------------------------------------------ Empty Array ----------------------------------------------
let arrayTasks = [];
if (localStorage.getItem("tasks")) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
}
getData();

TasksDiv.addEventListener("click", (e) => {
    // Add del Button
    if (e.target.classList.contains("del")) {
        remvoeFromLocal(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    // remove from local
    if (e.target.classList.contains("task")) {
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});
// ------------------------------------------------ Add Task ----------------------------------------------

sumbit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
};
function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };
    arrayTasks.push(task);
    // Add Element To Document
    addTasksToPage(arrayTasks);
    // Add Element to Local
    addTaskToLocal(arrayTasks);
}
function addTasksToPage(tasks) {
    // Empty Taskes
    TasksDiv.innerHTML = "";
    tasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // Check Completed
        if (task.completed) {
            div.className = "task done ";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.text));
        // Create Delete btn
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        div.appendChild(span);
        TasksDiv.appendChild(div);
    });
}
function addTaskToLocal(tasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
}

function getData() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTasksToPage(tasks);
    }
}
function remvoeFromLocal(taskId) {
    arrayTasks = arrayTasks.filter((task) => task.id != taskId);
    addTaskToLocal(arrayTasks);
}
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayTasks.length; i++) {
      if (arrayTasks[i].id == taskId) {
        arrayTasks[i].completed == false ? (arrayTasks[i].completed = true) : (arrayTasks[i].completed = false);
      }
    }
    addTaskToLocal(arrayTasks);
  }
removeAll.addEventListener("click" ,function () {
    localStorage.clear("tasks");
    document.querySelectorAll(".tasks .task").forEach( e => {e.remove()});
    arrayTasks = [];
})