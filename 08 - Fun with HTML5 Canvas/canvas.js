window.onload = function () {
    // 获取canvas的引用
    let canvas = document.getElementById("draw");
    // 获取canvas元素的context（上下文）——图像稍后会在这里被渲染
    const ctx = canvas.getContext("2d");
    console.log(ctx);

    // canvas标签只有两个属性,width和height,这两个属性是可选的,我们也可以使用HTML高度和宽度属性来自定义尺寸
    console.log(canvas.width);
    console.log(canvas.height);
  
    //绘制图形
    //   fillStyle属性可以是CSS颜色 渐变 或图案
    ctx.fillStyle = "green";
    //fillRect方法将他放在左上角(10,10),并把它的大小设定为宽150高100
    // fillRect(x,y,width,height) 方法定义了矩形当前的填充方式。
    ctx.fillRect(10, 10, 150, 100);

    //绘制矩形边框
    ctx.strokeRect(10,225,150,100);
  
    //路径---画线
    //   moveTo(x,y)//线条开始坐标
    //   lineTo(x,y)//线条结束坐标
    //   stroke() //绘制线条
  
    ctx.moveTo(160, 10);
    ctx.lineTo(300, 110);
    ctx.stroke();
  
    //绘制圆形
    //arc(x,y,r,start,stop)
    ctx.beginPath();
    ctx.arc(350, 50, 50, 0, 2 * Math.PI);
    ctx.stroke();
  
    //文本
    // font-字体
    // fillText(text,x,y);//绘制实心文字
    // strokeText(text,x,y);//绘制空心文字
  
    ctx.font='30px Arial';
    ctx.fillText('学习使用canvas',450,40);
    ctx.strokeText('空心文字',450,80);
  
  
  //   渐变
    // 渐变可以填充在矩形 圆形 线条 文本等,各种形状可以可以定义不同的颜色
    // 以下有两种不同的方式来设置canvas
    // createLinearGradient(x,y,x1,y1);--创建线条渐变
    // createRadialGradient(x,y,r,x1,y1,r1) --创建一个径向/圆渐变
    // addColorStop()--以指定颜色停止,参数使用坐标来表示,0-1
    // 然后绘制形状

    //径向渐变
    let grd=ctx.createLinearGradient(120,10,320,150);
    grd.addColorStop(0,'red');
    grd.addColorStop(1,'white');

    //绘制形状
    ctx.fillStyle=grd;
    ctx.fillRect(10,120,150, 100);

    //线向渐变
    var grd2=ctx.createRadialGradient(180,130,10,200,200,100);
    grd2.addColorStop(0,'red');
    grd2.addColorStop(1,'white');
    ctx.fillStyle=grd2;
    ctx.fillRect(170,120,150,100);

    // 将图像放在画布上
    // drawImage(image,x,y);
    let img=document.getElementById('cavimg');
    ctx.drawImage(img,330,110);
  };
  
//   教程: https://www.w3cschool.cn/kqjhm/
// https://www.w3cschool.cn/xjmuw/xjmuw-km4925xb.html