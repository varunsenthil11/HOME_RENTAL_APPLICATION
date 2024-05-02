import React from 'react'
import Placesformpage from './Placesformpage'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Addplacespage() {
    const navigate = useNavigate();
  return (
    <div> 
    <div><Placesformpage/></div>
    </div>
  )
}
