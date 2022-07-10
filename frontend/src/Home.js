import React,{useState,useEffect} from 'react'
import "./Home.css";
import Product from "./Product";
import axios from "axios";

const Home=()=> {
  const [product,setproduct]=useState()

 useEffect(()=>{
  axios.get("https://onlineshoppingnodeapplication.herokuapp.com/allproduct").then(res => {  
    if (res.status==200){
      setproduct(res.data.data)
    }
   
  }).catch(err=>{
console.log(err)
  })
 },[])

    return (
        <div className="home" >
            <div className="home_Container">
                <img className="home_image"
                src="https://i.postimg.cc/yNDFWfSf/Whats-App-Image-2021-11-10-at-2-06-40-PM.jpg" alt=""/>

                <div className="home_row grid-container">
                {
                // product ?
                product?.map((data)=>
                  <Product id={data.productid} title={data.name} price={data.price} 
                  image={data.image}
                  rating={data.rating}
                  />
                 
                )
                // : ""
              }
                </div>            
            </div>
        </div>
    )
}

export default Home
