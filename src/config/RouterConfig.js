/**
 * Created by Administrator on 2017/1/3.
 */


import VueRouter from "vue-router";
import memberindex from "./../components/member/index.vue";
import vpublish from "./../components/member/publish.vue";
import vlist from "./../components/member/vlist.vue"
export  const routerConfig=new VueRouter({
   routes:[
       {path:"/",component:memberindex,name:"memberindex",
          children:[
              {path:"/pub",component:vpublish,name:"pub"},
              {path:"/vlist",component:vlist,name:"vlist"}
          ]
       }
   ]
});