
import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui"
import "./../css/common.css";
import 'element-ui/lib/theme-default/index.css'
import navbar from "./../components/member/navbar.vue";//加载导航栏

import global from "./global";//我们自己写的全局插件
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(global);

Vue.component("navbar",navbar);
new Vue({
 el:".container",

});


