import React, { useState,useEffect } from 'react';
import "./Product.css";
import { useStateValue } from './StateProvider';
import axios from "axios";

function Product({id,title,image,price,rating}) {
    // const [{basket},dispatch]=useStateValue();
    const [Buttonvalue,setButtonvalue] =useState("Add To Basket")
    const headers = {
      'Authorization': 'bearer '+sessionStorage.getItem("token")
    }
    const addToBasket=(id)=>{
     
        axios.post("https://onlineshoppingnodeapplication.herokuapp.com/addwishlist",{"productid":id},{
          headers: headers
        }).then(res => {  
            if (res.status==200){
              setButtonvalue("Item Added to Basket");
    
                const interval = setInterval(() => {
                  setButtonvalue("Add To Basket");
                }, 2000);
                // return () => clearInterval(interval);
             
              // console.log(res.data)
              // sessionStorage.setItem("token",res.data.token)
              // history.push('/')
            }
           
          }).catch(err=>{
        console.log(err)
        window.location.href="/login"
          })
      
    };
    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className='product_price'>
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map((_,i)=>(
                      <p>⭐</p>
                    ))}
                    
                </div>
                
            </div>
            <img src={image} alt=""/>
            <button onClick={()=>addToBasket(id)}>{Buttonvalue}</button>
        </div>
    )
}

export default Product
