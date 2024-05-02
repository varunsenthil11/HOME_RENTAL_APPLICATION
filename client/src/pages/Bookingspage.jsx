import React, { useEffect, useState } from 'react'
import '../helpers/styles/Bookingspage.css'
import { useNavigate,Link} from "react-router-dom";
import Accountpage from './Accountpage';
import BookingDates from './BookingDates';
import axios from 'axios';
export default function Bookingspage() {
    const[bookings,setbookings] = useState();
    useEffect(()=>{
     axios.get('http://localhost:4000/bookings/').then((res)=>(setbookings(res.data)))
    },[])
  return (
    <div>
  <Accountpage/>
  <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/Accounts/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
             <div >
             <img  className='photo1' src={'http://localhost:4000/uploads/'+booking.place.addphotos[0]} />
            </div> 
            <div className="book-info">
              <h2 className="text-xl">{booking.place.title}</h2>
              <div className="text-xl">
                 <BookingDates booking={booking}  /> 
                <div className="flex gap-1">

                  <span className="text-2xl">
                    Total price: ${booking.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
 
 
 </div>
  )
}
