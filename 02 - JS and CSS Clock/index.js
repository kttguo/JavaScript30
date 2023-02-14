let secondHand = document.querySelector(".second-hand");
let minHand = document.querySelector(".min-hand");
let hourHand = document.querySelector(".hour-hand");
let  secondDegrees=0, minutesDegree=0 , hoursDegree=0;

function initDate() {
  let now = new Date();
  // 访问日期组件
  let seconds = now.getSeconds();
  secondDegrees = (seconds / 60) * 360 + 90;

  let minutes = now.getMinutes();
  minutesDegree = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;

  let hours = now.getHours();
   hoursDegree =
    (hours / 12) * 360 + (minutes / 60) * 30 +  90;
}



function updataDate(){
    secondDegrees+=(1/60)*360 ;
    minutesDegree+=((1/60)/60)*360 ;
    hoursDegree+=(((1/60)/60)/12);

    // console.log(secondDegrees);
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minHand.style.transform = `rotate(${minutesDegree}deg)`;
    hourHand.style.transform = `rotate(${ hoursDegree}deg)`;
}

initDate();
console.log(secondDegrees);
setInterval(updataDate, 1000);

// 如何计算时针分针走过的角度 https://zhidao.baidu.com/question/393111327624301045.html
// 在js中使用style对象设置样式时=右边的内容要加" ",因为它们是字符串