/**
 * Created by Administrator on 2017/3/7.
 */

import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui"
import "./../css/common.css";
import 'element-ui/lib/theme-default/index.css'



import VueResource from "vue-resource"
import global from "./global";//我们自己写的全局插件
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(global);//自己写的插件，用来做扩展
Vue.use(VueResource);

//引用路由
import VueRouter from "vue-router"
Vue.use(VueRouter);
import {routerConfig_users} from "./../config/RouterConfig";


import ResModule from "./../Store/modules/ResModule";//应用资源模块
import  UserModule from "./../Store/modules/UserModule";//用户模块

const  vuex_config=new Vuex.Store({
    modules:{
        res:ResModule,
        users:UserModule

    }
});


new Vue({
    el:".container",
    store:vuex_config,
    router:routerConfig_users   //设置路由
});


