import {http} from "./httpBase"


export const login = (data) =>{

    return http
            .post("/login",data)
}

export const logout=()=>{
    return http.get("/logout")
}

//import useHttp
//let http=useHttp()
//http.post/get("/link",data,others)
// exports ={
//     login
// }