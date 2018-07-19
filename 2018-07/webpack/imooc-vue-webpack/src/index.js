import Vue from 'vue';
import App from './app.vue';

import './style/index.css';
import './image/snapshot.png';
import './style/test.less';

const root = document.createElement('h1');
document.body.appendChild(root);

new Vue({
    render: h => h(App)
}).$mount(root);