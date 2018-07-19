<template>
<div>
    <div class="text">{{text}}</div>

    <comp-footer></comp-footer>
</div>
</template>
<script>

import compFooter from './footer.jsx';

export default {
    name: 'app',
    components: {
        compFooter
    },
    data() {
        return {
            text: 'abc'
        };
    }
};
</script>
<style>

</style>