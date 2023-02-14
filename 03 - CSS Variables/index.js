function handleUpdate(e){
    // console.log(this);//this,当用户触发事件的时候，this=该html元素
    // console.log(e);
    const suffix=this.dataset.sizing || '';
    // javascript css操作
    // https://www.w3cschool.cn/javascript_guide/javascript_guide-8mpj269t.html
    document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
   
//    对DOM的探索
    // console.log(document);//DOM的所有操作都是以document对象开始。它是DOM的主入口点,从它可以访问任何节点
    // console.log(document.documentElement);//html文档结构
    // console.log(document.body);
    // //子节点--对应的是直系的子元素,childNodes列出了所有子节点，包括文本节点
   // //childNodes的返回的是一个可迭代对象[object NodeList]，而不是数组，可以用 for...of迭代，而不能使用for in
    console.log(Object.prototype.toString.call(document.body.childNodes));
    // for(let i=0;i<document.body.childNodes.length;i++){
    //     console.log(document.body.childNodes[i]);
    // }

    for(let node of document.body.childNodes){
        console.log(node);
    }
    // //子孙元素--嵌套在给定元素中的所有元素，包括子元素、子元素的子元素等
    // //firstChild 和 lastChild 属性是访问第一个和最后一个子元素的快捷方式。

    // 纯元素节点 children
    for(let node of document.body.children){
        console.log(node);
    }
   
}

let inputs=Array.from(document.querySelectorAll('.controls input'));

inputs.forEach(input=>{input.addEventListener("change",handleUpdate)});
// inputs.forEach(input=>{input.addEventListener("mousemove",handleUpdate)});
// 给CSS样式设置一个新的值
// propertyName:代表被更改的CSS属性
// value:新的属性值
// priority:允许设置'important'CSS优先级.如果没有指定,则当空字符串
// setProperty(propertyName, value, priority);
// 为选中元素样式的margin属性设置一个新的值
// Element.style.setProperty('margin', '1px 2px');

// CSS--var
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/var

// CSS滤镜属性 CSS3 filter(滤镜) 属性
// https://www.runoob.com/cssref/css3-pr-filter.html 


// //js通过元素id可以直接来访问html元素
// console.log(spacing.type);//可以通过id直接获取html元素
// console.log(spacing);
// console.log(document.forms.blur);//undefined

// document节点
