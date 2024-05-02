import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingDates from './BookingDates'
import Placegallery from './Placegallery'
import '../helpers/styles/Bookingpage.css'
import axios from 'axios'
export default function Bookingpage() {
  const {id} = useParams();
  const[booking,setbooking]=useState();
  useEffect(()=>{
if(id){
  axios.get('http://localhost:4000/bookings').then((res)=>{
    const foundbooking = res.data.find(({_id})=>(_id===id))
    if(foundbooking)
    setbooking(foundbooking)
}
  )
}
  },[id])
  if(!booking)
  return ''
  return (
    <div className="B1">
    <h1 className="B2">{booking.place.title}</h1>
    <div>{booking.place.address}</div>
    <div>
      <div>
        <h2 className="B3">Your booking information:</h2>
        <BookingDates booking={booking} />
      </div>
      <div className="B4">
        <div>Total price</div>
        <div className="B5">${booking.price}</div>
      </div>
    </div>
    <Placegallery place={booking.place} />
  </div>
);
  
}
