import axios from "axios";
import {Dialog, showDialog} from "vant";

const instance = axios.create({
    baseURL:'/api'
})
instance.interceptors.response.use((resp)=> {
    const {data:_data}=resp
    const {data,code,msg} =_data
    if (code != 0){
        showDialog({
            message : msg,
        }).then(()=>{
            //关闭窗口
            console.log("close")
        })
        return Promise.reject(msg)
    }
    return data
})
export default instance