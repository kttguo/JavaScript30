let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// 倒计时逻辑实现
function timer(seconds) {
  // clear any existing timers清除现有任何计时器
  // 阻止后续调用
  clearInterval(countdown);

  //不带参数，创建的是当前事件
  const now = Date.now();
  // 时间戳使用的是毫秒
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  // 每间隔1秒时间调用执行 countdown倒计时
  countdown = setInterval(() => {
    // 四舍五入
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

//UI展示 倒计时
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

// UI展示 具体的结束事件
function displayEndTime(timestamp) {
  // timestamp是从1970年1月1日之后经历过的毫秒数，这个毫秒数被称之为时间戳，可用使用date.getTime将现有date对象转化为时间戳
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  // console.log(mins);
  timer(mins * 60);
  // reset 方法可以重置一个表单内的所有表单控件的值到初始状态。
  this.reset();
});
