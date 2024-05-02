import React from 'react'

import {differenceInCalendarDays, format} from "date-fns";

export default function BookingDates({booking}) {
  return (
    <div >
     
      {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:
      <div className="flex gap-1 items-center ml-2">
        
        {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
      </div>
      &rarr;
      <div >
       
        {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
      </div>
    </div>
  );
}