import React,{useState,useEffect} from 'react'
import { Link,useHistory} from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"; 
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "./reducer";
// import axios from "./axios";
import axios from "axios";
import {db} from "./firebase";

function Payment() {
    
    const [basket,setbasket]=useState();
    const [user,setuser]=useState("")
    const [processing,setProcessing]=useState("");
    const [cardno,setcardno]=useState("");
    const [cardexpiry,setcardexpiry]=useState("");
    const [cardcvc,setcardcvc]=useState("");
    const [showerror,setshowerror]=useState("")
    const [sucess,setsucess]=useState("")
    if(!sessionStorage.getItem("token")){
      window.location.href="/login"
  }

     const history=useHistory();
     const headers = {
        'Authorization': 'bearer '+sessionStorage.getItem("token")
      }

      
      const onload=() => {
        if(sessionStorage.getItem("token")){
         
          axios.get("https://onlineshoppingnodeapplication.herokuapp.com/getuser",{
            headers: headers
          }).then(res => {  
            if (res.status==200){
            //   console.log(res.data.data[0])
              // history.push('/')
              setuser(res.data.data[0])
            }
           
          }).catch(err=>{
        console.log(err)
          })
        }
      }
      

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
    //   window.location.href="/login"
        })
       }
    //  const stripe=useStripe();
    //  const Elements=useElements();

    //  const [succeeded,setSucceeded]=useState(false);
    //  const [processing,setProcessing]=useState("");

    //  const [error,setError]=useState(null);
    //  const [disabled,setDisabled]=useState(true);
    //  const [clientSecret,setClientSecret]=useState(true);

    //  useEffect(()=>{
    //     //generates special stripe secret that allows us to charge the customer
    //     const getClientSecret=async()=>{
    //        const response=await axios({
    //            method:"post",
    //            // *100 because stripe expects total in currencies subunits
    //            url:`/payments/create?total=${getBasketTotal(basket)*100}`
    //        });
    //        setClientSecret(response.data.clientSecret)
    //     }
    //     getClientSecret();
    //  },[basket])
    
    //  const handleSubmit=async (event)=>{
    //      //Stripe stuffs
    //       event.preventDefault();    //Refreshing
    //       setProcessing(true);      //Pressing Enter means submit
       
    //       const payload=await stripe.confirmCardPayment(clientSecret,{
    //           payment_method:{
    //               card: Elements.getElement(CardElement)
    //           }
    //       }).then(({paymentIntent})=>{
    //           //Payment intent=Payment Confirmation

    //             db.collection("users")
    //             .doc(user?.uid)
    //             .collection("orders")
    //             .doc(paymentIntent.id)
    //             .set({
    //                 basket:basket,
    //                 amount:paymentIntent.amount,
    //                 created:paymentIntent.created
    //             })

    //           setSucceeded(true);
    //           setError(null);
    //           setProcessing(false);

    //           dispatch({
    //               type:"EMPTY_BASKET"
    //           })

    //           history.replace("/orders")
    //       })

    //    }

    //    const handleChange=event=>{
    //     // Listens for changes in CardElement and displays
    //     // any errors as the customer types their card details
    //     setDisabled(event.empty);
    //     setError(event.error?event.error.message:"");
    //    }
    // const getdata=() => {
        
    // }
    // document.getquerySelector("body").addEventListener("onload",function(){
        
    // })
    const handleSubmit=(e) => {
        let flag=0
        if(cardno=="" || cardexpiry=="" || cardcvc==""){
            setshowerror("All fields are required *");
        }else{
            console.log(isNaN(cardno))
            if(isNaN(cardno)==true || cardno.length<16){
                setshowerror("Invalid card number");
            }else{
                if(isNaN(cardcvc) || cardcvc.length<4 || cardcvc.length< 3){
                    setshowerror("Invalid card cvc");
                }else{
                    const headers = {
                        'Authorization': 'bearer '+sessionStorage.getItem("token")
                      }
                    basket?.map((item)=>{
                        console.log(item)
                        axios.post("https://onlineshoppingnodeapplication.herokuapp.com/orderdetails",{"productid":item.productid},{
                            headers: headers
                          }).then(res => { 
                        if(res.status==200){
                            setsucess(flag++)
                        }
                  }).catch(err=>{
                    console.log(err)
                    // window.location.href="/"
                  })
                    })
                    

                    alert("Thanks for shopping")
                    window.location.href="/"
                      
                  
                }
            }
            
        }
        
    }
  
    useEffect(()=>{
            Data()
            onload()
    },[])
    return (
      
        <div className="payment"  >
             <div className="payment_container" >
                 <h1>
                     Checkout(<Link to="/checkout">{basket?.length} items</Link>)
                 </h1>


                 {/*Delivery address*/}
                   <div className="payment_section">
                     <div className="payment_title">
                        <h3>Delivery Address</h3>
                     </div>
                      <div className="payment_address">
                         <p>{user?.email}</p>
                         <p>{user?.address}</p>
                      </div>

                    </div>

                 {/*Review Item*/}
                 <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket?.map(item=>(
                            <CheckoutProduct
                            id={item.productid}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                        )
                        )}
                    </div>

                 </div>

                 {/*Payment method*/}
                  <div className="payment_section">
                      <div className="payment_title">
                         <h3>Payment Method</h3>
                      </div>
                      <div className="payment_details">
                         {/*Stripe stuffs*/}

                           <form 
                        //    onSubmit={handleSubmit}
                           >
                                <p style={{color:"red",marginBottom:10}}>{showerror}</p>
                            <div class="card_details">
                           
                               <input type="text" placeholder="Card number *" onChange={(e)=>{setcardno(e.target.value)}} value={cardno}/>
                               <input type="month"  placeholder="MM/YY *" onChange={(e)=>{setcardexpiry(e.target.value)}} value={cardexpiry}/>
                               <input type="text" placeholder="CVC *" onChange={(e)=>{setcardcvc(e.target.value)}} value={cardcvc}/>
                               </div>
                             {/* <CardElement 
                            //  onChange={handleChange}
                             
                             /> */}
                              <div className="payment_priceContainer">
                                 <CurrencyFormat
                                    renderText={(value)=>(
                                      <h3>Order Total:{value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rs"}
                                 />
                                  <button 
                                  type="button"
                                //   disabled={processing?true:false}
                                  onClick={()=>{handleSubmit()}}
                                     >
                                     <span>
                                         {processing ? <p>Processing</p> : "Buy Now"}
                                         </span>
                                  </button>
                                </div>

                                {/*Errors*/}
                                {/* {error && <div>{error}</div>} */}
                            </form>
                      </div>
                    </div>
                </div>
            </div>
)
}

export default Payment
