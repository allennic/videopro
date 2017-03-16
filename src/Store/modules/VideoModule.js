
import  Vue from "vue";
export  default{

    mutations: {
    },
    actions:{
        submitVideo(context,params)
        {
            //params 就是publish组件中的 video对象
           Vue.http.post("http://localhost:9090/video/submitvideo",
               params).then(function(res){
               if(res.body.status=="success")
               {
                   alert("上传成功，未来我们需要跳转到列表页中");
               }

            },function(res){
               alert(res.body.message)
           })
        }

    }
}