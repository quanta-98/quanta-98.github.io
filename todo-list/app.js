var inputBox = document.querySelector('.inputField input');
var addBtn = document.querySelector('.inputField button');
var todoList = document.querySelector(".todoList");
var deleteAll = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
  let userData = inputBox.value; //lấy ra giá trị ng dùng nhập vào ô input

  /*
    nếu giá trị người dùng không chỉ là dấu cách(ở đây dùng userData.length sơ qua thì cũng đc, 
    nhưng nó vẫn tính cả khoảng trắng khi ng dùng ấn phím CÁCH, nên dùng trim() để trả về chuỗi k
    chứa khoảng trắng) 
  */
  if(userData.trim() != 0){
    addBtn.classList.add('active');
  }else {
    addBtn.classList.remove('active');
  }
}

showTasks();

// ng dùng click vào btn ADD
addBtn.onclick = () => {
  let userData = inputBox.value; //lấy ra giá trị ng dùng nhập vào ô input
  let getLocalStorage = localStorage.getItem("New Todo"); // lấy ra được dữ liệu trong localStorage 
  if (getLocalStorage == null){ // nếu LocalStorage rỗng
    var listArr = []; // Tạo ra 1 mảng rỗng
  } else {
    var listArr = JSON.parse(getLocalStorage); // chuyển đổi kiểu dữ liệu JSON của LocalStorage sang kiểu dữ liệu của JS
  }
  if(userData!=''){
    listArr.push(userData);
  };
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//
function showTasks(){
  let getLocalStorage = localStorage.getItem("New Todo"); // lấy ra được dữ liệu trong localStorage 
  if (getLocalStorage == null){ // nếu LocalStorage rỗng
    var listArr = []; // Tạo ra 1 mảng rỗng
  } else {
    var listArr = JSON.parse(getLocalStorage); // chuyển đổi kiểu dữ liệu JSON của LocalStorage sang kiểu dữ liệu của JS
  };
  const pendingNum = document.querySelector('.pendingNum');
  pendingNum.textContent = listArr.length;
  if (listArr.length>0) {
    deleteAll.classList.add('active');
  }else {
    deleteAll.classList.remove('active');
  }
  let newLiTag = '';
  listArr.forEach(function(element, index){
    newLiTag += `<li class="item"> <span class="name-todo">${element}</span> <span onclick="deleteTask(${index})" class="icon"><i class="fas fa-trash-alt"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value=""; //once task added leave the input field blank
}

//delete tasks
function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index,1); // xóa 1 phần tử ở vị trí index
  //after remove the li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

//delete All tasks
deleteAll.onclick = function() {
  listArr = [];
  //after delete all the li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}
