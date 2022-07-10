import React,{useState} from 'react'
import "./Login.css";
import {Link,useHistory} from "react-router-dom";
import { auth } from './firebase';
import axios from "axios";
function Login() {
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,seterror]=useState('');
    const [disabled,setdisabled]=useState(false);
    const signIn=e=>{
      setdisabled(true);
       e.preventDefault();
       if(!email || !password){
        seterror("All fields is required *");
        
        setdisabled(false)
    }else{
    const userinfo={
            "email":email,
            "password":password
            
    }
      axios.post("https://onlineshoppingnodeapplication.herokuapp.com/login",userinfo).then(res => {  
    if (res.status==200){
      // console.log(res.data)
      sessionStorage.setItem("token",res.data.token)
      history.push('/')
    }
   
  }).catch(err=>{
console.log(err)
seterror("Invalid Email/Password")
  })
       
}
    }
    const register=e=>{
       window.location.href="/signup"
        
    }

    return (
        <div className="login">
            <Link to='/'>
            <img className="login_logo"
            src="https://i.postimg.cc/637vczV8/Whitelogo.jpg" alt=""/>
            </Link>

            <div className="login_container">
                <h1>Sign-in</h1>
                <p style={{color:"red"}}>{error}</p>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange=
                    {e=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange=
                    {e=>setPassword(e.target.value)}/>
                    <button type="submit" onClick={signIn}
                    disabled={disabled}
                        className="login_signInButton">Sign In</button>
                </form>
                <p>By signing-in,you agree to the conditions of use and sale.
                    Please make sure you go through our Privacy Notice,Cookies Notice 
                    and our Interest-Based ads notice.
                </p>
                <button onClick={register}
                className="login_registerButton"
                
                >Create an account</button>
            </div>
        </div>
    )
}

export default Login;
