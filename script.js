let $todoInput;
let $alertInfo;
let $addBtn;
let $ulList;
let $newTask;
let $toolsPanel;
let $completeBtn;
let $editBtn;
let $deleteBtn;
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;
let $allTasks;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  $todoInput = document.querySelector(".todoInput");
  $alertInfo = document.querySelector(".alertInfo");
  $addBtn = document.querySelector(".addBtn");
  $ulList = document.querySelector(".todoList ul");

  $popup = document.querySelector(".popup");
  $popupInfo = document.querySelector(".popupInfo");
  $popupInput = document.querySelector(".popupInput");
  $addPopupBtn = document.querySelector(".accept");
  $closeTodoBtn = document.querySelector(".cancel");
  $allTasks = $ulList.getElementsByTagName("li");
};

const prepareDOMEvents = () => {
  $addBtn.addEventListener("click", addNewTask);
  $ulList.addEventListener("click", clickCheck);
  $closeTodoBtn.addEventListener("click", closePopup);
  $addPopupBtn.addEventListener("click", changeTodo);
  $todoInput.addEventListener("keyup", enterCheck);
};

const addNewTask = () => {
  if ($todoInput.value !== "") {
    $idNumber++;
    $newTask = document.createElement("li");
    $newTask.textContent = $todoInput.value;
    $newTask.setAttribute("id", `todo-${$idNumber}`);
    $ulList.appendChild($newTask);
    $todoInput.value = "";
    createToolsArea();
    $alertInfo.innerText = "";
  } else {
    $alertInfo.textContent = "";
  }
};

const enterCheck = () => {
  if (event.keyCode === 13) {
    addNewTask();
  }
};

const createToolsArea = () => {
  $toolsPanel = document.createElement("div");
  $toolsPanel.classList.add("tools");
  $completeBtn = document.createElement("button");
  $completeBtn.classList.add("complete");
  $editBtn = document.createElement("button");
  $editBtn.classList.add("edit");
  $deleteBtn = document.createElement("button");
  $deleteBtn.classList.add("delete");
  $newTask.appendChild($toolsPanel);
  $completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  $editBtn.innerText = "EDIT";
  $deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
  $toolsPanel.appendChild($completeBtn);
  $toolsPanel.appendChild($editBtn);
  $toolsPanel.appendChild($deleteBtn);
};

const clickCheck = (e) => {
  if (e.target.closest("button").classList.contains("complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.closest("button").classList.toggle("completed");
  } else if (e.target.closest("button").classList.contains("edit")) {
    // console.log(e.target);
    editTask(e);
  } else if (e.target.closest("button").classList.contains("delete")) {
    deleteTask(e);
  }
};

const editTask = (e) => {
  const oldTodo = e.target.closest("li").id;
  $editedTodo = document.getElementById(oldTodo);
  $popupInput.value = $editedTodo.firstChild.textContent;
  $popup.style.display = "flex";
};

const closePopup = () => {
  $popup.style.display = "none";
  $popupInfo.innerText = "";
};

const changeTodo = () => {
  if ($popupInput.value !== "") {
    $editedTodo.firstChild.textContent = $popupInput.value;
    $popup.style.display = "none";
    $popupInfo.innerText = "";
  } else {
    $popupInfo.innerText = "Musisz podać jakąś treść";
  }
};

const deleteTask = (e) => {
  const deleteTodo = e.target.closest("li");
  deleteTodo.remove();

  if ($allTasks.length === 0) {
    $alertInfo.innerText = "Não há tarefas na lista";
  }
};

document.addEventListener("DOMContentLoaded", main);
