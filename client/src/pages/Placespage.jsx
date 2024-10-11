import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Placespresentpage from './Placespresentpage';
import Placesformpage from './Placesformpage';
import { useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function Placespage() {
  const {action} =useParams();
  const navigate = useNavigate();
 
  console.log(action);
  return (
    <div>
       <div className='top'>
        <span><button className='button'onClick={()=>{navigate("/Accounts/profile")}}>My profile</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/bookings")}}>My bookings</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/places")}}>My accomodations</button></span>  
     </div>
    <button className='Addnew' onClick={()=>{
   navigate('/Accounts/places/new')
    }}>Add new</button>


  <Placespresentpage/>

    </div>
  )     
}
