import React from 'react'
import { useContext,useState} from 'react';
import axios from 'axios';
import { Usercontext } from "../Usercontext";
import { Navigate, useNavigate } from 'react-router-dom'
export default function Profilepage() {
    const[redirect,setredirect] = useState(null);
    const {user,setuser,ready}  = useContext(Usercontext)
    const navigate = useNavigate();
    function logout(){
        axios.post('http://localhost:4000/logout')
          setuser(null);
          setredirect('/');
        }
        if(!ready){
            return 'Loading...';
           }
           if(!user&&ready){
               return <Navigate to={'/login'}></Navigate>
           }
           if(redirect){
             navigate('/');
           }
  return (
    <div>
         <div className='top'>
        <span><button className='button'onClick={()=>{navigate("/Accounts/profile")}}>My profile</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/bookings")}}>My bookings</button></span>  
        <span><button className='left button' onClick={()=>{navigate("/Accounts/places")}}>My accomodations</button></span>  
     </div>
     <p className='profile'> Logged in as {user.name} with email {user.email}
        <br></br>
        <button className='Logout'onClick={logout}>Logout</button>
        </p>
    </div>
  )
}
