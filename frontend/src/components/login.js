import axios from "axios";
import { useState,useEffect} from "react";
import Cookies from "js-cookie";
import CSRFToken from "./csrf";
import { useNavigate} from "react-router-dom";

function Login(){
    let [loginInfo,setLoginInfo] = useState({'username':'','password':''})
    let [isAuth,setIsAuth] = useState(false)
    let [response,setResponse] = useState('')
    let {username,password} = loginInfo
    let redirect = useNavigate()

    let handleChange = (e)=>{
        setLoginInfo(
            {
                ...loginInfo,
                [e.target.name]:e.target.value
            }
        )
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/isauth/',{withCredentials:true}).then((res)=>{
            setIsAuth(res.data)

        })
    },[])
    let submitChange = (e)=>{
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/login/',loginInfo,{withCredentials:true,headers:{'X-CSRFToken':Cookies.get('csrftoken')}}).then(
            (res)=>{
                setResponse(res.data)
                redirect('/')

            }
        ).catch((e)=>{
            setResponse(e.response.data)
        })
    }
    if(!isAuth){
    return(
        <div className='main-login'>
            <form method='post' onSubmit={(e)=>submitChange(e)}>
                <CSRFToken/>
                <input type='text' name='username' value={username} onChange={(e)=>handleChange(e)} placeholder='username' />
                <input type='password' name='password' value={password} onChange={(e)=>handleChange(e)} placeholder='password' />
                <button type='submit'>Login</button>
                {response?<div style={{color:'red'}}>{response}</div>:null}

            </form>
        </div>
    )
    }
    return <div>"You are already logged!"</div>


}

export default Login
