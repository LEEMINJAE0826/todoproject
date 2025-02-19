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
let taskList = [];
let mode = "all";
let filterList = [];

document.getElementById("all").classList.add("active-tab");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
    taskInput.value = "";
  }
  render();
});

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let = resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task-done">
            <span>${list[i].taskContent}</span>
            <div class="btn-erea">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
            <div><span>${list[i].taskContent}</span></div>
            <div class="btn-erea">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < filterList.length; i++) {
    if (filterList[i].id == id) {
      filterList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  //탭 활성화 비활성화 관련 부분
  tabs.forEach((tab) => tab.classList.remove("active-tab"));
  event.target.classList.add("active-tab");

  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
