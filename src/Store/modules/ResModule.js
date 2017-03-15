
import  Vue from "vue";
export  default{
    state:
    {
        NavBar:[] //导航栏
    },
    mutations:{
        setData(state,{key,data}) // 更改state的通用函数
        {
            state[key]=data;

        }
    },
    actions:{
        loadData(context,{url,key}) //params是一个对象参数，里面包含url(API地址),属性名,
        {
            Vue.http.get(url).then((rs)=>{
                context.commit("setData",{key,data:rs.body});
            },(rs)=>{

            })
        }

    }
}