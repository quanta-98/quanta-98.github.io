var display = document.querySelector('.display');
var items = document.querySelectorAll('td');
items.forEach(function(btn){
  btn.addEventListener('click',function(){
    if(display.innerHTML=='0'){ //tránh viết 012(số 0 vẫn ở đầu mà k mất đi)
      display.innerHTML=='';
    }
    if(btn.innerHTML=='AC'){
      display.innerHTML=='0';
    }
    else if(btn.innerHTML=='Del'){
      var arrtext = Array.from(display.innerHTML);
      arrtext.splice(arrtext.length-1,1);
      if(arrtext.length!=0){
        display.innerHTML=arrtext.join('');
      }else {
        display.innerHTML=='0';
      }
    }
    else if(btn.innerHTML=='='){
      display.innerHTML=eval(display.innerHTML); //eval() giúp tính toán 1 chuỗi số vs phép tính
    }
    else{
      display.innerHTML = display.innerHTML + btn.innerHTML;
    }
  })
})