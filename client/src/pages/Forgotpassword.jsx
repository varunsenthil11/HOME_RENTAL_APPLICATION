import React, { useState } from 'react'
import axios from 'axios'
import '../helpers/styles/Forgotpassword.css'
import { useNavigate } from 'react-router-dom';
export default function Forgotpassword() {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [code, setcode] = useState('');
    async function otp() {
        await axios.post('http://localhost:4000/forgetpassword/sendotp', { email })
    }
    async function next() {
        try {
            await axios.post('http://localhost:4000/forgetpassword/verifyotp', { email, code })
            navigate(`/changepassword?email=${encodeURIComponent(email)}`);
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="forgot-password-container">
            <div className="email-section">Enter email to send otp
                <input className='inp' type='email' value={email} onChange={(e) => { setemail(e.target.value) }}></input>
                <button onClick={otp}>SEND OTP</button>
            </div>
            <br />
            <div className="otp-section">Enter OTP
                <input className='inp' type='text' value={code} onChange={(e) => { setcode(e.target.value) }} ></input>
            </div>
            <div className="next-button">
                <button onClick={next}>NEXT</button>
            </div>
        </div>
    )
}
