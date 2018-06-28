# 回车（carriage return）、换行（line feed）

## 先说结论

unix系统是 换行 `\n`
windows系统是 会车换行 `\r\n`
mac系统是 换行 `\n` (很早之前mac是 `\r`，不过已是历史，可忽略)

所以通用的匹配 '换行' 的正则是 `\r?\n`

## 解释

在早期电传打印机的时候，需要打印头回到行首就执行 `carriage return`，需要打印头向下挪动一行（其实是把纸向上挪一行）就用 `line feed`。

回车是横向移动，换行是垂直方向移动

>mac的 \r 指的是macos9以前的系统。对于macosx（当今能见到的所有mac），跟linux一样是\n。你可以把回车理解为\n 然后每当遇到windows就需要额外加个\r而已

>"回车"（carriage return）和"换行"（line feed） 是来源机械英文打字机的...电传打字机那个是后来的...
"车"指的是纸车,带着纸一起左右移动的模块。。。 当开始打第一个字之前，要把纸车拉到最右边，上紧弹簧。。随着打字， 弹簧把纸车拉回去..每当打完一行后，纸车就完全收回去了...所以叫回车..
换行的概念就是 :: 打字机左边有个"把手 ",往下 扳动一下,纸会上移一行..

reference:
1. [ruanyifeng](http://www.ruanyifeng.com/blog/2006/04/post_213.html)
2. [zhihu](https://www.zhihu.com/question/25506312)