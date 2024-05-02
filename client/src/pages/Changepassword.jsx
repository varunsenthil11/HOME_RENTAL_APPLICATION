import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../helpers/styles/Changepassword.css'
export default function Changepassword() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
 const[newpassword,setnewpassword] = useState('');
 const[confirmpassword,setconfirmpassword]=useState('');
 async function changepass(){
    if(confirmpassword!==newpassword){
        alert('password not matches')
        return;
    }
    try{
     await axios.post('http://localhost:4000/forgetpassword/changepassword',{newpassword,confirmpassword,email})
    }
    catch(err){
        console.log(err);
    }
 }
  return (
    <div className="changepassword-container">
     <div className="password-input">
        Enter new password
        <input className='inp' value={newpassword} onChange={(e)=>{setnewpassword(e.target.value)}} type='text'/>
     </div>
     <div className="confirm-password-input">
        Confirm password
        <input className='inp' value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}} type='text'/>
     </div>
     <div className="submit-button">
        <button onClick={changepass}>Change Password</button>
     </div>
    </div>
  )
}
