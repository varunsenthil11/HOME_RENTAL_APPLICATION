import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from './BookingWidget';
import Placegallery from './Placegallery';
import '../helpers/styles/Placedefine.css';

export default function Placesdefine() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:4000/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  return (
    <div className="place-define-container">
      <h1 className="place-title">{place.title}</h1>
      <div>
        <div>
          <Placegallery place={place} />
        </div>
      </div>
      <div className="place-details">
        <div className="description-section">
          <div>
            <h2>Description</h2>
            <div className="description-content">{place.description}</div>
          </div>
          <div>
            <h2>Address</h2>
            <div className="description-content">{place.address}</div>
          </div>
          <div className="check-in-out-section">
          <h2>Booking Section</h2>
            Check-in: {place.checkin}<br />
            Check-out: {place.checkout}<br />
            Max number of guests: {place.maxguests}
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
        <div>
          {place.extrainfo.length>0 &&(
            <div className="extra-info-section">
            <div>
              <h2>Extra info</h2>
            </div>
            <div>{place.extrainfo}</div>
          </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
