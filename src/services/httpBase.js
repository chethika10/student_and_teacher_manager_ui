import axios from "axios";

// import { useNavigate } from "react-router-dom";

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

// let {setUser,setAuthTokens}=useContext(AuthContext);

export const http = axios.create({

    baseURL: 'http://localhost:8080/stmanager',
    headers:{
      Authorization: `Bearer ${authTokens?.accessToken}`
    },
    withCredentials:true
  });

  http.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
    }
    //const user=jwtDecode(authTokens.accessToken)

    return req
  })
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
                // navigate("/LogIN")
              }
            });
            
            let data=res.data
            localStorage.removeItem('authTokens')
            localStorage.setItem("authTokens",JSON.stringify(data))
            authTokens = data
            // setAuthTokens(data)
            // setUser(jwtDecode(data.accessToken))
            console.log("token refreshed")
            originalConfig.headers['Authorization']=`Bearer ${authTokens?.accessToken}`
              
            
          //  console.log(originalConfig.headers)
            return http(originalConfig)

        }
        else if (error.response.status === 403 && (error.response.data.errorMessage ==="RefreshTokenExpiredException"||error.response.data.errorMessage ==="User is logged out")){
          // const navigate=useNavigate()
          localStorage.removeItem('authTokens')
          alert("Sesson expired refresh the page")
          // navigate("/LogIN")
        }
    }
);