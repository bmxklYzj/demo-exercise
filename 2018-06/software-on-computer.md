# 效率软件

盘点我用到的比较好用的电脑软件：

## mac 平台

|软件|英文名|简介|
|:-----:|:-----:|:-----:|
|记笔记|onenote|1. 分区、分页功能便于管理笔记；2. 像纸一样，随意写作（也推荐安装office系列，虽然功能没有windows上的强大，但够用）|
|思维导图|xMind （或者 naotu.baidu.com 网站）|清晰梳理逻辑的利器|
|原型设计|Axure 、 sketch|快速绘制前端界面原型，现在基本已经取代photoshop了|
|快速原型工具|Balsamiq Mockups 3|线条风格|
|host管理|switchhosts||
|远程桌面|teamViewer|跨平台远程桌面连接，比如可以android连接并控制pc屏幕|
|纯文本比对|beyondCompare|比对两份纯文本（代码）差异|
|git图形化工具|sourTree|主要用来diff代码，非常直观|
|终端|item2|配合zsh使用更佳|
|get things done|wunderlist|记录todo的工具，唯一不足就是不能标记为“未做”，没有统计功能|
|ui图标注间距|Mark Man||
|菜单栏展示cpu、内存等|iStat Menus||
|管理系统菜单|Bartender 3|让菜单更加简洁，可以自定义隐藏某些菜单|
|调节屏幕色温，适当保护眼睛|Flux||
|让鼠标的滚动方向和windows一致|~~Reverse scroll~~ Mos |一个用于在 MacOS 上平滑你的鼠标滚动效果或单独设置滚动方向的小工具, 让你的滚轮爽如触控板： https://github.com/Caldis/Mos|
|解压缩工具（apple store免费下载）|IZip Unarchiver||
|http请求发送工具|postman||
|统计时间|rescueTime||
|快速搜索|alfred||
|显示当前页面的快捷键|cheatsheet||
|磁盘清理|Dr.cleaner 或 cleanMyMac||
|gif制作|Gifox 或 LICEcap|录制视频直接用qq截图|
|nord|vpn||
|kindle|阅读||
|typora|markdown文档||
|ipic|图床|
|dash|本地文档|

其它较常见应用：qq（主要是截图功能非常好用）、MS家的word/ppt/excel

## other

1. visual statudio code javascript snippets

```json
{
	/*
	// Place your snippets for JavaScript here. Each snippet is defined under a snippet name and has a prefix, body and
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
*/
	"document.querySelector": {
		"prefix": "dq",
		"body": [
			"document.querySelector('$1');"
		],
		"description": "document.querySelector"
	},
	"Print to console": {
		"prefix": "conl",
		"body": [
			"console.log($1);"
		],
		"description": "Log output to console"
	},
	"For let": {
		"prefix": "forl",
		"body": [
			"for (let len$1 = ${2:array}.length - 1; len$1 >= 0; len$1--) {",
			"\tlet ${3:item} = ${2:array}[len$1];",
			"\t$0",
			"}"
		],
		"description": "For Loop"
	},
	"forEach": {
		"prefix": "forE",
		"body": [
			"${1:array}.forEach((item, index) => {",
			"\t$0",
			"});"
		],
		"description": "For Loop"
	},
	"file header": {
		"prefix": "@file",
		"body": [
			"/**",
			" * @file ${1: file name}",
			" *",
			" * @author yangzongjun(yangzongjun@baidu.com)",
			" * @date ${2: datetime (⇧⌘I or cmd+Shift+I)}",
			" */"
		]
	},
	"file header2": {
		"prefix": "_f",
		"body": [
			"/**",
			" * @file ${1: file name}",
			" *",
			" * @author yangzongjun(yangzongjun@baidu.com)",
			" * @date ${2: datetime (⇧⌘I or cmd+Shift+I)}",
			" */"
		]
    },
    "mulitline comment": {
		"prefix": "_c",
		"body": [
			"/**",
			" * $0",
			" */"
		]
	}
}
```
