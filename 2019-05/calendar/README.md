# calendar

使用vue3脚手架仿照 ![](https://www.grapecity.com.cn/images/metalsmith/career/chanllenge/image001.jpg) 和 mac calendar

## 开发思路

- 左侧切换年份、月份，数据变更通知右侧展示区域重新绘制（兄弟组件通信通过hub）；
- 右侧展示区域，日历固定有6行，先判断当前月份第一天是星期几，然后向前补全第一行。向后补全日历则根据日历总天数一直补全至42(6 * 7)

## 踩坑点

- 获取年份 getFullYear
- 获取月份 getMonth (一月->0,二月->1,...)
- 获取日期 getDate
- 获取星期 getDay （星期天->0,星期一->1,...）
- 区分`new Date('2019-05')`和`new Date(2019, 05)` 前者是5月，后者是6月
- 获取本月（如2019年5月）的最后一天 `(new Date(2019, 5, 0)).getDate()`
