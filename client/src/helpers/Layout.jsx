import React, { Link } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Usercontext } from "../Usercontext";
import { useContext } from "react";
import '../helpers/styles/Layout.css'
export default function Layout() {
  const {user}  = useContext(Usercontext)
  const location = useLocation();
  const navigate = useNavigate();
  let a=0;
  const Switch=()=>{
    const pathnameParts = location.pathname.split('/');
    const lastRoute = pathnameParts[pathnameParts.length - 1];
    if (lastRoute === "Register" ) {
      navigate("/login");
      console.log("login")
    } else if (lastRoute === "login"||lastRoute=="") {
      navigate("/Register");
      console.log("register");
    }
  }
  

  return (
  <div>
    <header>
      <span><button className="hi" onClick={()=>{
        navigate("/")
      }}>SweetHome</button></span>
      <span className="top"><button>Anywhere</button> <button>Anyweek</button> <button>Addguests</button></span>
      <span className="top-right">
        <button onClick={()=>{
           if(user){
            navigate("/Accounts");
           }
           else
          Switch()
        }} >
          {!!user && (
                <h6>{user.name}</h6>
            )}
            {!user&&<h6>Register|login</h6>}
          </button>
      </span>
    </header>
  </div>
  );
}
