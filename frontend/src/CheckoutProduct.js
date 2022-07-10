import React from 'react'
import "./CheckoutProduct.css";
import { useStateValue } from './StateProvider';
import axios from "axios";


function CheckoutProduct({id,image,title,price,rating,hideButton}) {
    sessionStorage.setItem("flag",1)
    // const [{basket},dispatch]=useStateValue();

    const headers = {
        'Authorization': 'bearer '+sessionStorage.getItem("token")
      }
    const removeFromBasket=(id)=>{
        // console.log(id)
        axios.post("https://onlineshoppingnodeapplication.herokuapp.com/removewishlist",{"productid":id},{
          headers: headers
        }).then(res => {  
            if (res.status==200){
            //   setButtonvalue("Item Re to Basket");             
              console.log(res.data)
              window.location.reload()
              // sessionStorage.setItem("token",res.data.token)
              // history.push('/')
            }
           
          }).catch(err=>{
        console.log(err)
        window.location.href="/login"
          })

    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image}/>
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct_rating">
                    {Array(rating)
                      .fill()
                      .map((_,i)=>(
                          <p>⭐</p>
                      ))
                    }
                </div>
                {!hideButton && (
                    <button onClick={()=>{removeFromBasket(id)}}>Remove from basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
