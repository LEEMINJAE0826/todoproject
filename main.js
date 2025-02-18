// 유저가 값을 입력
// +버튼을 클릭하면, 할 일이 추가된다
// 삭제버튼을 누르면 할 일이 삭제된다
// 완료버튼을 누르면 할 일이 삭선처리된다
// 진행중 완료 탭을 누르면 포커스가 이동
// 완료탭은 완료된 아이템만, 진행중 탭은 진행중만 노출
// 전체탭을 누르면 다시 전체 아이템 노출

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addTask);

function addTask() {
  console.log("clicked");
}
