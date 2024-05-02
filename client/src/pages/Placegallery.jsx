import React from 'react'
import { useState } from 'react'
import '../helpers/styles/Placegallery.css'
export default function Placegallery({ place }) {
  const [showallphotos, setshowallphotos] = useState(false)
  return (
    <div className="place-gallery-container">
      {!showallphotos && place.addphotos?.[0] && (
        <img className='photo' src={'http://localhost:4000/uploads/' + place.addphotos[0]} />
      )}
      {!showallphotos && place.addphotos?.[1] && (
        <img className='photo' src={'http://localhost:4000/uploads/' + place.addphotos[1]} />
      )}
      {showallphotos && (
      <div className="all-photos">
          {place.addphotos.length > 0 && (
            place.addphotos.map((place) => (
              <div>
                <img className='photo' src={'http://localhost:4000/uploads/' + place} />
              </div>
            ))
          )
          }
        </div>
      )}
      <div className='grid'>
        <button onClick={() => {
          setshowallphotos(true)
        }}>see more</button>
      </div>

    </div>
  )
}
