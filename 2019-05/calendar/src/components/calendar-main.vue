<template>
    <div class="calendar-main">
        <ul class="calendar-main-header">
            <li
                class="calendar-main-header-item"
                v-for="(item, index) in weekHeader"
                :key="index"
            >
                {{item}}
            </li>
        </ul>

        <ul class="calendar-main-content">
            <li
                class="calendar-main-content-item"
                v-for="(item, index) in days"
                :key="index"
                :class="item.isInCurrentMonth ? '' : 'calendar-main-content-fade'"
            >
                <span>{{item.monthText}} {{item.day}}</span>
                <ul class="calendar-main-content-item-todo-wrap">
                    <li
                        class="calendar-main-content-item-todo"
                        v-for="(itemJ, indexJ) in item.todos"
                        :key="indexJ"
                    >
                        {{itemJ.todo}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
/**
 * @file 左侧日期切换
 *
 * @author yangzongjun
 * @date 2019-05-07
 */
import hub from '../utils/hub';
import {monthMap, weekHeader} from '../utils/constant';

export default {
    name: 'calendar-main',
    data() {
        return {
            weekHeader,
            days: []
        };
    },
    created() {
        hub.$on('changeDate', this.changeDateHandler);

        // 设置日历默认值
        const NOW = new Date();
        this.changeDateHandler(`${NOW.getFullYear()}-${NOW.getMonth()}`);
    },
    destroyed() {
        hub.$off('changeDate', this.changeDateHandler);
    },
    methods: {

        /**
         * 响应年月切换
         *
         * @param {Object} yearMonth 年月 形如： yyyy-m or yyyy-mm
         */
        changeDateHandler(yearMonth) {
            let temp = yearMonth.split('-');
            let dayCount = new Date(temp[0], +temp[1] + 1, 0).getDate(); // 该月份公有多少天：下个月的第0天
            this.generateCalendar(+temp[0], +temp[1], dayCount);
        },

        /**
         * 生成日历中的全部day
         *
         * @param {number} year 年
         * @param {number} month 月
         * @param {number} dayCount 该月份总天数
         */
        generateCalendar(year, month, dayCount) {
            let days = (new Array(dayCount).fill(0)).map((item, index) => {
                return {
                    day: index + 1,
                    isInCurrentMonth: true,
                    monthText: index === 0 ? monthMap[month] : ''
                };
            });

            let firstDayOfAMonth = new Date(year, month);
            let firstWeek = firstDayOfAMonth.getDay(); // 该月份第一天是星期几
            let headPadDays = this.padHead(firstWeek, year, month - 1, new Date(year, month, 0).getDate());
            headPadDays && days.unshift(...headPadDays);
            let tailPadDays = this.padTail(6 * 7 - days.length, year, month + 1, 1);
            tailPadDays && days.push(...tailPadDays);

            // mock todos
            days.map(item => {
                item.todos = [{
                        time: 'xxx',
                        todo: '跑步'
                    }, {
                        time: 'xxx',
                        todo: '背单词 背单词 背单词 背单词 背单词 背单词'
                    }];
            });

            this.days = days;
        },

        /**
         * 向前补全日历
         *
         * @param {number} stepCount 向前回溯的步数
         * @param {number} year 年份
         * @param {number} month 月
         * @param {number} day 日
         * @return {Array} 需向前补全的日期
         */
        padHead(stepCount, year, month, day) {
            if (stepCount === 0) {
                return;
            }

            let days = [];
            days.push({
                day: day,
                isInCurrentMonth: false
            });
            let res = this.padHead(--stepCount, year, month, --day);
            if (res) {
                days = [...res, ...days];
            }

            return days;
        },

        /**
         * 向后补全日历
         *
         * @param {number} stepCount 向后回溯的步数
         * @param {number} year 年份
         * @param {number} month 月
         * @param {number} day 日
         * @return {Array} 需向后补全的日期
         */
        padTail(stepCount, year, month, day) {
            if (stepCount === 0) {
                return;
            }

            let days = [];
            days.push({
                day: day,
                isInCurrentMonth: false,
                monthText: day === 1 ? monthMap[month] : ''

            });
            let res = this.padTail(--stepCount, year, month, ++day);
            if (res) {
                days = [...days, ...res];
            }

            return days;
        }
    }
};
</script>
<style lang="less">
    @import "../assets/global-variable.less";

    .calendar-main {
        &-header {
            display: flex;
            border-bottom: 1px solid @gray;
            padding: .1rem 0;
            &-item {
                flex: 0 1 14.2%;
            }
        }
        &-content {
            display: flex;
            flex-wrap: wrap;
            &-item {
                @padding-gap: .05rem;
                position: relative;
                height: 1rem;
                flex: 0 0 13.2%;
                box-sizing: border-box;
                margin: .5%;
                padding: @padding-gap;
                border: @1px-solid-gray;
                border-radius: 2px;

                &:nth-child(7n + 1),
                &:nth-child(7n) {
                    border: none;
                    background-color: #33da4a;
                    &::after {
                        content: '周末';
                        color: #CC3333;
                        position: absolute;
                        display: inline-block;
                        bottom: @padding-gap;
                        right: @padding-gap;
                    }
                }
                &:nth-child(7n + 1) {
                    margin-left: 0;
                }
                &:nth-child(7n) {
                    margin-right: 0;
                }

                &-todo {
                    &-wrap {
                        height: .5rem;
                        overflow: hidden;
                        overflow-y: scroll;
                        &::-webkit-scrollbar {
                            display: none;
                        }
                    }
                    font-size: 10px;
                    padding-left: .15rem;
                    position: relative;
                    &::before {
                        content: '';
                        display: inline-block;
                        position: absolute;
                        left: 0;
                        top: 6px;
                        width: .05rem;
                        height: .05rem;
                        border-radius: 50%;
                        background-color: @gray;
                    }
                }
            }
            &-fade {
                opacity: .3;
            }
        }

    }
</style>
