import Vue from 'vue';
import App from './App.vue';
import './assets/fonts/font.css';
import Xhtml from './components/index';
// 注册组件库
Vue.use(Xhtml);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
