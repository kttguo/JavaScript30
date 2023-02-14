#将文本转化成语音
##实践步骤
1.获取相关DOM元素，并进行 SpeechSynthesisUtterance()（语音合成发生）语音设置
2.监听speechSynthesis（语音合成）语音播放的voiceschanged事件，获取语系相关资料
3.设定发音语系
4.监听语系是否变更，更新语音设定，并播放语音
5.监听速率、音调、文字区块是否变更，更新语音设定、并播放语音
6.监听BUTTON的click实践，播放或取消语音

let voice=new SpeechSynthesisUtterance()自带的方法：
获取并设置语句语言
voice.lang

设置并设置音高，介于0-2之间，1是当前平台或语音的默认音高
voice.pitch 
朗读速度，介于0.1-10之间，1对应正常语速
voice.rate

获取并设置在说出话语时将要合成的文本
voice.text

voice.voice将设置话语的语音
音量，0-1，默认为1
voice.volume

语音合成事件
|事件|解析|
|....|....|
|boundary|当语句到达单词或句子边界时|
|end||
|error||
|mark|到达ssl标记时触发|
|pause|暂停|
|resume|恢复暂停的语句时触发|
|start|开始朗读时触发|
|||
|||

speechSynthesis属性示例
获取控制器
getVoice()检索可用语音的列表并用它们填充选择菜单，以便用户可以选择他们想要的语音
使用preventDefault()停止表单提交，创建新的ss实例
将话语语音设置为<select>元素中选择的语言，然后通过speechSynthesis.speak()方法开始说话
voiceschanged对象列表发生更改时，用于重新填充事件触发时可以选择的声音列表
每一条接受的语音解析如下
SpeechSynthesisVoice 
{
voiceURI: 'Microsoft Wayne Online (Natural) - English (Singapore)', 
name: 'Microsoft Wayne Online (Natural) - English (Singapore)', 
lang: 'en-SG', 
localService: false, 
default: false
}

speechSynthesis对合成语音的控制
let synth=window.speechSynthesis;
let voices=synth.getVoices();//获取声音列表
synth.speak()
synth.cancel()  移除所有语音谈话队列中的谈话
synth.pause() 暂停谈话
synth.resume() 置为非暂停状态，如果暂停了则继续
https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis

