<template>
    <div class="toggle-panel">
        <div class="year">
            <select class="year-current" v-model="currentYear" @change="changeYear">
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
            </select>
            <span class="year-current-icon"></span>
        </div>

        <ul class="month">
            <li
                :class="['month-item', currentMonth === index ? 'active' : '']"
                v-for="(item, index) in monthMap"
                :key="index"
                :data-month="item"
                @click="changeMonth(index)"
            >
                {{item}}
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

const NOW = new Date();
export default {
    name: 'toggle-panel',
    data() {
        return {
            currentYear: NOW.getFullYear(),
            currentMonth: NOW.getMonth(),
            monthMap: monthMap
        };
    },
    methods: {
        changeYear() {
            hub.$emit('changeDate', `${this.currentYear}-${this.currentMonth}`);
        },
        changeMonth(changedMonth) {
            hub.$emit('changeDate', `${this.currentYear}-${changedMonth}`);
            this.currentMonth = changedMonth;
        }
    }
};
</script>
<style lang="less">
    @import "../assets/global-variable.less";

    .year {
        margin-top: .1rem;
        margin-bottom: .1rem;
        position: relative;
        display: inline-block;
        &-current {
            appearance: none;
            -webkit-appearance: none;
            display: inline-block;
            padding: .03rem;
            padding-right: .2rem;
            border: @1px-solid-gray;
            border-radius: .02rem;
            cursor: pointer;

            &-icon {
                position: absolute;
                right: 5px;
                top: 8px;
                display: inline-block;
                pointer-events: none; // 透传点击事件
                vertical-align: middle;
                border: .05rem solid transparent;
                border-top-color: #999;
            }
        }
    }
    .month {
        width: 1rem;
        &-item {
            height: 24px;
            // line-height: 24px;
            width: 50%;
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            border: @1px-solid-gray;
            border-top: none;
            &:nth-child(even) {
                border-left: none;
            }
            &:first-child {
                border-top: @1px-solid-gray;;
            }
            &:nth-child(2) {
                border-top: @1px-solid-gray;;
            }
        }
        .active {
            position: relative;
            &:after {
                content: attr(data-month);
                position: absolute;
                top: -1px;
                left: -1px;
                display: inline-block;
                width: calc(100% + 2px);
                padding-top: 1px;
                height: calc(100% + 1px);
                background: @red;
            }
        }
    }
</style>
