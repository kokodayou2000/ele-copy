import instance from "@/api/base";
import axios from "axios";

export const fetchTest = () =>{
    return instance.get('/test')
}