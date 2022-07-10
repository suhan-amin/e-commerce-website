/* eslint-disable jsx-a11y/alt-text */
import React,{useState,useEffect} from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import {auth} from "./firebase";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";


function Header() {
  const [user,setuser]=useState("")


useEffect(()=>{
  if(sessionStorage.getItem("token")){
    const headers = {
      'Authorization': 'bearer '+sessionStorage.getItem("token")
    }
    axios.get("https://onlineshoppingnodeapplication.herokuapp.com/getuser",{
      headers: headers
    }).then(res => {  
      if (res.status==200){
        // console.log(res.data.data[0])
        // history.push('/')
        setuser(res.data.data[0])
      }
     
    }).catch(err=>{
  console.log(err)
    })
  }
},[])
    return (
        <div className='header' >
            <Link to="/">
            <img className="header_logo"src="https://i.postimg.cc/637vczV8/Whitelogo.jpg"/>
            </Link>

            <div className="header_search">
                  <input className="header_searchInput" type="text"/>
                  <SearchIcon className="header_searchIcon"/>
                 

            </div>

            <div className="header_nav">
                <Link to={user==""? "/login":"/logout" }>
                  <div className="header_option">
                    <span className="header_optionLineOne">Hello {user==""? "Guest":user?.name}</span>
                    <span className="header_optionLineTwo">{user!=="" ? "Sign Out": "Sign In"}</span>
                  </div>
                </Link>

              <Link to="/orders">
                <div className="header_option">
                    <span className="header_optionLineOne">Returns</span>
                    <span className="header_optionLineTwo">& Orders</span>
                </div>
              </Link>

               
               <Link to="/checkout">
                <div className="header_optionBasket">
                    <ShoppingCartIcon />
                    <span className="header_optionLineTwo header_basketCount"></span>

                </div>
                </Link>
            </div>
              
            
        </div>
    )
}

export default Header
