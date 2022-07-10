import React,{useEffect} from "react"
import './App.css';
import Header from './Header';
import Home from "./Home";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Orders from "./orderdetails";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Signup from "./signup"

const promise= loadStripe
("pk_test_51JsOatSJOPqAxBKnZ8KAL3xkcRleQj9DJ0ICY5QlUq0q9dKnj2w8BefHekDy5no349uOpIV0gOSSRz1dGPgUSUzr00RWE1r0gq");

const Logout=() => {
  if(sessionStorage.getItem("token")){
    sessionStorage.removeItem("token");
  }
  window.location.href="/"
}

function App(){
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
   //only runs once when the app component loads

   auth.onAuthStateChanged(authUser=>{
     console.log("USER IS>>>",authUser);

     if(authUser){
       //User logged in or was logged in
       dispatch({
         type:"SET_USER",
         user:authUser
       })

     }else{
       //User is logged out
       dispatch({
         type:"SET_USER",
         user:null
       })
     }
   })
  },[])



  return (
    <Router>
     <div className="app">
      <Switch>
       <Route path="/login">
           <Login/>
         </Route>

         <Route path="/signup">
         <Signup/>
         </Route>


         <Route path="/checkout">
            <Header/>
            <Checkout/>
         </Route>
         <Route path="/payment">
           <Header/> 
           <Elements stripe={promise}>
             <Payment/>
            </Elements>
         </Route>
         <Route path="/orders">
           <Header/>
           <Orders/>
         </Route>
         <Route path="/logout">
         
           <Logout/>
         </Route>
         <Route path="/">
           <Header/>
           <Home/>
         </Route>
         
       </Switch>
       
       
     </div>
     </Router>
    
  );
}

export default App;

