// import axios from "axios";
import {http} from "./httpBase"


export const login = (data) =>{

    return http
            .post("/login",data)
}



// exports ={
//     login
// }