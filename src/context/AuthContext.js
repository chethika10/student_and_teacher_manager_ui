import { createContext,useState } from "react";
import jwtDecode from "jwt-decode";
import { login, logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext();

export default AuthContext;

export const AuthProvider=({children})=>{
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
 //   let [loading, setLoading]=useState(true)
 //   let [authTokens,setAuthTokens]=useState(null)
    
  //  let [user,setUser]=useState(null)
    const navigate=useNavigate()

    let loginUser =async (e)=>{
        e.preventDefault()
        try {
            const authData = {
            "username":e.target.userName.value,
            "password":e.target.password.value
        }
            const response = await login(authData);
            let data=await response.data
            setAuthTokens(data)
            setUser(jwtDecode(data.accessToken))
            localStorage.setItem("authTokens",JSON.stringify(data))
            // axios.defaults.headers.common['Authorization'] = "Bearer "+data.accessToken;
            // console.log(data.accessToken)
            // console.log("Bearer "+data.accessToken)
            navigate("/")
        }catch(err){
            console.log(err)
            
            alert("incorrect credentials")
            
            
        }
        e.target.reset();
    }

    let logoutUser = async (e) => {
        // const config = {
        //     headers:{
        //         Authorization: "Bearer "+String(authTokens.accessToken),
        //     }
        //   };
        const response= await logout();
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')

        if(response.status===200){
        navigate('/LogIN')
        }
    }

    // useEffect(()=>{
    //     if(authTokens){
    //         setUser(jwtDecode(authTokens.accessToken))
    //     }
    //     setLoading(false)
    // },[]
    // )

    let contextData={
        user:user,
        authTokens:authTokens,
        user2:user,
        setUser:setUser,
        setAuthTokens:setAuthTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}