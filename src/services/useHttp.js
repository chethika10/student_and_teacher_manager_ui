import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useHttp=()=>{
    const {authTokens,setAuthTokens,setUser}=useContext(AuthContext);
    const navigate=useNavigate()
    const http = axios.create({

        baseURL: 'http://localhost:8080/stmanager',
        headers:{
          Authorization: `Bearer ${authTokens?.accessToken}`
        },
        withCredentials:true
      });

      http.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
          const originalConfig=error.config
        //  console.log(originalConfig.headers)
            if(error.response.status === 403 && error.response.data.errorMessage ==="TokenExpiredException"){
    
    
                console.log(error.response.data.errorMessage)
                const res= await axios.get('http://localhost:8080/stmanager/refreshtoken',{
                  headers:{
                    Authorization: `Bearer ${authTokens?.refreshToken}`,
                  }
                }
                ).catch(function (error) {
                    console.log(error.response.data.errorMessage);
                    if (error.response.status === 403 && (error.response.data.errorMessage ==="RefreshTokenExpiredException"||error.response.data.errorMessage ==="User is logged out")){
                     // const navigate=useNavigate()
                      localStorage.removeItem('authTokens')
                      alert("Sesson expired refresh the page")
                      window.location.reload(true);
                      navigate("/LogIN")
                    }
                  });

                let data=res.data
                localStorage.removeItem('authTokens')
                localStorage.setItem("authTokens",JSON.stringify(data))
                
                setAuthTokens(data)
                setUser(jwtDecode(data.accessToken))
                console.log("token refreshed 2")
                originalConfig.headers['Authorization']=`Bearer ${data?.accessToken}`
                  
                
              //  console.log(originalConfig.headers)
                return http(originalConfig)
    
            }
            else if (error.response.status === 403 && (error.response.data.errorMessage ==="RefreshTokenExpiredException"||error.response.data.errorMessage ==="User is logged out")){
                 
                localStorage.removeItem('authTokens')
                alert("Sesson expired refresh the page")
                window.location.reload(true);
                 navigate("/LogIN")
              }
        }
    );

      return http

}


export default useHttp;