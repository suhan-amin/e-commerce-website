import React,{useState} from 'react'
import "./Login.css";
import {Link,useHistory} from "react-router-dom";

import validator from 'validator'
import axios from "axios";
function Signup() {
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setname]=useState('');
    const [address,setaddress]=useState('');
    const [showerror,seterror]=useState('');
    const [disabled,setdisabled]=useState(false);

    const signIn=(e)=>{
        seterror("Loading....")
        setdisabled(true)
        
        if(!name || !address || !email || !password){
            seterror("All fields is required *");
            setdisabled(false)
        }else{
            
            if (!validator.isEmail(email)) {
                seterror('Enter valid Email!')
                setdisabled(false)
              } else {

                if(password.length<8 || password.length>32){
                    seterror("The Password must be between 8/32")
                    setdisabled(false)
                }else{
                    seterror("")
                    const userinfo={
                        "name":name,
                        "address":address,
                        "email":email,
                        "password":password       
                    }
                    // console.table(userinfo)
                    axios.post("https://onlineshoppingnodeapplication.herokuapp.com/signup",userinfo).then(res => { 
                        if(res.data.message){
                            alert("User registered successfully"); 
                            history.push('/login')
                        }
                       
                    
                   
                  }).catch(err=>{
                    setdisabled(false)
                    seterror("User already exists")
                    console.log(err)
                  })
                }


              }
        }
   
       
    }

    // const register=e=>{
    //     e.preventDefault();

    //     auth.createUserWithEmailAndPassword(email,password)
    //     .then((auth)=>{
    //         //successfully creates a new user with email and password
    //         if (auth){
    //             history.push('/')
    //         }
    //     })
    //     .catch(error =>alert(error.message))
        
    // }

    return (
        <div className="login">
            <Link to='/'>
            <img className="login_logo"
            src="https://i.postimg.cc/637vczV8/Whitelogo.jpg" alt=""/>
            </Link>

            <div className="login_container">
                <h1>Sign-Up</h1>
               <p style={{color:"red"}}>{showerror}</p>
                <form method="post">
                    <h5>Name</h5>
                    <input type="text" value={name} onChange=
                    {e=>setname(e.target.value)}/>
                    <h5>Address</h5>
                    <input type="text" value={address} onChange=
                    {e=>setaddress(e.target.value)}/>
                    <h5>E-mail</h5>
                    <input type="email" value={email} onChange=
                    {e=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange=
                    {e=>setPassword(e.target.value)}/>
                    <button type="button" 
                    onClick={()=>signIn()}
                    disabled={disabled}
                        className="login_signInButton">Sign Up</button>
                </form>
                <p>By signing-in,you agree to the conditions of use and sale.
                    Please make sure you go through our Privacy Notice,Cookies Notice 
                    and our Interest-Based ads notice.
                </p>
                
            </div>
        </div>
    )
}

export default Signup;

