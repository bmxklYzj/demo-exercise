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
                :style=""
            >
                {{item.day}}
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
import {monthMap} from '../utils/constant';

export default {
    name: 'calendar-main',
    data() {
        return {
            weekHeader: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            days: []
        };
    },
    created() {
        hub.$on('changeDate', this.changeDateHandler);
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
            console.log('changeDateHandler', yearMonth);

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
            let headPadDays = this.padHead(--firstWeek, year, month - 1, new Date(year, month, 0).getDate());
            headPadDays && days.unshift(...headPadDays);
            let tailPadDays = this.padTail(6 * 7 - days.length, year, month + 1, 1);
            tailPadDays && days.push(...tailPadDays);

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
            &-item {
                height: 1rem;
                width: 14.2%;
                float: left;

                &:nth-child(7n + 1),
                &:nth-child(7n) {
                    background-color: #33da4a;
                }
            }
        }

    }
</style>
