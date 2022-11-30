import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import {useNavigate} from 'react-router-dom'
import CSRFToken from "./csrf";


function Signup(){
    let [signupInfo,setSignupInfo] = useState({'email':'','username':'','password':''})
    let [response,setResponse] = useState()
    let {email,username,password} = signupInfo;
    let redirect = useNavigate()

    let handleChange = (e)=>{
        setSignupInfo({
            ...signupInfo,
            [e.target.name]:e.target.value
        })
    }

    let submitChange = (e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/signup/',signupInfo,{headers:{'X-CSRFToken':Cookies.get('csrftoken')}}).then(
            (res)=>{
                redirect('/')
            }
        ).catch((e)=>{
            setResponse(e.response.data)

        })
    }

    return(
        <div className='signup-main'>
            <form method='post' onSubmit={(e)=>submitChange(e)}>
                <CSRFToken/>
                <input type='email' name='email' value={email} onChange={(e)=>handleChange(e)} placeholder='email' />
                <input type='text' name='username' value={username} onChange={(e)=>handleChange(e)} placeholder='username' />
                <input name='password' value={password} onChange={(e)=>handleChange(e)} placeholder='password' />
                <button type='submit'>Signup</button>
                {response?<div>{response}</div>:null}
            </form>
        </div>
    )


}

export default Signup