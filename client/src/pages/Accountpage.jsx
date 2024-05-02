import React from 'react'
import '../helpers/styles/Accountpage.css'
import { useNavigate } from "react-router-dom";
export default function Accountpage() {
    const navigate = useNavigate();
  return (
    <div>
    <div className='top'>
        <span><button className='button'onClick={()=>{navigate("/Accounts/profile")}}>My profile</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/bookings")}}>My bookings</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/places")}}>My accomodations</button></span>  
     </div>
    
    </div>
   
  )
}
