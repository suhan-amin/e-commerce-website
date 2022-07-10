import React,{useState,useEffect} from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
// import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal";
import axios from "axios";

function Checkout() {
    
    const [basket,setbasket]=useState();
    if(!sessionStorage.getItem("token")){
        window.location.href="/login"
    }
    const headers = {
        'Authorization': 'bearer '+sessionStorage.getItem("token")
      }
      let price=0
    const Data=()=>{
        axios.get("https://onlineshoppingnodeapplication.herokuapp.com/getwishlist",{
            headers: headers
          }).then(res => {  
          if (res.status==200){
            //   console.log(res.data.data)
            setbasket(res.data.data)
          }
         
        }).catch(err=>{
      console.log(err)
      window.location.href="/login"
        })
       }
       useEffect(()=>{
        Data()  
},[])
    return (
        <div className="checkout" >
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                alt=""/>
                {basket?.map(data=>{
                    price=data.price+price
                })}
                <div>
                    {/* <h4>Hey, {user?.email}</h4> */}
                    <h2 className="checkout_title">Your Basket</h2>
                    {basket?.map(item=>(
                        <CheckoutProduct
                         id={item.productid}
                         title={item.name}
                         image={item.image}
                         price={item.price}
                         rating={item.rating}
                         />
                    ))}
                    
                    
                </div>
            </div>
            <div className="checkout_right">
                <Subtotal data={basket ? 
                    {"basket":basket,"total":price}
                    :[]}/>
            </div>
        </div>
    )
}

export default Checkout
