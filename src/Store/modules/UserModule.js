import  Vue from "vue";
export  default{
    state:{
        CurrentUser:{
            get UserName()
            {
                let getUName=localStorage.getItem("CurrentUser_Name");
                if(getUName==null || getUName==undefined)
                    return "guest";
                return getUName;
            },
            get UserToken()
            {
                return localStorage.getItem("CurrentUser_Token");
            }
        }
    },
    mutations:{
        setUser(state,{user_name,user_token})
        {
            localStorage.setItem("CurrentUser_Name",user_name);
            localStorage.setItem("CurrentUser_Token",user_token);
            alert("登录成功");
        }
    }
    ,
    actions:{
        userLogin(context,{user_name,user_pass})
        {
            Vue.http.get("http://localhost:9090/token?client_appid="+user_name
                +"&client_appkey="+user_pass).then((rs)=>{
                if(rs!=null && rs.body!=undefined && "access_token" in rs.body)
                {
                    if(rs.body.access_token!=null)
                    {
                            //代表后端API验证通过
                        context.commit("setUser",{user_name,"user_token":rs.body.access_token});
                        
                    }
                    else
                    {
                        alert("用户名密码错误");
                    }
                }
                else
                {
                    alert("用户名密码错误");
                }
            },(rs)=>{})
        }
    }
}