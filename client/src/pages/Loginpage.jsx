import React, {useState,useContext} from "react";
import '../helpers/styles/Loginpage.css'
import {Navigate,Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import { Usercontext } from "../Usercontext";
export default  function Loginpage(){
  const {setuser}  = useContext(Usercontext)
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [redirect,setredirect] = useState(false);
  const navigate= useNavigate();
  function fp(e){
    e.preventDefault();
    navigate('/forgot_password')
  }
  async function fn(e) {
    e.preventDefault();
    try{
  const doc = await axios.post('http://localhost:4000/login',{email,password});
   setuser(doc.data);
   alert('login success')
   setredirect(true)
  }
  catch(e){
   alert('login failed')
  }
}
if(redirect){
  return <Navigate to={'/'}></Navigate>
  }
 
    return(<div >
      <form className="form" onSubmit={fn}>
       <div className="fir"> <input className="text" type="email" name="email" placeholder="your@gmail.com" value={email} onChange={(e)=>{setemail(e.target.value)}} /></div>
       <div className="sec" > <input className="text"type="password" name="password" placeholder="Password" onChange={(e)=>{setpassword(e.target.value)}}/></div>
       <div className="thir"> <button className="but" type="submit">Login</button> </div>
       <div>Don't have an account <Link to="/Register">Register</Link> <Link to="/forgot_password" className="fp1" >Forgot password</Link> </div>
      </form>
    </div>)
}