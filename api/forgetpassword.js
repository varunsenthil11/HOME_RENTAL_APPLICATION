const express = require('express');
const nodemailer = require('nodemailer');
const otp_generator = require('otp-generator')
const users = require('./db');
const verificationCodes = new Map();
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(6);
const mylist = [];

router.post('/sendotp',async (req,res)=>{
    const {email} = req.body;
    const exptime = 180 * 1000;
  const otpvalue=otp_generator.generate(6,{upperCaseAlphabets:true,specialChars:true,digits:true})
  console.log(otpvalue)
  verificationCodes.set(email,{code:otpvalue,exptime:exptime+Date.now()})
  console.log(verificationCodes);
  const sender = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'abc437510@gmail.com',
          pass:'vytd kpdi pvum pzpq'
      }
  });
  const composemail = {
      from:'abc437510@gmail.com',
      to:email,
      subject:'send mail using node',
      html:`<h1>To change password Enter this OTP:${otpvalue}</h1>`
  }
  
  
  sender.sendMail(composemail,function(err,info){
  if(err){
      console.log(err)
  }
  else
  console.log('mail sent successfully'+info.response)
  })
  
  
  const timeID =  setTimeout(()=>{
      verificationCodes.delete("mail")
    },exptime)
  res.json("ok")
})




router.post('/verifyotp',async(req,res)=>{
    const expt = 70 * 1000;
  const {email,code} = req.body
  const otp = verificationCodes.get(email);
  console.log(otp)
  if (otp === undefined)
  return res.status(500).json({ error: 'timeout or please provide valid credentials' });
  try {
      if (!otp) {
          return res.send({ message: "otp expired" })
      }
      else if (otp.code === code && otp.exptime > Date.now()) {
         mylist.push(email);
        console.log(mylist);
         setTimeout(()=>{
            console.log(email);
            for (let i = 0; i < mylist.length; i++) {
                if(mylist[i]===email){
                    mylist.splice(i,1)
                    break;
                } 
              }
              console.log(mylist);
          },expt)

        return res.send({ message: "pass can be changed" })

      }
      else if (otp.code != code) {
          return (
              res.status(500).json({ error: 'invalid otp' })
          )
      }
  } catch (error) {
      console.log(error.message)
      return (
          res.status(500).json({ error:'Internal server error'})
      )
  }
})

router.post('/changepassword',async(req,res)=>{
    const {newpassword,confirmpassword,email} = req.body
    if(newpassword!==confirmpassword){
        return (
            res.status(500).json({ error:'Not matches'})
        )
    }
    console.log(mylist+" "+email)
    if(mylist.includes(email)){
        const hashedpass = bcrypt.hashSync(newpassword, salt);
    const ans =    await users.updateOne(
            { email: email }, 
            { $set: { password: hashedpass} } 
         )
         console.log(ans);
    }
})


module.exports= router;