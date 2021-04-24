// var API = "http://localhost:3000/courses";
// fetch(API).then(function(response){
//   return response.json();
// }).then(function(courses){
//   console.log(courses);
// })



var courseApi = 'http://localhost:3000/courses';

function start(){

  getCourses(renderCourses);

  handleCreateForm();
}
start();

// functions

// lấy về dữ liệu từ API 
function getCourses(callback){
  fetch(courseApi)
    .then(function(response){
      return response.json();
    })
    .then(callback);
}

// tạo ra khóa học mới 
function createCourse(data, callback){
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(courseApi, options)
    .then(function(response){
      return response.json();
    })
    .then(callback)
}

// Xóa khóa học
function handledeleteCourse(id){
  var options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(courseApi + '/' + id, options)
    .then(function(response){
      return response.json();
    })
    .then(function(){
      getCourses(renderCourses);
    })
}

//Render dữ liệu ra trình duyệt
function renderCourses(courses){
  var listCoursesBlock = document.querySelector('#list-courses');
  var htmls = courses.map(function(course){
    return `
      <li>
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        <button onclick='handledeleteCourse(${course.id})'>Xóa</button>
      </li>
    `
  })
  listCoursesBlock.innerHTML = htmls.join('');
}


// khi click vào button lấy về 2 giá trị ng dùng nhập vào: name và description
function handleCreateForm(){
  var createBtn = document.querySelector('#create');
  createBtn.onclick = function(){
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var formData = {
      name:name,
      description:description
    };
    createCourse(formData, function(){
      getCourses(renderCourses);
    })
  }
}