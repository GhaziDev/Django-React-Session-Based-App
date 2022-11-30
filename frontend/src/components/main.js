import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate,Link} from 'react-router-dom'

function Main(){
    let [isAuth,setIsAuth] = useState();
    let redirect = useNavigate()
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/isauth/',{withCredentials:true}).then((res)=>{
            setIsAuth(res.data)
            console.log(res.data)
        })
    },[])
    

    let handleLogout = (e)=>{
        axios.get('http://127.0.0.1:8000/logout/',{withCredentials:true}).then((res)=>{
            redirect('/login')
        })
    }
    if(!isAuth){
    return(
        <div className='main-div'>
            <button className='btns'><Link to='/login'>Login</Link></button>
            <button className='btns'><Link to='/signup'>Signup</Link></button>
        </div>
    )
    }
    return(
        <button className='btns' onClick={(e)=>handleLogout(e)}>Logout</button> 
    )
}

export default Main