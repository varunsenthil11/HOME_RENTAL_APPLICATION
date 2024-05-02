import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import '../helpers/styles/Bookingwidget.css'
import { Usercontext } from "../Usercontext";
export default function BookingWidget({ place }) {
  const { user } = useContext(Usercontext);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    if (user)
      setName(user.name)
  }, [user])


  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const response = await axios.post('http://localhost:4000/bookings', {
      checkIn, checkOut, numberOfGuests, name, phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/Accounts/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="booking-widget">
    <div className="price">Price: ${place.price} / per night</div>
    <div className="booking-details">
      <div className="flex">
        <div className="check-in">
            <label>Check in:</label>
            <input className="input" type="date"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)} />
          </div>
          <div className="top6">
            <label>Check out:</label>
            <input className="input" type="date" value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)} />
          </div>
        </div>
        <div className="top7">
          <label>Number of guests:</label>
          <input className="input" type="number"
            value={numberOfGuests}
            onChange={ev => setNumberOfGuests(ev.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className="additional-info">
            <label>Your full name:</label>
            <input className="input" type="text"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <label>Phone number:</label>
            <input className="input" type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)} />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary-button">
        Book this place
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}