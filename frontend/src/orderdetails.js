import React,{useState,useEffect} from 'react'
import "./Orders.css"
import {db} from "./firebase";
import { useStateValue } from './StateProvider';
import Orderdetailcards from "./orderdetailcards";
import axios from "axios"

function Orders() {
    // const [{ basket ,user},dispatch]=useStateValue();
    const [orders,setOrders]=useState();
    if(!sessionStorage.getItem("token")){
        window.location.href="/login"
    }

    const headers = {
        'Authorization': 'bearer '+sessionStorage.getItem("token")
      }
    useEffect(()=>{
        axios.get("https://onlineshoppingnodeapplication.herokuapp.com/getorderdetails",{
            headers: headers
          }).then(res => {  
          if (res.status==200){
            //   console.log(res.data.data)
            setOrders(res.data.data)
          }
         
        }).catch(err=>{
      console.log(err)
      window.location.href="/login"
        })
        // if(user){

        //     db
        //     .collection("users")
        //     .doc(user?.uid)
        //     .collection("orders")
        //     .orderBy("created","desc")
        //     .onSnapshot(snapshot=>(
        //         setOrders(snapshot.docs.map(doc=>({
        //             id:doc.id,
        //             data:doc.data()
        //         })))
        //     ))
        // } else{
        //     setOrders([])
        // }
       
           
     
    }, [])

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_order">
                {orders?.map(order=>(
                    // <Order order={order}/>
                    <Orderdetailcards
                        id={order.productid}
                         title={order.name}
                         image={order.image}
                         price={order.price}
                         rating={order.rating}
                         date={order.delivery_date}
                         status={order.status==0?true:false}
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders
