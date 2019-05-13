<template>
    <div id="app">
        <toggle-panel class="left">
        </toggle-panel>

        <!-- <video class="right">
        </video> -->
        <video id="myde" style="width: 100%" class="right"
                src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
                autoplay="true" loop></video>
    </div>
</template>

<script>
import TogglePanel from './components/toggle-panel.vue';
import video from './components/calendar-main.vue';

export default {
    name: 'app',
    components: {
        TogglePanel,
        video
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
