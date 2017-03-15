/**
 * Created by Administrator on 2016/12/21.
 */

import functions from "./functions";
import APIConfig from "./../config/APIConfig";
export  default{
    install(Vue)
    {
        Vue.prototype.functions=functions;
        Vue.prototype.APIConfig=APIConfig
    }
}