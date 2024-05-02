import React, { useEffect } from 'react'
import '../helpers/styles/Placespresentpage.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Placespresentpage() {
  const navigate = useNavigate();
  const [places, setplaces] = useState([]);
  const [flag,setflag] = useState(true);
  async function del(){
  const res=  await axios.delete('http://localhost:4000/delete');
  setflag(!flag);
  }

  useEffect(() => {
    axios.get('http://localhost:4000/user-places').then(({ data }) => {
      setplaces(data);
    })
  }, [flag])
  return (
    <div>
      {places.length > 0 && places.map(place => (
        <div key={place}>
          <span >

            {place.addphotos.length > 0 && (
              <img onClick={() => {
                navigate('/Accounts/places/' + place._id)
              }} className='photosize' src={'http://localhost:4000/uploads/' + place.addphotos[0]} alt='' />
            )}
            <span className='title'>{place.title}:
              <div className='description'>{place.description}
              </div>
            </span>
          </span>
          <div>
      <button type='button' onClick={del} className='delete-button'>DELETE</button>
      </div>
        </div>
      ))
      }
     
    </div>
  )
}
