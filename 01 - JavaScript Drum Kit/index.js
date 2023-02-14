
function playSound(event){
    // console.log(event.propertyName);
    // console.log(event.key.toUpperCase());
    // [data-key="A"] 使用CSS访问data-*属性
    let audio=document.querySelector(`audio[data-key="${event.key.toUpperCase()}"]`)
    let key=document.querySelector(`div[data-key="${event.key.toUpperCase()}"]`);
    if(!audio) return;
    key.classList.add('playing');
    // 获得或设置音视频的当前播放位置
    audio.currentTime=0;
    audio.play();
    //查验audio 的DOM事件
    // audio.loop=true;
    // console.log(audio.loop);
}

function removeTransition(e){
    // console.log(e);//了解transitionend事件
    // console.log(e.propertyName);//与过渡相关的css属性
    // console.log(typeof e.propertyName);//string
    // console.log(e.target.className);//playing key
    if(e.propertyName!=="transform") return;
    e.target.classList.remove('playing');
    // console.log(e.elapsedTime);
 }

//document.querySelectorAll返回NodeList,Nodelist不是Array实例，是类数组对象
// document.getElementsByTagName/ByClassName返回的是Array
let keys=Array.from(document.querySelectorAll('.key'));
// console.log(document.querySelectorAll('.key') instanceof Array);//false
keys.forEach(key=>key.addEventListener('transitionend',removeTransition));
window.addEventListener("keydown",playSound);

 /*
 TransitionEvent: https://developer.mozilla.org/zh-CN/docs/Web/API/TransitionEvent
 propertyName属性：https://www.w3school.com.cn/jsref/event_transition_propertyName.asp
 transitionend事件：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/transitionend_event
 audio事件：https://www.runoob.com/jsref/dom-obj-audio.html
 以data-开头的自定义属性: https://blog.csdn.net/qq_31851435/article/details/53100691 以data-开头的自定义属性
    https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-* 
 */

//   let divs=document.getElementsByClassName('key');
//   console.log(Object.prototype.toString.call(keys).slice(8,-1));
//   document.getElementsByName(name) //返回在文档范围内具有给定 name 特性的元素

// data-*全局属性是一类被称为自定义数据属性的属性,它赋予我们在所有HTML元素上嵌入自定义数据属性的能力,并可以通过脚本在HTML和DOM表现之间进行专有数据的交换

// HTML中的data-*命名
// 属性名不要包含大写字母,在data-后至少有一个字符
// 该属性可以是任何字符串

// js访问data-*对象,通过elem.dataset.* 进行访问（*使用驼峰命名法，使用-连接两个字符时，取消-，第二个字母大写）
keys.forEach(key=>{
    console.log(key.dataset.key);
})

//在CSS中进行访问
// [data-key="A"] 使用CSS访问data-*属性

//transition事件
//检测transition的开始、允许和结束
//有三个事件：transitionrun  transitionstart  transitionend 