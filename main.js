// 유저가 값을 입력
// +버튼을 클릭하면, 할 일이 추가된다
// 삭제버튼을 누르면 할 일이 삭제된다
// 완료버튼을 누르면 할 일이 삭선처리된다
// 진행중 완료 탭을 누르면 포커스가 이동
// 완료탭은 완료된 아이템만, 진행중 탭은 진행중만 노출
// 전체탭을 누르면 다시 전체 아이템 노출

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskBoard = document.getElementById("task-board");
let taskList = [];
let mode = "all";

document.getElementById("all").classList.add("active-tab");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", function (event) {
    changeMode(event.target.id);
  });
});

function addTask() {
  let taskValue = taskInput.value.trim();
  if (taskValue === "") return alert("할 일을 입력해주세요.");

  let task = {
    id: randomIDGenerate(),
    taskContent: taskValue,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let resultHTML = "";
  let filteredList = getFilteredList();

  filteredList.forEach((task) => {
    resultHTML += `<div class="task ${task.isComplete ? "task-done" : ""}">
      <span>${task.taskContent}</span>
      <div class="btn-area">
        <button onclick="toggleComplete('${task.id}')">
          <i class="fa-solid ${
            task.isComplete ? "fa-rotate-left" : "fa-check"
          }"></i>
        </button>
        <button onclick="deleteTask('${task.id}')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>`;
  });

  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  let task = taskList.find((task) => task.id === id);
  if (task) {
    task.isComplete = !task.isComplete;
  }
  render();
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  render();
}

function changeMode(selectedMode) {
  mode = selectedMode;
  tabs.forEach((tab) => tab.classList.remove("active-tab"));
  document.getElementById(selectedMode).classList.add("active-tab");
  render();
}

function getFilteredList() {
  if (mode === "all") return taskList;
  return taskList.filter((task) =>
    mode === "done" ? task.isComplete : !task.isComplete
  );
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function filter(event) {
  //탭 활성화 비활성화 관련 부분
  tabs.forEach((tab) => tab.classList.remove("active-tab"));
  event.target.classList.add("active-tab");

  if (event) {
    mode = event.target.id;
  }

  filterList = [];
  // if (mode === "all") {
  //   render()};
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
