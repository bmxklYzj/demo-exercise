<template>
    <div id="app">
        <toggle-panel class="left">
        </toggle-panel>

        <calendar-main class="right">
        </calendar-main>
    </div>
</template>

<script>
import TogglePanel from './components/toggle-panel.vue';
import calendarMain from './components/calendar-main.vue';

export default {
    name: 'app',
    components: {
        TogglePanel,
        calendarMain
    }
};
</script>

<style lang="less">
@import url("./assets/global-reset.less");
html {
    font-size: 100px;
}
#app {
    font-size: 14px;

    display: flex;
    margin: .5rem 1rem;
    .left {
        flex: 0 1 20%;
    }
    .right {
        flex: 0 1 80%;
    }
}
</style>
