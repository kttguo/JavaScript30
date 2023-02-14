const url = "http://jsonplaceholder.typicode.com/posts";
//初步了解如何使用fetch从网络上获取数据，了解获取相应的两个阶段，响应头和body，以及header
async function getData1() {
  //此处是一个简单的GET请求,下载url的内容
  //浏览器立即启动请求，并返回一个调用代码应该用来获取结果的promise

  let response = await fetch("http://jsonplaceholder.typicode.com/posts");
  //获取响应通常经过两个阶段
  //第一阶段：当服务器发送了响应头,fetch返回的promise就使用内建的response calss对象来对响应头进行解析
  //在这个阶段，我们可以通过检查响应头，来检查HTTP状态是否成功
  if (response.ok) {
    console.log(response.status); //HTTP 状态码
    console.log(response.ok); //HTTP 状态码为 200-299，则为 true

    //第二阶段：获取并解析response body,拿到合适数据类型的数据
    const posts = await response.json(); //将response解析成json模式
    // const posts = await response.text();
    // const posts = await response.formData();//formData()是表示 HTML 表单数据的对象
    // const posts = await response.blob();// 以 Blob（具有类型的二进制数据）形式返回 response
    // const posts = await response.arrayBuffer();//以 ArrayBuffer（低级别的二进制数据）形式返回 response
    // response.body 是 ReadableStream 对象，它允许你逐块读取 body，我们稍后会用一个例子解释它。
    console.log(posts); //展示数据

    //response header
    console.log(response.headers); //response header是一个类似于Map的Header对象。它不是真正的map，但是具有类型的方法，可以按照名称获取各个header或迭代它们
    // console.log(response.headers.get('Content-Type'));//application/json; charset=utf-8
    //   'Content-Type'的值可以是
    //application/json; charset=utf-8  ：json
    // multipart/form-data //表单形式
    //text/plain;charset=UTF-8 //body数据形式为字符串
    for (let [key, value] of response.headers) {
      console.log(`${key} = ${value}`);
      // x-ratelimit-resource = core
    }
  } else {
    console.log("HTTP ERROR: " + response.status);
  }
}
//   getData1();

//创建POST发送user对象
async function sendPost() {
  let user = {
    name: "Jhon",
    surname: "Smith",
  };
  let response = await fetch(" ", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();
  console.log(result.message);
}
// sendPost();

//   获取下载进进度--使用response.body 属性，该属性给予了对进度读取的完全控制,我们随时可以计算下载了多少

async function getDownloadProgresss() {
  // Step 1：启动 fetch，并获得一个 reader
  let response = await fetch(
    "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100"
  );
  //流读取器，替代response.json以及其他方法
  const reader = response.body.getReader();

  // Step 2：获得总长度（length）
  const contentLength = +response.headers.get("Content-Length");
  console.log(contentLength); //0 在读取数据前，可以从header中得到完整的响应长度

  // Step 3：读取数据
  //调用await reader.read()，直到它完成，将响应块收集到chunks数组中
  let receivedLength = 0; // 当前接收到了这么多字节
  let chunks = []; // 接收到的二进制块的数组（包括 body）
  //在body下载时，一直为无限循环
  while (true) {
    //当最后一块下载完成时，done的值为true
    //value 是块字节的 Uint8Array，是字节的类型化数组

    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    console.log(`Received ${receivedLength} of ${contentLength}`);
  }

  // Step 4：将所有的块连接到单个 Uint8Array，将所有结果存储在chunkAll中
  let chunksAll = new Uint8Array(receivedLength); // (4.1)
  let position = 0;
  for (let chunk of chunks) {
    chunksAll.set(chunk, position); // (4.2)
    position += chunk.length;
  }

  // Step 5：解码成字符串
  let result = new TextDecoder("utf-8").decode(chunksAll);

  // 我们完成啦！
  let commits = JSON.parse(result);
  console.log(commits[0].author.login);
  console.log(commits[0]);
}
// getDownloadProgresss();

//中止
async function fetchAbort() {
  let controller = new AbortController();
  // console.log(controller);//AbortController {signal: AbortSignal}
  let signal = controller.signal;
  //1秒之后中止

  //执行可取消操作部分
  //获取signal对象，并将监听器设置为在controller.abort()被调用是触发
  signal.addEventListener("abort", () => console.log("abort"));

  // console.log(signal.aborted);//false
  //中止
  // controller.abort();

  //触发事件,signal.aborted 变为 true
  // console.log(signal.aborted);

  // 与fetch一起使用
  //一秒之后中止
  setTimeout(() => controller.abort(), 1000);
  try {
    let response = await fetch(url, {
      signal: controller.signal,
    });
    console.log(response);
  } catch (err) {
    if (err.name == "AbortError") {
      // handle abort()
      alert("Aborted!");
    } else {
      throw err;
    }
  }
}

// fetchAbort()

async function crossOrigin() {
  try {
    let url="https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json"
    let response=await fetch(url, {
    // header:{
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Access-Control-Allow-Origin':url,
    // },
      mode: "cors",
      
    });
    const posts = await response.json();
    console.log(posts);
    // response.setHeader("Access-Control-Allow-Origin", url);
  } catch (err) {
    console.log(err); // fetch 失败
  }
//   finally{
//     response.setHeader("Access-Control-Allow-Origin", "*");
//     console.log(response.status);
//   }
}
// crossOrigin();

// url对象
// 内建的url对象提供了用于创建和解析URL的便捷接口

