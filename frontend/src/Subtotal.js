import React,{useState} from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';

function Subtotal({data}) {
    const history=useHistory();     //gives browser history
    // const [{basket},dispatch]=useStateValue();
        // console.log(data)
    
    
    
    return (
        <div className="subtotal" >
            <CurrencyFormat
            renderText={(value)=>(
                <>
                 <p>
                   Subtotal({data?.basket?.length} items): <strong> {value}</strong>
                 </p>
                 {/* <small className="subtotal_gift">
                    <input type="checkbox"/>This order contains a gift
                 </small> */}
                </>

            )}
            decimalScale={2}
            value={data?.total}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Rs "}
         />

         <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
            
        </div>
    )
}

export default Subtotal
